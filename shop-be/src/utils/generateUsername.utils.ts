export function generateUsername(email: string): string {
  const base = email.split('@')[0];
  const random = Math.random().toString(36).substring(2, 8);
  return `${base}_${random}`;
}
