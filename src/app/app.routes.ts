import { Routes } from '@angular/router';
import { FinishRegisterComponent } from './components/finish-register/finish-register.component';
import { RegisterAttendanceComponent } from './components/register-attendance/register-attendance.component';
import { HrAdminComponent } from './components/hr-admin/hr-admin.component';

export const routes: Routes = [
    {path: '', component: RegisterAttendanceComponent},
    {path: 'employees', component: FinishRegisterComponent},
    {path: 'admin-hr', component:  HrAdminComponent},
];
