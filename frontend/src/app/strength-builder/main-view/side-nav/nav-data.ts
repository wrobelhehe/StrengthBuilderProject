
export interface navBar {
    routeLink: string;
    label: string;
    icon: string;
    role: string[];
}

export const navbarData: navBar[] = [
    {
        routeLink: '/strength-builder/main/home',
        icon: 'home',
        label: 'home',
        role: ['user', 'admin'],

    },
    {
        routeLink: '/strength-builder/main/dashboard',
        icon: 'dashboard',
        label: 'dashboard',
        role: ['user', 'admin'],

    },
    {
        routeLink: '/strength-builder/main/plans',
        icon: 'assignment',
        label: 'plans',
        role: ['user', 'admin'],
    },

    {
        routeLink: '/strength-builder/main/analysis',
        icon: 'timeline',
        label: 'analysis',
        role: ['user', 'admin'],

    },
    {
        routeLink: '/strength-builder/main/exercises',
        icon: 'fitness_center',
        label: 'exercises',
        role: ['admin'],

    },
    {
        routeLink: '/strength-builder/main/categories',
        icon: 'category',
        label: 'categories',
        role: ['admin'],

    },
    {
        routeLink: '/strength-builder/main/users',
        icon: 'supervised_user_circle',
        label: 'users',
        role: ['admin'],

    },
];