const initSW = (): void => {
    if (process.env.NODE_ENV === 'production') {
        window.addEventListener('load', () => {
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker
                    .register('/sw.js')
                    .then((e) => {
                        console.warn('Service worker register success', e);
                    })
                    .catch((e) => {
                        console.error('Service worker register faillure', e);
                    });
            }
        });
    }
};
export default initSW;
