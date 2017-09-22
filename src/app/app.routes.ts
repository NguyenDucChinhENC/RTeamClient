import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StartPageComponent } from './start-page/start-page.component';
import { SignUpComponent } from './start-page/sign-up/sign-up.component';
import { ProfileComponent } from './profile/profile.component';
import { UpdateUserComponent } from './profile/update-user/update-user.component';

export const routing: Routes = [
  {path: '', component: HomeComponent},
  {path: 'users/:id', component: ProfileComponent},
  {path: 'signin', component: StartPageComponent},
  {path: 'signup', component: SignUpComponent},
  {path: 'user/edit', component: UpdateUserComponent }
];
export const AppRoutes  = RouterModule.forRoot(routing);
export const URL = 'http://localhost:3000/';