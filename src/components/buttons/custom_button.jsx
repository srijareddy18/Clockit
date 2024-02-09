import React from "react";
import PropTypes from "prop-types";

function CustomButton(props) {
    return (
        <button
            style={{
                marginBottom: "10px",
                padding: "10px 15px",
                marginTop: "20px",
            }}
            onClick={props.onClick}
        >
            {props.text}
        </button>
    );
}

CustomButton.propTypes = {
    text: PropTypes.string,
    onClick: PropTypes.func,
};

export default CustomButton;
