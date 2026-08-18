import { NextResponse } from 'next/server';
import { getDbData, saveDbData } from '@/lib/db';

export async function GET() {
  try {
    const data = getDbData();
    return NextResponse.json({ messages: data.messages || [] });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, read } = body;

    const data = getDbData();
    if (!data.messages) data.messages = [];

    const msg = data.messages.find((m) => m.id === id);
    if (!msg) {
      return NextResponse.json({ error: 'Message not found' }, { status: 404 });
    }

    if (typeof read === 'boolean') {
      msg.read = read;
    }

    saveDbData(data);
    return NextResponse.json({ success: true, messages: data.messages });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update message' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Message ID is required' }, { status: 400 });
    }

    const data = getDbData();
    if (!data.messages) data.messages = [];

    data.messages = data.messages.filter((m) => m.id !== id);
    saveDbData(data);

    return NextResponse.json({ success: true, messages: data.messages });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete message' }, { status: 500 });
  }
}
