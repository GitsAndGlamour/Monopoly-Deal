import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import {AuthService} from '../services/auth/auth.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    try {
      if(!!(this.auth.currentUser || !!this.auth.localUser)) {
        return true
      }
      this.router.navigate(['/welcome', 'signup'])
    } catch (error) {
      // Catch case in which authentication for user is no longer valid despite having a user account stored locally.
      this.auth.localUser = null;
      this.router.navigate(['/welcome', 'signup'])
    }
  }
}
