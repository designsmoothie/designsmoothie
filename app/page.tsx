import About from "@/components/About";
import AdminAccessButton from "@/components/AdminAccessButton";
import ContactSection, {
  type ContactSectionContent,
} from "@/components/ContactSection";
import Header from "@/components/Header";
import Hero, {
  type HeroContent,
} from "@/components/Hero";
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
    heroSectionResult,
    contactSectionResult,
  ] = await Promise.all([
    getCmsProjects(),
    getCmsCategories(),

    supabase
      .from("homepage_sections")
      .select("content, is_active")
      .eq("section_key", "hero")
      .maybeSingle(),

    supabase
      .from("homepage_sections")
      .select("content, is_active")
      .eq("section_key", "contact")
      .maybeSingle(),
  ]);

  if (heroSectionResult.error) {
    console.error(
      "Hero CMS 데이터를 불러오지 못했습니다.",
      heroSectionResult.error,
    );
  }

  if (contactSectionResult.error) {
    console.error(
      "Contact CMS 데이터를 불러오지 못했습니다.",
      contactSectionResult.error,
    );
  }

  const heroSection = heroSectionResult.data;

  const heroContent =
    (heroSection?.content ?? {}) as HeroContent;

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
        {heroSection?.is_active !== false && (
          <Hero content={heroContent} />
        )}

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