import { Component, ElementRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { CompareResultItem, UserCompareService } from '../user-compare.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-edit-panel',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    ButtonModule
  ],
  templateUrl: './edit-panel.component.html',
  styleUrl: './edit-panel.component.css'
})
export class EditPanelComponent {

  InputUserType = InputUserType;
  showInputUserType = InputUserType.NA;
  inputUsersText: string | null = null;

  compareResult: CompareResultItem[] | null = null;
  combineResult: string[] = [];
  private compareSub?: Subscription;

  @ViewChild('inputUserTextArea') inputUserTextArea?: ElementRef<HTMLTextAreaElement>;

  constructor(private userCompareService: UserCompareService) { }

  ngOnInit(): void {
    this.compareSub = this.userCompareService.compareResult$.subscribe(result => {
      this.compareResult = result;
    });
  }

  ngOnDestroy(): void {
    this.compareSub?.unsubscribe();
  }

  showInputUserTextArea(inputUserType: InputUserType) {
    this.showInputUserType = inputUserType;
    if (inputUserType != InputUserType.NA) {
      setTimeout(() => {
        if (this.inputUserTextArea) {
          if (this.inputUserTextArea.nativeElement.offsetParent !== null) {
            this.inputUserTextArea.nativeElement.focus();
          }
        }
      });
    }
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
