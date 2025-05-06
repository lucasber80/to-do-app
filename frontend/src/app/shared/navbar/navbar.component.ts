import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { SideBarService } from '../menu-lateral/services/side-bar.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, FormsModule, InputTextModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  constructor(private sidebarService: SideBarService) {}

  abrirMenuLateral() {
    this.sidebarService.sidebarVisible = !this.sidebarService.sidebarVisible;
  }
}
