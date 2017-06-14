import React from 'react';

import '../../styles/ui/ConsultationMethod.css';

const ConsultationMethod = (props) => {
    const name = props.name;
    const value = props.value;
    const label = props.label;
    const image = props.image;
    const checked = props.checked;
    const onChange = props.onChange;

    return (
        <div
            onClick={() => onChange(name, value)}
            className={`ConsultationMethod text-center ${checked ? 'chosen' : ''}`}>
            <img src={image} alt={label}/>
            <span>{label}</span>
        </div>
    );
};

ConsultationMethod.propTypes = {
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired,
    label: React.PropTypes.string,
    image: React.PropTypes.string,
    checked: React.PropTypes.bool,
    onChange: React.PropTypes.func
};

ConsultationMethod.defaultProps = {
    checked: false
};

export default ConsultationMethod;
