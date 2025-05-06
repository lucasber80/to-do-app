import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TokenStorageService } from '../../core/auth/token-storage.service';
import { UserSectionComponent } from './components/user-section/user-section.component';

@Component({
  selector: 'app-menu-lateral',
  imports: [CommonModule, RouterModule, TooltipModule, UserSectionComponent],
  templateUrl: './menu-lateral.component.html',
  styleUrl: './menu-lateral.component.scss',
})
export class MenuLateralComponent {
  @Input() isSideBar: boolean = false;
  ref: DynamicDialogRef | undefined;

  loading = false;
  constructor(
    private tokenService: TokenStorageService,
    private router: Router,
    public dialogService: DialogService
  ) {}

  deslogar() {
    this.tokenService.signOut();
  }

  isActive(route: string): boolean {
    return this.router.url.split('?')[0] === route;
  }
}
