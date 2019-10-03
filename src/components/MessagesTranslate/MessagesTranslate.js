import React, { Component } from 'react';
import { Translation } from 'react-i18next';
import PropTypes from 'prop-types';

class MessagesTranslate extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { props } = this;
    return (
      <Translation ns={[props.ns]}>
        {t =>
          t(props.type, {
            attribute: props.attribute,
          })
        }
      </Translation>
    );
  }
}

MessagesTranslate.propTypes = {
  ns: PropTypes.string,
  attribute: PropTypes.string,
  type: PropTypes.string.isRequired,
};

MessagesTranslate.defaultProps = {
  ns: 'validations',
  attribute: '',
};

export default MessagesTranslate;
