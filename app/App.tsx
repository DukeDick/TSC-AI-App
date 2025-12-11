"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { NLPPage } from './components/NLPPage';
import { OCRPage } from './components/OCRPage';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<'home' | 'nlp' | 'ocr'>('home');

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 dark:from-slate-950 dark:via-blue-950/20 dark:to-slate-900 transition-colors duration-500 relative overflow-hidden">
      {/* Floating orbs background - AI futuristic */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000,transparent)] pointer-events-none" />

      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      
      <main className="flex-1 pb-20 sm:pb-24 relative z-10">
        <AnimatePresence mode="wait">
          {currentPage === 'home' && (
            <motion.div
              key="home"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <HomePage onGetStarted={() => setCurrentPage('nlp')} />
            </motion.div>
          )}
          {currentPage === 'nlp' && (
            <motion.div
              key="nlp"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <NLPPage />
            </motion.div>
          )}
          {currentPage === 'ocr' && (
            <motion.div
              key="ocr"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
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

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}