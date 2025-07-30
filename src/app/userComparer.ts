import { UserInfo } from "./Entity/userInfo";

export class UserComparer {
  public static compare(originalList: string[], newList: string[]): CompareResult {
    const orignalUsers = this.convertToUserInfoList(originalList);
    const newUsers = this.convertToUserInfoList(newList);

    const result = new CompareResult();
    const originalUsernames = new Set(orignalUsers.map(user => user.username));
    const newUsernames = new Set(newUsers.map(user => user.username));

    // 找出新增的用戶
    for (const user of newUsers) {
      if (!originalUsernames.has(user.username)) {
        result.added.push(user);
      }
    }
    // 找出被移除的用戶
    for (const user of orignalUsers) {
      if (!newUsernames.has(user.username)) {
        result.removed.push(user);
      }
    }
    return result;
  }

  private static convertToUserInfoList(list: string[]): UserInfo[] {
    //list 奇數行為 username, 偶數行為 nickname
    if (list.length % 2 !== 0) {
      throw new Error("List length must be even.");
    }
    if (list.length === 0) {
      return [];
    }
    if (list.length % 2 !== 0) {
      throw new Error("List length must be even.");
    }

    const userInfoList: UserInfo[] = [];
    for (let i = 0; i < list.length; i += 2) {
      const username = list[i].trim();
      const nickname = list[i + 1].trim();
      if (username && nickname) {
        userInfoList.push(new UserInfo(username, nickname));
      }
    }
    return userInfoList;
  }
}

export class CompareResult {
  public added: UserInfo[] = [];
  public removed: UserInfo[] = [];
}
