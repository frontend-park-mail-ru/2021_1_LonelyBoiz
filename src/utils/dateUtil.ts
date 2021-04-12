export const setDateById = (id: string, date: Date): void => {
    (<HTMLInputElement>(
        document.querySelector(`#${id} .js__date-input__day`)
    )).value = String(date.getDate() - 1);

    (<HTMLInputElement>(
        document.querySelector(`#${id} .js__date-input__month`)
    )).value = String(date.getMonth());

    (<HTMLInputElement>(
        document.querySelector(`#${id} .js__date-input__year`)
    )).value = String(new Date().getFullYear() - 18 - date.getFullYear());
};

export const getDateById = (id: string): Date => {
    const dayElem = <HTMLSelectElement>(
        document.querySelector(`#${id} .js__date-input__day`)
    );
    const monthElem = <HTMLSelectElement>(
        document.querySelector(`#${id} .js__date-input__month`)
    );
    const yearElem = <HTMLSelectElement>(
        document.querySelector(`#${id} .js__date-input__year`)
    );
    const date = new Date(
        Number(yearElem.options[yearElem.selectedIndex].label),
        Number(monthElem.value),
        Number(dayElem.value) + 1
    );
    return date;
};
