export  function generateUniqueOrderNumber(prefix: string = 'TAF'): string {
  const randomDigits = Math.floor(10000 + Math.random() * 90000);
  return `${prefix}-${randomDigits}`;
}