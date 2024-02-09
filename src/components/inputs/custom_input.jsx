import React from "react";
import PropTypes from "prop-types";

function CustomInput(props) {
    return (
        <input
            placeholder={props.placeHolder}
            type={props.type}
            style={{ marginBottom: "10px", padding: "10px 15px" }}
            onChange={props.onChange}
        />
    );
}

CustomInput.propTypes = {
    placeHolder: PropTypes.string,
    type: PropTypes.string,
    onChange: PropTypes.func,
};

export default CustomInput;
