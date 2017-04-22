import {base64Encode,base64Decode} from './base64'

/*
* ローカルストレージのKeyのプレフィックス
*/
const LOCAL_STORAGE_PREFIX = "kyo-do.co.";

/**
* localStorageへ値をセットする
* @param {string} key キー
* @param {Object} value セットするオブジェクト
* @return {boolean} 成功すればtrue
*/
export function setToStorage(key,value){
  try{
    localStorage.setItem(LOCAL_STORAGE_PREFIX + key,base64Encode(JSON.stringify(value)));
    return true;
  }catch(e){
    return false;
  }
}
/**
* localStorageから値を取得する
* @param {string} key キー
* @return {Object} localStorageに保存されたオブジェクト
*/
export function getFromStorage(key){
  try{
    return JSON.parse(base64Decode(localStorage.getItem(LOCAL_STORAGE_PREFIX + key)));
  }catch(e){
    return undefined;
  }
}
/**
* localStorageから値を削除する
* @param {string} key キー
* @return {boolean} 成功すればtrue
*/
export function removeFromStorage(key){
  try{
    localStorage.removeItem(LOCAL_STORAGE_PREFIX + key);
    return true;
  }catch(e){
    return false;
  }
}

/**
* localStorage上にキーが存在するかを確認する
* @param {string} key キー
* @return {boolean} 存在すればTrue
*/
export function existsKeyOnStorage(key){
  try{
    return localStorage.getItem(LOCAL_STORAGE_PREFIX + key) !== null;
  }catch(e){
    return false
  }
}
