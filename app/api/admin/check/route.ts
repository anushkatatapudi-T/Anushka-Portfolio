import { NextResponse } from 'next/server';
import { isAuthorized } from '@/lib/auth';

export async function GET() {
  const authorized = isAuthorized();
  if (!authorized) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  return NextResponse.json({ authenticated: true });
}
