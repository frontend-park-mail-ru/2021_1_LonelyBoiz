// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
import Context from './Context';
const keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

const preventDefault = (e: Event) => {
    e.preventDefault();
};

const preventDefaultForScrollKeys = (e: KeyboardEvent) => {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
};

let supportsPassive = false;
try {
    window.addEventListener(
        'test',
        null,
        Object.defineProperty({}, 'passive', {
            get: function() {
                supportsPassive = true;
                return null;
            }
        })
    );
} catch (e) {}

const wheelOpt: Context = supportsPassive ? { passive: false } : false;
const wheelEvent =
    'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

export const disableScroll = (): void => {
    window.addEventListener('DOMMouseScroll', preventDefault, false);
    window.addEventListener(wheelEvent, preventDefault, wheelOpt);
    window.addEventListener('touchmove', preventDefault, wheelOpt);
    window.addEventListener('keydown', preventDefaultForScrollKeys, false);
};

export const enableScroll = (): void => {
    window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
    window.removeEventListener('touchmove', preventDefault, wheelOpt);
    window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
};
