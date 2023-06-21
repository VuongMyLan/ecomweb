import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAppleWhole,
    faCaretDown,
    faCaretUp,
    faCloudMeatball,
    faCookieBite,
    faDog,
    faDumpsterFire,
    faUtensils,
} from '@fortawesome/free-solid-svg-icons';

export const SidebarData = [
    {
        title: 'All Products',
        path: '',
        icon: <FontAwesomeIcon icon={faDumpsterFire} />,
    },
    {
        title: 'Fruits & Vegetables',
        path: '/product',
        icon: <FontAwesomeIcon icon={faAppleWhole} />,
        iconClosed: <FontAwesomeIcon icon={faCaretUp} />,
        iconOpened: <FontAwesomeIcon icon={faCaretDown} />,

        subNav: [
            {
                title: 'Fruits',
                path: '/product/fruits',
                icon: null,
            },
            {
                title: 'Vegetables',
                path: '/product/vegetable',
                icon: null,
            },
        ],
    },
    {
        title: 'Meat & Fish',
        path: '/product',
        icon: <FontAwesomeIcon icon={faCloudMeatball} />,
        iconClosed: <FontAwesomeIcon icon={faCaretUp} />,
        iconOpened: <FontAwesomeIcon icon={faCaretDown} />,

        subNav: [
            {
                title: 'Fish',
                path: '/reports/freshfish',
                icon: null,
            },
            {
                title: 'Meat',
                path: '/reports/reports2',
                icon: null,
            },
        ],
    },
    {
        title: 'Snack',
        path: '/product',
        icon: <FontAwesomeIcon icon={faCookieBite} />,
        iconClosed: <FontAwesomeIcon icon={faCaretUp} />,
        iconOpened: <FontAwesomeIcon icon={faCaretDown} />,
        subNav: [
            {
                title: 'Nut & Biscuits',
                path: '/product/nut',
                icon: null,
            },
            {
                title: 'Chocolates',
                path: '/product/chocolates',
                icon: null,
            },
        ],
    },

    {
        title: 'Pet Care',
        path: '/product',
        icon: <FontAwesomeIcon icon={faDog} />,
        iconClosed: <FontAwesomeIcon icon={faCaretUp} />,
        iconOpened: <FontAwesomeIcon icon={faCaretDown} />,

        subNav: [
            {
                title: 'Cat dog',
                path: '/product/catdog',
                icon: null,
            },
            {
                title: 'Message 2',
                path: '/product/catdog',
                icon: null,
            },
        ],
    },
    {
        title: 'Cooking',
        path: '/product',
        icon: <FontAwesomeIcon icon={faUtensils} />,
    },
];
