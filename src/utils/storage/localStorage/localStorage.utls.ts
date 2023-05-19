export default class LocalStorageUtils {
  static getFromLocalStorage = (key: string) => {
    let item = localStorage.getItem(key);
    if (!item) {
      return null;
    }
    let parsedItem = JSON.parse(item);
    if (parsedItem == null) {
      return null;
    }
    return parsedItem;
  };

  static saveToLocalStorage = (key: string, value: any) => {
    if (!key) {
      return null;
    }
    localStorage.setItem(key, JSON.stringify(value));
  };

  static removeFromLocalStorage = (key: string) => {
    if (!key) {
      return null;
    }
    localStorage.removeItem(key);
  };

  static localStorageHasKey = (key: string) => {
    if (!key) {
      return null;
    }
    return localStorage.hasOwnProperty(key);
  };
}
