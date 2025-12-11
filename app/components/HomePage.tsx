"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Zap, Brain, Scan, Sparkles, ChevronRight } from 'lucide-react';

interface HomePageProps {
  onGetStarted: () => void;
}

export function HomePage({ onGetStarted }: HomePageProps) {
  const features = [
    {
      icon: Brain,
      title: 'Natural Language Processing',
      description: 'Advanced Khmer language processing with intelligent segmentation and semantic understanding.',
      gradient: 'from-blue-500 to-cyan-500',
      delay: 0.1
    },
    {
      icon: Scan,
      title: 'Optical Character Recognition',
      description: 'Extract text from Cambodian documents with high accuracy and reliability.',
      gradient: 'from-violet-500 to-purple-500',
      delay: 0.2
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Process thousands of documents in seconds with our optimized AI engine.',
      gradient: 'from-amber-500 to-orange-500',
      delay: 0.3
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <div className="relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/20 dark:bg-blue-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 50, 0],
            y: [0, 30, 0]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-400/20 dark:bg-cyan-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, -50, 0],
            y: [0, -30, 0]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 lg:pt-32 pb-16 sm:pb-20">
        <motion.div 
          className="text-center max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 dark:from-blue-500/20 dark:to-cyan-500/20 border border-blue-500/20 dark:border-blue-400/30 backdrop-blur-xl mb-8"
          >
            <motion.span 
              className="w-2 h-2 bg-blue-500 dark:bg-cyan-400 rounded-full"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm text-blue-700 dark:text-cyan-300">Powered by Advanced AI</span>
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-7xl text-slate-900 dark:text-white mb-6 tracking-tight"
          >
            Khmer AI Solutions
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 dark:from-blue-400 dark:via-cyan-300 dark:to-blue-400 bg-clip-text text-transparent">
              Built for the Future
            </span>
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Unlock the power of artificial intelligence for Khmer language processing and document recognition. Transform your workflow with cutting-edge technology.
          </motion.p>

          <motion.div variants={itemVariants}>
            <motion.button
              onClick={onGetStarted}
              className="group relative inline-flex items-center gap-3 px-8 py-4 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-500 dark:to-cyan-400 text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-500"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10 text-lg">Get Started</span>
              <motion.div
                className="relative z-10"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
              
              {/* Glow effect */}
              <div className="absolute inset-0 -z-10 blur-2xl bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-500 dark:to-cyan-400 opacity-50 group-hover:opacity-75 transition-opacity" />
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative"
            >
              {/* Gradient glow on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
              
              <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-8 border border-slate-200/60 dark:border-slate-700/60 overflow-hidden flex flex-col items-center text-center">
                {/* Icon with gradient background */}
                <div className="relative mb-6 flex justify-center">
                  <motion.div 
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center`}
                    whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <feature.icon className="w-7 h-7 text-white" strokeWidth={2} />
                  </motion.div>
                </div>

                <h3 className="text-xl text-slate-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {feature.description}
                </p>

                {/* Learn more link */}
                <motion.div 
                  className="flex items-center gap-2 text-sm text-blue-600 dark:text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={{ x: -10 }}
                  whileHover={{ x: 0 }}
                >
                  <span>Learn more</span>
                  <ChevronRight className="w-4 h-4" />
                </motion.div>

                {/* Decorative corner element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/5 to-transparent dark:from-blue-400/10 rounded-bl-full" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
