import React, { Component } from 'react';
import classNames from 'classnames';
import { TextCharge } from '../../components';
import { AddFarm } from '../../components';
import { I18n, Trans } from 'react-i18next';
import { log } from 'util';

const FarmsListBuild = response => (
    <li>
        <a href={'#/farm/' + response.obj[0]} className="treeview-item" rel="noopener">
            <i className="icon fa fa-circle-o" />
            {response.obj[1]}
        </a>
    </li>
);

class DefaultAside extends Component {
    constructor(props) {
        super(props);
        this.state = {
            personName: <TextCharge />,
            description: <TextCharge />,
            farmsList: <TextCharge />,
            treeview: 0,
        };
        this.treeview = this.treeview.bind(this);
        this.treeviewShow = this.treeviewShow.bind(this);
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
    treeviewShow(tab) {
        if (this.state.treeview !== tab) {
            this.setState({
                treeview: tab,
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
                    farmsList: this.buildListFarms(farms),
                });
            })
            .catch(error => {
                setTimeout(() => {
                    this.sendInfoUser();
                }, 5000);

            });
    }

    buildListFarms(response) {
        return response.map((farm, i) => <FarmsListBuild obj={farm} key={i} />);
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
                    <I18n ns="aside">
                        {(t, { i18n }) => (
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
                                        <span className="app-menuLabel">{t('regitersCowsTreeview')}</span>
                                        <i className="treeview-indicator fa fa-angle-right" />
                                    </div>
                                    <ul className="treeview-menu">
                                        <li>
                                            <a className="treeview-item" href="listaVacas/index.php?fincaId=1">
                                                <i className="icon fa fa-circle-o" />
                                                {t('cows')}
                                            </a>
                                        </li>
                                        <li>
                                            <a className="treeview-item" href="registroProductivo/index.php?fincaId=1">
                                                <i className="icon fa fa-keyboard-o" />
                                                {t('registerProductive')}
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="treeview-item"
                                                href="listaVacas/index.php?cv=add&amp;fincaId=1"
                                            >
                                                <i className="icon fa fa-pencil-square" />
                                                {t('registerProductive')}
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
                                        <span className="app-menuLabel">{t('suppliesrecordsTreeview')}</span>
                                        <i className="treeview-indicator fa fa-angle-right" />
                                    </div>
                                    <ul className="treeview-menu">
                                        <li>
                                            <a
                                                className="treeview-item"
                                                href="provedoresInsumos/index.php?fincaId=1&amp;insumos"
                                                rel="noopener"
                                            >
                                                <i className="icon fa fa-th" /> {t('supplies')}
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="treeview-item"
                                                href="provedoresInsumos/index.php?fincaId=1&amp;insumos"
                                                rel="noopener"
                                            >
                                                <i className="icon fa fa-th" /> {t('registerSupplies')}
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
                                        <span className="app-menuLabel">{t('farmsTreeview')}</span>
                                        <i className="treeview-indicator fa fa-angle-right" />
                                    </div>
                                    <ul className="treeview-menu">
                                        {this.state.farmsList}
                                        <li>
                                            <div className="treeview-item" onClick={this.AddFarmModal}>
                                                <i className="icon fa fa-pencil-square" />
                                                {t('farmsRegister')}
                                            </div>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        )}
                    </I18n>
                </aside>
            </React.Fragment>
        );
    }
}

export default DefaultAside;
