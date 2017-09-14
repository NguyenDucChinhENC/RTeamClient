import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StartPageComponent } from './start-page/start-page.component';
import { SignUpComponent } from './start-page/sign-up/sign-up.component'

export const routing: Routes = [
  {path: '', component: StartPageComponent},
  {path: 'signup', component: SignUpComponent}
];
export const AppRoutes  = RouterModule.forRoot(routing);
export const URL = 'http://localhost:3000/';