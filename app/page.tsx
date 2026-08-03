import About from "@/components/About";
import AdminAccessButton from "@/components/AdminAccessButton";
import ContactSection, {
  type ContactSectionContent,
} from "@/components/ContactSection";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import LatestJournal from "@/components/LatestJournal";
import Portfolio from "@/components/Portfolio";
import Process from "@/components/Process";
import Reveal from "@/components/Reveal";
import Service from "@/components/Service";
import SiteFooter from "@/components/SiteFooter";

import {
  getCmsCategories,
  getCmsProjects,
} from "@/lib/portfolio-data";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();

  const [
    cmsProjects,
    cmsCategories,
    contactSectionResult,
  ] = await Promise.all([
    getCmsProjects(),
    getCmsCategories(),
    supabase
      .from("homepage_sections")
      .select("content, is_active")
      .eq("section_key", "contact")
      .maybeSingle(),
  ]);

  if (contactSectionResult.error) {
    console.error(
      "Contact CMS 데이터를 불러오지 못했습니다.",
      contactSectionResult.error,
    );
  }

  const contactSection =
    contactSectionResult.data;

  const contactContent =
    (contactSection?.content ??
      {}) as ContactSectionContent;

  return (
    <>
      <Header />
      <AdminAccessButton />

      <main className="min-h-screen bg-[var(--cream)] text-[var(--text)]">
        <Hero />

        <Reveal>
          <Service />
        </Reveal>

        <Reveal>
          <Portfolio
            cmsProjects={cmsProjects}
            cmsCategories={cmsCategories}
          />
        </Reveal>

        <Reveal>
          <LatestJournal />
        </Reveal>

        <Reveal>
          <About />
        </Reveal>

        <Reveal>
          <Process />
        </Reveal>

        {contactSection?.is_active !==
          false && (
          <Reveal>
            <ContactSection
              content={contactContent}
            />
          </Reveal>
        )}
      </main>

      <Reveal>
        <SiteFooter />
      </Reveal>
    </>
  );
}