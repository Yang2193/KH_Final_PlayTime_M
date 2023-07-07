import React from "react";

const JoinButton = ({ onClick, children, ...rest }) => {
    const handleButtonClick = () => {
        onClick();
    }

    return (
        <button
        onClick={handleButtonClick}
        variant="contained"
        size="large"
        sx={{
            borderRadius:5,
            backgoundColor: "white",
            color: "black",
            ...rest.sx
        }}
        >
            {children}
        </button>
    );
}

export default JoinButton;