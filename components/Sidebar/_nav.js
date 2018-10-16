export default {
    items: [
        {
            name: 'Colors',
            url: '/theme/colors',
            only: true,
            treeview: 2,
            icon: 'icon-drop',
        },
        {
            name: 'Typography',
            url: '/theme/typography',
            only: true,
            treeview: 3,
            icon: 'icon-pencil',
        },
        {
            name: 'Buttons',
            url: '/buttons',
            icon: 'icon-cursor',
            treeview: 5,
            children: [
                {
                    name: 'Button dropdowns',
                    url: '/buttons/button-dropdowns',
                    icon: 'icon-cursor',
                },
                {
                    name: 'Button groups',
                    url: '/buttons/button-groups',
                    icon: 'icon-cursor',
                },
            ],
        },
        {
            name: 'Charts',
            url: '/charts',
            only: true,
            icon: 'icon-pie-chart',
            treeview: 6,
        },
        {
            name: 'Icons',
            url: '/icons',
            icon: 'icon-star',
            treeview: 7,
            children: [
                {
                    name: 'Flags',
                    url: '/icons/flags',
                    icon: 'icon-star',
                    badge: {
                        variant: 'success',
                        text: 'NEW',
                    },
                },
                {
                    name: 'Font Awesome',
                    url: '/icons/font-awesome',
                    icon: 'icon-star',
                    badge: {
                        variant: 'secondary',
                        text: '4.7',
                    },
                },
                {
                    name: 'Simple Line Icons',
                    url: '/icons/simple-line-icons',
                    icon: 'icon-star',
                },
            ],
        },
        {
            name: 'Notifications',
            url: '/notifications',
            icon: 'icon-bell',
            treeview: 8,
            children: [
                {
                    name: 'Alerts',
                    url: '/notifications/alerts',
                    icon: 'icon-bell',
                },
                {
                    name: 'Badges',
                    url: '/notifications/badges',
                    icon: 'icon-bell',
                },
                {
                    name: 'Modals',
                    url: '/notifications/modals',
                    icon: 'icon-bell',
                },
            ],
        },
        {
            name: 'Widgets',
            url: '/widgets',
            icon: 'icon-calculator',
            only: true,
            treeview: 10,
            badge: {
                variant: 'info',
                text: 'NEW',
            },
        },
        {
            divider: true,
        },
        {
            name: 'Pages',
            url: '/pages',
            treeview: 11,
            icon: 'icon-star',
            children: [
                {
                    name: 'Login',
                    url: '/login',
                    icon: 'icon-star',
                },
                {
                    name: 'Register',
                    url: '/register',
                    icon: 'icon-star',
                },
                {
                    name: 'Error 404',
                    url: '/404',
                    icon: 'icon-star',
                },
                {
                    name: 'Error 500',
                    url: '/500',
                    icon: 'icon-star',
                },
            ],
        },
        {
            name: 'Download CoreUI',
            url: 'http://coreui.io/react/',
            only: true,
            icon: 'icon-cloud-download',
            class: 'mt-auto',
            variant: 'success',
        },
        {
            name: 'Try CoreUI PRO',
            url: 'http://coreui.io/pro/react/',
            only: true,
            icon: 'icon-layers',
            variant: 'danger',
        },
    ],
};
