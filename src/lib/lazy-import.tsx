
import React, { Suspense, ReactNode, ComponentType, lazy } from 'react';

interface LazyComponentProps {
  children?: ReactNode;
  fallback?: ReactNode;
}

// 创建加载中组件
const DefaultLoadingFallback = () => (
  <div className="flex items-center justify-center p-4 min-h-[100px]">
    <div className="h-8 w-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
  </div>
);

/**
 * 创建一个懒加载组件，带有标准化的加载状态显示
 */
export const createLazyComponent = <T extends object>(
  importFactory: () => Promise<{ default: ComponentType<T> }>,
  fallback: ReactNode = <DefaultLoadingFallback />
) => {
  const LazyComponent = lazy(importFactory);
  
  return (props: T & LazyComponentProps) => {
    const { children, fallback: propsFallback, ...rest } = props as any;
    return (
      <Suspense fallback={propsFallback || fallback}>
        <LazyComponent {...rest}>
          {children}
        </LazyComponent>
      </Suspense>
    );
  };
};

/**
 * 懒加载预设，适合不同类型的组件
 */
export const LazyComponentPresets = {
  /**
   * 创建一个带有最小高度的卡片式懒加载组件
   */
  Card: <T extends object>(importFactory: () => Promise<{ default: ComponentType<T> }>) => 
    createLazyComponent(importFactory, 
      <div className="rounded-lg bg-slate-100/30 dark:bg-slate-800/30 border border-slate-200/50 dark:border-slate-700/50 shadow-sm animate-pulse min-h-[200px]"></div>
    ),
  
  /**
   * 创建一个内联式的懒加载组件
   */
  Inline: <T extends object>(importFactory: () => Promise<{ default: ComponentType<T> }>) =>
    createLazyComponent(importFactory, 
      <div className="inline-flex items-center justify-center h-10 w-16 bg-slate-100/30 dark:bg-slate-800/30 rounded animate-pulse"></div>
    ),
  
  /**
   * 创建一个适合图表的懒加载组件
   */
  Chart: <T extends object>(importFactory: () => Promise<{ default: ComponentType<T> }>) =>
    createLazyComponent(importFactory, 
      <div className="w-full h-64 bg-slate-100/30 dark:bg-slate-800/30 rounded-lg border border-slate-200/50 dark:border-slate-700/50 animate-pulse flex items-center justify-center">
        <span className="text-slate-400 dark:text-slate-500">图表加载中...</span>
      </div>
    )
}; 
