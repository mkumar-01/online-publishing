import { Routes } from '@angular/router';
// import { authGuard } from './services/auth.guard';
import { PageNotFound } from './pages/page-not-found/page-not-found';
export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.Dashboard),
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.Dashboard),
    },
    {

        path: 'profile',
        loadComponent: () => import('./pages/profile/profile').then(m => m.Profile),
        // canActivate: [authGuard]
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.Dashboard),
    },
    // {
    //     path: 'detail/:id',
    //     loadComponent: () => import('./pages/detail/detail').then(m => m.Detail),
    //     canActivate: [authGuard]
    // },
    // {
    //     path: 'create-post',
    //     loadComponent: () => import('./pages/create-post/create-post.component').then(m => m.CreatePostComponent),
    //     canActivate: [authGuard]
    // },
    { path: '**', component: PageNotFound }

];
