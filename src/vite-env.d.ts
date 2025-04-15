/// <reference types="vite/client" />

// 添加Umami全局类型
interface Window {
  umami?: {
    track: (eventName: string, eventData?: Record<string, any>) => void;
  };
}
