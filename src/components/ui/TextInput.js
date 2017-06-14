import React from 'react';

import '../../styles/ui/TextInput.css';

const onChange = (props, event) => {
    props.onChange(props.name, event.target.value);
};

const TextInput = (props) => {
    const name = props.name;
    const label = props.label;
    const value = props.value || '';
    const defaultValue = props.defaultValue;
    const hidden = props.hidden;
    const disabled = props.disabled;

    return (
        <div className={hidden ? 'hide' : 'TextInput'}>
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
        </div>
    );
};

TextInput.propTypes = {
    name: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    value: React.PropTypes.string,
    defaultValue: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    onChange: React.PropTypes.func
};

TextInput.defaultProps = {
    hidden: false,
    disabled: false,
    value: undefined,
    defaultValue: undefined,
    onChange: () => {}
};
export default TextInput;
