export const setDateById = (id, date) => {
    document.querySelector(`#${id} .js__date-input__day`).value =
        date.getDate() - 1;

    document.querySelector(
        `#${id} .js__date-input__month`
    ).value = date.getMonth();

    document.querySelector(`#${id} .js__date-input__year`).value =
        new Date().getFullYear() - 18 - date.getFullYear();
};

export const getDateById = (id) => {
    const dayElem = document.querySelector(`#${id} .js__date-input__day`);
    const monthElem = document.querySelector(`#${id} .js__date-input__month`);
    const yearElem = document.querySelector(`#${id} .js__date-input__year`);
    const date = new Date(
        yearElem.options[yearElem.selectedIndex].label,
        monthElem.value,
        parseInt(dayElem.value) + 1
    );
    return date;
};

export const validateBirthdayById = (id) => {
    // document.querySelector(`#${id} .js__date-input__day`).value =
    //     date.getDate() - 1;
    // document.querySelector(
    //     `#${id} .js__date-input__month`
    // ).value = date.getMonth();
    // document.querySelector(`#${id} .js__date-input__year`).value =
    //     new Date().getFullYear() - 18 - date.getFullYear();
};
