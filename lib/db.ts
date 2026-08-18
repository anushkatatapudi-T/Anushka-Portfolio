import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'db.json');

export interface PortfolioData {
  about: {
    name: string;
    title: string;
    shortBio: string;
    fullBio: string;
    profileImage: string;
    careerGoal: string;
    currentInterests: string[];
  };
  socials: {
    linkedin: string;
    github: string;
    email: string;
    resumeUrl: string;
  };
  projects: Array<{
    id: string;
    title: string;
    type: string;
    shortDescription: string;
    fullDescription: string;
    technologies: string[];
    image: string;
    liveUrl: string;
    githubUrl: string;
    contribution: string;
    features: string[];
    challenges: string[];
    learned: string[];
    status: 'published' | 'draft';
    order: number;
  }>;
  skills: Array<{
    id: string;
    name: string;
    category: string;
    icon: string;
    order: number;
    visible: boolean;
  }>;
  certificates: Array<{
    id: string;
    title: string;
    issuer: string;
    date: string;
    credentialId?: string;
    credentialUrl?: string;
    image: string;
    category: string;
    description: string;
    status: 'published' | 'draft';
  }>;
  achievements: Array<{
    id: string;
    title: string;
    event: string;
    organization: string;
    description: string;
    date: string;
    image: string;
    category: string;
    status: 'published' | 'draft';
  }>;
  gallery: Array<{
    id: string;
    title: string;
    category: string;
    image: string;
    caption: string;
    visible: boolean;
  }>;
  education: Array<{
    id: string;
    institution: string;
    degree: string;
    specialization: string;
    startYear: string;
    endYear: string;
    grade: string;
    description: string;
    order: number;
  }>;
  experience: Array<{
    id: string;
    organization: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
    responsibilities: string[];
    logo?: string;
    order: number;
  }>;
  messages?: Array<{
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    createdAt: string;
    read: boolean;
  }>;
  views?: {
    count: number;
  };
}

export function getDbData(): PortfolioData {
  if (!fs.existsSync(DB_PATH)) {
    throw new Error('Database file data/db.json not found!');
  }
  const content = fs.readFileSync(DB_PATH, 'utf-8');
  return JSON.parse(content);
}

export function saveDbData(data: PortfolioData): void {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
}
