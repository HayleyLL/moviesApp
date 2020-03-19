import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
class RegisterForm extends Form {
  state = { data: { username: "", password: "", name: "" }, errors: {} }; //keys是相应输入域的name, 值是error message; 初始化为空字符串

  schema = {
    username: Joi.string()
      .email()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password"),
    name: Joi.string()
      .required()
      .label("Name")
  };

  doSubmit = () => {
    console.log("Registered");
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username", true, "email")}
          {this.renderInput("password", "Password", false, "password")}
          {this.renderInput("name", "Name", false)}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
