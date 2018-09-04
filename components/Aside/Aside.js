import React, { Component } from 'react';
import classNames from 'classnames';
import { TextCharge } from '../../components';
import { AddFarm } from '../../components';

const FarmsListBuild = response => (
    <li>
    <div
        className="treeview-item"
        rel="noopener"
    >
        <i className="icon fa fa-circle-o" />
        {response.obj["0"]}
    </div>
</li>
);

class DefaultAside extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: '1',
            personName: <TextCharge />,
            description: <TextCharge />,
            farmsList: <TextCharge />,
            treeview: 3
        };
        this.toggle = this.toggle.bind(this);
        this.treeview = this.treeview.bind(this);
        this.AddFarmModal = this.AddFarmModal.bind(this);
        this.sendInfoUser = this.sendInfoUser.bind(this);
        this.sendInfoUser();
    }

    AddFarmModal() {
        this.farmAdd.toggleAddFarm();
    }
    treeview(tab) {
        if (this.state.treeview !== tab) {
            this.setState({
                treeview: tab,
            });
        } else {
            this.setState({
                treeview: 0,
            });
        }
    }

    sendInfoUser() {
        return axios({
            method: 'post',
            url: './infoUser',
        })
            .then(res => {
                let user = res.data.user['0'];
                let farms = res.data.farms;
                this.setState({
                    personName: user['0'] + ' ' + user['1'],
                    description: user['2'],
                    farmsList: this.buildListFarms(farms)
                });
            })
            .catch(error => {});
    }

    buildListFarms(response){
        return response.map((farm, i) => (
            <FarmsListBuild obj={farm} key={i}/>
        ));
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab,
            });
        }
    }

    render() {
        return (
            <React.Fragment>
                <AddFarm
                    ref={farm => {
                        this.farmAdd = farm;
                    }}
                />
                <aside className="app-sidebar">
                    <div className="user-info" />
                    <div className="app-sidebarUser">
                        <div className="c-pointer">
                            <i
                                className="fa fa-user-circle-o fa-3x mr-2 imgUserNavBar app-sidebarUser-avatar mx-auto"
                                aria-hidden="true"
                            />
                        </div>
                        <div className="c-pointer text-capitalize mx-2 text-truncate container">
                            <div>
                                <div className="app-sidebarUser-name">{this.state.personName}</div>
                            </div>
                            <div className="app-sidebarUser-designation">{this.state.description}</div>
                        </div>
                    </div>
                    <ul className="app-menu">
                        <li
                            onClick={() => {
                                this.treeview(1);
                            }}
                            className={
                                'treeview ' +
                                classNames({
                                    'is-expanded': this.state.treeview == 1,
                                })
                            }
                        >
                            <div className="app-menuItem c-pointer" data-toggle="treeview">
                                <i className="app-menuIcon fa fa-laptop" />
                                <span className="app-menuLabel">Registros de las vacas</span>
                                <i className="treeview-indicator fa fa-angle-right" />
                            </div>
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
                        <li
                            onClick={() => {
                                this.treeview(2);
                            }}
                            className={
                                'treeview ' +
                                classNames({
                                    'is-expanded': this.state.treeview == 2,
                                })
                            }
                        >
                            <div className="app-menuItem c-pointer" data-toggle="treeview">
                                <i className="app-menuIcon fa  fa-th" />
                                <span className="app-menuLabel">Registros de insumos</span>
                                <i className="treeview-indicator fa fa-angle-right" />
                            </div>
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
                        <li
                            onClick={() => {
                                this.treeview(3);
                            }}
                            className={
                                'treeview ' +
                                classNames({
                                    'is-expanded': this.state.treeview == 3,
                                })
                            }
                        >
                            <div className="app-menuItem c-pointer" data-toggle="treeview">
                                <i className="app-menuIcon fa fa-dashboard" />
                                <span className="app-menuLabel">Visualizar Fincas</span>
                                <i className="treeview-indicator fa fa-angle-right" />
                            </div>
                            <ul className="treeview-menu">
                                {this.state.farmsList}
                                <li>
                                    <div className="treeview-item" onClick={this.AddFarmModal}>
                                        <i className="icon fa fa-pencil-square"/>
                                        Registrar Finca
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </aside>
            </React.Fragment>
        );
    }
}

export default DefaultAside;
