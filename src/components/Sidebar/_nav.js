export default {
  items: [
    {
      name: 'Charts',
      url: '/charts',
      only: true,
      icon: 'fa-pie-chart',
      treeview: 6,
    },
    {
      name: 'Icons',
      url: '/icons',
      icon: 'fa-star',
      treeview: 7,
      children: [
        {
          name: 'Flags',
          url: '/icons/flags',
          icon: 'fa-star',
          badge: {
            variant: 'success',
            text: 'NEW',
          },
        },
        {
          name: 'Font Awesome',
          url: '/icons/font-awesome',
          icon: 'fa-star',
          badge: {
            variant: 'secondary',
            text: '4.7',
          },
        },
        {
          name: 'Simple Line Icons',
          url: '/icons/simple-line-icons',
          icon: 'fa-star',
        },
      ],
    },
    {
      name: 'Notifications',
      url: '/notifications',
      icon: 'fa-bell',
      treeview: 8,
      children: [
        {
          name: 'Alerts',
          url: '/notifications/alerts',
          icon: 'fa-bell',
        },
        {
          name: 'Badges',
          url: '/notifications/badges',
          icon: 'fa-bell',
        },
        {
          name: 'Modals',
          url: '/notifications/modals',
          icon: 'fa-bell',
        },
      ],
    },
    {
      name: 'Widgets',
      url: '/widgets',
      icon: 'fa-calculator',
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
      icon: 'fa-star',
      children: [
        {
          name: 'Login',
          url: '/login',
          icon: 'fa-star',
        },
        {
          name: 'Register',
          url: '/register',
          icon: 'fa-star',
        },
        {
          name: 'Error 404',
          url: '/404',
          icon: 'fa-star',
        },
        {
          name: 'Error 500',
          url: '/500',
          icon: 'fa-star',
        },
      ],
    },
    {
      name: 'Download cosva',
      url: 'https://cosva.cf',
      only: true,
      icon: 'fa-cloud-download',
      class: 'mt-auto',
      variant: 'success',
    },
  ],
};
