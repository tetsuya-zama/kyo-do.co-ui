import React from 'react'
import {LOGIN_STATUS} from '../const/login'
import {logoutRequested} from '../action/login'
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

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
    // ツールバーの表示
    const toolbar = this.props.login.status == LOGIN_STATUS.SUCCESS ?
      <Toolbar>
        <ToolbarGroup>
          <Chip><Avatar>{this.props.login.user.name.charAt(0).toUpperCase()}</Avatar>{this.props.login.user.name}</Chip>
          <ToolbarSeparator />
          <RaisedButton label="logout" secondary={true} onClick={this.hundleClick} />
        </ToolbarGroup>
      </Toolbar>:
      null

    return (
      <div><img src={"./img/logo.png"} />&nbsp;<br />{toolbar}</div>
    )
  }
}
