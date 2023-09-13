import { useState, useEffect } from "react";

const getSavedValue = (key, initialValue) => {
    const savedValue = JSON.parse(localStorage.getItem(key));
    if (savedValue) return savedValue;

    if (initialValue instanceof Function) return initialValue();
    return initialValue;
};

export function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        return getSavedValue(key, initialValue);
    });

    const unique = [];

    for (let i = 0; i < value.length; i++) {
        const element = value[i];

        if (!unique.includes(value[i])) unique.push(element);
        if (unique.length > 3) unique.shift();
    }

    useEffect(() => localStorage.setItem(key, JSON.stringify(unique)), [unique, key]);

    return [value, setValue];
}
