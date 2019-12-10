import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotfoundComponent } from './passport/notfound/notfound.component';
import { LoginGuard } from './uilib/auth/login.guard';

const routes: Routes = [
    { path: '', redirectTo: 'passport/login', pathMatch: 'full' },
    { path: 'passport', loadChildren: './passport/passport.module#AppPassportModule' },
    { path: 'pc', loadChildren: './home/pc.module#PCHomeModule', canActivateChild: [LoginGuard] },
    { path: 'm', loadChildren: './home/m.module#MobileHomeModule', canActivateChild: [LoginGuard] },
    { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
