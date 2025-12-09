/**
 * Generates APRS-IS passcode for a given callsign
 * @param callsign - Amateur radio callsign
 * @returns The generated passcode or null if invalid
 */
export function generateAprsPasscode(callsign: string): number | null {
  const cleanCallsign = callsign.trim().toUpperCase();

  if (!/^[A-Z0-9-]+$/.test(cleanCallsign)) {
    return null;
  }

  let tmpCode = 29666;
  let i = 0;

  while (i < cleanCallsign.length) {
    tmpCode = tmpCode ^ (cleanCallsign.charCodeAt(i) * 256);
    tmpCode = tmpCode ^ cleanCallsign.charCodeAt(i + 1);
    i += 2;
  }

  tmpCode = tmpCode & 32767;

  return tmpCode;
}
