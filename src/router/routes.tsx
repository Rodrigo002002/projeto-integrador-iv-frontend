import React, { lazy } from 'react';
import RecoverIdBox from '../pages/Authentication/RecoverIdBox';
import ProfessorConsultar from '../pages/Professor/Consultar';
import ProfessorManter from '../pages/Professor/Manter';

const Index = lazy(() => import('../pages/Index/Index'));
const ERROR404 = lazy(() => import('../pages/Errors/Error404'));
const ERROR500 = lazy(() => import('../pages/Errors/Error500'));
const ERROR503 = lazy(() => import('../pages/Errors/Error503'));
const LoginBoxed = lazy(() => import('../pages/Authentication/LoginBoxed'));
const RegisterBoxed = lazy(() => import('../pages/Authentication/RegisterBoxed'));

const routes = [
    {
        path: '/',
        element: <Index />
    },

    // Autenticação

    {
        path: '/auth/login',
        element: <LoginBoxed />,
        layout: 'blank'
    },
    {
        path: '/auth/register',
        element: <RegisterBoxed />,
        layout: 'blank'
    },
    {
        path: '/auth/recover',
        element: <RecoverIdBox />,
        layout: 'blank'
    },
    {
        path: '/auth/recover',
        element: <RecoverIdBox />,
        layout: 'blank'
    },

    // Professor

    {
        path: '/professor/consultar',
        element: <ProfessorConsultar />
    },
    {
        path: '/professor/cadastrar',
        element: <ProfessorManter />
    },
    {
        path: '/professor/editar/:id',
        element: <ProfessorManter />
    },

    // Errors


    {
        path: '/error/404',
        element: <ERROR404 />,
        layout: 'blank'
    },

    {
        path: '/error/500',
        element: <ERROR500 />,
        layout: 'blank'
    },

    {
        path: '/error/503',
        element: <ERROR503 />,
        layout: 'blank'
    },
];

export { routes };
