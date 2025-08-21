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
    this.updateCompareResult(result);
    return result;
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
