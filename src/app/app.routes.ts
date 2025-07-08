import { Routes } from '@angular/router';
// import { authGuard } from './services/auth.guard';
import { PageNotFound } from './pages/page-not-found/page-not-found';
import { AuthGuard } from '@auth0/auth0-angular';
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
        path: 'authors',
        loadComponent: () => import('./pages/authors/authors.component').then(m => m.AuthorsComponent),
        canActivate: [AuthGuard]
    },
    {
        path: 'artical/:id',
        loadComponent: () => import('./pages/articledetail/articledetail.component').then(m => m.ArticledetailComponent),
        canActivate: [AuthGuard]
    },
    {
        path: 'create-post',
        loadComponent: () => import('./pages/create-post/create-post.component').then(m => m.CreatePostComponent),
        canActivate: [AuthGuard]
    },
    { path: '**', component: PageNotFound }

];
