import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { provideRoutes} from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutes } from './app.routes'
import { MdDialogModule, MdCardModule, MdInputModule, MdTooltipModule, MdMenuModule,
  MdSelectModule, MdDatepickerModule, MdNativeDateModule, MdTabsModule, MdProgressSpinnerModule,
  MdAutocompleteModule, MdListModule, MdButtonModule, MdSnackBarModule, MdToolbarModule,
  MdChipsModule, MdGridListModule, MdSidenavModule, MdCheckboxModule} from '@angular/material';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { StartPageComponent } from './start-page/start-page.component';
import { SignUpComponent } from './start-page/sign-up/sign-up.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    StartPageComponent,
    SignUpComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutes,
    MdCardModule,
    MdButtonModule
  ],
  providers: [SignUpComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
