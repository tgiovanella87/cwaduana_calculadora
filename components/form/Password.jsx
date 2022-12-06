import React from "react";

function Password(props) {
  const { id, name, label, value, placeholder } = props;
  return (
    <label>
      <span>{label}</span>
      <input
        type="password"
        placeholder={placeholder}
        id={id}
        name={name}
        className="rounded-md border-solid border-[1px] border-gray-400 w-full p-2"
      />
    </label>
  );
}

export { Password };
