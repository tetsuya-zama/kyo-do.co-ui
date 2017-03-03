import React from 'react'
import {LOGIN_STATUS} from '../const/login'
import {logoutRequested} from '../action/login'
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import RaisedButton from 'material-ui/RaisedButton';

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
      <RaisedButton label="logout" secondary={true} onClick={this.hundleClick} />:
      null
    // アバターの表示
    const chip = this.props.login.status == LOGIN_STATUS.SUCCESS ?
      <Chip><Avatar>{this.props.login.user.name.charAt(0).toUpperCase()}</Avatar>{this.props.login.user.name}</Chip> :
      null

    return (
      <div><img src={"./img/logo.png"} />&nbsp;{chip}&nbsp;{logoutButton}</div>
    )
  }
}
