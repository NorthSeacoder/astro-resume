import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
// 导入组件样式
import './styles/components.css'
import { LanguageProvider } from './lib/i18n'
import { injectPreloadTags } from './lib/preload'

// 添加预加载关键资源功能
const preloadCriticalAssets = () => {
  const assets = [
    // 预加载关键图像和字体
    { href: '/images/hero-bg.webp', as: 'image', type: 'image/webp' },
    { href: '/fonts/main-font.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous' }
  ];
  
  assets.forEach(asset => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = asset.href;
    link.as = asset.as;
    if (asset.type) link.type = asset.type;
    if (asset.crossorigin) link.crossOrigin = asset.crossorigin;
    document.head.appendChild(link);
  });
};

// Add CSS for perspective
const add3DStyles = () => {
  const style = document.createElement('style')
  style.textContent = `
    html, body {
      perspective: 1000px;
    }
  `
  document.head.appendChild(style)
}

// Inject preload tags when the application starts
injectPreloadTags()
preloadCriticalAssets()
// add3DStyles()

// 找到根元素或创建一个，然后再操作classList
const rootElement = document.getElementById('root')

// 确保根元素存在再进行操作
if (rootElement) {
  rootElement.classList.add('overflow-x-hidden') // 防止水平滚动条
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <LanguageProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </LanguageProvider>
    </React.StrictMode>
  )
} else {
  console.error('Root element not found! Make sure there is a div with id="root" in your HTML.')
  // 如果找不到根元素，回退到body
  ReactDOM.createRoot(document.body).render(
    <React.StrictMode>
      <LanguageProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </LanguageProvider>
    </React.StrictMode>
  )
}
