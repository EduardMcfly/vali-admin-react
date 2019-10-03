import React, { Component } from "react";
import PropTypes from "prop-types";
import i18next from "../../../../../../i18n";
import timerIntConverter  from "../../../../../../app-utilities/timerConverter";
import classNames from "classnames";

class ElemntsNotificationsDropDown extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    /**
     * @return Array
     * Is declared in the file AppTools/index.js
     */
    var timer = timerIntConverter(this.props.time);

    return (
      <li>
        <a className="app-notificationItem" href="javascript:;">
          <span className="app-notificationIcon">
            <span className="fa-stack fa-lg">
              <i
                className={classNames(
                  "fa fa-circle fa-stack-2x",
                  this.props.color
                )}
              />
              <i
                className={classNames(
                  "fa fa-stack-1x fa-inverse",
                  this.props.icon
                )}
              />
            </span>
          </span>
          <div>
            <p className="app-notificationMessage">{this.props.message}</p>
            <p className="app-notificationMeta">
              {i18next.t("time." + timer[0], {
                count: timer[1]
              })}
            </p>
          </div>
        </a>
      </li>
    );
  }
}

ElemntsNotificationsDropDown.defaultProps = {
  message: "stranger",
  time: 322323,
  icon: "fa-envelope",
  color: "text-primary"
};

ElemntsNotificationsDropDown.propTypes = {
  message: PropTypes.string,
  time: PropTypes.number,
  icon: PropTypes.string,
  color: PropTypes.string
};

export default ElemntsNotificationsDropDown;
