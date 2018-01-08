import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class NotLoggedInGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (localStorage.getItem('currentUser')) {
      return false;
    }
    this.router.navigate(['/']);
    return true;
  }
}