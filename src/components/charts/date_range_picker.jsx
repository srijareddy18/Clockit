import React from "react";
import { DateRange } from "react-date-range";
import { getDateFilter } from "../../operations/user_operations";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

function CustomDateRangePicker(props) {
    return (
        <DateRange
            editableDateInputs={true}
            onChange={(item) => props.setFilter(getDateFilter(item.selection))}
            moveRangeOnFirstSelection={false}
            ranges={[{ ...props.filter, key: "selection" }]}
        />
    );
}

export default CustomDateRangePicker;
