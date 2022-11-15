import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import { NavComponent } from './pages/nav/nav.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MoviesComponent } from './pages/movies/movies.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateModule } from './pages/create/create.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditModule } from './pages/edit/edit.module';
import { FooterComponent } from './pages/footer/footer.component';
import { ErrorComponent } from './pages/error/error.component';
import { SplashScreenComponent } from './pages/splash-screen/splash-screen.component';
import { ErrorInterceptor } from './interceptors/error-interceptor';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    MoviesComponent,
    FooterComponent,
    ErrorComponent,
    SplashScreenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    CreateModule,
    NgbModule,
    EditModule,
    MatSnackBarModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
