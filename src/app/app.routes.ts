import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { BlogPostComponent } from './pages/admin/blog-post/blog-post.component';
import { LoginComponent } from './pages/login/login.component';
import { BlogListComponent } from './pages/blog/list/list.component';
import { BlogDetailComponent } from './pages/blog/detail/detail.component';
import { AboutComponent } from './pages/about/about.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { AuthService } from './services/auth.service';

export const ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'blog',
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: BlogListComponent
      },
      {
        path: 'detail',
        component: BlogDetailComponent
      }
    ]
  },
  {
    path: 'admin',
    canActivate: [AuthService],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'blog-post',
        component: BlogPostComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registration',
    component: RegistrationComponent
  }
];

export const acAppRoutes = RouterModule.forRoot(ROUTES, { enableTracing: true });
