import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-menu-panel',
  standalone: true,
  imports: [MenubarModule],
  templateUrl: './menu-panel.component.html',
  styleUrl: './menu-panel.component.css'
})
export class MenuPanelComponent {
  items: MenuItem[] = [];

  constructor(private router: Router) {
    this.items = this.router.config
      .map(route => ({
        label: String(route.title),
        url: route.path ?? '/',
      }));
  }
}
