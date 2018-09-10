export default {
    items: [
        {
            name: "regitersCowsTreeview",
            url: "/farms",
            icon: "fa-laptop",
            treeview: 1,
            children: [
                {
                    name: "cows",
                    url: "/farm/:id/buttons",
                    icon: "fa-circle-o"
                },
                {
                    name: "registerProductive",
                    url: "/buttons/button-dropdowns",
                    icon: "fa-keyboard-o"
                },
                {
                    name: "Button groups",
                    url: "/buttons/button-groups",
                    icon: "icon-cursor"
                },
                {
                    name: "Social Buttons",
                    url: "/buttons/social-buttons",
                    icon: "icon-cursor"
                }
            ]
        },
        {
            name: "Colors",
            url: "/theme/colors",
            only: true,
            treeview: 2,
            icon: "icon-drop"
        },
        {
            name: "Typography",
            url: "/theme/typography",
            only: true,
            treeview: 3,
            icon: "icon-pencil"
        },
        {
            name: "Base",
            url: "/base",
            icon: "icon-puzzle",
            treeview: 4,
            children: [
                {
                    name: "Breadcrumbs",
                    url: "/base/breadcrumbs",
                    icon: "icon-puzzle"
                },
                {
                    name: "Cards",
                    url: "/base/cards",
                    icon: "icon-puzzle"
                },
                {
                    name: "Carousels",
                    url: "/base/carousels",
                    icon: "icon-puzzle"
                },
                {
                    name: "Collapses",
                    url: "/base/collapses",
                    icon: "icon-puzzle"
                },
                {
                    name: "Dropdowns",
                    url: "/base/dropdowns",
                    icon: "icon-puzzle"
                },
                {
                    name: "Forms",
                    url: "/base/forms",
                    icon: "icon-puzzle"
                },
                {
                    name: "Jumbotrons",
                    url: "/base/jumbotrons",
                    icon: "icon-puzzle"
                },
                {
                    name: "List groups",
                    url: "/base/list-groups",
                    icon: "icon-puzzle"
                },
                {
                    name: "Navs",
                    url: "/base/navs",
                    icon: "icon-puzzle"
                },
                {
                    name: "Paginations",
                    url: "/base/paginations",
                    icon: "icon-puzzle"
                },
                {
                    name: "Popovers",
                    url: "/base/popovers",
                    icon: "icon-puzzle"
                },
                {
                    name: "Progress Bar",
                    url: "/base/progress-bar",
                    icon: "icon-puzzle"
                },
                {
                    name: "Switches",
                    url: "/base/switches",
                    icon: "icon-puzzle"
                },
                {
                    name: "Tables",
                    url: "/base/tables",
                    icon: "icon-puzzle"
                },
                {
                    name: "Tabs",
                    url: "/base/tabs",
                    icon: "icon-puzzle"
                },
                {
                    name: "Tooltips",
                    url: "/base/tooltips",
                    icon: "icon-puzzle"
                }
            ]
        },
        {
            name: "Buttons",
            url: "/buttons",
            icon: "icon-cursor",
            treeview: 5,
            children: [
                {
                    name: "Buttons",
                    url: "/farm/:id/buttons",
                    icon: "icon-cursor"
                },
                {
                    name: "Button dropdowns",
                    url: "/buttons/button-dropdowns",
                    icon: "icon-cursor"
                },
                {
                    name: "Button groups",
                    url: "/buttons/button-groups",
                    icon: "icon-cursor"
                },
                {
                    name: "Social Buttons",
                    url: "/buttons/social-buttons",
                    icon: "icon-cursor"
                }
            ]
        },
        {
            name: "Charts",
            url: "/charts",
            only: true,
            icon: "icon-pie-chart",
            treeview: 6
        },
        {
            name: "Icons",
            url: "/icons",
            icon: "icon-star",
            treeview: 7,
            children: [
                {
                    name: "Flags",
                    url: "/icons/flags",
                    icon: "icon-star",
                    badge: {
                        variant: "success",
                        text: "NEW"
                    }
                },
                {
                    name: "Font Awesome",
                    url: "/icons/font-awesome",
                    icon: "icon-star",
                    badge: {
                        variant: "secondary",
                        text: "4.7"
                    }
                },
                {
                    name: "Simple Line Icons",
                    url: "/icons/simple-line-icons",
                    icon: "icon-star"
                }
            ]
        },
        {
            name: "Notifications",
            url: "/notifications",
            icon: "icon-bell",
            treeview: 8,
            children: [
                {
                    name: "Alerts",
                    url: "/notifications/alerts",
                    icon: "icon-bell"
                },
                {
                    name: "Badges",
                    url: "/notifications/badges",
                    icon: "icon-bell"
                },
                {
                    name: "Modals",
                    url: "/notifications/modals",
                    icon: "icon-bell"
                }
            ]
        },
        {
            name: "Widgets",
            url: "/widgets",
            icon: "icon-calculator",
            only:true,
            treeview: 10,
            badge: {
                variant: "info",
                text: "NEW"
            }
        },
        {
            divider: true
        },
        {
            name: "Pages",
            url: "/pages",
            treeview: 11,
            icon: "icon-star",
            children: [
                {
                    name: "Login",
                    url: "/login",
                    icon: "icon-star"
                },
                {
                    name: "Register",
                    url: "/register",
                    icon: "icon-star"
                },
                {
                    name: "Error 404",
                    url: "/404",
                    icon: "icon-star"
                },
                {
                    name: "Error 500",
                    url: "/500",
                    icon: "icon-star"
                }
            ]
        },
        {
            name: "Download CoreUI",
            url: "http://coreui.io/react/",
            only: true,
            icon: "icon-cloud-download",
            class: "mt-auto",
            variant: "success"
        },
        {
            name: "Try CoreUI PRO",
            url: "http://coreui.io/pro/react/",
            only: true,
            icon: "icon-layers",
            variant: "danger"
        }
    ]
};