import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { CookieModule } from 'ngx-cookie';

import { AppComponent } from './components/app.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ListCardComponent } from './components/list-card/list-card.component';
import { AddEditListComponent } from './components/add-edit-list/add-edit-list.component';
import { FavoriteComponent } from './components/favorite/favorite.component';

import { AuthService } from './services/auth.service';
import { DbService } from './services/db.service';
import { GeneralFunctionsService } from './services/general-functions.service';

import { environment } from '../environments/environment';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, data: { title: 'Авторизация'} },
  { path: 'calendar', component: CalendarComponent },
  { path: 'favorite', component: FavoriteComponent }
];

export const app = initializeApp(environment.firebase);

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    LoginComponent,
    CalendarComponent,
    ListCardComponent,
    AddEditListComponent,
    FavoriteComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    CookieModule.withOptions(),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AuthService, DbService, GeneralFunctionsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
