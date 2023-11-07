import { NgModule } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorComponent } from './CommonFolder/error/error.component';
import { NavigationComponent } from './CommonFolder/navigation/navigation.component';
import { PostComponent } from './CommonFolder/post/post.component';
import { AddPostComponent } from './Pages/add-post/add-post.component';
import { HomeComponent } from './Pages/home/home.component';
import { LoginComponent } from './Pages/login/login.component';
import { PostListComponent } from './Pages/post-list/post-list.component';
import { SignupComponent }  from './Pages/sign-up/sign-up.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthinterceptorInterceptor } from './Services/authinterceptor.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    NavigationComponent,
    PostComponent,
    AddPostComponent,
    HomeComponent,
    LoginComponent,
    PostListComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],

  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthinterceptorInterceptor, multi:true},],
bootstrap: [AppComponent]
})
export class AppModule { }
