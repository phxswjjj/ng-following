import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserCompareService, CompareResultItem } from './user-compare.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {

  InputUserType = InputUserType;
  showInputUserType = InputUserType.NA;
  inputUsersText: string | null = null;

  compareResult: CompareResultItem[] | null = null;
  combineResult: string[] = [];
  private compareSub?: Subscription;

  constructor(private userCompareService: UserCompareService) {}

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
    resultTextarea.setSelectionRange(0, 0); // 可選，取消選取
  }

  submitInputUsers(): void {
    const inputUsers = (this.inputUsersText ?? '').split('\n').map(line => line.trim()).filter(line => line.length > 0);

    if (this.showInputUserType === InputUserType.Origin) {
      this.userCompareService.appendToOriginalList(inputUsers);
    } else if (this.showInputUserType === InputUserType.New) {
      this.userCompareService.appendToNewList(inputUsers);
    }
    //reset input
    this.inputUsersText = null;
    this.showInputUserType = InputUserType.NA;

    this.userCompareService.compareResults();
  }
}

export enum InputUserType {
  NA,
  Origin,
  New,
}
