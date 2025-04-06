import type { Plugin } from 'vite'
import fs from 'fs/promises'
import path from 'path'

interface PreloadItem {
    type: 'style' | 'script' | 'font' | 'image'
    path: string
    crossorigin?: string
}

interface PreloadConfig {
    preload: PreloadItem[]
    prefetch: PreloadItem[]
}

export default function preloadConfigPlugin(): Plugin {
    let config: PreloadConfig
    let outDir: string

    return {
        name: 'vite-plugin-preload-config',
        
        configResolved(resolvedConfig) {
            outDir = resolvedConfig.build.outDir
        },

        async buildStart() {
            try {
                // 读取原始的 preload-config.json
                const configFile = await fs.readFile('public/preload-config.json', 'utf-8')
                config = JSON.parse(configFile)
            } catch (error) {
                console.error('Failed to read preload-config.json:', error)
                throw error
            }
        },

        async writeBundle(options, bundle) {
            const assetMap = new Map<string, string>()

            // 构建文件名映射
            for (const [fileName, chunk] of Object.entries(bundle)) {
                if (chunk.type === 'chunk' || chunk.type === 'asset') {
                    const baseName = path.basename(fileName)
                    // 移除 hash 和扩展名，用作键名
                    const key = baseName.replace(/-[a-zA-Z0-9]+\.(js|css)$/, '')
                    assetMap.set(key, fileName)
                }
            }

            // 更新配置中的路径
            const updatePaths = (items: PreloadItem[]) => {
                return items.map(item => {
                    const pathWithoutExt = path.basename(item.path)
                    const matchedFile = assetMap.get(pathWithoutExt)
                    
                    if (matchedFile) {
                        return {
                            ...item,
                            path: `/assets/${matchedFile}` // 假设资源都在 assets 目录下
                        }
                    }
                    return item
                })
            }

            const updatedConfig: PreloadConfig = {
                preload: updatePaths(config.preload),
                prefetch: updatePaths(config.prefetch)
            }

            // 写入更新后的配置文件
            const outputPath = path.join(outDir, 'preload-config.json')
            await fs.writeFile(
                outputPath,
                JSON.stringify(updatedConfig, null, 2),
                'utf-8'
            )
        }
    }
} 