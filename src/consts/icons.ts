export const Icons = {
    arrow_left: 'icon/arrow_left.svg',
    arrow_return_left: 'icon/arrow_return_left.svg',
    arrow_right: 'icon/arrow_right.svg',
    cancel: 'icon/cancel.svg',
    geo_stroke: 'icon/geo_stroke.svg',
    home_fill: 'icon/home_fill.svg',
    home_small_stroke: 'icon/home_small_stroke.svg',
    home_stroke: 'icon/home_stroke.svg',
    instagram_stroke: 'icon/instagram_stroke.svg',
    like_fill: 'icon/like_fill.svg',
    like_stroke: 'icon/like_stroke.svg',
    location_fill: 'icon/location_fill.svg',
    location_stroke: 'icon/location_stroke.svg',
    message_stroke: 'icon/message_stroke.svg',
    search_stroke: 'icon/search_stroke.svg',
    send_message_fill: 'icon/send_message_fill.svg',
    send_message_stroke: 'icon/send_message_stroke.svg',
    settings: 'icon/settings.svg',
    spinner_16: 'icon/spinner_16.svg',
    spinner_24: 'icon/spinner_24.svg',
    spinner_32: 'icon/spinner_32.svg',
    spinner_44: 'icon/spinner_44.svg',
    error_circle: 'icon/error_circle.svg',
    smile: 'icon/smile.svg'
};

export const IconsSrc = { ...Icons };

for (const i in Icons) {
    let modeleText: string = require(`raw-loader!@icon/${i}.svg`).default;
    const start = modeleText.indexOf('"');
    const finish = modeleText.lastIndexOf('"');
    modeleText = modeleText
        .slice(start + 1, finish)
        .replace(/\\n|\\r/g, '')
        .replace(/\\/g, '');
    IconsSrc[<keyof typeof Icons>i] = modeleText;
}
