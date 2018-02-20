import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'login',  component: LoginComponent },
]; 

// using { useHash: true } lets us make changes to recompile angular source files again without getting whitelabel page thing
@NgModule({
  imports: [ RouterModule.forRoot(routes, { useHash: true }) ],
  // imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
