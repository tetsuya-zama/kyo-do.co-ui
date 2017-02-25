/*
* ローカルストレージのKeyのプレフィックス
*/
const LOCAL_STORAGE_PREFIX = "kyo-do.co.";

/**
* localStorageへ値をセットする
* @param {string} key キー
* @param {Object} value セットするオブジェクト
* @return {undefined}
*/
export function setToStorage(key,value){
  localStorage.setItem(LOCAL_STORAGE_PREFIX + key,JSON.stringify(value));
}
/**
* localStorageから値を取得する
* @param {string} key キー
* @return {Object} localStorageに保存されたオブジェクト
*/
export function getFromStorage(key){
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_PREFIX + key));
}
/**
* localStorageから値を削除する
* @param {string} key キー
* @return {undefined}
*/
export function removeFromStorage(key){
  localStorage.removeItem(LOCAL_STORAGE_PREFIX + key);
}

/**
* localStorage上にキーが存在するかを確認する
* @param {string} key キー
* @return {boolean} 存在すればTrue
*/
export function existsKeyOnStorage(key){
  return localStorage.getItem(LOCAL_STORAGE_PREFIX + key) !== null;
}
