import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ThemeGuard } from './@core/guard/theme.guard';

export const routes: Routes = [
  {
    path: 'pages',
    canActivate: [ThemeGuard],
    loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule),
  },
  {
    path: 'themes',
    loadChildren: () => import('app/themes-screen/starter.module')
      .then(m => m.StarterModule),
  },

  { path: '', redirectTo: 'pages/iot-dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages/iot-dashboard' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
