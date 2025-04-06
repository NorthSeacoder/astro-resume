
import { ComponentType, VNode, createElement } from 'preact';
import { lazy } from 'preact/compat';

interface LazyLoadOptions {
    fallback?: VNode | null;
    minDelay?: number;
}

export function lazyLoad<T extends ComponentType<any>>(
    importFn: () => Promise<{ default: T }>,
    options: LazyLoadOptions = {}
) {
    const { fallback = null, minDelay = 0 } = options;
    
    // Use Preact's lazy load functionality without Suspense
    const LazyComponent = lazy(() =>
        Promise.all([
            importFn(),
            // Add minimum delay to avoid loading flicker
            minDelay ? new Promise(resolve => setTimeout(resolve, minDelay)) : Promise.resolve()
        ]).then(([moduleExports]) => moduleExports)
    );

    // Return a wrapper function that renders the lazy component directly
    // Use createElement instead of JSX to avoid type issues
    return function LazyLoadWrapper(props: any): VNode {
        return createElement(LazyComponent as any, props) as VNode;
    };
}

// Usage example:
// const MyLazyComponent = lazyLoad(() => import('./MyComponent'), {
//     fallback: <LoadingSpinner />,
//     minDelay: 300
// }); 
