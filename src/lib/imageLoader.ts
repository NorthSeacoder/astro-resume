interface ImageOptions {
    src: string;
    width?: number;
    quality?: number;
}

// 检查浏览器是否支持 webp
const checkWebpSupport = async (): Promise<boolean> => {
    if (!window.createImageBitmap) return false;

    const webpData = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
    try {
        const blob = await fetch(webpData).then(r => r.blob());
        return createImageBitmap(blob).then(() => true, () => false);
    } catch (e) {
        return false;
    }
};

let webpSupported: boolean | null = null;

export const getOptimizedImageUrl = ({ src, width, quality = 85 }: ImageOptions): string => {
    // 构建优化后的 URL
    const url = new URL(src, window.location.origin);
    
    // 添加宽度和质量参数（如果提供）
    if (width) {
        url.searchParams.set('w', width.toString());
    }
    if (quality && quality !== 85) { // 只有当质量不是默认值时才添加参数
        url.searchParams.set('q', quality.toString());
    }

    return url.toString();
};

// 图片组件的 Props 类型
export interface OptimizedImageProps extends Omit<JSX.IntrinsicElements['img'], 'src'> {
    src: string;
    width?: number;
    quality?: number;
    sizes?: string;
}

// 使用示例:
// const MyImage = async ({ src, width, quality, ...props }: OptimizedImageProps) => {
//     const optimizedSrc = await getOptimizedImageUrl({ src, width, quality });
//     return <img src={optimizedSrc} {...props} />;
// }; 