"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import Image from "next/image";
import Logo from "../Image/logo.png";


interface HeaderProps {
  currentPage: 'home' | 'nlp' | 'ocr';
  onNavigate: (page: 'home' | 'nlp' | 'ocr') => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border-b border-slate-200/60 dark:border-slate-700/60 transition-colors duration-500"
    >
      {/* Animated gradient line at bottom */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 opacity-50"
        animate={{
          background: [
            'linear-gradient(90deg, rgb(59, 130, 246) 0%, rgb(34, 211, 238) 50%, rgb(168, 85, 247) 100%)',
            'linear-gradient(90deg, rgb(168, 85, 247) 0%, rgb(59, 130, 246) 50%, rgb(34, 211, 238) 100%)',
            'linear-gradient(90deg, rgb(34, 211, 238) 0%, rgb(168, 85, 247) 50%, rgb(59, 130, 246) 100%)',
            'linear-gradient(90deg, rgb(59, 130, 246) 0%, rgb(34, 211, 238) 50%, rgb(168, 85, 247) 100%)',
          ]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo and Title */}
          <motion.div 
            className="flex items-center gap-3 sm:gap-4 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate('home')}
          >
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-2xl overflow-hidden bg-white shadow-lg shadow-blue-500/10 border border-slate-200/70">
              <Image 
                src={Logo} 
                alt="Techo Startup Center" 
                className="object-contain w-full h-full"
                priority
              />
            </div>

            <div className="relative w-10 h-10 sm:w-12 sm:h-12">
              {/* Animated glow */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-tr from-blue-500 via-cyan-400 to-purple-500 rounded-2xl blur-lg opacity-60"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.6, 0.8, 0.6],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="relative w-full h-full bg-gradient-to-tr from-blue-500 via-cyan-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={2.5} />
                </motion.div>
              </div>
            </div>
            <div>
              <motion.h1 
                className="text-base sm:text-lg text-slate-900 dark:text-white transition-colors leading-tight bg-clip-text"
                whileHover={{
                  backgroundImage: 'linear-gradient(90deg, rgb(59, 130, 246), rgb(34, 211, 238), rgb(168, 85, 247))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Techo Startup Center AI
              </motion.h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                Khmer AI Innovation
              </p>
            </div>
          </motion.div>

          {/* Theme Toggle */}
          <motion.button
            onClick={toggleTheme}
            className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden group shadow-lg"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-tr from-amber-400/0 via-amber-400/0 to-amber-400/0 dark:from-blue-400/0 dark:via-cyan-400/0 dark:to-blue-400/0 group-hover:from-amber-400/20 group-hover:via-amber-400/10 group-hover:to-amber-400/20 dark:group-hover:from-blue-400/20 dark:group-hover:via-cyan-400/10 dark:group-hover:to-blue-400/20 transition-all duration-300"
            />

            <motion.div
              initial={false}
              animate={{ 
                rotate: theme === 'dark' ? 180 : 0,
                scale: theme === 'dark' ? 1 : 0.8
              }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {theme === 'dark' ? (
                <motion.div
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Moon className="w-5 h-5 text-slate-300" />
                </motion.div>
              ) : (
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                  }}
                >
                  <Sun className="w-5 h-5 text-amber-500" />
                </motion.div>
              )}
            </motion.div>

            {/* Particles on hover */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 dark:from-blue-400 dark:to-cyan-400 opacity-0 group-hover:opacity-70"
                  style={{
                    left: `${30 + i * 20}%`,
                    top: `${30 + i * 20}%`,
                  }}
                  animate={{
                    y: [-5, -15, -5],
                    x: [0, 5 * (i - 1), 0],
                    opacity: [0, 0.7, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
}
