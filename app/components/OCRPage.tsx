"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from 'react';
import { Upload, CheckCircle2, AlertCircle, Info, X, FileImage, ChevronDown, HelpCircle, ListChecks } from 'lucide-react';

type OCRType = 'nationalID' | 'passport' | 'drivingV1' | 'drivingV2' | 'idDetection';

export function OCRPage() {
  const [activeType, setActiveType] = useState<OCRType>('nationalID');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [infoTab, setInfoTab] = useState<'capability' | 'limitation' | 'instructions'>('capability');
  const [showDropdown, setShowDropdown] = useState(false);

  const ocrTypes: { id: OCRType; label: string; gradient: string }[] = [
    { id: 'nationalID', label: 'National ID Card', gradient: 'from-blue-500 to-cyan-500' },
    { id: 'passport', label: 'International Passport', gradient: 'from-violet-500 to-purple-500' },
    { id: 'drivingV1', label: 'Driving License V1', gradient: 'from-pink-500 to-rose-500' },
    { id: 'drivingV2', label: 'Driving License V2', gradient: 'from-amber-500 to-orange-500' },
    { id: 'idDetection', label: 'ID Card Detection', gradient: 'from-emerald-500 to-teal-500' },
  ];

  const capabilities = [
    'High accuracy text extraction',
    'Multi-language support',
    'Structured data output',
    'Fast processing speed',
  ];

  const limitations = [
    'Requires clear image quality',
    'May struggle with damaged cards',
    'Best results with standard formats',
  ];

  const instructions = [
    'Select the document type',
    'Upload a clear image of your document',
    'Wait for the AI to process',
    'Review the extracted information',
  ];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const activeGradient = ocrTypes.find(t => t.id === activeType)?.gradient || 'from-blue-500 to-cyan-500';
  const activeTypeLabel = ocrTypes.find(t => t.id === activeType)?.label || 'Select Document Type';

  // Demonstration data for each document type
  const getDemonstrationContent = () => {
    switch (activeType) {
      case 'nationalID':
        return {
          outputType: 'data',
          outputData: [
            { label: 'Id Number', value: '051300721' },
            { label: 'First name in Khmer', value: 'សៀងហៃ', span: false },
            { label: 'Last name in Khmer', value: 'ធន', span: false },
            { label: 'First name in English', value: 'SEANGHAI', span: false },
            { label: 'Last name in English', value: 'THORN', span: false },
            { label: 'Gender', value: 'M', span: false },
            { label: 'Date of Birth', value: '10/12/1974', span: false },
            { label: 'Issued Date', value: '03/11/2015', span: false },
            { label: 'Expiry Date', value: '02/11/2025', span: false },
            { label: 'Address', value: 'ខ្សាច់ ផ្លូវ ៣០១ ភូមិផ្អែកព្រាល ស្រុកកណ្តាល ខេត្តកណ្តាល', span: true },
          ]
        };
      
      case 'passport':
        return {
          outputType: 'labels',
          outputData: [
            { label: 'Passport No', value: '' },
            { label: 'First name', value: '', span: false },
            { label: 'Last name', value: '', span: false },
            { label: 'Gender', value: '', span: false },
            { label: 'Date of Birth', value: '', span: false },
            { label: 'Nationality', value: '' },
            { label: 'Expiry Date', value: '' },
          ]
        };
      
      case 'drivingV1':
        return {
          outputType: 'labels',
          outputData: [
            { label: 'License Number', value: '' },
            { label: 'First name', value: '', span: false },
            { label: 'Last name', value: '', span: false },
            { label: 'Date of Birth', value: '', span: false },
            { label: 'Issue Date', value: '', span: false },
            { label: 'Expiry Date', value: '' },
            { label: 'License Type', value: '' },
          ]
        };
      
      case 'drivingV2':
        return {
          outputType: 'labels',
          outputData: [
            { label: 'License Number', value: '' },
            { label: 'First name', value: '', span: false },
            { label: 'Last name', value: '', span: false },
            { label: 'Date of Birth', value: '', span: false },
            { label: 'Issue Date', value: '', span: false },
            { label: 'Expiry Date', value: '' },
            { label: 'License Type', value: '' },
          ]
        };
      
      case 'idDetection':
        return {
          outputType: 'image',
          outputImage: uploadedImage,
        };
      
      default:
        return null;
    }
  };

  const demonstrationContent = getDemonstrationContent();

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
          Document Recognition
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
          Extract text and data from Cambodian documents
        </p>
      </motion.div>

      {/* Document Type Dropdown */}
      <motion.div 
        className="mb-6 relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <motion.button
          onClick={() => setShowDropdown(!showDropdown)}
          className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl bg-gradient-to-r ${activeGradient} text-white shadow-lg`}
          whileTap={{ scale: 0.98 }}
        >
          <span className="text-sm sm:text-base">{activeTypeLabel}</span>
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
              {ocrTypes.map((type, index) => (
                <motion.button
                  key={type.id}
                  onClick={() => {
                    setActiveType(type.id);
                    setUploadedImage(null);
                    setShowDropdown(false);
                  }}
                  className="w-full px-5 py-3.5 text-left hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors border-b border-slate-100 dark:border-slate-700 last:border-0"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ x: 4 }}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${type.gradient}`} />
                    <span className="text-sm text-slate-900 dark:text-white">{type.label}</span>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Demonstration Section - Only shows when image is uploaded */}
      <AnimatePresence>
        {uploadedImage && (
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl sm:text-2xl text-center text-slate-900 dark:text-white mb-6 tracking-tight">
              Results
            </h2>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-2xl rounded-3xl p-4 sm:p-6 border border-slate-200/60 dark:border-slate-700/60"
            >
              <div className="space-y-6">
                {/* Your Input */}
                <div>
                  <h3 className="text-base sm:text-lg text-slate-900 dark:text-white mb-3">
                    Your Input
                  </h3>
                  <motion.div 
                    className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-3 border border-slate-200 dark:border-slate-700"
                  >
                    <img 
                      src={uploadedImage} 
                      alt="Input document" 
                      className="w-full h-auto rounded-xl"
                    />
                  </motion.div>
                </div>

                {/* Our Result */}
                <div>
                  <h3 className="text-base sm:text-lg text-slate-900 dark:text-white mb-3">
                    Our Result
                  </h3>
                  
                  {demonstrationContent?.outputType === 'data' && (
                    <div className="grid grid-cols-2 gap-3">
                      {demonstrationContent.outputData.map((item: any, index: number) => (
                        <motion.div
                          key={index}
                          className={item.span ? 'col-span-2' : ''}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <div className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                            {item.label}
                          </div>
                          <div className="text-sm text-slate-900 dark:text-white">
                            {item.value}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {demonstrationContent?.outputType === 'labels' && (
                    <div className="grid grid-cols-2 gap-3">
                      {demonstrationContent.outputData.map((item: any, index: number) => (
                        <motion.div
                          key={index}
                          className={item.span !== false ? 'col-span-2' : ''}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <div className="text-sm text-slate-600 dark:text-slate-400">
                            {item.label}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {demonstrationContent?.outputType === 'image' && (
                    <motion.div 
                      className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-3 border border-slate-200 dark:border-slate-700"
                    >
                      <img 
                        src={demonstrationContent.outputImage} 
                        alt="Output document" 
                        className="w-full h-auto rounded-xl"
                      />
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Try Again Button */}
              <div className="flex justify-center mt-6">
                <motion.button
                  onClick={() => setUploadedImage(null)}
                  className={`px-6 py-2.5 rounded-full bg-gradient-to-r ${activeGradient} text-white text-sm shadow-lg`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Try Again
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload Zone */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            relative rounded-3xl border-2 border-dashed transition-all duration-300 overflow-hidden
            ${
              isDragging
                ? `border-blue-500 dark:border-cyan-400 bg-blue-50/50 dark:bg-blue-900/20`
                : 'border-slate-300 dark:border-slate-600 bg-white/50 dark:bg-slate-800/50 hover:border-slate-400 dark:hover:border-slate-500'
            }
            backdrop-blur-xl
          `}
          style={{ minHeight: '400px' }}
        >
          <AnimatePresence mode="wait">
            {uploadedImage ? (
              <motion.div 
                key="image"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative w-full h-full p-4"
              >
                <img
                  src={uploadedImage}
                  alt="Uploaded document"
                  className="w-full h-full object-contain rounded-2xl"
                />
                <motion.button
                  onClick={() => setUploadedImage(null)}
                  className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-slate-900/80 dark:bg-white/10 backdrop-blur-xl text-white flex items-center justify-center border border-white/20"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </motion.div>
            ) : (
              <motion.label 
                key="upload"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center w-full h-full cursor-pointer p-8"
              >
                <motion.div
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${activeGradient} flex items-center justify-center mb-4 shadow-lg`}
                >
                  <Upload className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </motion.div>
                
                <p className="text-lg sm:text-xl text-slate-700 dark:text-slate-200 mb-2">
                  Drop your image here
                </p>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6">
                  or click to browse
                </p>
                
                <motion.div 
                  className={`px-6 py-2.5 rounded-2xl bg-gradient-to-r ${activeGradient} text-white text-sm shadow-lg`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FileImage className="w-4 h-4 inline mr-2" />
                  Choose File
                </motion.div>
                
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />

                <div className={`absolute inset-0 bg-gradient-to-r ${activeGradient} opacity-0 hover:opacity-5 transition-opacity pointer-events-none`} />
              </motion.label>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Floating Info Button */}
      <motion.button
        onClick={() => setShowInfo(true)}
        className={`fixed bottom-24 right-6 w-14 h-14 rounded-full bg-gradient-to-br ${activeGradient} text-white shadow-2xl flex items-center justify-center z-40`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.5 }}
      >
        <Info className="w-6 h-6" />
      </motion.button>

      {/* Info Modal */}
      <AnimatePresence>
        {showInfo && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowInfo(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed inset-x-4 top-1/2 -translate-y-1/2 max-w-lg mx-auto bg-white dark:bg-slate-800 rounded-3xl shadow-2xl z-50 max-h-[80vh] overflow-hidden"
            >
              {/* Close Button */}
              <motion.button
                onClick={() => setShowInfo(false)}
                className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center z-10"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              </motion.button>

              {/* Tab Headers */}
              <div className="flex items-center gap-2 p-4 border-b border-slate-200 dark:border-slate-700">
                <motion.button
                  onClick={() => setInfoTab('capability')}
                  className={`flex-1 px-3 py-2 rounded-xl text-xs sm:text-sm transition-colors ${
                    infoTab === 'capability'
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  <CheckCircle2 className="w-4 h-4 inline mr-1" />
                  Capability
                </motion.button>
                <motion.button
                  onClick={() => setInfoTab('limitation')}
                  className={`flex-1 px-3 py-2 rounded-xl text-xs sm:text-sm transition-colors ${
                    infoTab === 'limitation'
                      ? 'bg-amber-500 text-white'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  <AlertCircle className="w-4 h-4 inline mr-1" />
                  Limitation
                </motion.button>
                <motion.button
                  onClick={() => setInfoTab('instructions')}
                  className={`flex-1 px-3 py-2 rounded-xl text-xs sm:text-sm transition-colors ${
                    infoTab === 'instructions'
                      ? 'bg-blue-500 text-white'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  <ListChecks className="w-4 h-4 inline mr-1" />
                  How To
                </motion.button>
              </div>

              {/* Tab Content */}
              <div className="p-6 overflow-y-auto max-h-[60vh]">
                <AnimatePresence mode="wait">
                  {infoTab === 'capability' && (
                    <motion.div
                      key="capability"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h3 className="text-lg text-slate-900 dark:text-white mb-4">
                        Capabilities
                      </h3>
                      <ul className="space-y-3">
                        {capabilities.map((item, index) => (
                          <motion.li 
                            key={index} 
                            className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}

                  {infoTab === 'limitation' && (
                    <motion.div
                      key="limitation"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h3 className="text-lg text-slate-900 dark:text-white mb-4">
                        Limitations
                      </h3>
                      <ul className="space-y-3">
                        {limitations.map((item, index) => (
                          <motion.li 
                            key={index} 
                            className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}

                  {infoTab === 'instructions' && (
                    <motion.div
                      key="instructions"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h3 className="text-lg text-slate-900 dark:text-white mb-4">
                        How to Use
                      </h3>
                      <ol className="space-y-3">
                        {instructions.map((instruction, index) => (
                          <motion.li 
                            key={index} 
                            className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-white flex-shrink-0 text-xs">
                              {index + 1}
                            </span>
                            <span className="pt-0.5">{instruction}</span>
                          </motion.li>
                        ))}
                      </ol>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
