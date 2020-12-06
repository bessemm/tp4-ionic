import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DoneGuard } from './guards/done.guard';
import { AutologinGuard } from './guards/autologin.guard';
import { HomeGuard } from './guards/home.guard';
const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    canLoad: [DoneGuard, AutologinGuard] // Check if we should show the introduction or forward to inside
  },
  {
    path: 'done',
    loadChildren: () => import('./pages/done/done.module').then( m => m.DonePageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
   //canLoad: [AuthGuard] // Secure all child pages
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
 


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
