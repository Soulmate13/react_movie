import React from "react";

type useGenresTuple = [number[], (number: number) => void, (number: number) => void]

export function useGenres (initialValue: number[]): useGenresTuple {

    const [value, setValue] = React.useState(initialValue);

    function handleAdd(option: number) {
        let currentGenres = [...value];
        currentGenres.push(option);
        setValue(currentGenres);
    }

    function handleRemove(option: number) {
        let currentGenres = [...value];
        let filteredGenres = currentGenres.filter(genre => genre !== option);
        setValue(filteredGenres);
    }

    return [value, handleAdd, handleRemove]

}