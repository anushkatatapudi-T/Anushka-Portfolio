import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'anushka_portfolio_secret_key_2026_secure';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'anu@13229';

export function verifyAdminPassword(password: string): boolean {
  return password === ADMIN_PASSWORD || password === 'anu@13229';
}

export function createAdminToken(): string {
  return jwt.sign({ role: 'admin', user: 'anushka' }, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyAdminToken(token: string): boolean {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { role?: string };
    return decoded && decoded.role === 'admin';
  } catch {
    return false;
  }
}

export function isAuthorized(): boolean {
  const cookieStore = cookies();
  const token = cookieStore.get('admin_session')?.value;
  if (!token) return false;
  return verifyAdminToken(token);
}
