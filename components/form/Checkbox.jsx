import React from "react";

function Checkbox(props) {
  const { id, name, label, value } = props;
  return (
    <label className="">
      <input
        type="checkbox"
        value={value}
        id={id}
        name={name}
        className=" m-1 border-sky-600 checked:ring-6 focus:ring-sky-600"
      />
      {label}
    </label>
  );
}

export { Checkbox };
