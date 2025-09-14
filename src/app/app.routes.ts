import { Routes } from '@angular/router';
import { CompareComponent } from './compare/compare.component';

export const routes: Routes = [
  {
    path: '', component: CompareComponent,
    title: 'Home'
  },
  {
    path: 'compare', component: CompareComponent,
    title: 'Compare'
  }
];
