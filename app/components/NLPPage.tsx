"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from 'react';
import { Wand2, Loader2, ChevronDown } from 'lucide-react';;

type NLPFeature = 'segmentation' | 'normalization' | 'autoSuggestion' | 'semanticWords' | 'spellCheck' | 'spellHomophone';

export function NLPPage() {
  const [activeFeature, setActiveFeature] = useState<NLPFeature>('segmentation');
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const features: { id: NLPFeature; label: string; color: string }[] = [
    { id: 'segmentation', label: 'Segmentation', color: 'from-blue-500 to-cyan-500' },
    { id: 'normalization', label: 'Normalization', color: 'from-violet-500 to-purple-500' },
    { id: 'autoSuggestion', label: 'Auto Suggestion', color: 'from-pink-500 to-rose-500' },
    { id: 'semanticWords', label: 'Semantic Words', color: 'from-amber-500 to-orange-500' },
    { id: 'spellCheck', label: 'Spell Check', color: 'from-emerald-500 to-teal-500' },
    { id: 'spellHomophone', label: 'Spell Homophone', color: 'from-indigo-500 to-blue-500' },
  ];

  const handleProcess = async () => {
    setIsProcessing(true);
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    setOutputText(`Processed ${features.find(f => f.id === activeFeature)?.label}:\n\n${inputText}\n\n[Analysis results would appear here...]`);
    setIsProcessing(false);
  };

  const activeColor = features.find(f => f.id === activeFeature)?.color || 'from-blue-500 to-cyan-500';
  const activeFeatureLabel = features.find(f => f.id === activeFeature)?.label || 'Select Feature';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Header */}
      <motion.div 
        className="text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl sm:text-4xl text-slate-900 dark:text-white mb-3 tracking-tight">
          NLP Demonstration
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          Explore Khmer language processing capabilities
        </p>
      </motion.div>

      {/* Feature Dropdown */}
      <motion.div 
        className="mb-6 relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <motion.button
          onClick={() => setShowDropdown(!showDropdown)}
          className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl bg-gradient-to-r ${activeColor} text-white shadow-lg`}
          whileTap={{ scale: 0.98 }}
        >
          <span className="text-sm sm:text-base">{activeFeatureLabel}</span>
          <motion.div
            animate={{ rotate: showDropdown ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.button>

        <AnimatePresence>
          {showDropdown && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute z-50 w-full mt-2 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden backdrop-blur-2xl"
            >
              {features.map((feature, index) => (
                <motion.button
                  key={feature.id}
                  onClick={() => {
                    setActiveFeature(feature.id);
                    setShowDropdown(false);
                  }}
                  className="w-full px-5 py-3.5 text-left hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors border-b border-slate-100 dark:border-slate-700 last:border-0"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ x: 4 }}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${feature.color}`} />
                    <span className="text-sm text-slate-900 dark:text-white">{feature.label}</span>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Processing Card */}
      <motion.div 
        className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-2xl rounded-3xl border border-slate-200/60 dark:border-slate-700/60 p-4 sm:p-6 overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Decorative gradient */}
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${activeColor}`} />

        {/* Input/Output Panels */}
        <div className="space-y-4 mb-6">
          {/* Input Panel */}
          <motion.div 
            className="space-y-2"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <label className="block text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              Input Text
            </label>
            <div className="relative group">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter your Khmer text here..."
                className="w-full h-40 sm:h-48 px-4 py-3 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 dark:focus:border-cyan-400 transition-all duration-300 resize-none"
              />
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${activeColor} opacity-0 group-focus-within:opacity-10 blur-xl transition-opacity pointer-events-none`} />
            </div>
          </motion.div>

          {/* Output Panel */}
          <motion.div 
            className="space-y-2"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <label className="block text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              Output Result
            </label>
            <AnimatePresence mode="wait">
              <motion.div 
                key={outputText}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative w-full h-40 sm:h-48 px-4 py-3 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 overflow-auto"
              >
                <p className="text-sm text-slate-700 dark:text-slate-200 whitespace-pre-wrap">
                  {outputText || 'Results will appear here...'}
                </p>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Process Button */}
        <motion.button
          onClick={handleProcess}
          disabled={!inputText || isProcessing}
          className="relative w-full group overflow-hidden rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={inputText && !isProcessing ? { scale: 1.02 } : {}}
          whileTap={inputText && !isProcessing ? { scale: 0.98 } : {}}
        >
          <div className={`absolute inset-0 bg-gradient-to-r ${activeColor}`} />
          <div className={`absolute inset-0 bg-gradient-to-r ${activeColor} blur-xl opacity-50 group-hover:opacity-75 transition-opacity`} />
          
          <motion.div 
            className="relative px-6 py-3.5 flex items-center justify-center gap-3 text-white"
            animate={isProcessing ? { opacity: [1, 0.7, 1] } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="text-sm sm:text-base">Processing...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5" />
                <span className="text-sm sm:text-base">Process Text</span>
              </>
            )}
          </motion.div>
        </motion.button>
      </motion.div>
    </div>
  );
}