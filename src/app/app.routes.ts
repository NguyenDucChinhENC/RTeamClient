import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StartPageComponent } from './start-page/start-page.component';
import { SignUpComponent } from './start-page/sign-up/sign-up.component';
import { ProfileComponent } from './profile/profile.component';
import { UpdateUserComponent } from './profile/update-user/update-user.component';
import { LoggedInGuard } from './logged-in.guard';
import { GroupThumbnailComponent } from './group/group-thumbnail/group-thumbnail.component';
import { GroupListComponent } from './group/group-list/group-list.component'
export const routing: Routes = [
  {path: '', component: HomeComponent},
  {path: 'users/:id', component: ProfileComponent,
    canActivate: [LoggedInGuard]},
  {path: 'signin', component: StartPageComponent},
  {path: 'signup', component: SignUpComponent},
  {path: 'user/edit', component: UpdateUserComponent,
    canActivate: [LoggedInGuard]},
  {path: 'groups/:id', component: GroupThumbnailComponent,
    canActivate: [LoggedInGuard]},
  {path: 'groups', component: GroupListComponent,
    canActivate: [LoggedInGuard]}
];
export const AppRoutes  = RouterModule.forRoot(routing);
export const URL = 'http://localhost:3000/';