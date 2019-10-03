import React, { Component } from 'react';
import {
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormFeedback,
  ButtonGroup,
  Button,
  Modal,
  ModalFooter,
  ModalBody,
  ModalHeader,
} from 'reactstrap';
import { Translation } from 'react-i18next';
import axios from 'axios';

class AddFarmWorkers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalAddFarmWorkers: true,
      modalAddFarmWorkersTitle: '',
      sendLogin: false,
      email: '',
      emailError: { message: false },
    };
    this.toggleAddFarmWorkers = this.toggleAddFarmWorkers.bind(this);
    this.userFarmCreate = this.userFarmCreate.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  resetErrosInputs() {
    this.setState({
      emailError: { message: false },
    });
  }

  toggleAddFarmWorkers(
    proxy,
    action = !this.state.modalAddFarmWorkers,
  ) {
    this.setState({
      modalAddFarmWorkers: action,
    });
  }

  userFarmCreate() {
    this.setState({ sendLogin: true });
    axios({
      method: 'post',
      url: './addUserFarm',
      data: { email: this.state.email, farmId: this.props.farmId },
    })
      .then(res => {
        this.resetErrosInputs();
        if (typeof res.data.success !== 'undefined') {
          if (typeof this.props.reload !== 'undefined') {
            this.props.reload();
          }
          this.toggleAddFarmWorkers(false);
        }
        if (typeof res.data.errors !== 'undefined') {
          this.setState({ sendLogin: false });
          var errors = res.data.errors;
          this.errorInputs(errors);
        }
      })
      .catch(res => {
        this.setState({ sendLogin: false });
        if (typeof res.data.errors !== 'undefined') {
          var errors = res.data.errors;
          this.errorInputs(errors);
        }
      });
  }

  errorInputs(errors) {
    this.resetErrosInputs();
    this.errorInput(errors.email, 'emailError');
  }

  errorInput(error, input) {
    if (typeof error !== 'undefined') {
      this.errorsChange(error, input);
    }
  }

  errorsChange(error, input) {
    this.setState({
      [input]: { message: error },
    });
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    return (
      <Translation ns="farm">
        {t => (
          <React.Fragment>
            <Modal
              isOpen={this.state.modalAddFarmWorkers}
              toggle={this.toggleAddFarmWorkers}
              className={
                (this.props.className,
                'modal-dialog-centered modal-md')
              }
            >
              <ModalHeader
                toggle={this.toggleAddFarmWorkers}
                className="text-uppercase"
              >
                {t('addUser')}
              </ModalHeader>
              <ModalBody>
                <span>
                  Tenga en cuenta que el trabajador ya debe estar
                  <b className="font-weight-bold"> registrado </b>
                  en el sistema.
                </span>
                <InputGroup className="mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fa fa-user" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    className={
                      this.state.emailError.message
                        ? 'is-invalid'
                        : ''
                    }
                    type="email"
                    placeholder={t('addEmailUser')}
                    autoComplete="email"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleInputChange}
                  />
                  <FormFeedback>
                    {this.state.emailError.message}
                  </FormFeedback>
                </InputGroup>
              </ModalBody>
              <Translation ns="general">
                {t => (
                  <ModalFooter>
                    <ButtonGroup>
                      <Button
                        color="primary"
                        onClick={this.userFarmCreate}
                      >
                        {t('save')}
                      </Button>
                      <Button
                        color="secondary"
                        onClick={this.toggleAddFarmWorkers}
                      >
                        {t('cancel')}
                      </Button>
                    </ButtonGroup>
                  </ModalFooter>
                )}
              </Translation>
            </Modal>
          </React.Fragment>
        )}
      </Translation>
    );
  }
}

export default AddFarmWorkers;
