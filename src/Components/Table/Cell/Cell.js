import React from "react";

const Cell = ({ children, ...rest }) => {
    return <td {...rest}>{children}</td>
}

export default Cell;