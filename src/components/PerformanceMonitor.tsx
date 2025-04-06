import { useState, useEffect, useRef, memo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';
import { Card } from '@/components/ui/card';
import { Zap, Clock, Database, Cpu, X } from 'lucide-react';
import { throttle } from 'lodash';

// 性能指标接口定义
interface PerformanceMetrics {
  fcp: number | null;  // 首次内容绘制
  lcp: number | null;  // 最大内容绘制
  fid: number | null;  // 首次输入延迟
  cls: number | null;  // 累积布局偏移
  ttfb: number | null; // 首字节时间
  memory: number | null; // 内存使用量
  fps: number | null;  // 每秒帧数
}

// 性能仪表盘组件属性接口
interface PerformanceGaugeProps {
  value: number | null;
  maxValue: number;
  label: string;
  unit: string;
  icon: React.ReactNode;
  colorStart: string;
  colorEnd: string;
  isGood: boolean;
}

// 性能度量仪表组件，使用memo优化性能
const PerformanceGauge = memo(({
  value,
  maxValue,
  label,
  unit,
  icon,
  colorStart,
  colorEnd,
  isGood
}: PerformanceGaugeProps) => {
  const percentage = value !== null ? Math.min((value / maxValue) * 100, 100) : 0;
  const displayValue = value !== null ? value.toFixed(2) : '--';
  
  return (
    <div className="performance-gauge-container">
      <div className="flex items-center justify-between mb-1">
        <div className="performance-gauge-label">
          {icon}
          <span className="ml-2">{label}</span>
        </div>
        <div className="performance-gauge-value">
          {displayValue} {unit}
          <span className={`ml-2 text-xs ${isGood ? 'text-emerald-500' : 'text-amber-500'}`}>
            {isGood ? '✓' : '⚠️'}
          </span>
        </div>
      </div>
      <div className="performance-gauge-track">
        <motion.div 
          className="performance-gauge-progress"
          style={{ 
            background: `linear-gradient(to right, ${colorStart}, ${colorEnd})`,
            width: `${percentage}%` 
          }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
});

PerformanceGauge.displayName = 'PerformanceGauge';

// 性能指标收集hooks
const usePerformanceMetrics = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fcp: null,
    lcp: null,
    fid: null,
    cls: null,
    ttfb: null,
    memory: null,
    fps: null
  });
  
  // FPS 计算相关引用
  const frameCount = useRef(0);
  const lastFrameTime = useRef(performance.now());
  const frameRef = useRef<number | null>(null);
  const observersRef = useRef<PerformanceObserver[]>([]);
  const isActive = useRef(true);
  
  // 计算每秒帧数 - 优化版本
  const calculateFPS = useCallback(() => {
    if (!isActive.current) return;
    
    const now = performance.now();
    frameCount.current += 1;
    
    // 每秒更新一次 FPS
    if (now - lastFrameTime.current >= 1000) {
      setMetrics(prev => ({
        ...prev,
        fps: Math.round(frameCount.current * 1000 / (now - lastFrameTime.current))
      }));
      
      frameCount.current = 0;
      lastFrameTime.current = now;
    }
    
    frameRef.current = requestAnimationFrame(calculateFPS);
  }, []);

  // 清理函数
  const cleanup = useCallback(() => {
    isActive.current = false;
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }
    observersRef.current.forEach(observer => observer.disconnect());
    observersRef.current = [];
  }, []);
  
  useEffect(() => {
    // 收集Web性能指标
    const getWebVitals = () => {
      // 计算 TTFB (首字节时间)
      if (performance && performance.getEntriesByType) {
        const navigationEntries = performance.getEntriesByType('navigation');
        if (navigationEntries.length > 0) {
          const navEntry = navigationEntries[0] as PerformanceNavigationTiming;
          setMetrics(prev => ({
            ...prev,
            ttfb: navEntry.responseStart
          }));
        }
      }
      
      // 计算内存使用情况 - 添加节流
      if (performance && (performance as any).memory) {
        const updateMemory = throttle(() => {
          const memoryInfo = (performance as any).memory;
          // 使用增量而不是总量来避免显示过大的数值
          const usedMemoryMB = (memoryInfo.usedJSHeapSize - memoryInfo.totalJSHeapSize/2) / (1024 * 1024);
          setMetrics(prev => ({
            ...prev,
            memory: Math.max(0, usedMemoryMB)
          }));
        }, 2000);
        updateMemory();
      }
      
      // 核心Web指标收集 - 优化版本
      if ('PerformanceObserver' in window) {
        const createObserver = (type: string, callback: (entry: PerformanceEntry) => void) => {
          try {
            const observer = new PerformanceObserver((entryList) => {
              const entries = entryList.getEntries();
              if (entries.length > 0) {
                callback(entries[entries.length - 1]);
              }
            });
            observer.observe({ type: type as any, buffered: true });
            observersRef.current.push(observer);
          } catch (e) {
            console.error(`${type}测量错误:`, e);
          }
        };

        // FCP
        createObserver('paint', (entry) => {
          if (entry.name === 'first-contentful-paint') {
            setMetrics(prev => ({ ...prev, fcp: entry.startTime }));
          }
        });

        // LCP
        createObserver('largest-contentful-paint', (entry) => {
          setMetrics(prev => ({ ...prev, lcp: entry.startTime }));
        });

        // FID
        createObserver('first-input', (entry) => {
          setMetrics(prev => ({
            ...prev,
            fid: (entry as PerformanceEventTiming).processingStart - entry.startTime
          }));
        });

        // CLS
        let clsValue = 0;
        createObserver('layout-shift', (entry) => {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
            setMetrics(prev => ({ ...prev, cls: clsValue }));
          }
        });
      }
      
      // 开始计算 FPS
      frameRef.current = requestAnimationFrame(calculateFPS);
    };

    // 页面加载后收集性能指标
    if (document.readyState === 'complete') {
      getWebVitals();
    } else {
      window.addEventListener('load', getWebVitals);
    }
    
    return () => {
      cleanup();
      window.removeEventListener('load', getWebVitals);
    };
  }, [calculateFPS, cleanup]);

  return metrics;
};

// 性能监控组件
const PerformanceMonitor = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const metrics = usePerformanceMetrics();

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* 性能指标悬浮按钮 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="performance-button"
        aria-label={t('performance.toggle')}
      >
        <Cpu size={20} />
      </button>
      
      {/* 性能面板 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 w-80 max-h-[80vh] overflow-y-auto"
          >
            <Card className="performance-card">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-slate-800 dark:text-slate-200">
                  {t('performance.title')}
                </h3>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                >
                  <X size={18} />
                </button>
              </div>
              
              <div className="space-y-4">
                <PerformanceGauge
                  value={metrics.fcp}
                  maxValue={2000}
                  label={t('performance.metrics.fcp')}
                  unit="ms"
                  icon={<Clock size={14} className="text-cyan-500" />}
                  colorStart="#0ea5e9"
                  colorEnd="#0284c7"
                  isGood={metrics.fcp !== null && metrics.fcp < 1000}
                />
                
                <PerformanceGauge
                  value={metrics.lcp}
                  maxValue={2500}
                  label={t('performance.metrics.lcp')}
                  unit="ms"
                  icon={<Clock size={14} className="text-blue-500" />}
                  colorStart="#3b82f6"
                  colorEnd="#1d4ed8"
                  isGood={metrics.lcp !== null && metrics.lcp < 2500}
                />
                
                <PerformanceGauge
                  value={metrics.fid}
                  maxValue={100}
                  label={t('performance.metrics.fid')}
                  unit="ms"
                  icon={<Zap size={14} className="text-amber-500" />}
                  colorStart="#f59e0b"
                  colorEnd="#d97706"
                  isGood={metrics.fid !== null && metrics.fid < 100}
                />
                
                <PerformanceGauge
                  value={metrics.cls}
                  maxValue={0.1}
                  label={t('performance.metrics.cls')}
                  unit=""
                  icon={<Zap size={14} className="text-green-500" />}
                  colorStart="#10b981"
                  colorEnd="#059669"
                  isGood={metrics.cls !== null && metrics.cls < 0.1}
                />
                
                <PerformanceGauge
                  value={metrics.ttfb}
                  maxValue={500}
                  label={t('performance.metrics.ttfb')}
                  unit="ms"
                  icon={<Database size={14} className="text-indigo-500" />}
                  colorStart="#8b5cf6"
                  colorEnd="#6d28d9"
                  isGood={metrics.ttfb !== null && metrics.ttfb < 200}
                />
                
                <PerformanceGauge
                  value={metrics.memory}
                  maxValue={100}
                  label={t('performance.metrics.memory')}
                  unit="MB"
                  icon={<Database size={14} className="text-rose-500" />}
                  colorStart="#f43f5e"
                  colorEnd="#e11d48"
                  isGood={metrics.memory !== null && metrics.memory < 50}
                />
                
                <PerformanceGauge
                  value={metrics.fps}
                  maxValue={60}
                  label={t('performance.metrics.fps')}
                  unit="FPS"
                  icon={<Cpu size={14} className="text-purple-500" />}
                  colorStart="#a855f7"
                  colorEnd="#9333ea"
                  isGood={metrics.fps !== null && metrics.fps >= 58}
                />
              </div>
              
              <div className="mt-4 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
                {t('performance.disclaimer')}
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PerformanceMonitor;
