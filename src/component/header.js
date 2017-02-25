import React from 'react'
import {LOGIN_STATUS} from '../const/login'
import {logoutRequested} from '../action/login'
/**
* Headerコンポーネント
* @see http://qiita.com/nownabe/items/2d8b92d95186c3941de0
*/
export default class Header extends React.Component{
  /**
  * コンストラクタ
  * @param {Object} props プロパティ
  * @return {undefined}
  */
  constructor(props){
    super(props);
    //ES2015版のReactだとこのおまじないをしないとメソッド内でthisが解決しない...
    this.hundleClick = this.hundleClick.bind(this);
  }
  /**
  * ログアウトボタンのクリックをハンドリングするメソッド
  * @return {undefined}
  */
  hundleClick(){
      this.props.dispatch(logoutRequested());
  }

  /**
  * 描画メソッド
  * @return {undefined}
  */
  render(){
    //ログインしていればログアウトボタンを表示する
    const logoutButton = this.props.login.status == LOGIN_STATUS.SUCCESS ?
      <button onClick={this.hundleClick}>logout</button> :
      null
    return(
      <div>キョウ-ドコ？&nbsp;{logoutButton}</div>
    )
  }
}
