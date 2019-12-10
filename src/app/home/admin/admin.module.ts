import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppSharedModule } from '../../share.module';
import { ConfigComponent } from './config/config.component';
import { UsermanagementComponent } from './usermanagement/usermanagement.component';
import { UserprofileComponent } from './usermanagement/userprofile/userprofile.component';
import { UserroleComponent } from './usermanagement/userrole/userrole.component';
import { UserlistComponent } from './usermanagement/userlist/userlist.component';
import { RolemanagementComponent } from './rolemanagement/rolemanagement.component';
import { RolelistComponent } from './rolemanagement/rolelist/rolelist.component';
import { RoleprofileComponent } from './rolemanagement/roleprofile/roleprofile.component';
import { RolepermissionComponent } from './rolemanagement/rolepermission/rolepermission.component';
import { LockedUserComponent } from './usermanagement/locked-user/locked-user.component';

const adminRoutes: Routes = [
    { path: 'usermgr', component: UsermanagementComponent},
    { path: 'rolemgr', component: RolemanagementComponent},
    { path: 'config', component: ConfigComponent}
];

@NgModule({
  imports: [
    AppSharedModule,
    RouterModule.forChild(adminRoutes)
  ],
  declarations: [
    ConfigComponent,
    UsermanagementComponent,
    UserlistComponent,
    UserprofileComponent,
    UserroleComponent,
    RolemanagementComponent,
    RolelistComponent,
    RoleprofileComponent,
    RolepermissionComponent,
    LockedUserComponent
  ]
})
export class AdminModule { }
