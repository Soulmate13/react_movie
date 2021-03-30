import React from "react";

type useInputTuple = [string, (name: string) => void]

export function useInput (initialValue: string): useInputTuple {

    const [value, setValue] = React.useState(initialValue);

    function handleSelect(name: string) {
        setValue(name)
    }

    return [value, handleSelect]

}