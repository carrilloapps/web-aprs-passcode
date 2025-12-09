import { generateAprsPasscode } from './aprs';

describe('generateAprsPasscode', () => {
  it('should generate correct passcode for valid callsign', () => {
    const passcode = generateAprsPasscode('N0CALL');
    expect(passcode).toBe(13023);
  });

  it('should generate correct passcode for another valid callsign', () => {
    const passcode = generateAprsPasscode('TEST');
    expect(passcode).toBe(29939);
  });

  it('should generate correct passcode for callsign with dash', () => {
    const passcode = generateAprsPasscode('N0CALL-1');
    expect(passcode).toBe(8174);
  });

  it('should handle lowercase callsign', () => {
    const passcode = generateAprsPasscode('n0call');
    expect(passcode).toBe(13023);
  });

  it('should handle callsign with leading/trailing spaces', () => {
    const passcode = generateAprsPasscode('  N0CALL  ');
    expect(passcode).toBe(13023);
  });

  it('should return null for invalid callsign with special characters', () => {
    const passcode = generateAprsPasscode('N0@CALL');
    expect(passcode).toBeNull();
  });

  it('should return null for invalid callsign with spaces', () => {
    const passcode = generateAprsPasscode('N0 CALL');
    expect(passcode).toBeNull();
  });

  it('should return null for empty callsign', () => {
    const passcode = generateAprsPasscode('');
    expect(passcode).toBeNull();
  });

  it('should generate passcode for single character', () => {
    const passcode = generateAprsPasscode('A');
    expect(passcode).toBe(13026);
  });

  it('should generate passcode for odd length callsign', () => {
    const passcode = generateAprsPasscode('ABC');
    expect(passcode).toBe(29088);
  });

  it('should handle numeric callsigns', () => {
    const passcode = generateAprsPasscode('123');
    expect(passcode).toBe(29136);
  });

  it('should return null for callsign with underscore', () => {
    const passcode = generateAprsPasscode('N0_CALL');
    expect(passcode).toBeNull();
  });

  it('should return null for callsign with period', () => {
    const passcode = generateAprsPasscode('N0.CALL');
    expect(passcode).toBeNull();
  });
});
