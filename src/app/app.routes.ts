import { Routes } from '@angular/router';
// import { authGuard } from './services/auth.guard';
import { PageNotFound } from './pages/page-not-found/page-not-found';
import { AuthGuard } from '@auth0/auth0-angular';
import { Dashboard } from './pages/dashboard/dashboard';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { RxjsPlayGroundComponent } from './components/rxjs-play-ground/rxjs-play-ground.component';
import { UserListComponent } from './user-list/user-list.component';
export const routes: Routes = [
    {
        path: '',
        component: Dashboard
        // loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.Dashboard),
    },
    {
        path: 'dashboard',
        component: Dashboard
        // loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.Dashboard),
    },
    {
        path: 'rxjs-playground',
        component: RxjsPlayGroundComponent
        // loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.Dashboard),
    },
    {
        path: 'userslist',
        component: UserListComponent
        // loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.Dashboard),
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
        component: CreatePostComponent,
        // loadComponent: () => import('./pages/create-post/create-post.component').then(m => m.CreatePostComponent),
        canActivate: [AuthGuard]
    },
    { path: '**', component: PageNotFound }

];
