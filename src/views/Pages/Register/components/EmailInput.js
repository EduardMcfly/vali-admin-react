import React, { Component } from 'react';
import {
  Input,
  FormFeedback,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from 'reactstrap';
import { Translation } from 'react-i18next';
import classNames from 'classnames';

class EmailInput extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { props } = this;
    return (
      <Translation ns="register">
        {t => (
          <InputGroup className="mb-3">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className="fa fa-user" />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              className={classNames({
                'is-invalid': props.emailError,
              })}
              type="text"
              placeholder={t('emailTitle')}
              autoComplete="email"
              name="email"
              value={props.value}
              onChange={e => {
                props.setInputs(e);
                if (props.emailError) {
                  props.resetErrosInputs();
                }
              }}
            />
            <FormFeedback>
              <div
                className={classNames({
                  'c-pointer': props.sentToken.state,
                })}
                onClick={() => {
                  if (props.sentToken.state) {
                    props.sentToken.action();
                  }
                }}
              >
                {props.emailError}
              </div>
            </FormFeedback>
          </InputGroup>
        )}
      </Translation>
    );
  }
}

EmailInput.defaultProps = {
  sentToken: { state: false },
};

export default EmailInput;
