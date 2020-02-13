import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../services/firebase/auth/auth.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
/**
 * Checks authentication and redirects to sign-up screen if not logged in.
 */
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    try {
      if(!!(this.auth.currentUser || !!this.auth.localUser)) {
        return true;
      }
      this.router.navigate(['/welcome', 'signup'])
    } catch (error) {
      // Catch case in which authentication for user is no longer valid despite having a user account stored locally.
      this.auth.localUser = null;
      this.router.navigate(['/welcome', 'signup'])
    }
  }
}
