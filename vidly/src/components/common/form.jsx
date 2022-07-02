import React, { Component } from 'react';
import Joi from 'joi-browser';

import Input from './input';
import Select from './select';

class Form extends Component {
  state = { data: {}, errors: {} };

  validateProperty = ({ name, value }) => {
    const objToValidate = { [name]: value }; // username: ... ya da password: ... şeklinde bir obje oluşturur.
    const schemaToUse = { [name]: this.schema[name] };

    const { error } = Joi.validate(objToValidate, schemaToUse);
    return error ? error.details[0].message : null;
  };

  validate = () => {
    const joiOptions = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, joiOptions);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);

    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  renderButton(label) {
    return (
      <button
        type='submit'
        className='btn btn-primary'
        disabled={this.validate()}
        onClick={this.handleSubmit}
      >
        {label}
      </button>
    );
  }

  // type = 'text' eğer parametre geçilmemişse text olarak alır
  renderInput(name, text, type = 'text', step = '1.0') {
    const { data, errors } = this.state;

    return (
      <Input
        name={name}
        text={text}
        type={type}
        step={step}
        value={data[name]}
        error={errors[name]}
        onChange={this.handleChange}
      />
    );
  }

  renderSelect(name, text, options) {
    const { data, errors } = this.state;

    return (
      <Select
        name={name}
        value={data[name]}
        text={text}
        options={options}
        error={errors[name]}
        onChange={this.handleChange}
      />
    );
  }
}

export default Form;
