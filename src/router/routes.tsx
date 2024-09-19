import React, { lazy } from 'react';
import RecoverIdBox from '../pages/Authentication/RecoverIdBox';
import ProfessorConsultar from '../pages/Professor/Consultar';
import ProfessorManter from '../pages/Professor/Manter';
import ServicoConsultar from '@/pages/Servicos/Consultar';
import ServicoManter from '@/pages/Servicos/Manter';
import TurmaConsultar from '@/pages/Turma/Consultar';
import TurmaManter from '@/pages/Turma/Manter';
import AlunoConsultar from '@/pages/Aluno/Consultar';
import AlunoManter from '@/pages/Aluno/Manter';

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

    // Servico
    {
        path: '/servico/consultar',
        element: <ServicoConsultar />
    },
    {
        path: '/servico/cadastrar',
        element: <ServicoManter />
    },
    {
        path: '/servico/editar/:id',
        element: <ServicoManter />
    },

    // Turma
    {
        path: '/turma/consultar',
        element: <TurmaConsultar />
    },
    {
        path: '/turma/cadastrar',
        element: <TurmaManter />
    },
    {
        path: '/turma/editar/:id',
        element: <TurmaManter />
    },

    // Aluno
    {
        path: '/aluno/consultar',
        element: <AlunoConsultar />
    },
    {
        path: '/aluno/cadastrar',
        element: <AlunoManter />
    },
    {
        path: '/aluno/editar/:id',
        element: <AlunoManter />
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
    }
];

export { routes };
