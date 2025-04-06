import { useEffect, useState } from 'preact/hooks';
import { getOptimizedImageUrl, OptimizedImageProps } from '../lib/imageLoader';

export function OptimizedImage({ 
    src, 
    width, 
    quality,
    sizes = '100vw',
    ...props 
}: OptimizedImageProps) {
    const [loaded, setLoaded] = useState(false);
    const optimizedSrc = getOptimizedImageUrl({ src, width, quality });

    return (
        <img
            {...props}
            src={optimizedSrc}
            loading="lazy"
            decoding="async"
            sizes={sizes}
            onLoad={() => setLoaded(true)}
            style={{
                ...props.style,
                opacity: loaded ? 1 : 0,
                transition: 'opacity 0.3s ease-in-out'
            }}
        />
    );
} 