import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms"; 

// Pipes
import Chunk from "./pipes/chunk";

// Components
import { AppComponent } from './components/app/app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ShelvesComponent } from './pages/shelves/shelves.component';
import { PaginatorComponent } from './components/paginator/paginator.component';

// Services
import { BooksService } from './services/books/books.service';

const appRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'shelves', component: ShelvesComponent },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavbarComponent,
    ShelvesComponent,
    PaginatorComponent,
    Chunk
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [BooksService],
  bootstrap: [AppComponent]
})
export class AppModule { }
