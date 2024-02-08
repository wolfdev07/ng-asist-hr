import { Component } from '@angular/core';

@Component({
  selector: 'app-finish-register',
  standalone: true,
  imports: [],
  templateUrl: './finish-register.component.html',
  styleUrl: './finish-register.component.css'
})
export class FinishRegisterComponent {

  employeeData: any; // Declaración de la propiedad datosEmpleado

  constructor() { }

  ngOnInit(): void {
    // Recuperar el objeto guardado en localStorage
    const datosGuardadosString = localStorage.getItem('employeeData');
    // Verificar si se recuperaron los datos correctamente
    if (datosGuardadosString !== null) {
      const datosGuardados = JSON.parse(datosGuardadosString);
      // Asignar los datos a una propiedad del componente para poder acceder a ellos en el template HTML
      this.employeeData = datosGuardados;
    }
  }


  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      // Aquí puedes hacer algo con el archivo seleccionado, como subirlo al servidor o procesarlo
      console.log('Archivo seleccionado:', selectedFile);
    }
  }


  openCamera() {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        // El usuario ha permitido el acceso a la cámara
        // Puedes mostrar la transmisión de la cámara en un elemento de vídeo o capturar una imagen
      })
      .catch(error => {
        console.error('Error al acceder a la cámara:', error);
      });
  }
}
