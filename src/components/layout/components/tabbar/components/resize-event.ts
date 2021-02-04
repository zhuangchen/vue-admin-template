import ResizeObserver from 'resize-observer-polyfill';
const isServer = false;
/* istanbul ignore next */
const resizeHandler = function(entries: ResizeObserverEntry[]) {
    for (const entry of entries) {
        const listeners =
      (entry.target as any).__resizeListeners__ || [];
        if (listeners.length) {
            listeners.forEach((fn:()=>{}) => {
                fn();
            });
        }
    }
};

/* istanbul ignore next */
export const addResizeListener = function(
    element: any,
    fn: (...args: unknown[]) => unknown
): void {
    if (isServer || !element) return;
    if (!element.__resizeListeners__) {
        element.__resizeListeners__ = [];
        element.__ro__ = new ResizeObserver(resizeHandler);
        element.__ro__.observe(element);
    }
    element.__resizeListeners__.push(fn);
};

/* istanbul ignore next */
export const removeResizeListener = function(
    element: any,
    fn: (...args: unknown[]) => unknown
): void {
    if (!element || !element.__resizeListeners__) return;
    element.__resizeListeners__.splice(
        element.__resizeListeners__.indexOf(fn),
        1
    );
    if (!element.__resizeListeners__.length) {
        element.__ro__.disconnect();
    }
};
