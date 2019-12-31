export function getValuesInEnum<T>(e: T): string[] {
  const values = [];
  const enumLen = Object.keys(e).length;
  let i = 0;

  for (const value in e) {
    i++;
    values.push(value);
    if (i === enumLen / 2) {
      break;
    }
  }
  return values;
}
