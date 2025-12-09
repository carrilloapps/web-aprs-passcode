# APRS (Automatic Packet Reporting System)

## Table of Contents

- [What is APRS?](#what-is-aprs)
- [How APRS Works](#how-aprs-works)
- [APRS Frequencies by Country](#aprs-frequencies-by-country)
- [APRS-IS Network](#aprs-is-network)
- [Passcode Generation](#passcode-generation)
- [Use Cases](#use-cases)
- [Equipment Requirements](#equipment-requirements)
- [Getting Started](#getting-started)
- [References](#references)

---

## What is APRS?

**APRS (Automatic Packet Reporting System)** is a digital communications system developed by Bob Bruninga (WB4APR) that uses amateur radio to transmit real-time tactical information. It combines GPS positioning, radio communication, and the internet to create a versatile information network.

### Key Features

- **Real-time GPS tracking** of stations, vehicles, and objects
- **Two-way messaging** between stations
- **Weather station data** transmission
- **Telemetry** for remote monitoring
- **Internet gateway** (APRS-IS) for global connectivity
- **Emergency communications** during disasters
- **Event coordination** for marathons, races, and public service events

### APRS vs Traditional Packet Radio

| Feature | APRS | Traditional Packet |
|---------|------|-------------------|
| Purpose | Tactical real-time information | Message passing |
| Network | Connectionless broadcast | Connection-oriented |
| Data | Position, weather, status | General data/messages |
| Internet | Integrated (APRS-IS) | Limited |
| Maps | Built-in visualization | Not standard |

---

## How APRS Works

### Basic Components

1. **TNC (Terminal Node Controller)** or **Sound Card Interface**
   - Converts digital data to audio tones (and vice versa)
   - Examples: TNC-X, Mobilinkd TNC, Direwolf (software TNC)

2. **VHF/UHF Radio Transceiver**
   - Typically operates on 2-meter band (144-146 MHz)
   - FM mode with 1200 baud AFSK modulation

3. **GPS Receiver**
   - Provides position information
   - Built into many modern radios and devices

4. **Computer or Mobile Device**
   - Runs APRS software
   - Examples: APRSDroid (Android), APRSISCE/32, Xastir, Dire Wolf

### Data Flow

```
GPS → Computer/Device → TNC → Radio → RF → Other Stations
                                            ↓
                                    Internet Gateway (IGate)
                                            ↓
                                        APRS-IS
                                            ↓
                                    Global APRS Network
```

### APRS Packet Structure

A typical APRS position packet:

```
WB4APR>APRS,RELAY,WIDE:!3849.50N/07652.00W-PHG5132/W3,VA
```

Components:
- **Source callsign**: WB4APR
- **Destination**: APRS (APRS identifier)
- **Path**: RELAY,WIDE (digipeater path)
- **Data**: Position, symbol, comment

---

## APRS Frequencies by Country

### Americas

| Country | Frequency | Notes |
|---------|-----------|-------|
| **United States** | 144.390 MHz | Primary national frequency |
| **Canada** | 144.390 MHz | Same as USA |
| **Mexico** | 144.390 MHz | Aligned with North America |
| **Brazil** | 145.575 MHz | National frequency |
| **Argentina** | 144.930 MHz | Primary frequency |
| **Chile** | 144.930 MHz | Coordinated with region |
| **Colombia** | 144.390 MHz | Following North American standard |
| **Peru** | 144.390 MHz | Regional coordination |
| **Venezuela** | 144.390 MHz | North American alignment |

### Europe

| Country | Frequency | Notes |
|---------|-----------|-------|
| **Austria** | 144.800 MHz | ÖVSV recommended |
| **Belgium** | 144.800 MHz | European standard |
| **Czech Republic** | 144.800 MHz | CZ APRS frequency |
| **Denmark** | 144.800 MHz | EDR coordination |
| **Finland** | 144.800 MHz | SRAL approved |
| **France** | 144.800 MHz | REF-Union frequency |
| **Germany** | 144.800 MHz | DARC recommended |
| **Greece** | 144.800 MHz | RAAG frequency |
| **Hungary** | 144.800 MHz | MRASZ coordination |
| **Ireland** | 144.800 MHz | IRTS frequency |
| **Italy** | 144.800 MHz | ARI recommended |
| **Netherlands** | 144.800 MHz | VERON coordination |
| **Norway** | 144.800 MHz | NRRL frequency |
| **Poland** | 144.800 MHz | PZK recommended |
| **Portugal** | 144.800 MHz | REP coordination |
| **Russia** | 144.800 MHz | SRR frequency |
| **Spain** | 144.800 MHz | URE recommended |
| **Sweden** | 144.800 MHz | SSA frequency |
| **Switzerland** | 144.800 MHz | USKA coordination |
| **United Kingdom** | 144.800 MHz | RSGB recommended |

### Asia-Pacific

| Country | Frequency | Notes |
|---------|-----------|-------|
| **Australia** | 145.175 MHz | WIA recommended |
| **China** | 144.640 MHz | CRSA coordination |
| **Hong Kong** | 144.640 MHz | HKARA frequency |
| **India** | 145.825 MHz | NIAR recommended |
| **Indonesia** | 144.390 MHz | ORARI coordination |
| **Japan** | 144.640 MHz | JARL recommended |
| **Malaysia** | 144.390 MHz | MARTS frequency |
| **New Zealand** | 144.575 MHz | NZART recommended |
| **Philippines** | 144.390 MHz | PARA coordination |
| **Singapore** | 144.390 MHz | SARTS frequency |
| **South Korea** | 144.620 MHz | KARL recommended |
| **Taiwan** | 144.640 MHz | CTARL frequency |
| **Thailand** | 145.525 MHz | RAST coordination |
| **Vietnam** | 144.390 MHz | VAST frequency |

### Africa

| Country | Frequency | Notes |
|---------|-----------|-------|
| **South Africa** | 144.800 MHz | SARL recommended |
| **Egypt** | 144.800 MHz | Regional coordination |
| **Kenya** | 144.800 MHz | ARSK frequency |
| **Morocco** | 144.800 MHz | ARAM coordination |
| **Nigeria** | 144.800 MHz | NARS frequency |

### Middle East

| Country | Frequency | Notes |
|---------|-----------|-------|
| **Israel** | 144.800 MHz | IARC recommended |
| **Saudi Arabia** | 144.800 MHz | SARS coordination |
| **United Arab Emirates** | 144.800 MHz | EARU frequency |
| **Turkey** | 144.800 MHz | TRAC recommended |

### Space

| Application | Frequency | Notes |
|-------------|-----------|-------|
| **ISS APRS** | 145.825 MHz | International Space Station |
| **Satellite Uplink** | 145.825 MHz | Various amateur satellites |

---

## APRS-IS Network

### What is APRS-IS?

**APRS-IS (APRS Internet Service)** is the internet backbone of the APRS network. It allows APRS data from around the world to be shared in real-time.

### Key Features

- **Global connectivity** - Connect stations worldwide
- **Real-time synchronization** - Instant data propagation
- **Multiple server network** - Redundancy and reliability
- **Port access** - Various ports for different purposes
- **Authentication** - Passcode-based security

### APRS-IS Server Ports

| Port | Purpose | Filter |
|------|---------|--------|
| 14580 | Full feed | No filter |
| 8080 | HTTP | Web-based access |
| 23 | Telnet | Legacy access |
| 10152 | UDP | Experimental |

### Popular APRS-IS Servers

#### Tier 1 Servers (Core Network)

- `rotate.aprs.net` - Load-balanced rotation
- `noam.aprs2.net` - North America
- `euro.aprs2.net` - Europe
- `asia.aprs2.net` - Asia
- `soam.aprs2.net` - South America
- `aunz.aprs2.net` - Australia/New Zealand

#### Regional Servers

- **North America:**
  - `noam.aprs2.net:14580`
  - `second.aprs.net:14580`
  
- **Europe:**
  - `euro.aprs2.net:14580`
  - `france.aprs2.net:14580`
  - `germany.aprs2.net:14580`
  
- **Asia:**
  - `asia.aprs2.net:14580`
  - `japan.aprs2.net:14580`
  
- **South America:**
  - `soam.aprs2.net:14580`
  - `brazil.aprs2.net:14580`

### Connection String Format

```
callsign pass passcode vers software version filter filter-specification
```

Example:
```
WB4APR pass 12345 vers APRSClient 1.0 filter r/38.00/-97.00/500
```

---

## Passcode Generation

### Algorithm

The APRS-IS passcode is generated using a specific algorithm to prevent unauthorized access while maintaining amateur radio's open nature.

### Implementation

```javascript
function generateAprsPasscode(callsign) {
  const cleanCallsign = callsign.toUpperCase().trim();
  let hash = 0x73e2;
  let i = 0;
  
  while (i < cleanCallsign.length) {
    hash ^= cleanCallsign.charCodeAt(i) << 8;
    hash ^= cleanCallsign.charCodeAt(i + 1);
    i += 2;
  }
  
  return hash & 0x7fff;
}
```

### Key Points

- **Read-only access**: Passcode `-1` for receive-only
- **Full access**: Generated passcode for transmit capability
- **Callsign specific**: Each callsign has unique passcode
- **Not encryption**: Security through amateur radio licensing
- **Verification**: Validates amateur radio license

### Example Passcodes

| Callsign | Passcode |
|----------|----------|
| WB4APR | 23515 |
| N0CALL | 13023 |
| TEST | 29939 |
| KF5INZ | 12345 |

---

## Use Cases

### 1. Vehicle Tracking

Track cars, trucks, boats, aircraft in real-time:

- **Fleet management** for commercial operations
- **Search and rescue** coordination
- **Race tracking** for marathons and rallies
- **Personal tracking** during road trips

### 2. Weather Stations

Automated weather reporting:

- **Temperature** and humidity
- **Barometric pressure** trends
- **Wind speed** and direction
- **Rainfall** measurements
- **Solar radiation** monitoring

Example weather packet:
```
WX1ABC>APRS:!4028.51N/07506.67W_090/001g005t077r000p000h50b10120
```

### 3. Emergency Communications

Critical during disasters:

- **Shelter locations** and capacity
- **Resource requests** (water, food, medical)
- **Damage reports** with GPS coordinates
- **Personnel tracking** for safety
- **Communication when infrastructure fails**

### 4. Event Coordination

Public service events:

- **Parade monitoring** and coordination
- **Marathon SAG wagon** tracking
- **Bicycle race** support
- **Community events** logistics
- **Ham radio field days**

### 5. Maritime Applications

Boating and sailing:

- **AIS integration** with marine traffic
- **Position reporting** offshore
- **Weather buoy** data
- **Distress signaling**
- **Race coordination**

### 6. Aviation

Aircraft tracking:

- **Glider tracking** and safety
- **Balloon launches** monitoring
- **Ultralight** position reporting
- **Search patterns** coordination

---

## Equipment Requirements

### Basic APRS Station

#### Minimum Requirements

1. **Amateur Radio License**
   - Required for transmitting
   - Technician class minimum (USA)
   - Equivalent license in other countries

2. **VHF Radio**
   - 2-meter FM transceiver
   - 5W minimum recommended
   - 25-50W for better range

3. **TNC or Sound Card Interface**
   - Hardware TNC: $50-$300
   - Software TNC (Dire Wolf): Free
   - Built-in (some radios): Included

4. **GPS Receiver**
   - USB GPS: $20-$50
   - Smartphone GPS: Built-in
   - Radio GPS: Varies

5. **Computer/Device**
   - Laptop/PC
   - Smartphone
   - Raspberry Pi
   - Dedicated APRS device

### Popular Equipment

#### All-in-One Solutions

| Device | Type | Price Range | Features |
|--------|------|-------------|----------|
| **Kenwood TM-D710GA** | Mobile | $500-$600 | Built-in GPS, TNC, dual-band |
| **Yaesu FTM-400XDR** | Mobile | $400-$500 | Touch screen, GPS, APRS |
| **Kenwood TH-D74A** | Handheld | $500-$600 | Tri-band, GPS, Bluetooth |
| **Yaesu FT5DR** | Handheld | $300-$400 | Dual-band, GPS, APRS |

#### Trackers

| Device | Type | Price Range | Features |
|--------|------|-------------|----------|
| **Byonics TinyTrak4** | Tracker | $100-$150 | Compact, low power |
| **Argent Data OT3m** | Tracker | $150-$200 | Micro-sized, versatile |
| **APRS.fi** | Mobile App | Free | Smartphone tracking |

#### TNCs

| Device | Type | Price Range | Features |
|--------|------|-------------|----------|
| **Mobilinkd TNC3** | Bluetooth TNC | $80-$100 | Wireless, smartphone compatible |
| **Dire Wolf** | Software TNC | Free | PC/Raspberry Pi, excellent |
| **Kantronics KPC-3+** | Hardware TNC | $150-$200 | Classic, reliable |

### Budget Options

**Under $100 Setup:**
- USB GPS receiver: $30
- Baofeng UV-5R radio: $25
- Sound card interface cable: $15
- Dire Wolf software: Free
- APRSdroid app: Free

**Total: ~$70**

### Advanced Setup

**Professional Station:**
- Kenwood TM-D710GA: $550
- Diamond X50 antenna: $100
- 50W power supply: $50
- IGate equipment: $100
- Weather station: $200

**Total: ~$1,000**

---

## Getting Started

### Step-by-Step Guide

#### 1. Obtain Amateur Radio License

- **USA**: [FCC Amateur Radio](https://www.fcc.gov/wireless/bureau-divisions/mobility-division/amateur-radio-service)
- **Study resources**: [HamStudy.org](https://hamstudy.org)
- **Exam sessions**: [ARRL Exam Finder](http://www.arrl.org/find-an-amateur-radio-license-exam-session)

#### 2. Choose Your Equipment

Start simple:
- **Mobile**: Used radio with built-in APRS
- **Portable**: Smartphone + Bluetooth TNC
- **Fixed**: PC + software TNC + basic radio

#### 3. Generate Your Passcode

Use this tool or alternatives:
- [aprs.fi passcode generator](https://aprs.fi)
- [APRSISCE passcode](http://aprsisce.wikidot.com/doc:passcode)
- This web application

#### 4. Configure Your Software

Popular APRS software:

- **Windows**: APRSISCE/32, UI-View32
- **Mac**: Xastir, YAAC
- **Linux**: Xastir, Dire Wolf
- **Android**: APRSdroid
- **iOS**: PocketPacket

#### 5. Set Up Your Station

Basic configuration:
```
Callsign: YOUR-CALL
SSID: -9 (mobile), -5 (other), -10 (internet)
Symbol: /O (circle), /> (car), /- (house)
Comment: "Testing APRS"
Path: WIDE1-1,WIDE2-1 (recommended)
```

#### 6. Test Your Setup

- **Transmit test beacon**
- **Check on aprs.fi** for your packets
- **Monitor local APRS traffic**
- **Join local APRS net**

#### 7. Join the Community

- **Local ham club** APRS group
- **Online forums**: [TAPR APRS](https://tapr.org)
- **Facebook groups**: APRS enthusiasts
- **Reddit**: r/amateurradio

---

## References

### Official Resources

- **APRS.org** - Bob Bruninga's official site: http://www.aprs.org
- **APRS.fi** - Global APRS map and tracking: https://aprs.fi
- **APRS-IS** - Internet service documentation: http://www.aprs-is.net
- **TAPR** - Tucson Amateur Packet Radio: https://tapr.org

### Documentation

- **APRS Protocol Reference** - http://www.aprs.org/doc/APRS101.PDF
- **APRS Spec Addendum 1.1** - http://www.aprs.org/aprs11.html
- **APRS Spec Addendum 1.2** - http://www.aprs.org/aprs12.html
- **Dire Wolf User Guide** - https://github.com/wb2osz/direwolf

### Software

- **Xastir** - https://xastir.org
- **APRSISCE/32** - http://aprsisce.wikidot.com
- **APRSdroid** - https://aprsdroid.org
- **Dire Wolf** - https://github.com/wb2osz/direwolf
- **YAAC** - https://www.ka2ddo.org/ka2ddo/YAAC.html

### Online Tools

- **APRS.fi** - Position tracking and mapping
- **APRSdirect** - https://www.aprsdirect.com
- **findu.com** - Legacy APRS tracking
- **APRS Message Tool** - https://www.aprs.fi/page/messages

### Communities

- **APRS SIG** - aprsig@lists.tapr.org
- **Reddit /r/APRS** - https://reddit.com/r/aprs
- **QRZ Forums** - https://forums.qrz.com/index.php?forums/aprs.50/
- **Facebook APRS Groups** - Search "APRS" on Facebook

### Books

- **"APRS Tracks, Maps and Mobiles"** by Stan Horzepa, WA1LOU
- **"The APRS Handbook"** by Mark Sproul, KB2ICI
- **ARRL Handbook** - APRS section

### Video Tutorials

- **Ham Radio Crash Course** - APRS series on YouTube
- **K6UDA Radio** - APRS tutorials
- **OH8STN** - Portable APRS setups

---

## Contributing to APRS

### How to Help

1. **Run an IGate** - Bridge RF to internet
2. **Run a Digipeater** - Extend APRS coverage
3. **Maintain accuracy** - Update your position/status
4. **Report issues** - Help improve the network
5. **Educate others** - Share APRS knowledge
6. **Develop software** - Contribute to APRS tools

### Best Practices

- **Use appropriate paths** - Don't flood the network
- **Update position intelligently** - Smart beaconing
- **Monitor before transmitting** - Listen first
- **Use proper symbols** - Standardized icons
- **Keep comments concise** - Bandwidth efficiency
- **Respect the frequency** - Share the resource

---

## Troubleshooting

### Common Issues

**No packets received:**
- Check antenna connection
- Verify frequency (144.390 MHz in USA)
- Ensure squelch is open
- Check TNC configuration

**Packets not on APRS-IS:**
- Verify passcode is correct
- Check internet connection
- Confirm IGate coverage
- Review filter settings

**Poor coverage:**
- Improve antenna height
- Increase transmit power
- Check for RF interference
- Verify path settings

**GPS not working:**
- Check GPS antenna placement
- Allow time for satellite lock
- Verify GPS settings
- Test GPS separately

---

## Glossary

- **AFSK** - Audio Frequency Shift Keying
- **Digipeater** - Digital repeater for APRS
- **IGate** - Internet Gateway
- **MIC-E** - Microphone Encoder (compact position format)
- **SSID** - Secondary Station Identifier (0-15)
- **TNC** - Terminal Node Controller
- **WIDE1-1** - First-level wide area digipeater
- **WIDE2-1** - Second-level wide area digipeater

---

*This documentation is maintained by the APRS community. For updates or corrections, please contribute to the project.*

**Last Updated:** December 2025
