import React from "react";

const Select = ({ name, label, error, options, ...rest }) => {
  //rest operater deconstruct the props
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select name={name} className="form-control" id={name} {...rest}>
        <option value="" />
        {options.map(option => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
