import Events from '../consts/events';
import eventBus from './eventBus';
import Context from './Context';
import { fabric } from 'fabric';

const toBase64 = (file: File): Promise<Context> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
};

const compress = (file: File, filter?: string): Promise<File> => {
    return new Promise((resolve, reject) => {
        const width = 600;
        const fileName = file.name;
        const fileSize = file.size;

        if (fileSize > 10 * 1000 * 1000) {
            eventBus.emit(Events.pushNotifications, {
                status: 'error',
                children: 'Фотография должна быть меньше 10 МБ!'
            });
            reject(new Error('File size more then 10 Mb'));
        }

        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = <HTMLImageElement>document.createElement('img');
            img.src = String(event.target.result);

            img.onload = () => {
                const elem: fabric.Canvas = new fabric.Canvas('c');

                const scaleFactor = width / img.width;
                elem.width = width;
                elem.height = img.height * scaleFactor;
                fabric.Image.fromURL(img.src, function(fabImg: fabric.Image) {
                    switch (filter) {
                        case 'grayscale':
                            fabImg.filters.push(
                                new fabric.Image.filters.Grayscale()
                            );
                            fabImg.applyFilters();
                            break;
                        case 'sepia':
                            fabImg.filters.push(new fabric.Image.filters.Sepia());
                            fabImg.applyFilters();
                            break;
                        case 'brownie':
                            fabImg.filters.push(
                                // @ts-ignore
                                new fabric.Image.filters.Brownie()
                            );
                            fabImg.applyFilters();
                            break;
                        case 'velvet':
                            fabImg.filters.push(
                                // @ts-ignore
                                new fabric.Image.filters.Technicolor()
                            );
                            fabImg.applyFilters();
                            break;
                        case 'kodak':
                            fabImg.filters.push(
                                // @ts-ignore
                                new fabric.Image.filters.Kodachrome()
                            );
                            fabImg.applyFilters();
                            break;
                        case 'vintage':
                            // @ts-ignore
                            fabImg.filters.push(new fabric.Image.filters.Vintage());
                            fabImg.applyFilters();
                            break;
                        default:
                            break;
                    }
                    fabImg.scaleX = elem.width / fabImg.width;
                    fabImg.scaleY = elem.height / fabImg.height;

                    const imgCanvasElement = <HTMLCanvasElement>fabImg.toCanvasElement({ left: 0, top: 0, width: width, height: img.height * scaleFactor });

                    const ctx = imgCanvasElement.getContext('2d');

                    ctx.canvas.toBlob(
                        (blob: Blob | null) => {
                            resolve(
                                new File([blob], fileName, {
                                    type: 'image/webm',
                                    lastModified: Date.now()
                                })
                            );
                        },
                        'image/webm',
                        0.9
                    );
                });
            };
            reader.onerror = (error) => reject(new Error(String(error)));
        };
    });
};

export const onPhotoUpload = (file: File, filter?: string): Promise<File> => {
    return compress(file, filter);
};

export const setPhoto = (file: File, id: string, classes?: string): void => {
    toBase64(file).then((data: string) => {
        const img = document.createElement('img');
        img.src = String(data);
        img.id = id;
        img.classList.add(classes);

        const photoForm = document.getElementById(id);
        photoForm.replaceWith(img);
    });
};
