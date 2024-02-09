import {AfterViewInit, Component, ViewChild, Inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { FormControl } from '@angular/forms';
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
    MatTableModule, 
    MatPaginatorModule,
    MatButtonModule, 
    MatDividerModule, 
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ],
  templateUrl: './hr-admin.component.html',
  styleUrl: './hr-admin.component.css'
})

export class HrAdminComponent implements AfterViewInit {

  newRegister= false;

  employee_name: FormControl = new FormControl('');
  employee_lastname: FormControl = new FormControl('');
  employee_email: FormControl = new FormControl('');
  employee_number: FormControl = new FormControl('');

  createNewEmployee(){
    console.info(this.employee_name.value);
  }


  displayedColumns: string[] = ['id', 'employee_number', 'employee_email', 'first_name', 'last_name'];
  dataSource = new MatTableDataSource<Employee>();

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  constructor(private http: HttpClient) {}

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
}

