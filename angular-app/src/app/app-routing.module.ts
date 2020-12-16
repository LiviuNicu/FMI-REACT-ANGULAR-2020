import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ScoreDisplayComponent } from './pages/score-display/score-display.component';
import { PublicGuard } from './guards/public.guard';
import { PrivateGuard } from './guards/private.guard';
import { RegisterDemoComponent } from './pages/register-demo/register-demo.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [PublicGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [PublicGuard],
  },
  {
    path: 'register/demo',
    component: RegisterDemoComponent,
    canActivate: [PublicGuard],
  },
  {
    path: 'score',
    component: ScoreDisplayComponent,
    canActivate: [PrivateGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
