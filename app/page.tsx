import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Certificates from '@/components/Certificates';
import Achievements from '@/components/Achievements';
import Experience from '@/components/Experience';
import Gallery from '@/components/Gallery';
import Education from '@/components/Education';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { getDbData } from '@/lib/db';

export const revalidate = 0; // Dynamic rendering for real-time admin update reflection

export default function Home() {
  const data = getDbData();

  // Filter published items
  const publicData = {
    ...data,
    projects: data.projects.filter((p) => p.status === 'published').sort((a, b) => a.order - b.order),
    skills: data.skills.filter((s) => s.visible).sort((a, b) => a.order - b.order),
    certificates: data.certificates.filter((c) => c.status === 'published'),
    achievements: data.achievements.filter((a) => a.status === 'published'),
    gallery: data.gallery.filter((g) => g.visible),
    education: data.education.sort((a, b) => a.order - b.order),
    experience: data.experience.sort((a, b) => a.order - b.order),
  };

  return (
    <main className="min-h-screen bg-dark-bg text-gray-100 selection:bg-brand-500 selection:text-white">
      <Navbar />
      <Hero about={publicData.about} socials={publicData.socials} />
      <About about={publicData.about} />
      <Skills skills={publicData.skills} />
      <Projects projects={publicData.projects} />
      <Certificates certificates={publicData.certificates} />
      <Achievements achievements={publicData.achievements} />
      <Experience experience={publicData.experience} />
      <Gallery gallery={publicData.gallery} />
      <Education education={publicData.education} />
      <Contact socials={publicData.socials} />
      <Footer />
    </main>
  );
}
