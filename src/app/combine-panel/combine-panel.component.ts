import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CompareResultItem, UserCompareService } from '../user-compare.service';

@Component({
  selector: 'app-combine-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './combine-panel.component.html',
  styleUrl: './combine-panel.component.css'
})
export class CombinePanelComponent {
  compareResult: CompareResultItem[] | null = null;
  combineResult: string[] = [];
  private compareSub?: Subscription;

  constructor(private userCompareService: UserCompareService) { }

  ngOnInit(): void {
    this.compareSub = this.userCompareService.compareResult$.subscribe(result => {
      this.compareResult = result;
    });
  }

  ngOnDestroy(): void {
    this.compareSub?.unsubscribe();
  }

  combineResults(): void {
    if (this.compareResult) {
      this.combineResult = this.compareResult.map(item => {
        return item.userName;
      });
    }
  }

  copyToClipboard(resultTextarea: HTMLTextAreaElement): void {
    resultTextarea.select();
    document.execCommand('copy');
  }

}
