import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { RequestOptions } from '@angular/http';
import { AuthHeaderInterceptor } from "./http/auth_header_interceptor";
import { BaseUrlInterceptor } from "./http/base_url_interceptor";

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
        HttpClientModule,
        FormsModule,
        RouterModule.forRoot(routes)
    ],
    providers: [
        BooksService,
        GoogleService,
        AuthService,
        LoggedInGuard,
        GuestGuard,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthHeaderInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: BaseUrlInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
