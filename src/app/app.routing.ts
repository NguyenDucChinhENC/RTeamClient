import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { TablesComponent } from './tables/tables.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { GroupListComponent } from './group/group-list/group-list.component';
import { GroupThumbnailComponent } from './group/group-thumbnail/group-thumbnail.component';
import { GroupManageComponent } from './group/group-manage/group-manage.component'
import { StartPageComponent } from './start-page/start-page.component';
import { NewGroupComponent } from './group/new-group/new-group.component';
import { NewEventComponent } from './event/new-event/new-event.component';
import { LoggedInGuard } from './logged-in.guard';
import { EditEventComponent } from './event/edit-event/edit-event.component';
import { SignUpComponent } from './start-page/sign-up/sign-up.component';
import { ShowEventComponent } from './event/show-event/show-event.component';

const routes: Routes =[
    { path: 'home',      component: HomeComponent,
      canActivate: [LoggedInGuard] },
    { path: 'user/:id',           component: UserComponent,
      canActivate: [LoggedInGuard] },
    { path: 'table',          component: TablesComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: '',          component: HomeComponent,
      canActivate: [LoggedInGuard]},
    { path: 'groups', component: GroupListComponent},
    { path: 'signin', component: StartPageComponent},
    {path: 'signup', component: SignUpComponent},
    { path: 'groups/:id', component: GroupThumbnailComponent},
    { path: 'group/new', component: NewGroupComponent },
    { path: 'groups/admin/:id', component: GroupManageComponent},
    { path: 'groups/:id/event/new', component: NewEventComponent},
    { path: 'events/edit/:id', component: EditEventComponent},
    { path: 'events/:id', component: ShowEventComponent}
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
export const URL = 'http://localhost:3000/';
