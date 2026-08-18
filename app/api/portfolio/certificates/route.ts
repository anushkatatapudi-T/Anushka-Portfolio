import { NextResponse } from 'next/server';
import { getDbData, saveDbData } from '@/lib/db';
import { isAuthorized } from '@/lib/auth';

export async function GET() {
  const data = getDbData();
  return NextResponse.json(data.certificates);
}

export async function POST(request: Request) {
  if (!isAuthorized()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const newItem = await request.json();
  const data = getDbData();
  newItem.id = newItem.id || `cert-${Date.now()}`;
  data.certificates.push(newItem);
  saveDbData(data);
  return NextResponse.json(newItem);
}

export async function PUT(request: Request) {
  if (!isAuthorized()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const updatedItem = await request.json();
  const data = getDbData();
  const index = data.certificates.findIndex(c => c.id === updatedItem.id);
  if (index === -1) return NextResponse.json({ error: 'Item not found' }, { status: 404 });
  data.certificates[index] = updatedItem;
  saveDbData(data);
  return NextResponse.json(updatedItem);
}

export async function DELETE(request: Request) {
  if (!isAuthorized()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
  const data = getDbData();
  data.certificates = data.certificates.filter(c => c.id !== id);
  saveDbData(data);
  return NextResponse.json({ success: true });
}
