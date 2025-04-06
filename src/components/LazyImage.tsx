
import { useState, useEffect, useRef } from "react";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  fallback?: string;
}

const LazyImage = ({ src, alt, className = "", fallback = "/placeholder.svg" }: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "200px", // Start loading when image is 200px from viewport
        threshold: 0.01
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.error("Error loading image:", src);
    if (fallback) {
      e.currentTarget.src = fallback;
    }
  };

  return (
    <img
      ref={imgRef}
      src={isInView ? src : fallback}
      data-src={src}
      alt={alt}
      className={`transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"} ${className}`}
      onLoad={handleLoad}
      onError={handleError}
      loading="lazy"
    />
  );
};

export default LazyImage;
