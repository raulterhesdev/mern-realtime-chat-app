import React, { useState } from 'react';

import styles from './TextInput.module.css';

const TextInput = (props) => {
  const [labelFloating, setLabelFloating] = useState(false);

  console.log(props.errorMessage);

  return (
    <div className={styles.TextInput}>
      <input
        type='text'
        autoComplete='off'
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        name={props.name}
        onBlur={(e) => {
          if (props.onBlur) {
            props.onBlur(e);
          }
          if (props.value === '') {
            setLabelFloating(false);
          }
        }}
        onFocus={(e) => {
          if (props.onBlur) {
            props.onFocus(e);
          }
          setLabelFloating(true);
        }}
        className={styles.Input}
        style={{
          ...props.style,
          borderColor: props.error ? 'var(--error)' : 'var(--white-50)',
        }}
      />
      <label
        htmlFor={props.name}
        className={!labelFloating ? styles.Label : styles.LabelFocused}
      >
        {props.label}
      </label>
      <p className={styles.Error}>{props.errorMessage}</p>
    </div>
  );
};

export default TextInput;
