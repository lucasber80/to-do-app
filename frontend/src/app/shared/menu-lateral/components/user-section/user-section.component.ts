import { Component } from '@angular/core';
import { TokenStorageService } from '../../../../core/auth/token-storage.service';
import { User } from '../../../../core/models/user';

@Component({
  selector: 'app-user-section',
  imports: [],
  templateUrl: './user-section.component.html',
  styleUrl: './user-section.component.scss',
})
export class UserSectionComponent {
  usuarioLogado: User | null;

  constructor(private readonly tokenService: TokenStorageService) {
    this.usuarioLogado = this.loadUser();
  }

  private loadUser(): User | null {
    return this.tokenService.getUser();
  }

  getInitials(fullName?: string): string {
    if (!fullName?.trim()) return '';

    const names = fullName.trim().split(/\s+/);
    const first = names[0]?.[0]?.toUpperCase() || '';
    const last = names[names.length - 1]?.[0]?.toUpperCase() || '';

    return names.length === 1 ? first : `${first}${last}`;
  }

  getPrimeiroUltimoNomeFormatado(nomeCompleto?: string): string {
    if (!nomeCompleto?.trim()) return '';

    const nomes = nomeCompleto.trim().split(/\s+/);
    const primeiro = this.capitalize(nomes[0]);

    if (nomes.length === 1) return primeiro;

    const ultimo = this.capitalize(nomes[nomes.length - 1]);
    return `${primeiro} ${ultimo}`;
  }

  private capitalize(palavra: string): string {
    return palavra
      ? palavra[0].toUpperCase() + palavra.slice(1).toLowerCase()
      : '';
  }

  deslogar(): void {
    this.tokenService.signOut();
  }
}
