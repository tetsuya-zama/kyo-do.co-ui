import { combineReducers } from 'redux'
import login from './login';

/**
* 各reducerを結合してひとまとめにしてexportする
* @see http://qiita.com/kuy/items/59c6d7029a10972cba78
*/
export default combineReducers({
  login
})
