
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { withLatestFrom, filter } from 'rxjs/operators';
import { NbThemeService } from '@nebular/theme';

import { AnalyticsService } from './@core/utils/analytics.service';
import { AbService } from './@core/utils/ab.service';
import { SeoService } from './@core/utils/seo.service';
import { CurrentThemeService } from './@core/utils/theme.service';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  themes = ['default', 'cosmic', 'corporate', 'dark', 'material-dark', 'material-light'];

  constructor(private analytics: AnalyticsService,
              private seoService: SeoService,
              private activatedRoute: ActivatedRoute,
              private abService: AbService,
              private themeService: NbThemeService,
              private currentThemeService: CurrentThemeService) {

    this.themeService.onThemeChange()
      .subscribe((theme: any) => {
        this.analytics.trackEvent('changeTheme', theme.name);
      });

    this.activatedRoute.queryParams
      .subscribe((params: any) => {
        if (params.theme && this.themes.includes(params.theme)) {
          this.themeService.changeTheme(params.theme);
          this.currentThemeService.setCurrentTheme(params.theme);
        } else {
          this.themeService.changeTheme(this.currentThemeService.getCurrentTheme());
        }
      });
  }

  ngOnInit(): void {
    this.themeService.changeTheme('corporate');
  }
}
