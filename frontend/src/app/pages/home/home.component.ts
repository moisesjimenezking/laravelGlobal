import { Component } from '@angular/core';

import { EmployeeListComponent } from '@/components/employee-list/employee-list.component';
import { HeaderComponent } from "@/components/header/header.component";

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [EmployeeListComponent, HeaderComponent]
})
export class HomeComponent {

}
