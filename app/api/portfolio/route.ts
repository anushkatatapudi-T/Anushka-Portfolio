import { NextResponse } from 'next/server';
import { getDbData } from '@/lib/db';

export async function GET() {
  try {
    const data = getDbData();
    // Return published items for public consumption
    const publicData = {
      ...data,
      projects: data.projects.filter(p => p.status === 'published').sort((a, b) => a.order - b.order),
      skills: data.skills.filter(s => s.visible).sort((a, b) => a.order - b.order),
      certificates: data.certificates.filter(c => c.status === 'published'),
      achievements: data.achievements.filter(a => a.status === 'published'),
      gallery: data.gallery.filter(g => g.visible),
      education: data.education.sort((a, b) => a.order - b.order),
      experience: data.experience.sort((a, b) => a.order - b.order),
    };
    return NextResponse.json(publicData);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read portfolio data' }, { status: 500 });
  }
}
