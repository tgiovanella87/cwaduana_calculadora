import React from "react";
import { Field } from "formik";

function Text(props) {
  const { id, name, label, value, placeholder } = props;
  return (
    <label>
      <span>{label}</span>
      <input
        type="text"
        placeholder={placeholder}
        id={id}
        name={name}
        className="rounded-md border-solid border-[1px] w-full p-2"
      />
    </label>
  );
}

export { Text };
