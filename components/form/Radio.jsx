import React from "react";

function Radio(props) {
  const { id, name, label, value } = props;
  return (
    <div className="radio-switch">
      <input
        type="radio"
        value={value}
        id={id}
        name={name}
        className="border-slate-600 checked:ring-2 mr-1 hidden"
      />
      <label
        className="inline-block w-full text-center p-1 bg-white rounded-md"
        htmlFor={value}
      >
        {label}
      </label>
    </div>
  );
}

function RadioGroup(props) {}

export { Radio, RadioGroup };
