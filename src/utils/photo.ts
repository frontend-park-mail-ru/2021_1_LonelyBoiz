import Events from '../consts/events';
import eventBus from './eventBus';
import Context from './Context';

const toBase64 = (file: File): Promise<Context> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
};

const compress = (e: Event): Promise<File> => {
    return new Promise((resolve, reject) => {
        const width = 600;
        const currentTarget = <HTMLInputElement>e.target;
        const file = currentTarget.files[0];
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
                const elem = document.createElement('canvas');

                const scaleFactor = width / img.width;
                elem.width = width;
                elem.height = img.height * scaleFactor;
                const ctx = elem.getContext('2d');
                ctx.drawImage(img, 0, 0, width, img.height * scaleFactor);

                ctx.canvas.toBlob(
                    (blob) => {
                        resolve(
                            new File([blob], fileName, {
                                type: 'image/webp',
                                lastModified: Date.now()
                            })
                        );
                    },
                    'image/webp',
                    0.9
                );
            };
            reader.onerror = (error) => reject(new Error(String(error)));
        };
    });
};

export const onPhotoUpload = function(e: Event): void {
    compress(e).then((file: File) => {
        toBase64(file)
            .then((data: string) => {
                this.file = data;

                const img = document.createElement('img');
                img.src = String(data);
                img.id = 'settings__new-photo';
                img.classList.add('settings__photo');

                const photoForm = document.getElementById('settings__new-photo');
                photoForm.replaceWith(img);
            })
            .catch((e) => console.error(e));
    });
};
