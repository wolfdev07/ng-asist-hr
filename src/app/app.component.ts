import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TitleAsistHrComponent } from './components/title-asist-hr/title-asist-hr.component';
import { FooterAsistHrComponent } from './components/footer-asist-hr/footer-asist-hr.component';
import { RegisterAttendanceComponent } from './components/register-attendance/register-attendance.component';
import {MatButtonModule} from '@angular/material/button';
import { FinishRegisterComponent } from './components/finish-register/finish-register.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TitleAsistHrComponent, 
    FooterAsistHrComponent, RegisterAttendanceComponent, MatButtonModule, 
  FinishRegisterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'asistHR';
}
