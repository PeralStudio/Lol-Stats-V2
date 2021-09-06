import { useState, useEffect } from 'react';

const getSavedValue = (key, initialValue) => {

    const savedValue = JSON.parse(localStorage.getItem(key));
    if (savedValue) return savedValue

    if (initialValue instanceof Function) return initialValue();
    return initialValue;
}

export function useLocalStorage(key, initialValue) {

    const [value, setValue] = useState(() => {
        return getSavedValue(key, initialValue);
    });

    const unicos = [];

    for (let i = 0; i < value.length; i++) {
        const elemento = value[i];

        if (!unicos.includes(value[i])) unicos.push(elemento);
        if (unicos.length > 3) unicos.shift();
    }

    useEffect(() => localStorage.setItem(key, JSON.stringify(unicos)), [unicos, key]);

    return [value, setValue];
}