import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routing: Routes = [
  {path: '', component: HomeComponent}
];
export const AppRoutes  = RouterModule.forRoot(routing);
export const URL = 'http://localhost:3000/';