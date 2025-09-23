import { Component, onMount, createSignal } from "solid-js";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { THEME } from "../constants";
import { useI18n } from "../contexts/I18nContext";
import Navbar from "../components/Navbar";
import AnimatedBackground from "../components/AnimatedBackground";
import WebProjectsShowcase from "../components/WebProjectsShowcase";
import AppShowcase from "../components/AppShowcase";

// GSAP plugin kayıt
gsap.registerPlugin(ScrollToPlugin);

// Animation configuration constants
const ANIMATIONS = {
  scrollArrow: {
    bounceDuration: 1.5,
    bounceEase: "power2.inOut",
    bounceY: -10,
    clickDuration: 0.9,
    clickEase: "power3.in",
    appearanceDuration: 1.2,
    appearanceEase: "power3.out",
  },
};

const Projects: Component = () => {
  const { t } = useI18n();
  const [showScrollArrow, setShowScrollArrow] = createSignal(false);

  /**
   * Start scroll arrow bounce animation
   */
  const startScrollArrowAnimation = () => {
    const arrowElement = document.querySelector(".scroll-arrow");
    if (!arrowElement) return;

    gsap.to(arrowElement, {
      y: ANIMATIONS.scrollArrow.bounceY,
      duration: ANIMATIONS.scrollArrow.bounceDuration,
      ease: ANIMATIONS.scrollArrow.bounceEase,
      yoyo: true,
      repeat: -1,
    });
  };

  /**
   * Handle scroll arrow click - currently disabled
   */
  const handleScrollArrowClick = () => {
    // Scroll functionality temporarily disabled
    // Will be implemented later
  };

  /**
   * Show scroll arrow after page load
   */
  const showScrollArrowWithDelay = () => {
    setTimeout(() => {
      setShowScrollArrow(true);
      // Animate arrow appearance with smooth entrance
      setTimeout(() => {
        const arrowElement = document.querySelector(".scroll-arrow");
        if (arrowElement) {
          gsap.fromTo(
            arrowElement,
            {
              opacity: 0,
              y: 40,
              scale: 0.5,
              rotationY: 180,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              rotationY: 0,
              duration: ANIMATIONS.scrollArrow.appearanceDuration,
              ease: ANIMATIONS.scrollArrow.appearanceEase,
            },
          );
        }
        // Start bounce animation after appearance
        setTimeout(
          startScrollArrowAnimation,
          ANIMATIONS.scrollArrow.appearanceDuration * 1000,
        );
      }, 100);
    }, 2000);
  };

  onMount(() => {
    // Show scroll arrow with delay
    showScrollArrowWithDelay();
  });

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Projects Page Content */}
      <main class="min-h-screen relative overflow-hidden">
        {/* Animated Background */}
        <AnimatedBackground variant="dark" intensity="high" />

        {/* Content overlay */}
        <div
          class={`relative z-10 flex items-center justify-center min-h-screen ${THEME.spacing.containerPadding} pt-20`}
        >
          <WebProjectsShowcase />
        </div>

        {/* Scroll Arrow - positioned after first section */}
        {showScrollArrow() && (
          <div class="scroll-arrow fixed bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer z-30 group">
            <div
              class="w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 shadow-xl hover:bg-white/20 hover:scale-110 transition-all duration-300 hover:border-white/50 relative"
              onClick={handleScrollArrowClick}
              title={t("projects.scrollToApps")}
            >
              <svg
                class="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>

              {/* Hover tooltip */}
              <div class="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-sm text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                {t("projects.continueReading")}
                <div class="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black/80"></div>
              </div>
            </div>
          </div>
        )}

        {/* Second Section - App Showcase */}
        <AppShowcase id="app-showcase" />
      </main>
    </>
  );
};

export default Projects;
