import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';


@Component({
  selector: 'app-title-asist-hr',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, MatMenuModule, MatIconModule],
  templateUrl: './title-asist-hr.component.html',
  styleUrl: './title-asist-hr.component.css'
})
export class TitleAsistHrComponent {

}
