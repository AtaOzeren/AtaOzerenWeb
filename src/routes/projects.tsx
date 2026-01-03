import { Component } from "solid-js";
import { Title } from "@solidjs/meta";
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
          <div class="text-center mb-12">
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {t('projects.title')}
            </h1>
            <p class="text-lg text-white/60 max-w-2xl mx-auto">
              {t('projects.subtitle')}
            </p>
          </div>

          {/* Project Categories */}
          <ProjectCategories />
        </div>
      </main>
    </>
  );
};

export default Projects;
