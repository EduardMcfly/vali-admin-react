import React, { Component } from 'react';
import { Nav, NavItem, NavLink, Progress, TabContent, TabPane, ListGroup, ListGroupItem } from 'reactstrap';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { AppSwitch } from '@coreui/react';

const propTypes = {
    children: PropTypes.node,
};

const defaultProps = {};

class DefaultAside extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1',
        };
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab,
            });
        }
    }

    render() {
        // eslint-disable-next-line
        const { children, ...attributes } = this.props;

        return (
            <React.Fragment>
                <aside className="app-sidebar">
                    <div className="user-info" />
                    <div className="app-sidebar__user">
                        <a href="perfilUsuario/index.php">
                            <i
                                className="fa fa-user-circle-o fa-3x mr-2 imgUserNavBar app-sidebar__user-avatar mx-auto"
                                aria-hidden="true"
                            />
                        </a>
                        <div className="text-capitalize mx-2 text-truncate">
                            <a href="perfilUsuario/index.php" className="btn-primary">
                                <p className="app-sidebar__user-name">Eduard andres castellanos torres </p>
                            </a>
                            <p className="app-sidebar__user-designation">LA CAMPIÑA</p>
                        </div>
                    </div>
                    <ul className="app-menu">
                        <li className="treeview active">
                            <a className="app-menu__item" href="#" data-toggle="treeview">
                                <i className="app-menu__icon fa fa-laptop" />
                                <span className="app-menu__label">Registros de las vacas</span>
                                <i className="treeview-indicator fa fa-angle-right" />
                            </a>
                            <ul className="treeview-menu">
                                <li>
                                    <a className="treeview-item" href="listaVacas/index.php?fincaId=1">
                                        <i className="icon fa fa-circle-o" />
                                        Vacas
                                    </a>
                                </li>
                                <li>
                                    <a className="treeview-item" href="registroProductivo/index.php?fincaId=1">
                                        <i className="icon fa fa-keyboard-o" />
                                        Registro Productivo
                                    </a>
                                </li>
                                <li>
                                    <a className="treeview-item" href="listaVacas/index.php?cv=add&amp;fincaId=1">
                                        <i className="icon fa fa-pencil-square" />
                                        Registrar Vacas
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="treeview">
                            <a className="app-menu__item" href="#" data-toggle="treeview">
                                <i className="app-menu__icon fa  fa-th" />
                                <span className="app-menu__label">Registros de insumos</span>
                                <i className="treeview-indicator fa fa-angle-right" />
                            </a>
                            <ul className="treeview-menu">
                                <li>
                                    <a
                                        className="treeview-item"
                                        href="provedoresInsumos/index.php?fincaId=1&amp;insumos"
                                        rel="noopener"
                                    >
                                        <i className="icon fa fa-th" /> Insumos
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="treeview is-expanded">
                            <a className="app-menu__item" href="#" data-toggle="treeview">
                                <i className="app-menu__icon fa fa-dashboard" />
                                <span className="app-menu__label">Visualizar Fincas</span>
                                <i className="treeview-indicator fa fa-angle-right" />
                            </a>
                            <ul className="treeview-menu">
                                <li>
                                    <a
                                        className="treeview-item"
                                        href="welcome.php?fincaId=1"
                                        target="_blank"
                                        rel="noopener"
                                    >
                                        <i className="icon fa fa-circle-o" />
                                        LA CAMPIÑA
                                    </a>
                                </li>
                                <li>
                                    <a className="treeview-item" href="index.php?cf=add" target="_blank" rel="noopener">
                                        <i className="icon fa fa-pencil-square" />
                                        Registrar Finca
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </aside>
            </React.Fragment>
        );
    }
}

DefaultAside.propTypes = propTypes;
DefaultAside.defaultProps = defaultProps;

export default DefaultAside;
