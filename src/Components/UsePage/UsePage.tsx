import React from "react";

type useInputTuple = [number | undefined, (number: number | undefined) => void]

export function usePage (initialValue: number | undefined): useInputTuple {

    const [value, setValue] = React.useState(initialValue);

    function handleChange(number: number | undefined) {
        setValue(number)
    }

    return [value, handleChange]

}