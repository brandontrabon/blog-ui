import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import {
  BsDatepickerModule,
  ButtonsModule,
  ModalModule,
  PaginationModule,
  TabsModule,
  TimepickerModule
} from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { BlogPostComponent } from './pages/admin/blog-post/blog-post.component';
import { HomeComponent } from './pages/home/home.component';
import { BlogListComponent } from './pages/blog/list/list.component';
import { BlogDetailComponent } from './pages/blog/detail/detail.component';

import { acAppRoutes } from './app.routes';
import { AboutComponent } from './pages/about/about.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { AppInputComponent } from './components/app-input/app-input.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    BlogPostComponent,
    HomeComponent,
    BlogListComponent,
    BlogDetailComponent,
    AboutComponent,
    RegistrationComponent,
    AppInputComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    acAppRoutes,
    BsDatepickerModule.forRoot(),
    ButtonsModule.forRoot(),
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    TabsModule.forRoot(),
    TimepickerModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
