import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent }   from './login/login-page-component';
import { SearchPageComponent }  from "./search/search-page-component";

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login',  component: LoginPageComponent },
    { path: 'search',  component: SearchPageComponent },
    // { path: 'detail/:id', component: HeroDetailComponent },
];
@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}