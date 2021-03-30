import React from "react";
import * as moment from "moment";

type useYearTuple = [string | null | undefined, (date: moment.Moment | null) => void]

export function useYear (initialValue: string | null | undefined): useYearTuple {

    const [value, setValue] = React.useState(initialValue);

    const handleChange = (date: moment.Moment | null) => {
        date ? setValue(date.format("YYYY")) : setValue("");
    }

    return [value, handleChange]

}