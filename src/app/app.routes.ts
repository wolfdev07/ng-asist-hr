import { Routes } from '@angular/router';
import { FinishRegisterComponent } from './components/finish-register/finish-register.component';
import { RegisterAttendanceComponent } from './components/register-attendance/register-attendance.component';

export const routes: Routes = [
    {path: '', component: RegisterAttendanceComponent},
    {path: 'employees', component: FinishRegisterComponent},
];
