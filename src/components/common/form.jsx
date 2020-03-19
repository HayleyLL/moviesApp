import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options); //第一个参数是我们想要验证的对象；第二个是schema
    if (!error) return null; //error属性为空则返回null
    const errors = {};

    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    //input
    const obj = { [name]: value }; //property动态地设置
    const schema = { [name]: this.schema[name] }; //一个sub-schema; 因为应该只有要验证的输入域的property;key应该动态设置，其值应该是重用函数外的schema中相对应的key的值
    const { error } = Joi.validate(obj, schema); //不用this.state.data作为参数，因为这不是验证整个表单，只是验证某个输入域

    return error ? error.details[0].message : null;
  }; //这里需要abortEarly,因为从可用性角度，对特定输入域，只需要一次显示一个错误信息

  handleSubmit = e => {
    e.preventDefault();
    // prevent full page load; 不将表单提交到服务器

    const errors = this.validate(); //返回一个如同state中的errors的对象;没有errors,返回null
    this.setState({ errors: errors || {} });
    if (errors) return; //有errors就不会call the server

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    //e.currentTarget
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name]; //输入错误则将state中errors的相应输入域错误数据修改了

    const data = { ...this.state.data }; //复制state
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  renderButton(label, click) {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }

  renderInput(name, label, autoFocus = false, type = "text") {
    const { data, errors } = this.state;
    return (
      <Input
        type={type} //text是其设置的默认值
        autoFocus={autoFocus}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderSelect(name, label, options) {
    const { data, errors } = this.state;

    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
}

export default Form;
