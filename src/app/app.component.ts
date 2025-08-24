import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserCompareService, CompareResultItem, QueryFilterType } from './user-compare.service';
import { Subscription } from 'rxjs';
import { EditPanelComponent } from './edit-panel/edit-panel.component';
import { CombinePanelComponent } from './combine-panel/combine-panel.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, EditPanelComponent, CombinePanelComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {

  UserSourceType = UserSourceType;
  showUserSourceType = UserSourceType.NA;

  selectedFilter: QueryFilterType = QueryFilterType.All;

  compareResult: CompareResultItem[] | null = null;
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

  filterCompareResult(): void {
    if (!this.compareResult) {
      return;
    }

    switch (this.selectedFilter) {
      case QueryFilterType.All:
        this.userCompareService.filterResults(QueryFilterType.All);
        break;
      case QueryFilterType.Intersection:
        this.userCompareService.filterResults(QueryFilterType.Intersection);
        break;
      case QueryFilterType.Exclusive:
        this.userCompareService.filterResults(QueryFilterType.Exclusive);
        break;
      case QueryFilterType.OnlyOrigin:
        this.userCompareService.filterResults(QueryFilterType.OnlyOrigin);
        break;
      case QueryFilterType.OnlyNew:
        this.userCompareService.filterResults(QueryFilterType.OnlyNew);
        break;
    }
  }
}

export enum UserSourceType {
  NA,
  IG,
  Threads,
}
