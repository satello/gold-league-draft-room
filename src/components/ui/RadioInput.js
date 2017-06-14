import React from 'react';

import '../../styles/ui/RadioInput.css';

const RadioInput = (props) => {
    const name = props.name;
    const value = props.value;
    const label = props.label;
    const checked = props.checked;
    const onChange = props.onChange;

    return (
        <div className="RadioInput">
            <input
                type="radio"
                name={name}
                id={`${name}-${value}`}
                value={value}
                checked={checked}
                onChange={() => onChange(name, value)}
            />
            <label htmlFor={`${name}-${value}`}>{label}</label>
        </div>
    );
};

RadioInput.propTypes = {
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired,
    label: React.PropTypes.string,
    checked: React.PropTypes.bool,
    onChange: React.PropTypes.func
};

RadioInput.defaultProps = {
    checked: false
};

export default RadioInput;
