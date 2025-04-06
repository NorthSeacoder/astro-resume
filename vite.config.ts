import {defineConfig} from 'vite';
import preact from '@preact/preset-vite';
import path from 'path';
import {componentTagger} from 'lovable-tagger';
import viteImagemin from 'vite-plugin-imagemin';
import {Plugin} from 'vite';
import {visualizer} from 'rollup-plugin-visualizer';
import preloadConfigPlugin from './plugins/vite-plugin-preload-config'
// 创建自定义预加载插件
function createPreloadPlugin(): Plugin {
    return {
        name: 'vite-plugin-preload',
        transformIndexHtml(html) {
            return {
                html,
                tags: [
                    {
                        tag: 'link',
                        attrs: {
                            rel: 'preload',
                            as: 'image',
                            href: '/assets/images/placeholder.webp',
                            type: 'image/webp'
                        },
                        injectTo: 'head'
                    }
                ]
            };
        }
    };
}

// https://vitejs.dev/config/
export default defineConfig(({mode}) => ({
    server: {
        host: '::',
        port: 8080,
        // Change to true to allow all hosts
        allowedHosts: true
    },
    plugins: [
        preact(),
        mode === 'development' && componentTagger(),
        // mode === 'production' &&
        //     visualizer({
        //         filename: 'dist/stats.html',
        //         open: true,
        //         gzipSize: true,
        //         brotliSize: true
        //     }),
        viteImagemin({
            webp: {
                quality: 85,
                method: 6,
                lossless: false,
                nearLossless: 75
            },
            gifsicle: {
                optimizationLevel: 7,
                interlaced: false
            },
            optipng: {
                optimizationLevel: 7
            },
            mozjpeg: {
                quality: 80,
                progressive: true
            },
            pngquant: {
                quality: [0.8, 0.9],
                speed: 4
            },
            svgo: {
                plugins: [
                    {
                        name: 'removeViewBox'
                    },
                    {
                        name: 'removeEmptyAttrs',
                        active: false
                    }
                ]
            }
        }),
        createPreloadPlugin(),
        preloadConfigPlugin()
    ].filter(Boolean),
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            react: 'preact/compat',
            'react-dom': 'preact/compat',
            'react/jsx-runtime': 'preact/jsx-runtime'
        }
    },
    build: {
        target: 'esnext',
        minify: 'esbuild',
        chunkSizeWarningLimit: 1000,
        cssCodeSplit: true,
        // cssMinify: 'lightningcss',
        sourcemap: false,
        reportCompressedSize: false,
        rollupOptions: {
            treeshake:{
                moduleSideEffects: true,
                propertyReadSideEffects: false,
                tryCatchDeoptimization: false
            },
            output: {
                manualChunks: {
                    'preact-vendor': ['preact', 'preact/compat', 'preact/hooks'],
                    'router-vendor': ['react-router-dom'],
                    'ui-core-vendor': [
                        '@radix-ui/react-label',
                        '@radix-ui/react-slot',
                        '@radix-ui/react-separator',
                        '@radix-ui/react-progress'
                    ],
                    'ui-interaction-vendor': [
                        '@radix-ui/react-toast',
                        '@radix-ui/react-tooltip',
                        '@radix-ui/react-switch',
                        'sonner'
                    ],
                    'ui-scroll-vendor': [
                        '@radix-ui/react-scroll-area'
                    ],
                    'animation-vendor': ['framer-motion'],
                    'utils-vendor': [
                        'class-variance-authority',
                        'clsx',
                        'tailwind-merge',
                        'next-themes'
                    ],
                    'icons-vendor': ['lucide-react']
                },
                assetFileNames: (assetInfo: {name?: string}) => {
                    if (assetInfo.name?.endsWith('.css')) {
                        return 'assets/css/[name]-vendor-[hash][extname]';
                    }
                    return 'assets/[name]-[hash][extname]';
                },
                chunkFileNames: 'assets/js/[name]-[hash].js',
                entryFileNames: 'assets/js/[name]-[hash].js'
            }
        }
    },
    esbuild: {
        jsxFactory: 'h',
        jsxFragment: 'Fragment',
        legalComments: 'none',
        minifyIdentifiers: true,
        minifySyntax: true,
        minifyWhitespace: true
    }
}));
