import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-register-attendance',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register-attendance.component.html',
  styleUrl: './register-attendance.component.css'
})
export class RegisterAttendanceComponent {
  registerEmployee = false;

  email = new FormControl('', [Validators.required, Validators.email]);
  employeeNumber = new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10),  Validators.pattern('[0-9]{10}')])
  photoToUpload: any;
  
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Debes ingresar un valor';
    }

    return this.email.hasError('email') ? 'Correo electrónico no válido' : '';
  }

  getErrorEmployeeNumber() {
    if (this.employeeNumber.hasError('required')) {
      return 'Debes ingresar un valor';
    } else if (this.employeeNumber.hasError('minlength')) {
      return 'Al menos 10 caracteres';
    } else if (this.employeeNumber.hasError('maxlength')) {
      return 'Máximo 10 caracteres';
    }
  
    return '';
  }

  constructor(private http: HttpClient, private router: Router,
    private toastr: ToastrService) {}
  
  showError(text: string, title: string = 'Error') {
    this.toastr.error(text, title)
  }

  sendData() {
    if (this.email.valid && this.employeeNumber.valid) {
      const datos = {
        employee_email: this.email.value,
        employee_number: this.employeeNumber.value,
        photo: this.photoToUpload
      };

      console.info(datos);
      //https://backend-hr-w7ws2dwj5a-ew.a.run.app/
      //http://127.0.0.1:8000/
      this.http.post('http://127.0.0.1:8000/asistApi/lookup/', datos)
        .subscribe(
          response => {
            console.log('Respuesta del servidor:', response);
            localStorage.setItem('employeeData', JSON.stringify(response));
            this.registerAttendance(datos, this.photoToUpload);
            
          },
          error => {
            console.error('Error al enviar datos:', error);
            // Puedes manejar los errores aquí
            this.showError(error.error.message);
          }
        );
    } else {
      console.error('Formulario inválido. Por favor, verifica los campos.');
      // Puedes manejar el caso de formulario inválido aquí
    }
  }

  handleFileInput(event: any) {
    const files = event?.target?.files;
    if (files && files.length > 0) {
      this.photoToUpload = files[0];
    } else {
      console.error('No se ha seleccionado ningún archivo.');
    }
  }


  registerAttendance(datos: any, photo: File ) {
    // Crear un objeto FormData para enviar la foto y el número de empleado
    const formData = new FormData();
    formData.append('employee_number', datos.employee_number);
    formData.append('photo', photo);

    // Enviar el FormData al backend
    this.http.post('http://127.0.0.1:8000/asistApi/attendance/', formData)
      .subscribe(
        response => {
          console.log('Respuesta del servidor:', response);
          // Navegar a la página de éxito o realizar otra acción según sea necesario
          localStorage.setItem('attendanceData', JSON.stringify(response));
          this.router.navigate(['employees'])
        },
        error => {
          console.error('Error al enviar datos:', error);
          // Puedes manejar los errores aquí
          this.showError(error.error.message);
        }
      );
  }
}
