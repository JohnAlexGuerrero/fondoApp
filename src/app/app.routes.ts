import { Routes } from '@angular/router';
import { HomeComponent } from './features/dashboard/pages/home-component/home-component';
import { DashboardAportes } from './features/aportes/pages/dashboard-aportes/dashboard-aportes';
import { TransactionsComponent } from './features/transaction/pages/transactions-component/transactions-component';
import { AccountComponent } from './features/accounts/pages/account-component/account-component';
import { TransactionsUser } from './features/transaction/pages/transactions-user/transactions-user';
import { Dashboard } from './features/user/pages/dashboard/dashboard';
import { Event } from './features/events/pages/event/event';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home'
    },
    {
        path: 'transacciones',
        component: TransactionsComponent,
        title: 'Transacciones'
    },
    {
        path: 'transacciones/:id',
        component: TransactionsUser,
        title: 'transacciones miembro'
    },
    {
        path: 'aportes',
        component: DashboardAportes,
        title: 'Aportes'
    },
    {
        path: 'miembros',
        component: AccountComponent,
        title: 'Miembros'
    },
    {
        path: 'miembros/:id',
        component: Dashboard,
        title: 'dashboard miembro'
    },
    {
        path: 'eventos',
        component: Event,
        title: 'Eventos'
    }
];
