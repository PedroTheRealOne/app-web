import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { JwtModule } from "@auth0/angular-jwt";

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LayoutComponent } from './pages/layout/layout.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';

import { SignupComponent } from './components/signup/signup.component';
import { SpinnerLoadingComponent } from './components/spinner-loading/spinner-loading.component';
import { TweetComponent } from './components/tweet/tweet.component';

import { ReactiveFormsModule } from '@angular/forms';

export const tokenGetter = (): string | null => localStorage.token as string;

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    LayoutComponent,
    SpinnerLoadingComponent,
    TweetComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      }
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
