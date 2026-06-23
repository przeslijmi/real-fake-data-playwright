/**
 * A stable 32-bit FNV-1a hash of a string, returned as an unsigned integer.
 * Used to derive a per-test base seed from the test title so that, absent an
 * explicit seed, each test still gets reproducible-but-distinct data.
 */
export const hashString = (value: string): number => {
  let hash = 2_166_136_261;
  for (const character of value) {
    hash ^= character.codePointAt(0) ?? 0;
    hash = Math.imul(hash, 16_777_619);
  }
  return hash >>> 0;
};
