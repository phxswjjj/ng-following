import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { MenuPanelComponent } from './menu-panel/menu-panel.component';
import { NaviPanelComponent } from "./navi-panel/navi-panel.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuPanelComponent, NaviPanelComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {}
