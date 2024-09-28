import React, { lazy } from 'react';
import RecoverIdBox from '../pages/Authentication/RecoverIdBox';
import ProfessorConsultar from '../pages/Professor/Consultar';
import ProfessorManter from '../pages/Professor/Manter';
import ServicoConsultar from '@/pages/Servicos/Consultar';
import TipoServicoManter from '@/pages/Servicos/Manter';
import TurmaConsultar from '@/pages/Turma/Consultar';
import TurmaManter from '@/pages/Turma/Manter';
import AlunoConsultar from '@/pages/Aluno/Consultar';
import AlunoManter from '@/pages/Aluno/Manter';
import TurmaAulas from '@/pages/Turma/Aulas';
import TurmaAlunos from '@/pages/Turma/Alunos';
import ManterAula from '@/pages/Turma/Aulas/Manter';
import ServicoManter from '@/pages/Professor/Servico/manter';
import PagamentoManter from '@/pages/Aluno/Pagamento';
import EventoConsultar from '@/pages/Evento/Consultar';
import EquipeConsultar from '@/pages/Equipe/Consultar';
import EventoManter from '@/pages/Evento/Manter';
import EquipeManter from '@/pages/Equipe/Manter';
import EquipeAlunos from '@/pages/Evento/Alunos';
import PlanoConsultar from '@/pages/Plano/Consultar';
import PlanoManter from '@/pages/Plano/Manter';

const Index = lazy(() => import('@/pages/Index/Index'));
const ERROR404 = lazy(() => import('@/pages/Errors/Error404'));
const ERROR500 = lazy(() => import('@/pages/Errors/Error500'));
const ERROR503 = lazy(() => import('@/pages/Errors/Error503'));
const LoginBoxed = lazy(() => import('@/pages/Authentication/LoginBoxed'));
const RegisterBoxed = lazy(() => import('@/pages/Authentication/RegisterBoxed'));

const routes = [
    {
        path: '/',
        element: <Index />
    },

    // Pagina inicial
    {
        path: '/inicio',
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
        path: '/servico/tipo/consultar',
        element: <ServicoConsultar />
    },
    {
        path: '/servico/tipo/cadastrar',
        element: <TipoServicoManter />
    },
    {
        path: '/servico/tipo/editar/:id',
        element: <TipoServicoManter />
    },
    {
        path: '/servico/editar/:idProfessor/:idServico',
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
    {
        path: '/turma/:id/aulas',
        element: <TurmaAulas />
    },
    {
        path: '/turma/:id/alunos',
        element: <TurmaAlunos />
    },

    // Aula
    {
        path: '/aula/cadastrar/:turmaId',
        element: <ManterAula />
    },
    {
        path: '/aula/editar/:turmaId/:aulaId',
        element: <ManterAula />
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

    // Pagamento
    {
        path: '/pagamento/editar/:idAluno/:idPagamento',
        element: <PagamentoManter />
    },

    // Evento
    {
        path: '/evento/consultar',
        element: <EventoConsultar />
    },
    {
        path: '/evento/cadastrar',
        element: <EventoManter />
    },
    {
        path: '/evento/editar/:id',
        element: <EventoManter />
    },

    // Evento
    {
        path: '/plano/consultar',
        element: <PlanoConsultar />
    },
    {
        path: '/plano/cadastrar',
        element: <PlanoManter />
    },
    {
        path: '/plano/editar/:id',
        element: <PlanoManter />
    },

    // Equipe
    {
        path: '/equipe/consultar',
        element: <EquipeConsultar />
    },
    {
        path: '/equipe/cadastrar',
        element: <EquipeManter />
    },
    {
        path: '/equipe/editar/:id',
        element: <EquipeManter />
    },
    {
        path: '/equipe/:id/alunos',
        element: <EquipeAlunos />
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
