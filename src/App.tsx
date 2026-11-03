import { useState, useEffect, useCallback } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { SelectedWorks } from "./components/SelectedWorks";
import { Practice } from "./components/Practice";
import { Manifesto } from "./components/Manifesto";
import { ResearchLab } from "./components/ResearchLab";
import { Resources } from "./components/Resources";
import { Footer } from "./components/Footer";
import { ProjectBlueprintModal } from "./components/ProjectBlueprintModal";
import { CommissionModal } from "./components/CommissionModal";
import { useTheme } from "./lib/useTheme";

export default function App() {
  const { theme, toggle } = useTheme();
  const [activeProjectSlug, setActiveProjectSlug] = useState<string | null>(null);
  const [isCommissionOpen, setIsCommissionOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash && hash.startsWith("#project-")) {
        setActiveProjectSlug(hash.replace("#project-", ""));
        setIsCommissionOpen(false);
      } else if (hash === "#rfp" || hash === "#commission") {
        setIsCommissionOpen(true);
        setActiveProjectSlug(null);
      } else {
        setActiveProjectSlug(null);
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleCloseProjectModal = useCallback(() => {
    setActiveProjectSlug(null);
    if (window.location.hash.startsWith("#project-")) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  }, []);

  const handleOpenCommission = useCallback(() => {
    setActiveProjectSlug(null);
    setIsCommissionOpen(true);
  }, []);

  const handleCloseCommission = useCallback(() => {
    setIsCommissionOpen(false);
    if (window.location.hash === "#rfp" || window.location.hash === "#commission") {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  }, []);

  return (
    <>
      <Navbar
        theme={theme}
        onToggleTheme={toggle}
        onOpenCommission={handleOpenCommission}
      />
      <main>
        <Hero />
        <SelectedWorks />
        <Practice onOpenCommission={handleOpenCommission} />
        <Manifesto />
        <ResearchLab />
        <Resources />
      </main>
      <Footer onOpenCommission={handleOpenCommission} />
      <ProjectBlueprintModal
        projectSlug={activeProjectSlug}
        onClose={handleCloseProjectModal}
      />
      <CommissionModal
        isOpen={isCommissionOpen}
        onClose={handleCloseCommission}
      />
    </>
  );
}
