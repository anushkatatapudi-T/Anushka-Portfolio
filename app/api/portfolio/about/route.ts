import { NextResponse } from 'next/server';
import { getDbData, saveDbData } from '@/lib/db';
import { isAuthorized } from '@/lib/auth';

export async function GET() {
  const data = getDbData();
  return NextResponse.json(data.about);
}

export async function PUT(request: Request) {
  if (!isAuthorized()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const updatedAbout = await request.json();
  const data = getDbData();
  data.about = { ...data.about, ...updatedAbout };
  saveDbData(data);
  return NextResponse.json(data.about);
}
