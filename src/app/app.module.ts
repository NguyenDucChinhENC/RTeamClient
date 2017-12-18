// import { BrowserModule } from '@angular/platform-browser';
// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { provideRoutes} from '@angular/router';
// import { HttpModule } from '@angular/http';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { AppRoutes } from './app.routes'
// import { MdDialogModule, MdCardModule, MdInputModule, MdTooltipModule, MdMenuModule,
//   MdSelectModule, MdDatepickerModule, MdNativeDateModule, MdTabsModule, MdProgressSpinnerModule,
//   MdAutocompleteModule, MdListModule, MdSnackBarModule, MdToolbarModule,
//   MdChipsModule, MdGridListModule, MdSidenavModule, MdCheckboxModule} from '@angular/material';
// import { AppComponent } from './app.component';
// import {MdButtonModule} from '@angular/material';
// import { HeaderComponent } from './header/header.component';
// import { HomeComponent } from './home/home.component';
// import { StartPageComponent } from './start-page/start-page.component';
// import { SignUpComponent } from './start-page/sign-up/sign-up.component';
// import { ProfileComponent } from './profile/profile.component';
// import { UpdateUserComponent } from './profile/update-user/update-user.component';
// import { LoggedInGuard } from './logged-in.guard';
// import { GroupThumbnailComponent } from './group/group-thumbnail/group-thumbnail.component';
// import { GroupListComponent } from './group/group-list/group-list.component';

// @NgModule({
//   declarations: [
//     AppComponent,
//     HeaderComponent,
//     HomeComponent,
//     StartPageComponent,
//     SignUpComponent,
//     ProfileComponent,
//     UpdateUserComponent,
//     GroupThumbnailComponent,
//     GroupListComponent
//   ],
//   imports: [
//     BrowserModule,
//     RouterModule,
//     HttpModule,
//     FormsModule,
//     ReactiveFormsModule,
//     AppRoutes,
//     MdCardModule,
//     MdButtonModule,
//   ],
//   providers: [SignUpComponent, LoggedInGuard],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app.routing';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FooterModule } from './shared/footer/footer.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { LbdModule } from './lbd/lbd.module';

import { AppComponent } from './app.component';

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
import { StartPageComponent } from './start-page/start-page.component';
import { GroupManageComponent } from './group/group-manage/group-manage.component';
import { NewGroupComponent } from './group/new-group/new-group.component';
import { LoggedInGuard } from './logged-in.guard';
import { NewEventComponent } from './event/new-event/new-event.component';
import { DatepickerModule } from 'angular-mat-datepicker';
import { EditEventComponent } from './event/edit-event/edit-event.component';
import { DialogDeleteEvent } from './event/edit-event/edit-event.component';
import { MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignUpComponent } from './start-page/sign-up/sign-up.component';
import { EditorComponent } from './helpers/editor/editor.component';
import { ShowEventComponent } from './event/show-event/show-event.component';
import { ManageEventComponent } from './event/manage-event/manage-event.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    TablesComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    GroupListComponent,
    GroupThumbnailComponent,
    StartPageComponent,
    GroupManageComponent,
    NewGroupComponent,
    NewEventComponent,
    EditEventComponent,
    DialogDeleteEvent,
    SignUpComponent,
    EditorComponent,
    ShowEventComponent,
    ManageEventComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NavbarModule,
    FooterModule,
    SidebarModule,
    BrowserAnimationsModule,
    RouterModule,
    AppRoutingModule,
    LbdModule,
    DatepickerModule,
    MatDialogModule
  ],
  entryComponents: [
    DialogDeleteEvent
  ],
  providers: [LoggedInGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
