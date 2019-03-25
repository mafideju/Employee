import React from 'react'

const InputField = ({
  name,
  placeholder,
  value,
  label,
  error,
  info,
  type,
  onChange,
  disabled
}) => {
  return (
    <div className={`${error ? 'redAlert' : ''}`}>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        noValidate />
      {error ? error : ''}
      {info ? info : ''}
    </div>
  )
}

export default InputField;