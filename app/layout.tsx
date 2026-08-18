import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Tatapudi Anushka | Computer Science Student & Aspiring AI/ML Engineer',
  description: 'Personal Developer Portfolio of Tatapudi Anushka — Computer Science Engineering Student at St. Peter\'s Engineering College. Exploring Artificial Intelligence, Machine Learning, Python, and Web Development.',
  keywords: ['Tatapudi Anushka', 'Computer Science Engineer', 'AI ML Engineer', 'Software Developer', 'Portfolio', 'St Peters Engineering College'],
  authors: [{ name: 'Tatapudi Anushka' }],
  openGraph: {
    title: 'Tatapudi Anushka | Developer & Aspiring AI/ML Engineer',
    description: 'Explore the projects, certifications, achievements, and experiences of Tatapudi Anushka.',
    url: 'https://anushka-tatapudi.com',
    siteName: 'Tatapudi Anushka Portfolio',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-dark-bg text-gray-100 antialiased selection:bg-brand-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
