"use client";

import { AnimatePresence, motion } from "framer-motion";

import { useState } from "react";
import { ThemeProvider } from "./components/ThemeProvider";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { HomePage } from "./components/HomePage";
import { NLPPage } from "./components/NLPPage";
import { OCRPage } from "./components/OCRPage";

function AppContent() {
  const [currentPage, setCurrentPage] = useState<"home" | "nlp" | "ocr">("home");

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-500">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />

      <main className="flex-1 pb-20 sm:pb-24">
        <AnimatePresence mode="wait">
          {currentPage === "home" && (
            <motion.div
              key="home"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <HomePage onGetStarted={() => setCurrentPage("nlp")} />
            </motion.div>
          )}

          {currentPage === "nlp" && (
            <motion.div
              key="nlp"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <NLPPage />
            </motion.div>
          )}

          {currentPage === "ocr" && (
            <motion.div
              key="ocr"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <OCRPage />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer currentPage={currentPage} onNavigate={setCurrentPage} />
    </div>
  );
}

export default function Home() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
