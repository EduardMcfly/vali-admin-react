import React from 'react';
import PropTypes from 'prop-types';
import { Translation } from 'react-i18next';
import { Col } from 'reactstrap';
import classNames from 'classnames';
import { MessagesTranslate } from '../../';
class Target extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { props } = this;
    const {
      title,
      onClick,
      icon,
      iconSize,
      iconType,
      iconNode,
      iconPosition,
      ns,
      sizeText,
      fontWeight,
      cPointer,
      textTruncate,
      iconTruncate,
    } = props;
    return (
      <div
        className={classNames('tile', cPointer ? 'c-pointer' : '')}
        onClick={() => onClick()}
      >
        <div
          className={classNames(
            iconTruncate ? 'text-truncate' : '',
            sizeText,
          )}
        >
          {icon ? (
            !iconNode ? (
              <i
                className={classNames(
                  'fa',
                  iconSize,
                  iconType,
                  iconPosition,
                )}
                aria-hidden="true"
              />
            ) : (
              iconNode
            )
          ) : null}
        </div>
        <div
          className={classNames(
            textTruncate ? 'text-truncate' : '',
            sizeText,
            fontWeight,
            'tile-body',
          )}
        >
          <span>
            <MessagesTranslate type={title} ns={ns} />
          </span>
        </div>
      </div>
    );
  }
}

Target.propTypes = {
  title: PropTypes.string.isRequired,
  textTruncate: PropTypes.bool,
  iconNode: PropTypes.node,
};

Target.defaultProps = {
  onClick: () => {},
  icon: true,
  textTruncate: true,
  iconTruncate: true,
  sizeText: 'h4',
  fontWeight: 'font-weight-light',
  cPointer: true,
  iconNode: false,
  iconSize: 'fa-3x',
  iconType: 'fa-inbox',
  iconPosition: 'd-block',
  ns: 'general',
};
export default Target;
