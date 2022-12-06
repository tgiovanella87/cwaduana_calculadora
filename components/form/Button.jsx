import React from "react";

function Button(props) {
  const { id, label, className, type = "button", onClick = () => {} } = props;
  return (
    <button type={type} id={id} className={className} onClick={onClick}>
      {label}
    </button>
  );
}

export { Button };
