import { NextResponse } from 'next/server';
import { getDbData, saveDbData } from '@/lib/db';
import { isAuthorized } from '@/lib/auth';

export async function GET() {
  const data = getDbData();
  return NextResponse.json(data.education);
}

export async function POST(request: Request) {
  if (!isAuthorized()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const newItem = await request.json();
  const data = getDbData();
  newItem.id = newItem.id || `edu-${Date.now()}`;
  data.education.push(newItem);
  saveDbData(data);
  return NextResponse.json(newItem);
}

export async function PUT(request: Request) {
  if (!isAuthorized()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const updatedItem = await request.json();
  const data = getDbData();
  const index = data.education.findIndex(e => e.id === updatedItem.id);
  if (index === -1) return NextResponse.json({ error: 'Item not found' }, { status: 404 });
  data.education[index] = updatedItem;
  saveDbData(data);
  return NextResponse.json(updatedItem);
}

export async function DELETE(request: Request) {
  if (!isAuthorized()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
  const data = getDbData();
  data.education = data.education.filter(e => e.id !== id);
  saveDbData(data);
  return NextResponse.json({ success: true });
}
