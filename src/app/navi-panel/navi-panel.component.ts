import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { BreadcrumbModule } from 'primeng/breadcrumb';

@Component({
  selector: 'app-navi-panel',
  standalone: true,
  imports: [
    CommonModule, RouterModule,
    BreadcrumbModule
  ],
  templateUrl: './navi-panel.component.html',
  styleUrl: './navi-panel.component.css'
})
export class NaviPanelComponent {
  items: MenuItem[] = [];

  constructor(private router: Router) {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        url: '',
      },
      {
        label: 'Compare',
        icon: 'pi pi-compare',
        url: '/compare',
      }
    ];
  }
}
