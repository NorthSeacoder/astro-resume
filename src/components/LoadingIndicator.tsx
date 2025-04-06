import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingIndicator = () => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    // 模拟页面加载进度
    const timer = setInterval(() => {
      setProgress(prev => {
        // 进度加载算法，加载速度随时间逐渐变慢
        const newProgress = prev + Math.random() * 3 * (1 - prev / 100);
        
        if (newProgress >= 100) {
          clearInterval(timer);
          
          // 完成后延迟一段时间再隐藏
          setTimeout(() => {
            setIsVisible(false);
          }, 500);
          
          return 100;
        }
        
        return newProgress;
      });
    }, 100);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="loading-container"
        >
          <div className="w-72 sm:w-96 px-4 flex flex-col items-center">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="loading-title"
            >
              正在加载...
            </motion.div>
            
            <div className="loading-bar-container">
              <motion.div 
                className="loading-bar"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "easeInOut" }}
              />
            </div>
            
            <motion.div 
              className="loading-percentage"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              {Math.round(progress)}%
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingIndicator; 