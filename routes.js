import React from 'react';
import Loadable from 'react-loadable';
import { I18n, Trans } from 'react-i18next';
import DefaultLayout from './containers/DefaultLayout';

function Loading() {
    return (
        <div className="overlay container justify-content-center d-flex">
            <div className="row text-center">
                <div className="col-12">
                    <div className="m-loader mr-2 mx-auto" style={{ width: '50%' }}>
                        <svg className="m-circular" viewBox="25 25 50 50">
                            <circle
                                className="path"
                                cx="50"
                                cy="50"
                                r="20"
                                fill="none"
                                strokeWidth="4"
                                strokeMiterlimit="10"
                            />
                        </svg>
                    </div>
                </div>
                <div className="col-12">
                    <h3 className="l-text">
                        <I18n ns="general">{(t, { i18n }) => t('charging')}</I18n>.
                    </h3>
                </div>
            </div>
        </div>
    );
}

const Farm = Loadable({
    loader: () => import('./views/Farm'),
    loading: Loading,
});

const Andres = Loadable({
    loader: () => import('./views/Andres'),
    loading: Loading,
});

const Farms = Loadable({
    loader: () => import('./views/Farms'),
    loading: Loading,
});

const Colors = Loadable({
    loader: () => import('./views/Theme/Colors'),
    loading: Loading,
});

const Typography = Loadable({
    loader: () => import('./views/Theme/Typography'),
    loading: Loading,
});

const Cards = Loadable({
    loader: () => import('./views/Base/Cards'),
    loading: Loading,
});

const Forms = Loadable({
    loader: () => import('./views/Base/Forms'),
    loading: Loading,
});

const Switches = Loadable({
    loader: () => import('./views/Base/Switches'),
    loading: Loading,
});

const Tables = Loadable({
    loader: () => import('./views/Base/Tables'),
    loading: Loading,
});

const Tabs = Loadable({
    loader: () => import('./views/Base/Tabs'),
    loading: Loading,
});

const Breadcrumbs = Loadable({
    loader: () => import('./views/Base/Breadcrumbs'),
    loading: Loading,
});

const Carousels = Loadable({
    loader: () => import('./views/Base/Carousels'),
    loading: Loading,
});

const Collapses = Loadable({
    loader: () => import('./views/Base/Collapses'),
    loading: Loading,
});

const Dropdowns = Loadable({
    loader: () => import('./views/Base/Dropdowns'),
    loading: Loading,
});

const Jumbotrons = Loadable({
    loader: () => import('./views/Base/Jumbotrons'),
    loading: Loading,
});

const ListGroups = Loadable({
    loader: () => import('./views/Base/ListGroups'),
    loading: Loading,
});

const Navbars = Loadable({
    loader: () => import('./views/Base/Navbars'),
    loading: Loading,
});

const Navs = Loadable({
    loader: () => import('./views/Base/Navs'),
    loading: Loading,
});

const Paginations = Loadable({
    loader: () => import('./views/Base/Paginations'),
    loading: Loading,
});

const Popovers = Loadable({
    loader: () => import('./views/Base/Popovers'),
    loading: Loading,
});

const ProgressBar = Loadable({
    loader: () => import('./views/Base/ProgressBar'),
    loading: Loading,
});
const Tooltips = Loadable({
    loader: () => import('./views/Base/Tooltips'),
    loading: Loading,
});

const Buttons = Loadable({
    loader: () => import('./views/Buttons/Buttons'),
    loading: Loading,
});

const ButtonDropdowns = Loadable({
    loader: () => import('./views/Buttons/ButtonDropdowns'),
    loading: Loading,
});

const ButtonGroups = Loadable({
    loader: () => import('./views/Buttons/ButtonGroups'),
    loading: Loading,
});

const BrandButtons = Loadable({
    loader: () => import('./views/Buttons/BrandButtons'),
    loading: Loading,
});

const CoreUIIcons = Loadable({
    loader: () => import('./views/Icons/CoreUIIcons'),
    loading: Loading,
});

const Flags = Loadable({
    loader: () => import('./views/Icons/Flags'),
    loading: Loading,
});

const FontAwesome = Loadable({
    loader: () => import('./views/Icons/FontAwesome'),
    loading: Loading,
});

const SimpleLineIcons = Loadable({
    loader: () => import('./views/Icons/SimpleLineIcons'),
    loading: Loading,
});

const Alerts = Loadable({
    loader: () => import('./views/Notifications/Alerts'),
    loading: Loading,
});

const Badges = Loadable({
    loader: () => import('./views/Notifications/Badges'),
    loading: Loading,
});

const Modals = Loadable({
    loader: () => import('./views/Notifications/Modals'),
    loading: Loading,
});

const Widgets = Loadable({
    loader: () => import('./views/Widgets/Widgets'),
    loading: Loading,
});

const Charts = Loadable({
    loader: () => import('./views/Charts'),
    loading: Loading,
});

const Users = Loadable({
    loader: () => import('./views/Users/Users'),
    loading: Loading,
});

const User = Loadable({
    loader: () => import('./views/Users/User'),
    loading: Loading,
});

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
    { path: '/', exact: true, name: 'home', component: DefaultLayout },
    { path: '/andres', name: 'Andres', component: Andres },
    { path: '/farm/:id', name: 'farm', component: Farm },
    { path: '/farms', name: 'farms', treeview: 3, component: Farms },
    { path: '/theme', exact: true, name: 'theme', component: Colors },
    { path: '/theme/colors', name: 'colors', component: Colors },
    { path: '/theme/typography', name: 'typography', component: Typography },
    { path: '/base', exact: true, name: 'base', component: Cards },
    { path: '/base/cards', name: 'cards', component: Cards },
    { path: '/base/forms', name: 'forms', component: Forms },
    { path: '/base/switches', name: 'switches', component: Switches },
    { path: '/base/tables', name: 'tables', component: Tables },
    { path: '/base/tabs', name: 'tabs', component: Tabs },
    { path: '/base/breadcrumbs', name: 'breadcrumbs', component: Breadcrumbs },
    { path: '/base/carousels', name: 'carousel', component: Carousels },
    { path: '/base/collapses', name: 'collapse', component: Collapses },
    { path: '/base/dropdowns', name: 'dropdowns', component: Dropdowns },
    { path: '/base/jumbotrons', name: 'jumbotrons', component: Jumbotrons },
    { path: '/base/list-groups', name: 'list Groups', component: ListGroups },
    { path: '/base/navbars', name: 'navbars', component: Navbars },
    { path: '/base/navs', name: 'navs', component: Navs },
    { path: '/base/paginations', name: 'paginations', component: Paginations },
    { path: '/base/popovers', name: 'popovers', component: Popovers },
    {
        path: '/base/progress-bar',
        name: 'progress Bar',
        component: ProgressBar,
    },
    { path: '/base/tooltips', name: 'tooltips', component: Tooltips },
    { path: '/buttons', exact: true, name: 'buttons', component: Buttons },
    { path: '/buttons/buttons', name: 'buttons', component: Buttons },
    {
        path: '/buttons/button-dropdowns',
        name: 'button Dropdowns',
        component: ButtonDropdowns,
    },
    {
        path: '/buttons/button-groups',
        name: 'button Groups',
        component: ButtonGroups,
    },
    {
        path: '/buttons/brand-buttons',
        name: 'brand Buttons',
        component: BrandButtons,
    },
    { path: '/icons', exact: true, name: 'icons', component: CoreUIIcons },
    {
        path: '/icons/coreui-icons',
        name: 'coreui Icons',
        component: CoreUIIcons,
    },
    { path: '/icons/flags', name: 'flags', component: Flags },
    {
        path: '/icons/font-awesome',
        name: 'font Awesome',
        component: FontAwesome,
    },
    {
        path: '/icons/simple-line-icons',
        name: 'simple Line Icons',
        component: SimpleLineIcons,
    },
    {
        path: '/notifications',
        exact: true,
        name: 'notifications',
        component: Alerts,
    },
    { path: '/notifications/alerts', name: 'alerts', component: Alerts },
    { path: '/notifications/badges', name: 'badges', component: Badges },
    { path: '/notifications/modals', name: 'modals', component: Modals },
    { path: '/widgets', name: 'widgets', component: Widgets },
    { path: '/charts', name: 'charts', component: Charts },
    { path: '/users', exact: true, name: 'users', component: Users },
    { path: '/users/:id', exact: true, name: 'userDetails', component: User },
];

export default routes;
