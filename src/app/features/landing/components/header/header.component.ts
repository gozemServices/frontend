import { CommonModule } from '@angular/common';
import { Component, inject, Inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../../auth/auth.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { LocaleSwitcherComponent } from "../../../../shared/components/locale-switcher/locale-switcher.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TranslateModule, FontAwesomeModule, CommonModule, RouterModule, FontAwesomeModule, LocaleSwitcherComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  isOpen = false;
  isAuthenticated = false;
  userRole !: string | null;
  faUser = faUser;
  private authService = inject(AuthService);
  constructor(    
  ){}
  
  ngOnInit(): void {
      this.fetchInfos();
  }
  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }

  fetchInfos() {
      this.isAuthenticated = this.authService.isLoggedIn();
      this.userRole = this.authService.getUserRole();
  }

}
