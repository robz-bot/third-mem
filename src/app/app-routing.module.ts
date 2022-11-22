import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EventsComponent } from './pages/events/events.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { NewMemComponent } from './pages/new-mem/new-mem.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';
import { AuthGuard } from './shared-components/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent },
  { path: 'dashboard', component: DashboardComponent , canActivate: [AuthGuard] },
  { path: 'forgot-password', component: ForgetPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  { path: 'new-mem', component: NewMemComponent },
  { path: 'memories', component: GalleryComponent },
  { path: 'new-event', component: EventsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
