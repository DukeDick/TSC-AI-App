"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Home, FileText, ScanText } from 'lucide-react';

interface FooterProps {
  currentPage: 'home' | 'nlp' | 'ocr';
  onNavigate: (page: 'home' | 'nlp' | 'ocr') => void;
}

export function Footer({ currentPage, onNavigate }: FooterProps) {
  const navItems = [
    { id: 'home' as const, label: 'Home', icon: Home },
    { id: 'nlp' as const, label: 'NLP', icon: FileText },
    { id: 'ocr' as const, label: 'OCR', icon: ScanText },
  ];

  return (
    <motion.footer 
      className="fixed bottom-0 left-0 right-0 z-50 backdrop-blur-2xl bg-white/80 dark:bg-slate-900/90 border-t border-slate-200/60 dark:border-slate-700/60 transition-colors duration-500 safe-area-inset-bottom"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Animated gradient line at top */}
      <motion.div 
        className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 opacity-50"
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

      <div className="max-w-md mx-auto px-4">
        <nav className="flex items-center justify-center gap-4 h-16 sm:h-20">
          {navItems.map((item, index) => {
            const isActive = currentPage === item.id;
            const Icon = item.icon;
            
            return (
              <motion.button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="relative flex flex-col items-center justify-center gap-1.5 px-6 py-2 min-w-[80px]"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.4 }}
              >
                {/* Glow effect on active */}
                {isActive && (
                  <>
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/20 via-cyan-400/20 to-purple-500/20 blur-xl"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5]
                      }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 rounded-full shadow-lg shadow-blue-500/50"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  </>
                )}

                {/* Icon container */}
                <motion.div
                  animate={{
                    y: isActive ? -3 : 0,
                    scale: isActive ? 1.15 : 1
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="relative"
                >
                  {/* Icon background */}
                  <div className={`absolute inset-0 rounded-xl transition-all duration-300 ${
                    isActive 
                      ? 'bg-gradient-to-br from-blue-500 via-cyan-400 to-purple-500 blur-md opacity-60' 
                      : 'bg-transparent'
                  }`} />
                  
                  <div className={`relative p-2.5 rounded-xl transition-all duration-300 ${
                    isActive 
                      ? 'bg-gradient-to-br from-blue-500 via-cyan-400 to-purple-500 shadow-lg shadow-blue-500/30' 
                      : 'bg-slate-100/50 dark:bg-slate-800/50'
                  }`}>
                    <Icon 
                      className={`w-5 h-5 transition-colors ${
                        isActive 
                          ? 'text-white' 
                          : 'text-slate-600 dark:text-slate-400'
                      }`}
                      strokeWidth={isActive ? 2.5 : 2}
                    />
                  </div>
                </motion.div>
                
                {/* Label */}
                <motion.span 
                  animate={{
                    opacity: isActive ? 1 : 0.7,
                    y: isActive ? -2 : 0,
                    fontWeight: isActive ? 600 : 500
                  }}
                  className={`text-xs transition-colors ${
                    isActive 
                      ? 'text-blue-600 dark:text-cyan-400' 
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {item.label}
                </motion.span>

                {/* Hover particles effect */}
                {!isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity pointer-events-none"
                    whileHover={{
                      background: [
                        'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
                        'radial-gradient(circle at 50% 50%, rgba(34, 211, 238, 0.1) 0%, transparent 50%)',
                        'radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)',
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.button>
            );
          })}
        </nav>
      </div>

      {/* Ambient particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 opacity-30"
            style={{
              left: `${20 + i * 30}%`,
              bottom: '50%',
            }}
            animate={{
              y: [-20, -40, -20],
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </motion.footer>
  );
}