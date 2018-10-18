import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Checkbox extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <label className="switch switch-3d switch-label switch-sm switch-pill switch-success form-check-label">
                <input
                    type="checkbox"
                    className="switch-input form-check-input"
                    name={this.props.name}
                    checked={this.props.checked}
                    onChange={this.props.onChange}
                />
                <span className="switch-slider" />
            </label>
        );
    }
}

Checkbox.propTypes = {
    checked: PropTypes.bool,
    name: PropTypes.string,
    onChange: PropTypes.func,
};
Checkbox.defaultProps = {
    checked: false,
    onChange: e => {},
};

export default Checkbox;
