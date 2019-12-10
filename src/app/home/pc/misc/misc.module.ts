import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppSharedModule } from 'src/app/share.module';
import { FileComponent } from './file/file.component';
import { FileUploadComponent } from './file/file-upload/file-upload.component';
import { FileDownloadComponent } from './file/file-download/file-download.component';


const routes: Routes = [
  { path: 'file', component: FileComponent }
];

@NgModule({
  imports: [
    AppSharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    FileComponent,
    FileUploadComponent,
    FileDownloadComponent
  ]
})
export class MiscModule { }
