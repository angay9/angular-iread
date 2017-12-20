import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// Pipes
import Chunk from "./pipes/chunk";

// Components
import { AppComponent } from './components/app/app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ShelvesComponent } from './pages/shelves/shelves.component';
import { PaginatorComponent } from './components/paginator/paginator.component';

// guards
import { LoggedInGuard } from './auth/logged_in';
import { GuestGuard } from './auth/guest';

// Services
import { BooksService } from './services/books/books.service';
import { GoogleService } from './services/google/google.service';
import { ExploreComponent } from './pages/explore/explore.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthService } from './services/auth/auth.service';
import { routes } from './routes/routes';

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        NavbarComponent,
        ShelvesComponent,
        PaginatorComponent,
        Chunk,
        ExploreComponent,
        LoginComponent,
        RegisterComponent,
    ],
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        RouterModule.forRoot(routes)
    ],
    providers: [
        BooksService,
        GoogleService,
        AuthService,
        LoggedInGuard,
        GuestGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
