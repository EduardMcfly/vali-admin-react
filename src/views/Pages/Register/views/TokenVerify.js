import React, { Component } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormFeedback,
  Row,
} from 'reactstrap';
import { Translation } from 'react-i18next';
import { Link } from 'react-router-dom';
import EmailInput from '../components/EmailInput';
import axios from 'axios';
import classNames from 'classnames';
import SendEmailToken from '../components/SendEmailToken';
import { Overlay, MessagesTranslate } from '../../../../components';

class TokenVerify extends Component {
  constructor(props) {
    super(props);
    this.validations = true;
    this.tokenSubmit = this.tokenSubmit.bind(this);
    this.state = {
      sendEmailToken: false,
      emailError: { message: false, state: false },
      codeError: { message: false, state: false },
    };
    this.resetErrosInputs = this.resetErrosInputs.bind(this);
    this.resetErrosInput = this.resetErrosInput.bind(this);
    this.validateInputs = this.validateInputs.bind(this);
    this.ad = this.ad.bind(this);
  }

  ad({ elements }) {
    elements.map(obj => {
      if (obj.param) {
        this.props.setInputs({
          target: { name: obj.input, value: obj.param },
        });
      }
    });
  }

  componentWillMount() {
    const { params } = this.props.match;
    this.ad({
      elements: [
        { param: params.token, input: 'code' },
        { param: params.email, input: 'email' },
      ],
    });
  }
  resetErrosInput({ input }) {
    this.setState({
      [input]: { message: false, state: false },
    });
  }
  resetErrosInputs() {
    this.validations = true;
    this.setState({
      sendEmailToken: false,
      emailError: { message: false, state: false },
      codeError: { message: false, state: false },
    });
  }

  errorInputs(errors) {
    if (typeof errors.sendEmail !== 'undefined') {
      this.setState({ sendEmailToken: true });
    }
    this.errorInput(errors.email, 'emailError');
    this.errorInput(errors.code, 'codeError');
  }

  errorInput(error, input) {
    if (typeof error !== 'undefined') {
      this.errorsSet(error, input);
    }
  }

  errorsSet(error, input) {
    if (this.validations) {
      this.validations = false;
    }
    this.setState({
      [input]: { message: error, state: true },
    });
  }

  validateInputs() {
    this.resetErrosInputs();
    if (!this.props.verifyEmail()) {
      this.errorInput(
        <MessagesTranslate type={'email'} />,
        'emailError',
      );
    }
    if (!this.props.verifyCode()) {
      this.errorInput(
        <MessagesTranslate
          type={'numeric'}
          attribute={this.props.code.input}
        />,
        'codeError',
      );
    }
    return this.validations;
  }

  tokenSubmit() {
    if (this.validateInputs()) {
      const { toggleOverlay } = this.props;
      toggleOverlay(true);
      axios({
        method: 'post',
        url: './registerVerifyPin',
        data: {
          email: this.props.email.input,
          code: this.props.code.input,
        },
      })
        .then(res => {
          toggleOverlay(false);
          if (typeof res.data.success !== 'undefined') {
            this.props.verifyRegisterSet(true);
            this.props.history.push('/register/registerUser');
          } else if (typeof res.data.errors !== 'undefined') {
            toggleOverlay(false);
            this.errorInputs(res.data.errors);
          }
        })
        .catch(res => {
          toggleOverlay(false);
          if (typeof res.data.errors !== 'undefined') {
            this.errorInputs(res.data.errors);
          }
        });
    }
  }

  render() {
    const { state } = this;
    return (
      <Translation ns={['register']}>
        {(t, { i18n }) => (
          <Row className="justify-content-center">
            <Col sm={'12'} md={'9'} lg={'6'} xl={'6'} className="p-0">
              <Card className="tileAnimation">
                <CardHeader>
                  <h3>{t('verifyTokenTitle')}</h3>
                  <span className="text-muted">
                    {t('verifyTokenSubtitle')}
                  </span>
                </CardHeader>
                <CardBody className="p-4">
                  <Form>
                    <EmailInput
                      value={this.props.email.input}
                      setInputs={this.props.setInputs}
                      emailError={state.emailError.message}
                      resetErrosInputs={() => {
                        this.resetErrosInput({
                          input: 'emailError',
                        });
                      }}
                      sentToken={{
                        state: state.sendEmailToken,
                        action: () => {
                          this.props.history.push('/register');
                          this.props.setInputs({
                            target: {
                              name: 'code',
                              value: '',
                            },
                          });
                          SendEmailToken(this);
                        },
                      }}
                    />
                    <label className="text-muted" />
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText
                          className={'d-flex justify-content-center'}
                          style={{ width: '40px' }}
                        >
                          <i className="fa fa-slack" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="number"
                        className={classNames({
                          'is-invalid': state.codeError.state,
                        })}
                        placeholder={t('labelCodeRecived')}
                        autoComplete="false"
                        name="code"
                        value={this.props.code.input}
                        onChange={e => {
                          this.props.setInputs(e);
                          if (state.codeError.message) {
                            this.resetErrosInput({
                              input: 'codeError',
                            });
                          }
                        }}
                      />
                      <FormFeedback>
                        {state.codeError.message}
                      </FormFeedback>
                    </InputGroup>
                    <Button
                      onClick={() => this.tokenSubmit()}
                      color="info"
                      block
                    >
                      {t('confirm')}
                    </Button>
                  </Form>
                </CardBody>
                <CardFooter className="p-4">
                  <Row>
                    <Col xs="6" sm="6" className={'mx-auto'}>
                      <Link to={'/register'}>
                        <Button color={'success'} block size={'sm'}>
                          {t('back')}
                        </Button>
                      </Link>
                    </Col>
                  </Row>
                </CardFooter>
                <Overlay state={this.props.overlay} />
              </Card>
            </Col>
          </Row>
        )}
      </Translation>
    );
  }
}
export default TokenVerify;
