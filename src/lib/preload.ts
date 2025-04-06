interface PreloadItem {
    type: 'style' | 'script' | 'font' | 'image';
    path: string;
    crossorigin?: string;
}

interface PreloadConfig {
    preload: PreloadItem[];
    prefetch: PreloadItem[];
}

export async function injectPreloadTags() {
    try {
        const response = await fetch('/preload-config.json');
        const config: PreloadConfig = await response.json();
        
        // 注入预加载标签
        config.preload.forEach(item => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = item.path;
            
            switch (item.type) {
                case 'style':
                    link.as = 'style';
                    break;
                case 'script':
                    link.as = 'script';
                    break;
                case 'font':
                    link.as = 'font';
                    if (item.crossorigin) {
                        link.crossOrigin = item.crossorigin;
                    }
                    break;
                case 'image':
                    link.as = 'image';
                    break;
            }
            
            document.head.appendChild(link);
        });
        
        // 注入预获取标签
        config.prefetch.forEach(item => {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = item.path;
            document.head.appendChild(link);
        });
    } catch (error) {
        console.error('Failed to load preload configuration:', error);
    }
} 