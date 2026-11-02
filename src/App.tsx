import { useState, useEffect, useCallback } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { SelectedWorks } from "./components/SelectedWorks";
import { Manifesto } from "./components/Manifesto";
import { ResearchLab } from "./components/ResearchLab";
import { Footer } from "./components/Footer";
import { ProjectBlueprintModal } from "./components/ProjectBlueprintModal";
import { useTheme } from "./lib/useTheme";

export default function App() {
  const { theme, toggle } = useTheme();
  const [activeProjectSlug, setActiveProjectSlug] = useState<string | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash && hash.startsWith("#project-")) {
        setActiveProjectSlug(hash.replace("#project-", ""));
      } else {
        setActiveProjectSlug(null);
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleCloseModal = useCallback(() => {
    setActiveProjectSlug(null);
    if (window.location.hash.startsWith("#project-")) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  }, []);

  return (
    <>
      <Navbar theme={theme} onToggleTheme={toggle} />
      <main>
        <Hero />
        <SelectedWorks />
        <Manifesto />
        <ResearchLab />
      </main>
      <Footer />
      <ProjectBlueprintModal
        projectSlug={activeProjectSlug}
        onClose={handleCloseModal}
      />
    </>
  );
}
