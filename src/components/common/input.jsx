import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  //rest operater deconstruct the props
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input {...rest} id={name} name={name} className="form-control" />
      {error && <div className="alert alert-danger">{error}</div>}
    </div> //当error为truthy,才渲染错误信息
  );
};

export default Input;
