import { Routes } from "@angular/router";
import { ExploreComponent } from '../pages/explore/explore.component';
import { LoginComponent } from '../pages/login/login.component';
import { RegisterComponent } from '../pages/register/register.component';
import { ShelvesComponent } from '../pages/shelves/shelves.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { LoggedInGuard } from '../auth/logged_in';
import { GuestGuard } from "../auth/guest";

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent},
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent, canActivate: [LoggedInGuard] },
    { path: 'shelves', component: ShelvesComponent, canActivate: [LoggedInGuard] },
    { path: 'explore', component: ExploreComponent, canActivate: [LoggedInGuard] },
    { path: '**', redirectTo: 'dashboard' },
];
