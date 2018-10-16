export default {
    items: [
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
            name: 'Download cosva',
            url: 'https://cosva.cf',
            only: true,
            icon: 'icon-cloud-download',
            class: 'mt-auto',
            variant: 'success',
        }
    ],
};
