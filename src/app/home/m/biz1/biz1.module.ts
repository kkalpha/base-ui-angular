import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Func1Component } from './func1/func1.component';
import { Func2Component } from './func2/func2.component';
import { Func3Component } from './func3/func3.component';
import { Routes, RouterModule } from '@angular/router';
import { AppSharedModule } from 'src/app/share.module';

const biz1Routes: Routes = [
  { path: 'func1', component: Func1Component },
  { path: 'func2', component: Func2Component },
  { path: 'func3',  component: Func3Component }
];

@NgModule({
  imports: [
    CommonModule,
    AppSharedModule,
    RouterModule.forChild(biz1Routes)
  ],
  declarations: [Func1Component, Func2Component, Func3Component]
})
export class Biz1Module { }
