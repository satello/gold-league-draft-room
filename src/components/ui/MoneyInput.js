import React from 'react';

import '../../styles/ui/MoneyInput.css';

const onChange = (props, event) => {
    props.onChange(props.name, event.target.value);
};

const MoneyInput = (props) => {
    const name = props.name;
    const label = props.label;
    const value = props.value;
    const defaultValue = props.defaultValue;
    const hidden = props.hidden;
    const disabled = props.disabled;

    return (
        <div className={hidden ? 'hide' : 'MoneyInput'}>
            <label htmlFor={name}>{label}</label>
            <span>$</span>
            <input
                type="number"
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

MoneyInput.propTypes = {
    name: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    value: React.PropTypes.any,
    defaultValue: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    onChange: React.PropTypes.func
};

MoneyInput.defaultProps = {
    hidden: false,
    disabled: false,
    value: undefined,
    defaultValue: undefined,
    onChange: () => {}
};
export default MoneyInput;
