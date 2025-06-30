import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CompareResult, UserComparer } from './userComparer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  _originalList: string[] = [];
  get originalList(): string {
    return this._originalList.join('\n');
  }
  set originalList(value: string) {
    this._originalList = value.split('\n').map(item => item.trim()).filter(item => item);
  }

  _newList: string[] = [];
  get newList(): string {
    return this._newList.join('\n');
  }
  set newList(value: string) {
    this._newList = value.split('\n').map(item => item.trim()).filter(item => item);
  }

  compareResult: CompareResult | null = null;

  compare(): void {
    const result = UserComparer.compare(this._originalList, this._newList);
    this.compareResult = result;
  }

}
