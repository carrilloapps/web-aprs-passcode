# Security Policy

## Supported Versions

We release patches for security vulnerabilities for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 2.0.x   | :white_check_mark: |
| < 2.0   | :x:                |

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them via email to:

**jose.carrillo@yummysuperapp.com**

### What to Include

Please include the following information:

- **Description** of the vulnerability
- **Steps to reproduce** the issue
- **Potential impact** of the vulnerability
- **Affected versions** (if known)
- **Suggested fix** (if you have one)
- **Your contact information** for follow-up

### Response Timeline

- **Initial Response:** Within 48 hours
- **Assessment:** Within 7 days
- **Fix Development:** Depends on severity
- **Patch Release:** As soon as possible after fix

### Severity Levels

We classify vulnerabilities using the following severity levels:

#### Critical
- Remote code execution
- Authentication bypass
- Data exposure of sensitive information

**Response Time:** Patch within 24-48 hours

#### High
- Cross-site scripting (XSS)
- SQL injection (if applicable)
- Significant data leakage

**Response Time:** Patch within 7 days

#### Medium
- Minor information disclosure
- Denial of service
- CSRF vulnerabilities

**Response Time:** Patch within 30 days

#### Low
- Minor issues with limited impact
- Best practice violations

**Response Time:** Patch in next regular release

## Security Best Practices

### For Users

1. **Keep Updated:** Always use the latest version
2. **HTTPS Only:** Access the application via HTTPS
3. **Browser Security:** Keep your browser up to date
4. **Callsign Privacy:** Your callsign is public information via amateur radio

### For Developers

1. **Dependencies:** Keep all dependencies updated
2. **Input Validation:** Validate all user inputs
3. **Authentication:** APRS-IS passcode is for validation only
4. **HTTPS:** Always use HTTPS in production
5. **Security Headers:** Implement proper security headers

## Known Security Considerations

### APRS-IS Passcode

The APRS-IS passcode is **NOT** a security mechanism:

- It validates your amateur radio license
- It does not provide encryption
- It's easily generated from your callsign
- Amateur radio transmissions are public

**This is by design** - amateur radio operates on the principle of open communication.

### Data Privacy

- **No personal data collected:** We don't store user information
- **Client-side processing:** Passcode generation happens in your browser
- **No analytics:** No tracking or analytics by default
- **Open source:** All code is publicly auditable

## Disclosure Policy

When we receive a security report:

1. **Confirm** the vulnerability
2. **Develop** a fix
3. **Test** the fix thoroughly
4. **Release** a patched version
5. **Announce** the vulnerability (after patch is available)
6. **Credit** the reporter (if desired)

### Public Disclosure

- We will publicly disclose vulnerabilities **after** a patch is released
- Critical vulnerabilities will be disclosed in security advisories
- Credit will be given to reporters (unless anonymous disclosure is requested)

## Security Updates

Security updates are released as:

- **Patch versions** (2.0.x) for minor fixes
- **Minor versions** (2.x.0) for larger security improvements
- **Security advisories** on GitHub for critical issues

Subscribe to releases on GitHub to stay informed.

## Contact

For security concerns:
- **Email:** jose.carrillo@yummysuperapp.com
- **GitHub:** [@carrilloapps](https://github.com/carrilloapps)

For general questions:
- **GitHub Issues:** [Create an issue](https://github.com/carrilloapps/web-aprs-passcode/issues)

---

## Hall of Fame

We appreciate security researchers who responsibly disclose vulnerabilities:

*No vulnerabilities reported yet.*

---

**Last Updated:** December 2025
