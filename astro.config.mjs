// @ts-check
import { defineConfig } from 'astro/config';

// 直接使用Vite插件方式
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  }
});