import { useState, useEffect } from 'react';

/**
 * 自定义Hook用于处理媒体查询
 * @param query 媒体查询字符串，如 '(max-width: 768px)'
 * @returns 布尔值，表示媒体查询是否匹配
 */
export function useMediaQuery(query: string): boolean {
  // 初始状态匹配当前窗口
  const getMatches = (query: string): boolean => {
    // 在服务器端渲染时，默认为false
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  };

  const [matches, setMatches] = useState<boolean>(getMatches(query));

  useEffect(() => {
    // 获取媒体查询列表
    const mediaQuery = window.matchMedia(query);
    
    // 处理变化
    const handleChange = () => {
      setMatches(mediaQuery.matches);
    };

    // 注册监听器
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // 兼容旧版浏览器
      mediaQuery.addListener(handleChange);
    }

    // 清理函数
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        // 兼容旧版浏览器
        mediaQuery.removeListener(handleChange);
      }
    };
  }, [query]);

  return matches;
}

export default useMediaQuery; 