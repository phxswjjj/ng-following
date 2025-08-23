import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserCompareService {
  private compareResultSubject = new BehaviorSubject<any>(null);

  // 新增兩個字串集合
  private originalSet: Set<string> = new Set();
  private newSet: Set<string> = new Set();
  private fullCompareResult: CompareResultItem[] = [];

  // 讓外部可訂閱
  get compareResult$(): Observable<CompareResultItem[] | null> {
    return this.compareResultSubject.asObservable();
  }

  constructor() { }

  // 設定原始資料（append，不重複新增）
  appendToOriginalList(list: string[]) {
    list.forEach(item => this.originalSet.add(item));
  }

  // 設定新資料（append，不重複新增）
  appendToNewList(list: string[]) {
    list.forEach(item => this.newSet.add(item));
  }

  compareResults(): CompareResultItem[] {
    const result: CompareResultItem[] = [];
    this.originalSet.forEach(userName => {
      result.push(new CompareResultItem(userName, true, this.newSet.has(userName)));
    });
    this.newSet.forEach(userName => {
        const existing = result.find(item => item.userName === userName);
        if (existing) {
          existing.isNew = true;
        } else {
          result.push(new CompareResultItem(userName, false, true));
        }
    });
    result.sort((a, b) => a.userName.localeCompare(b.userName));
    this.fullCompareResult = result;
    this.updateCompareResult(result);
    return result;
  }

  filterResults(filterType: QueryFilterType): CompareResultItem[] {
    if (!this.compareResultSubject.value) {
      return [];
    }
    let results = this.fullCompareResult;
    switch (filterType) {
      case QueryFilterType.Intersection:
        results = results.filter((item: CompareResultItem) => item.isOrigin && item.isNew);
        break
      case QueryFilterType.Exclusive:
        results = results.filter((item: CompareResultItem) => (item.isOrigin && !item.isNew) || (!item.isOrigin && item.isNew));
        break
      case QueryFilterType.OnlyOrigin:
        results = results.filter((item: CompareResultItem) => item.isOrigin && !item.isNew);
        break
      case QueryFilterType.OnlyNew:
        results = results.filter((item: CompareResultItem) => !item.isOrigin && item.isNew);
        break
      default:
        results = results;
        break
    }
    this.updateCompareResult(results);
    return results;
  }

  // 更新資料的方法
  updateCompareResult(result: CompareResultItem[]) {
    this.compareResultSubject.next(result);
  }
}

export class CompareResultItem {
  constructor(
    public userName: string,
    public isOrigin: boolean,
    public isNew: boolean
  ) {}
}

export enum QueryFilterType {
  All = 'all',
  //交集
  Intersection = 'intersection',
  //互斥
  Exclusive = 'exclusive',
  OnlyOrigin = 'onlyOrigin',
  OnlyNew = 'onlyNew',
}
