# Technical Specifications

## APRS Protocol Technical Details

### Modulation and Data Rate

- **Modulation Type:** AFSK (Audio Frequency Shift Keying)
- **Data Rate:** 1200 baud (North America, most regions)
- **Alternative Rate:** 9600 baud (some areas, experimental)
- **Frequency Shift:** ±1000 Hz
- **Mark Frequency:** 1200 Hz (logic 1)
- **Space Frequency:** 2200 Hz (logic 0)
- **Audio Level:** 3000 mV p-p typical

### Radio Specifications

#### VHF Band Parameters (Most Common)

- **Frequency:** 144-146 MHz (2-meter band)
- **Channel Spacing:** 12.5 kHz or 25 kHz
- **Deviation:** ±5 kHz
- **Modulation:** FM (F3E)
- **RF Power:** 1W - 50W typical
- **Antenna:** Vertical polarization

#### UHF Band Parameters (Alternative)

- **Frequency:** 430-440 MHz (70-cm band)
- **Less common:** Regional use only
- **Same modulation:** As VHF

### Packet Structure

#### AX.25 Frame Format

APRS uses AX.25 protocol (amateur radio adaptation of X.25):

```
Flag | Address | Control | PID | Information | FCS | Flag
0x7E | 112-560 bits | 8 bits | 8 bits | Variable | 16 bits | 0x7E
```

**Detailed breakdown:**

1. **Flag:** `0x7E` (01111110) - Frame delimiter
2. **Address Field:**
   - Destination: 56 bits (7 bytes)
   - Source: 56 bits (7 bytes)
   - Digipeater path: 0-8 entries × 56 bits
3. **Control:** `0x03` (UI frame)
4. **PID:** `0xF0` (No layer 3 protocol)
5. **Information:** APRS data payload
6. **FCS:** 16-bit CRC checksum
7. **Flag:** `0x7E` (frame end)

#### APRS Data Formats

**Position without timestamp:**
```
!DDMM.mmN/DDDMM.mmW$
```

**Position with timestamp:**
```
@DDHHMM/DDMM.mmN/DDDMM.mmW$
```

**Compressed position:**
```
!/YYYYXXXX$csT
```

**Mic-E format:**
```
(Encoded in destination address)
```

### Position Precision

| Format | Latitude Precision | Longitude Precision | Example |
|--------|-------------------|---------------------|---------|
| Standard | ±0.01' (~18m) | ±0.01' (~18m) | 4901.23N |
| Compressed | ±0.3m | ±0.3m | Base-91 encoded |
| Decimal | ±0.00001° (~1m) | ±0.00001° (~1m) | Extensions |

### Beacon Intervals

#### Smart Beaconing

Adaptive beacon rates based on movement:

```python
# Pseudocode for smart beaconing
if speed == 0:
    interval = SLOW_RATE  # 30 minutes
elif speed < SLOW_SPEED:
    interval = SLOW_RATE  # 30 minutes
elif speed > FAST_SPEED:
    interval = FAST_RATE  # 1 minute
else:
    # Linear interpolation
    interval = calculate_proportional(speed)

# Also beacon on heading change
if heading_change > TURN_MIN:
    beacon_now()
    reset_timer()
```

**Recommended Settings:**

| Parameter | Value | Description |
|-----------|-------|-------------|
| `FAST_SPEED` | 60 mph | High-speed threshold |
| `SLOW_SPEED` | 5 mph | Low-speed threshold |
| `FAST_RATE` | 120s | High-speed interval |
| `SLOW_RATE` | 1800s | Low-speed interval |
| `TURN_MIN` | 30° | Minimum turn angle |
| `TURN_TIME` | 60s | Turn beacon delay |

### Digipeater Paths

#### Path Syntax

```
VIA call-SSID,call-SSID,...
```

#### Common Paths

| Path | Description | Use Case |
|------|-------------|----------|
| `WIDE1-1` | First-level digipeater | Fill-in digi |
| `WIDE2-1` | Wide area coverage | Mobile stations |
| `WIDE1-1,WIDE2-1` | Recommended path | General use |
| `WIDE2-2` | Two hops | Long distance |
| `WIDE3-3` | Three hops | **NOT RECOMMENDED** |
| `ARISS` | ISS digipeater | Space communications |

#### Path Processing

Example of path decrementation:

```
Original:  SOURCE>DEST,WIDE1-1,WIDE2-2:data
After Hop 1: SOURCE>DEST,DIGI1*,WIDE2-2:data
After Hop 2: SOURCE>DEST,DIGI1,DIGI2*,WIDE2-1:data
After Hop 3: SOURCE>DEST,DIGI1,DIGI2,DIGI3*,WIDE2-0:data (DONE)
```

### Symbol Table

#### Primary Symbol Table `/`

Common symbols:

| Code | Symbol | Description |
|------|--------|-------------|
| `/O` | Circle | Base/Home |
| `/'` | Small Aircraft | Aviation |
| `/>` | Car | Automobile |
| `/k` | Truck | Truck/Van |
| `/s` | Ship | Maritime |
| `/y` | Sailboat | Sailing vessel |
| `/u` | Bus | Bus/RV |
| `/-` | House | Fixed station |
| `/^` | Large Aircraft | Heavy aircraft |

#### Alternate Symbol Table `\`

| Code | Symbol | Description |
|------|--------|-------------|
| `\n` | Red Cross | Emergency |
| `\j` | Workzone | Construction |
| `\s` | Satellite | Space station |

### Weather Data Format

#### Complete Weather Report

```
!4903.50N/07201.75W_090/001g005t077r000p000P000h50b10120
```

**Field Breakdown:**

| Field | Code | Description | Unit |
|-------|------|-------------|------|
| Wind Direction | `090` | Direction (3 digits) | Degrees |
| Wind Speed | `/001` | Sustained wind | MPH |
| Gust | `g005` | Peak gust | MPH |
| Temperature | `t077` | Temperature | °F |
| Rain (1h) | `r000` | Last hour | 1/100 inch |
| Rain (24h) | `p000` | Last 24 hours | 1/100 inch |
| Rain (midnight) | `P000` | Since midnight | 1/100 inch |
| Humidity | `h50` | Relative humidity | % |
| Pressure | `b10120` | Barometric | 1/10 mbar |

#### Optional Weather Fields

| Code | Description | Unit |
|------|-------------|------|
| `L` | Luminosity | W/m² |
| `l` | Luminosity | 1000 W/m² |
| `s` | Snow | 1/100 inch |
| `#` | Raw rain counter | Count |

### Telemetry

#### Analog/Digital Channels

```
T#SSS,A1,A2,A3,A4,A5,D1D2D3D4D5D6D7D8,COMMENT
```

- **SSS:** Sequence number (000-999)
- **A1-A5:** Analog values (000-255)
- **D1-D8:** Digital bits (0 or 1)

#### Telemetry Equations

Define conversion formulas:

```
EQNS.a1,b1,c1,a2,b2,c2,...,a5,b5,c5
```

Value = `a × raw² + b × raw + c`

Example for battery voltage:
```
EQNS.0,0.05,0
# Voltage = 0 × raw² + 0.05 × raw + 0
# If raw = 120, then voltage = 6.0V
```

### Message Format

#### Direct Message

```
:ADDRESSEE:Message text{MSGID
```

- **ADDRESSEE:** 9 characters (padded with spaces)
- **Message:** Up to 67 characters
- **MSGID:** Optional 1-5 characters for acknowledgment

Example:
```
:WB4APR   :Testing APRS message{001
```

#### Acknowledgment

```
:SENDER   :ack001
```

#### Rejection

```
:SENDER   :rej001
```

### Bulletins and Announcements

#### Bulletin

```
:BLNn     :Bulletin text
```

- `n` is bulletin number (0-9 or A-Z)

#### Announcement

```
:BLNnABCD :Announcement text
```

- `ABCD` is group identifier

### Object Format

```
;OBJECTNAM*DDHHMM/DDMM.mmN/DDDMM.mmW$COMMENT
```

- **OBJECTNAM:** 9 characters (padded)
- `*` = live, `_` = killed
- Position and timestamp

### Status Messages

```
>Status text
```

Maximum 62 characters

### APRS-IS Connection

#### Login String

```
user CALLSIGN-SSID pass PASSCODE vers SOFTWARENAME VERSION filter FILTER
```

Example:
```
user WB4APR-9 pass 23515 vers WebAPRS 2.0.0 filter r/38.00/-97.00/500
```

#### Filter Syntax

| Filter | Description | Example |
|--------|-------------|---------|
| `r/lat/lon/dist` | Range | `r/34.5/-117.5/100` |
| `p/prefix` | Prefix | `p/W6` |
| `b/call1/call2` | Budlist | `b/WB4APR/N0CALL` |
| `o/obj1/obj2` | Objects | `o/BALLOON` |
| `t/poimqstunw` | Type | `t/p` (position) |
| `s/pri/alt/over` | Symbol | `s//&` |
| `d/digi1/digi2` | Digipeater | `d/WIDE` |
| `a/latN/lonW/latS/lonE` | Area | `a/34/-118/32/-116` |

### Performance Metrics

#### Network Capacity

- **Channel capacity:** ~1200 bps
- **Effective throughput:** ~800-900 bps (due to overhead)
- **Simultaneous users:** Depends on beacon interval
- **Recommended density:** <50 mobile stations per frequency

#### Range Expectations

| Environment | Handheld (5W) | Mobile (50W) | Base (50W + antenna) |
|-------------|---------------|--------------|----------------------|
| Urban | 2-5 miles | 10-20 miles | 20-40 miles |
| Suburban | 5-10 miles | 20-40 miles | 40-80 miles |
| Rural/Open | 10-20 miles | 40-80 miles | 80-150+ miles |
| Elevated | 20-40 miles | 80-120 miles | 150-300+ miles |

#### Propagation Factors

- **Line of sight:** Primary limitation on VHF
- **Antenna height:** Critical for range
- **Terrain:** Hills block signals
- **Buildings:** Urban attenuation
- **Weather:** Minimal effect on VHF FM
- **Seasonal:** Foliage affects propagation

### Timing and Synchronization

#### Collision Avoidance

- **CSMA (Carrier Sense Multiple Access):** Listen before transmit
- **Random delay:** Prevent synchronized collisions
- **Exponential backoff:** Retry strategy

#### Network Delay

- **RF propagation:** Negligible (~1 μs/mile)
- **Digipeater delay:** 100-500 ms per hop
- **IGate processing:** 100-1000 ms
- **APRS-IS latency:** 100-2000 ms global
- **Total delay:** 1-5 seconds typical

### Error Detection and Correction

- **FCS:** 16-bit CRC in AX.25
- **Detection capability:** 99.998% error detection
- **No FEC:** No forward error correction
- **Retry mechanism:** Supported for messages
- **Best effort:** Position reports not retried

### Security Considerations

#### Authentication

- **Passcode:** Weak security (validation only)
- **No encryption:** All data transmitted in clear
- **Amateur radio:** Self-policing community
- **License verification:** Via license database

#### Abuse Prevention

- **Rate limiting:** APRS-IS server limits
- **Flood protection:** Automatic filtering
- **Monitoring:** Community oversight
- **Enforcement:** Through licensing authority

---

## Hardware Interface Specifications

### Audio Interface

#### Input Specifications

- **Input impedance:** 10kΩ typical
- **Input level:** 50-500 mV RMS
- **Frequency response:** 300 Hz - 3 kHz
- **SNR required:** >20 dB for reliable decode

#### Output Specifications

- **Output impedance:** 600Ω typical
- **Output level:** 100-3000 mV p-p
- **THD:** <5%
- **Pre-emphasis:** 6 dB/octave (optional)

### Serial Interface (TNC)

- **Interface:** RS-232 or USB
- **Baud rate:** 9600, 19200, 38400, 57600
- **Data bits:** 8
- **Parity:** None
- **Stop bits:** 1
- **Flow control:** RTS/CTS or none

### GPS Interface

#### NMEA 0183

- **Sentences:** GGA, RMC, GLL
- **Baud rate:** 4800 or 9600
- **Update rate:** 1 Hz typical
- **Format:** ASCII text

Example NMEA sentence:
```
$GPGGA,123519,4807.038,N,01131.000,E,1,08,0.9,545.4,M,46.9,M,,*47
```

### Power Requirements

| Device Type | Voltage | Current (RX) | Current (TX) | Peak |
|-------------|---------|--------------|--------------|------|
| Handheld | 7.4V | 100-200 mA | 1.5-2 A | 2 A |
| Mobile | 13.8V | 200-500 mA | 5-12 A | 15 A |
| Tracker | 12V | 50-100 mA | 1-2 A | 2.5 A |
| IGate | 12V | 300-500 mA | N/A | 1 A |

---

*Document Version: 2.0*
*Last Updated: December 2025*
*Maintained by: APRS Community*
