import { Component } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { SideBarService } from '../../shared/menu-lateral/services/side-bar.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuLateralComponent } from '../../shared/menu-lateral/menu-lateral.component';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { TaskListComponent } from "../tasks/task-list/task-list.component";

@Component({
  selector: 'app-home',
  imports: [
    SidebarModule,
    CommonModule,
    FormsModule,
    MenuLateralComponent,
    NavbarComponent,
    TaskListComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
 
  constructor(public sidebarService: SideBarService) {}
}
