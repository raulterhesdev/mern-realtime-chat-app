import React from 'react';

const TextInput = (props) => {
  return (
    <React.Fragment>
      <label htmlFor={props.name}>{props.label}</label>
      <input
        type='text'
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
        name={props.name}
        onBlur={props.onBlur}
        onFocus={props.onFocus}
        style={{
          borderColor: props.error ? 'red' : 'blue',
        }}
      />
      <p>{props.errorMessage}</p>
    </React.Fragment>
  );
};

export default TextInput;
