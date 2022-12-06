import React from "react";

function Dropdown(props) {
  const { id, name, options, placeholder, label } = props;
  return (
    <label htmlFor={id}>
      <div className="mr-1">{label}</div>
      <div>
        <select
          id={id}
          name={name}
          className="p-2 rounded-lg bg-white border-solid border-[1px] focus:border-sky-400 w-full"
        >
          <option disabled>{placeholder}</option>
          <option value="br">Brasil</option>
          <option value="us">Estados Unidos</option>
        </select>
      </div>
    </label>
  );
}

export { Dropdown };
