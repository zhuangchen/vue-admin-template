const isServer  =false;
import element from '@/components/element';
import { camelize, isObject } from '@vue/shared';

/* istanbul ignore next */
const trim = function(s: string) {
    return (s || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
};

/* istanbul ignore next */
export const on = function(
    element: HTMLElement | Document | Window,
    event: string,
    handler: EventListenerOrEventListenerObject,
    useCapture = false
): void {
    if (element && event && handler) {
        element.addEventListener(event, handler, useCapture);
    }
};

/* istanbul ignore next */
export const off = function(
    element: HTMLElement | Document | Window,
    event: string,
    handler: EventListenerOrEventListenerObject,
    useCapture = false
): void {
    if (element && event && handler) {
        element.removeEventListener(event, handler, useCapture);
    }
};

/* istanbul ignore next */
export const once = function(
    el: HTMLElement,
    event: string,
    fn: EventListener
): void {
    const listener = function(this: any, ...args: unknown[]) {
        if (fn) {
            fn.apply(this, args as any);
        }
        off(el, event, listener);
    };
    on(el, event, listener);
};

/* istanbul ignore next */
export function hasClass(el: HTMLElement, cls: string): boolean {
    if (!el || !cls) return false;
    if (cls.indexOf(' ') !== -1)
        throw new Error('className should not contain space.');
    if (el.classList) {
        return el.classList.contains(cls);
    } else {
        return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
    }
}

/* istanbul ignore next */
export function addClass(el: HTMLElement, cls: string): void {
    if (!el) return;
    let curClass = el.className;
    const classes = (cls || '').split(' ');

    for (let i = 0, j = classes.length; i < j; i++) {
        const clsName = classes[i];
        if (!clsName) continue;

        if (el.classList) {
            el.classList.add(clsName);
        } else if (!hasClass(el, clsName)) {
            curClass += ' ' + clsName;
        }
    }
    if (!el.classList) {
        el.className = curClass;
    }
}

/* istanbul ignore next */
export function removeClass(el: HTMLElement, cls: string): void {
    if (!el || !cls) return;
    const classes = cls.split(' ');
    let curClass = ' ' + el.className + ' ';

    for (let i = 0, j = classes.length; i < j; i++) {
        const clsName = classes[i];
        if (!clsName) continue;

        if (el.classList) {
            el.classList.remove(clsName);
        } else if (hasClass(el, clsName)) {
            curClass = curClass.replace(' ' + clsName + ' ', ' ');
        }
    }
    if (!el.classList) {
        el.className = trim(curClass);
    }
}

/* istanbul ignore next */
// Here I want to use the type CSSStyleDeclaration, but the definition for CSSStyleDeclaration
// has { [index: number]: string } in its type annotation, which does not satisfy the method
// camelize(s: string)
// Same as the return type
export const getStyle = function(
    element: HTMLElement,
    styleName: string
): string | void  | null{
    if (isServer) return;
    if (!element || !styleName) return null;
    styleName = camelize(styleName);
    if (styleName === 'float') {
        styleName = 'cssFloat';
    }
    try {
        const style = element.style[styleName as any];
        if (style) return style;
        const computed = (document.defaultView as any).getComputedStyle(element, '');
        return computed ? computed[styleName as any] : '';
    } catch (e) {
        return element.style[styleName as any];
    }
};

/* istanbul ignore next */
export function setStyle(
    element: HTMLElement,
    styleName: CSSStyleDeclaration | string,
    value?: string
): void {
    if (!element || !styleName) return;

    if (isObject(styleName)) {
        Object.keys(styleName).forEach(prop => {
            setStyle(element, prop, styleName[prop as any]);
        });
    } else {
        styleName = camelize(styleName);
        (element.style as any)[styleName as any] = value;
    }
}

export function removeStyle(element: HTMLElement, style: CSSStyleDeclaration | string) {
    if (!element || !style) return;

    if (isObject(style)) {
        Object.keys(style).forEach(prop => {
            setStyle(element, prop, '');
        });
    } else {
        setStyle(element, style, '');
    }
}

export const isScroll = (
    el: HTMLElement,
    isVertical?: any
): RegExpMatchArray | any => {
    if (isServer) return;
    const determinedDirection = isVertical === null || isVertical === undefined;
    const overflow = determinedDirection
        ? getStyle(el, 'overflow')
        : isVertical
            ? getStyle(el, 'overflow-y')
            : getStyle(el, 'overflow-x');

    return (overflow as any).match(/(scroll|auto)/);
};

export const getScrollContainer = (
    el: HTMLElement,
    isVertical?: any
): Window | HTMLElement | void => {
    if (isServer) return;

    let parent: HTMLElement = el;
    while (parent) {
        if ([window, document, document.documentElement].includes(parent)) {
            return window;
        }
        if (isScroll(parent, isVertical)) {
            return parent;
        }
        parent = parent.parentNode as HTMLElement;
    }
    return parent;
};

export const isInContainer = (
    el: HTMLElement,
    container: HTMLElement
): boolean => {
    if (isServer || !el || !container) return false;

    const elRect = el.getBoundingClientRect();
    let containerRect: Partial<DOMRect>;

    if (
        [window, document, document.documentElement, null, undefined].includes(
            container
        )
    ) {
        containerRect = {
            top: 0,
            right: window.innerWidth,
            bottom: window.innerHeight,
            left: 0
        };
    } else {
        containerRect = container.getBoundingClientRect();
    }
    return (
        elRect.top < (containerRect as any).bottom &&
    elRect.bottom > (containerRect as any).top &&
    elRect.right > (containerRect as any).left &&
    elRect.left < (containerRect as any).right
    );
};

export const getOffsetTop = (el: HTMLElement) => {
    let offset = 0;
    let parent = el;

    while (parent) {
        offset += parent.offsetTop;
        parent = parent.offsetParent as HTMLElement;
    }

    return offset;
};

export const getOffsetTopDistance = (el: HTMLElement, containerEl: HTMLElement) => {
    return Math.abs(getOffsetTop(el) - getOffsetTop(containerEl));
};

export const stop = (e: Event) => e.stopPropagation();
