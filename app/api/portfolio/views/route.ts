import { NextResponse } from 'next/server';
import { getDbData, saveDbData } from '@/lib/db';

export async function GET() {
  try {
    const data = getDbData();
    const count = data.views?.count || 0;
    return NextResponse.json({ count });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve views' }, { status: 500 });
  }
}

export async function POST() {
  try {
    const data = getDbData();
    const currentCount = data.views?.count || 0;
    data.views = { count: currentCount + 1 };
    saveDbData(data);
    return NextResponse.json({ count: data.views.count, success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to record view' }, { status: 500 });
  }
}
