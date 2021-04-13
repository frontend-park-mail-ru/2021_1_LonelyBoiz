export function draw(imgIn: string): HTMLImageElement {
    const img = new Image();
    img.src = imgIn;
    img.onload = () => {
        console.log('Image Onload');
    };
    img.onerror = function(stuff) {
        console.log('Img Onerror:', stuff);
        return { r: 255, g: 255, b: 255 };
    };
    return img; // returns the context
}

export interface IRGB {
    r: number;
    g: number;
    b: number;
}

export function getAverageRGB(imgEl: HTMLImageElement): IRGB {
    const blockSize = 5; // only visit every 5 pixels
    const defaultRGB: IRGB = { r: 255, g: 255, b: 255 }; // for non-supporting envs
    const canvas = <HTMLCanvasElement>document.createElement('canvas');
    const context = canvas.getContext && canvas.getContext('2d');
    let i = -4;
    const rgb: IRGB = { r: 0, g: 0, b: 0 };
    let count = 0;

    if (!context) {
        return defaultRGB;
    }

    const height = (canvas.height =
        imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height);
    const width = (canvas.width =
        imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width);

    context.drawImage(imgEl, 0, 0);

    let data: ImageData;
    try {
        data = <ImageData>context.getImageData(0, 0, width, height);
    } catch (e) {
        return defaultRGB;
    }

    const length = data.data.length;

    while ((i += blockSize * 4) < length) {
        ++count;
        rgb.r += data.data[i];
        rgb.g += data.data[i + 1];
        rgb.b += data.data[i + 2];
    }

    rgb.r = ~~(rgb.r / count);
    rgb.g = ~~(rgb.g / count);
    rgb.b = ~~(rgb.b / count);

    return rgb;
}
