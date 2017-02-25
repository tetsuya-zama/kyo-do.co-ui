/**
* base64エンコード
* @see http://qiita.com/weal/items/1a2af81138cd8f49937d
* @param {string} str エンコード対象文字列
* @return {string} エンコード後文字列
*/
export function base64Encode(str){
  return btoa(unescape(encodeURIComponent(str)));
}

/**
* base64デコード
* @see http://qiita.com/weal/items/1a2af81138cd8f49937d
* @param {string} str デコード対象文字列
* @return {string} デコード後文字列
*/
export function base64Decode(str){
  return decodeURIComponent(escape(atob(str)));
}
