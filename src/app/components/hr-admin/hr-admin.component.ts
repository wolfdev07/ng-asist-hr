import {AfterViewInit, Component, ViewChild, Inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr';



export interface Employee {
  id: number;
  employee_number: string;
  employee_email: string;
  first_name: string;
  last_name: string;
}




@Component({
  selector: 'app-hr-admin',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule, 
    MatPaginatorModule,
    MatButtonModule, 
    MatDividerModule, 
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
    ],
  templateUrl: './hr-admin.component.html',
  styleUrl: './hr-admin.component.css'
})

export class HrAdminComponent implements AfterViewInit {

  newRegister= false;

  new_employee_name: FormControl = new FormControl('');
  new_employee_lastname: FormControl = new FormControl('');
  new_employee_email: FormControl = new FormControl('',  Validators.required);
  new_employee_number: FormControl = new FormControl('', Validators.required);

  

  createNewEmployee(){
    if(this.new_employee_email.valid && this.new_employee_number.valid && this.new_employee_name && this.new_employee_lastname.valid){
      console.info(this.new_employee_name.value);
      this.postEmployeData();
    } else {
      this.showError("Completa los campos")
    }
  }


  displayedColumns: string[] = ['id', 'employee_number', 'employee_email', 'first_name', 'last_name'];
  dataSource = new MatTableDataSource<Employee>();

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  constructor(private http: HttpClient, private toastr: ToastrService, private router: Router) {
  }

  showError(text: string, title: string = 'Error') {
    this.toastr.error(text, title)
  }

  showSuccess(text: string, title: string ='Registro Exitoso'){
    this.toastr.success(text, title)
  }

  getErrorMessage() {
    if (this.new_employee_email.hasError('required')) {
      return 'Debes ingresar un valor';
    }

    return this.new_employee_email.hasError('email') ? 'Correo electrónico no válido' : '';
  }


  getErrorEmployeeNumber() {
    if (this.new_employee_number.hasError('required')) {
      return 'Debes ingresar un valor';
    } else if (this.new_employee_number.hasError('minlength')) {
      return 'Al menos 10 caracteres';
    } else if (this.new_employee_number.hasError('maxlength')) {
      return 'Máximo 10 caracteres';
    }
  
    return '';
  }


  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
      this.getEmployeesData();
    }
  }
  //https://backend-hr-w7ws2dwj5a-ew.a.run.app/
  getEmployeesData() {
    this.http.get<Employee[]>('https://backend-hr-w7ws2dwj5a-ew.a.run.app/asistApi/list-create-employee/')
      .subscribe(
        response => {
          this.dataSource.data = response;
        },
        error => {
          console.error('Error al obtener datos de empleados:', error);
        }
      );
  }

  postEmployeData() {
    const data = {
      employee_email: this.new_employee_email.value,
      employee_number: this.new_employee_number.value,
      first_name: this.new_employee_name.value,
      last_name: this.new_employee_lastname.value
    };

    interface EmployeeResponse {
      id: number;
      employee_number: string;
      employee_email: string;
      first_name: string;
      last_name: string;
    }

    this.http.post<EmployeeResponse>('https://backend-hr-w7ws2dwj5a-ew.a.run.app/asistApi/list-create-employee/', data)
    .subscribe(
    response => {
      console.log('Respuesta del servidor:', response);
      
      // Construir el mensaje de éxito
      const successMessage = `Registro exitoso para el empleado ${response.employee_number}, ${response.first_name}`;

      // Mostrar la notificación de éxito

      this.showSuccess(successMessage, 'Registro Exitoso');

      setTimeout(() => {
        window.location.reload();
      }, 3000);
    },
    error => {
      console.error('Error al enviar datos:', error);
      // Puedes manejar los errores aquí
      if (error.error.employee_email){
        this.showError(error.error.employee_email);
      } else {
        this.showError(error.error.employee_number);
      }
    }
  );
  }
}

