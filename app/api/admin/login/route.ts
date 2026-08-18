import { NextResponse } from 'next/server';
import { verifyAdminPassword, createAdminToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    if (!password || !verifyAdminPassword(password)) {
      return NextResponse.json({ error: 'Invalid administrator password' }, { status: 401 });
    }

    const token = createAdminToken();
    const response = NextResponse.json({ success: true, message: 'Authentication successful' });
    
    // Set HTTP-only secure session cookie
    response.cookies.set({
      name: 'admin_session',
      value: token,
      httpOnly: true,
      path: '/',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}
