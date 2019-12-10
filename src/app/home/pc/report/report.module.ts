import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppSharedModule } from 'src/app/share.module';
import { BarComponent } from './bar/bar.component';
import { PieComponent } from './pie/pie.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'bar', component: BarComponent },
  { path: 'pie', component: PieComponent }
];

@NgModule({
  imports: [
    AppSharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
  BarComponent,
  PieComponent,
  DashboardComponent
],
  providers: [

  ]
})
export class ReportModule { }
