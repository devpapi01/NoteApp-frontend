import { Component, OnInit } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';
import { BreakpointObserver, Breakpoints, LayoutModule } from '@angular/cdk/layout';
import { Route, Router, RouterOutlet, RouterLinkWithHref, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../services/auth-service';
@Component({
  selector: 'app-app-bar',
  imports: [
    CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatBadgeModule,
    MatDividerModule,
    MatFormFieldModule,
    LayoutModule,
    RouterOutlet,
    FormsModule,
    MatInputModule,
    RouterOutlet,
    RouterLinkWithHref,
    RouterLink,
  ],
  templateUrl: './app-bar.html',
  styleUrl: './app-bar.css',
})
export class AppBar implements OnInit {
  isHandset$: Observable<boolean>;
  userEmail = '';
  islogin: Boolean = false;

  navItems = [
    { label: 'Mes notes', icon: 'note', route: '/notes' },
    { label: 'Partagées avec moi', icon: 'share', route: '/shared' },
    { label: 'Notes publiques', icon: 'public', route: '/p' },
  ];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private authService: AuthService
  ) {
    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map((result: { matches: any }) => result.matches),
      shareReplay()
    );
  }

  ngOnInit(): void {
    this.userEmail = this.authService.getCurrentUser()?.email || '';

    this.islogin = this.authService.isLoggedIn();
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  logout(): void {
    console.log('Logging out');
    this.authService.logout();
    this.goToLogin();
  }
}
