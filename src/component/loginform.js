import React from 'react'
import ReactDOM from 'react-dom'
import {loginRequested} from '../action/login'
import {LOGIN_STATUS} from '../const/login'

/**
* LoginFormコンポーネント
* @see http://qiita.com/nownabe/items/2d8b92d95186c3941de0
*/
export default class LoginForm extends React.Component{
  /**
  * コンストラクタ
  * @param {Object} props プロパティ
  * @return {undefined}
  */
  constructor(props){
    super(props);
    //ES2015版のReactだとこのおまじないをしないとメソッド内でthisが解決しない...
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
  * ログインボタンのクリックをハンドリングするメソッド
  * @return {undefined}
  */
  handleSubmit(){
    /*
    *入力されたID/Passを取得して、
    *それを元にLOGIN_REQUESTED(ログイン要求)アクションを作成してdispatchする
    */
    const userid = ReactDOM.findDOMNode(this.refs.userid).value.trim();
    const password = ReactDOM.findDOMNode(this.refs.password).value.trim();
    if(userid && password){
      this.props.dispatch(loginRequested(userid,password));
    }
  }

  /**
  * 描画メソッド
  * @return {undefined}
  */
  render(){
    //現在の状態がLOGIN_STATUS.FAILURE(ログイン失敗)であれば失敗メッセージを表示する
    const message = this.props.login.status == LOGIN_STATUS.FAILURE ?
      "IDもしくはパスワードが正しくありません" :
      "";

    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td>id</td>
              <td><input type="text" ref="userid"/></td>
            </tr>
            <tr>
              <td>pass</td>
              <td><input type="password" ref="password"/></td>
            </tr>
          </tbody>
        </table>
        <button onClick={this.handleSubmit}>Login</button>
        <br />
        <span style={{color:"red"}}>{message}</span>
      </div>
    );
  }
}
