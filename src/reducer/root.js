import { combineReducers } from 'redux'
import login from './login';
import mydestination from './mydestination'
import board from './board'
import signup from './signup'
import accountboard from './accountboard'
import group from './group'

/**
* 各reducerを結合してひとまとめにしてexportする
* @see http://qiita.com/kuy/items/59c6d7029a10972cba78
*/
export default combineReducers({
  login,
  mydestination,
  board,
  signup,
  accountboard,
  group,
  groupboards
})
