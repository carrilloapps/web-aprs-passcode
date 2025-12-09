# Frequently Asked Questions (FAQ)

## General Questions

### What is APRS?

APRS (Automatic Packet Reporting System) is a digital communications system used in amateur radio to transmit real-time tactical information, including GPS positions, weather data, messages, and telemetry.

### What is an APRS passcode?

An APRS passcode is a numeric code generated from your amateur radio callsign. It's used to authenticate your connection to the APRS-IS (APRS Internet Service) network, allowing you to transmit data to the global APRS network via the internet.

### Do I need an amateur radio license to use APRS?

**Yes.** To transmit on APRS frequencies, you must hold a valid amateur radio license. However, you can receive APRS data and use this passcode generator without a license.

### Is the APRS passcode secure?

**No.** The APRS passcode is **not** a security mechanism. It's a simple validation code to confirm you have a callsign. Amateur radio operates on the principle of open communication, and all transmissions are public.

---

## Using This Application

### How do I use this passcode generator?

1. Enter your amateur radio callsign in the input field
2. Click "Get Passcode!" button
3. Your passcode will be displayed immediately

Example:
- Callsign: `N0CALL`
- Passcode: `13023`

### What callsign format should I use?

Enter your callsign in any of these formats:
- Base callsign: `W1ABC`
- With dash: `W1ABC-9`
- With SSID: `W1ABC-5`
- Lowercase works too: `w1abc`

The generator accepts:
- ✅ Letters (A-Z)
- ✅ Numbers (0-9)
- ✅ Dashes (-)
- ❌ Special characters (@, #, $, etc.)
- ❌ Spaces

### Why do I get "Invalid Callsign" error?

Common reasons:
- Special characters in the callsign
- Spaces in the input
- Empty input
- Non-alphanumeric characters (except dash)

### Can I use this passcode for all APRS applications?

**Yes!** The passcode works with:
- APRS-IS servers
- APRS software (APRSdroid, APRSISCE/32, Xastir, etc.)
- IGates and digipeaters
- Web services (aprs.fi, aprsdirect.com)
- Any APRS-IS client

### What is an SSID (the number after the dash)?

SSID (Secondary Station Identifier) indicates the type of station:

| SSID | Typical Use |
|------|-------------|
| -0 | Default (no SSID shown) |
| -1 | Fixed station, generic |
| -2 | Fixed station, alternate |
| -3 | Fixed station, alternate |
| -4 | Fixed station, alternate |
| -5 | Other network |
| -7 | Handheld |
| -8 | Marine/boats |
| -9 | Mobile (car, truck) |
| -10 | Internet gateway |
| -11 | Balloon |
| -12 | Emergency operations |
| -14 | Truck |
| -15 | Generic additional station |

---

## Technical Questions

### How is the passcode calculated?

The passcode uses a specific algorithm:

```javascript
function generateAprsPasscode(callsign) {
  let hash = 0x73e2;  // Starting value: 29666
  let i = 0;
  
  while (i < callsign.length) {
    hash ^= callsign.charCodeAt(i) << 8;
    hash ^= callsign.charCodeAt(i + 1);
    i += 2;
  }
  
  return hash & 0x7fff;  // Mask to 15 bits
}
```

### Does the SSID change the passcode?

**No.** The passcode is generated from the base callsign only:
- `W1ABC` → 12345
- `W1ABC-9` → 12345
- `W1ABC-5` → 12345

All generate the same passcode.

### What frequency should I use for APRS?

Depends on your country:
- **North America:** 144.390 MHz
- **Europe:** 144.800 MHz
- **Australia:** 145.175 MHz
- **Japan:** 144.640 MHz
- **New Zealand:** 144.575 MHz

See [APRS-GUIDE.md](docs/APRS-GUIDE.md) for complete frequency list.

### Can I use APRS on UHF?

While technically possible, APRS is primarily a VHF (2-meter band) system. Most APRS activity is on VHF frequencies. UHF is rarely used for APRS.

### What's the difference between APRS and APRS-IS?

- **APRS:** Radio frequency network (over-the-air)
- **APRS-IS:** Internet Service (TCP/IP network)
- **IGate:** Bridge between APRS RF and APRS-IS

---

## Setup Questions

### What equipment do I need for APRS?

Minimum requirements:
1. Amateur radio license
2. VHF radio (2-meter band)
3. TNC (Terminal Node Controller) or smartphone
4. GPS receiver
5. APRS software

Budget setup (~$70):
- Baofeng UV-5R radio: $25
- USB GPS receiver: $30
- Sound card cable: $15
- Dire Wolf software: Free

### What's the best APRS software?

Depends on your platform:

**Mobile:**
- Android: APRSdroid (free, excellent)
- iOS: PocketPacket (paid, $9.99)

**Desktop:**
- Windows: APRSISCE/32
- Mac: YAAC, Xastir
- Linux: Xastir, Dire Wolf

**All platforms:**
- YAAC (Java-based)
- Web: aprs.fi

### Do I need a TNC?

**Not necessarily.** Options:

1. **Software TNC** (Recommended for beginners)
   - Dire Wolf (free, excellent)
   - Soundcard + radio + PC

2. **Hardware TNC**
   - Mobilinkd TNC3 (Bluetooth)
   - Traditional TNCs (KPC-3+, etc.)

3. **Built-in APRS**
   - Some radios have APRS built-in
   - Kenwood TM-D710GA, Yaesu FTM-400XDR

4. **Smartphone**
   - APRSdroid + Bluetooth TNC
   - APRSdroid + audio cable to radio

### How do I connect to APRS-IS?

Connection string format:
```
user CALLSIGN-SSID pass PASSCODE vers SOFTWARE VERSION filter FILTER
```

Example:
```
user W1ABC-9 pass 12345 vers APRSClient 1.0 filter r/42.3/-71.1/100
```

Popular APRS-IS servers:
- `rotate.aprs2.net:14580` (automatic routing)
- `noam.aprs2.net:14580` (North America)
- `euro.aprs2.net:14580` (Europe)

---

## Troubleshooting

### My passcode doesn't work

Check:
1. ✅ Correct callsign entered
2. ✅ No SSID in passcode generation (use base call)
3. ✅ Server connection string format
4. ✅ Internet connection
5. ✅ APRS-IS server is online

### I'm not seeing my position on aprs.fi

Common issues:
1. **No IGate coverage** in your area
   - Solution: Set up an IGate or use APRS-IS directly

2. **Wrong frequency**
   - Check your country's APRS frequency

3. **Incorrect path settings**
   - Use: `WIDE1-1,WIDE2-1`

4. **Antenna issues**
   - Check connections and SWR

5. **Low power**
   - Increase transmit power if possible

### How often should I beacon?

**Smart beaconing recommended:**
- Stopped: Every 30 minutes
- Slow movement: Every 10-15 minutes
- Highway speed: Every 1-2 minutes
- Turn > 30°: Immediate beacon

**Never:**
- Faster than every 10 seconds
- Use WIDE3-3 or higher paths
- Beacon when not needed

### Why is my battery draining quickly?

Tips to reduce power consumption:
1. Increase beacon interval
2. Lower transmit power (if range allows)
3. Use smart beaconing
4. Turn off unnecessary features
5. Use GPS power save mode

---

## Privacy and Legal

### Is my position information public?

**Yes.** All APRS data is public:
- Position reports
- Messages (unless using APRS encryption, which is rare)
- Weather data
- Telemetry

This is by design - amateur radio is an open service.

### Can I hide my location?

**No**, if you're transmitting APRS. Options:
1. Don't transmit position reports
2. Use receive-only mode
3. Don't use APRS for privacy-sensitive applications

### Is APRS legal worldwide?

APRS itself is legal, but:
- You need an amateur radio license
- Frequency allocations vary by country
- Some countries restrict certain APRS uses
- Check your local regulations

### Can I use APRS for commercial purposes?

**No.** Amateur radio is for:
- Personal wireless communications
- Technical investigations
- Emergency communications
- **NOT** for business or commercial use

---

## Application-Specific Questions

### Does this app store my callsign?

**No.** This application:
- Runs entirely in your browser
- Doesn't send data to any server
- Doesn't store or log any information
- Doesn't use cookies or tracking
- Is completely client-side

### Can I use this offline?

**Yes!** After loading the page once:
- The app works offline
- Passcode generation is client-side
- No internet connection needed for generation

### What languages are supported?

Currently 10 languages:
- 🇬🇧 English
- 🇪🇸 Spanish (Español)
- 🇨🇳 Chinese (中文)
- 🇮🇳 Hindi (हिन्दी)
- 🇸🇦 Arabic (العربية)
- 🇧🇷 Portuguese (Português)
- 🇧🇩 Bengali (বাংলা)
- 🇷🇺 Russian (Русский)
- 🇯🇵 Japanese (日本語)
- 🇫🇷 French (Français)

### Can I contribute a translation?

**Yes!** See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Is this app open source?

**Yes!** Licensed under MIT:
- Source code on [GitHub](https://github.com/carrilloapps/web-aprs-passcode)
- Free to use, modify, and distribute
- Contributions welcome

---

## Emergency Use

### Can I use APRS in emergencies?

**Yes!** APRS is excellent for emergencies:
- Track emergency personnel
- Report damage and needs
- Coordinate resources
- Send messages when other systems fail

### What are APRS emergency frequencies?

Use your region's standard APRS frequency:
- Don't change frequencies during emergencies
- Everyone monitors the standard frequency
- Consistency is critical for coordination

### How do I send an emergency beacon?

Most APRS software has an emergency button that:
1. Sends high-priority beacon
2. Includes "EMERGENCY" in the message
3. May increase beacon rate
4. Alerts nearby stations

Format: Status message starting with "EMERGENCY:"

### What emergency information can APRS transmit?

- Current position
- Status updates
- Resource requests
- Shelter locations
- Damage reports
- Personnel tracking
- Weather conditions

---

## Getting Help

### Where can I get more help?

- **Documentation:** [docs/APRS-GUIDE.md](docs/APRS-GUIDE.md)
- **Technical Specs:** [docs/TECHNICAL-SPECS.md](docs/TECHNICAL-SPECS.md)
- **Resources:** [docs/RESOURCES.md](docs/RESOURCES.md)
- **Issues:** [GitHub Issues](https://github.com/carrilloapps/web-aprs-passcode/issues)

### Community Resources

- **[aprs.org](http://www.aprs.org)** - Official APRS site
- **[aprs.fi](https://aprs.fi)** - Global tracking
- **[Reddit /r/amateurradio](https://reddit.com/r/amateurradio)** - Community
- **Local ham radio clubs** - In-person help

### Who maintains this application?

**José Carrillo** (jose.carrillo@yummysuperapp.com)
- Tech Lead, Financial Backoffice @ Yummy Inc.
- Amateur radio enthusiast
- Open source contributor

Based on the original work by **DO3SWW**.

---

## Contributing

### How can I help?

See [CONTRIBUTING.md](CONTRIBUTING.md) for:
- Bug reports
- Feature requests
- Code contributions
- Documentation improvements
- Translations

### I found a bug!

Please [open an issue](https://github.com/carrilloapps/web-aprs-passcode/issues) with:
- Description of the bug
- Steps to reproduce
- Expected behavior
- Screenshots (if applicable)

---

**Last Updated:** December 2025

*Didn't find your question? [Open an issue](https://github.com/carrilloapps/web-aprs-passcode/issues) and ask!*
