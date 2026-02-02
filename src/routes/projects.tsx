import { Component } from "solid-js";
import { Title, Meta } from "@solidjs/meta";
import { THEME } from "../constants";
import { useI18n } from "../contexts/I18nContext";
import Navbar from "../components/Navbar";
import AnimatedBackground from "../components/AnimatedBackground";
import ProjectCategories from "../components/ProjectCategories";

const Projects: Component = () => {
  const { t } = useI18n();

  return (
    <>
      {/* Page Title */}
      <Title>{t('projects.title')} - {t('hero.name')}</Title>
      <Meta name="description" content="Explore my portfolio of web development projects, including personal and professional work." />
      <Meta property="og:title" content={`${t('projects.title')} - ${t('hero.name')}`} />
      <Meta property="og:description" content="Explore my portfolio of web development projects, including personal and professional work." />

      {/* Navbar */}
      <Navbar />

      {/* Projects Page Content */}
      <main class="min-h-screen relative overflow-hidden">
        {/* Animated Background */}
        <AnimatedBackground variant="dark" intensity="high" />

        {/* Content overlay */}
        <div
          class={`relative z-10 min-h-screen ${THEME.spacing.containerPadding} pt-24 pb-12`}
        >
          {/* Page Header */}


          {/* Project Categories */}
          <ProjectCategories />
        </div>
      </main>
    </>
  );
};

export default Projects;
