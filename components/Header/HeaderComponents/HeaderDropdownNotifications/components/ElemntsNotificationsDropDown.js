import React, { Component } from 'react';
import PropTypes from 'prop-types';
import i18next from '../../../../../i18n';

class ElemntsNotificationsDropDown extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        /**
         * @return Array
         * Is declared in the file AppTools/index.js
         */
        var timer = timerIntConverter(this.props.time)

        return (
            <li>
                <a className="app-notificationItem" href="javascript:;">
                    <span className="app-notificationIcon">
                        <span className="fa-stack fa-lg">
                            <i className="fa fa-circle fa-stack-2x text-primary" />
                            <i className="fa fa-envelope fa-stack-1x fa-inverse" />
                        </span>
                    </span>
                    <div>
                        <p className="app-notificationMessage">{this.props.message}</p>
                        <p className="app-notificationMeta">{i18next.t("time."+timer[0], {count: timer[1]})}</p>
                    </div>
                </a>
            </li>
        );
    }
}

ElemntsNotificationsDropDown.defaultProps = {
    message: 'stranger',
    time: 322323,
};

ElemntsNotificationsDropDown.propTypes = {
    message: PropTypes.string,
    time: PropTypes.number,
};

export default ElemntsNotificationsDropDown;
