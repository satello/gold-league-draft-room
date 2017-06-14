import React from 'react';

import '../../styles/ui/SubdomainInput.css';

const onChange = (props, event) => {
  props.onChange(props.name, event.target.value);
};

const SubdomainInput = (props) => {
  const name = props.name;
  const label = props.label;
  const value = props.value;
  const defaultValue = props.defaultValue;
  const hidden = props.hidden;
  const disabled = props.disabled;

  return (
    <div className={hidden ? 'hide' : 'SubdomainInput'}>
      <label htmlFor={name}>{label}</label>
      <input
        type="text"
        id={name}
        name={name}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        onChange={onChange.bind(null, props)}
      />
      <span>{props.domain}</span>
    </div>
  );
};

SubdomainInput.propTypes = {
  name: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  value: React.PropTypes.any,
  defaultValue: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  onChange: React.PropTypes.func,
  domain: React.PropTypes.string
};

SubdomainInput.defaultProps = {
  hidden: false,
  disabled: false,
  value: undefined,
  defaultValue: undefined,
  onChange: () => {},
  domain: '.consultationkit.com'
};
export default SubdomainInput;
