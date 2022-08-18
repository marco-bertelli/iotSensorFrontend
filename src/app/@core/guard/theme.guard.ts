import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {CurrentThemeService} from '../utils/theme.service';

@Injectable()
export class ThemeGuard implements CanActivate {
  constructor(private router: Router,
              private currentThemeService: CurrentThemeService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.currentThemeService.currentTheme$.pipe(
        map(theme => {
          if (!theme || this.hasExpired(theme)) {
            this.router.navigate(['themes']);
          }
          return true;
        }));
  }

  private hasExpired(theme): boolean {
    const currentThemeExpiration = JSON.parse(theme).expires_in;
    const currentDate = new Date().getTime();
    return currentDate > currentThemeExpiration;
  }
}
