/**
 * Выполняет fetch запрос
 *
 * @param {{element:Node,
 *         newStatus:string,
 *         newBottom:string,
 *         newTop:string,
 *         newChild}} data
 */
export function formItemSetParams(data) {
    if (!data || !data.element) {
        return;
    }
    const childrens = Array.from(data.element.childNodes).filter((item, i) => {
        return item.classList;
    });
    if (data.newStatus) {
        if (data.newStatus == 'valid') {
            data.element.classList.add('form-item_valid');
            data.element.classList.remove('form-item_error');
        } else if (data.newStatus == 'error') {
            data.element.classList.add('form-item_error');
            data.element.classList.remove('form-item_valid');
        } else {
            data.element.classList.remove('form-item_valid');
            data.element.classList.remove('form-item_error');
        }
    }

    if ('newTop' in data) {
        if (data.newTop.length == 0) {
            childrens[0].classList.add('hiden');
        } else {
            childrens[0].classList.remove('hiden');
        }
        childrens[0].innerHTML = data.newTop;
    }

    if ('newChild' in data) {
        if (data.newChild.length == 0) {
            childrens[1].classList.add('hiden');
        } else {
            childrens[1].classList.remove('hiden');
        }
        childrens[1].innerHTML = data.newChild;
    }
    
    if ('newBottom' in data) {
        if (data.newBottom.length == 0) {
            childrens[2].classList.add('hiden');
        } else {
            childrens[2].classList.remove('hiden');
        }
        childrens[2].innerHTML = data.newBottom;
    }
}
