import React from 'react'
import ReactDOM from 'react-dom'
import {loginRequested} from '../action/login'
import {openSecretQuestionBoard} from '../action/secretquestion'
import {LOGIN_STATUS} from '../const/login'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import PasswordField from 'material-ui-password-field'
import SecretQuestion from './secretquestion';

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
    this.state = {current_id_text:"",current_pass_text:""};
    //ES2015版のReactだとこのおまじないをしないとメソッド内でthisが解決しない...
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleIDChange = this.handleIDChange.bind(this);
    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleSecretQuestion = this.handleSecretQuestion.bind(this);
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
    const userid = this.state.current_id_text.trim();
    const password = this.state.current_pass_text.trim();
    if(userid && password){
      this.props.dispatch(loginRequested(userid,password));
    }
  }

  /**
   * パスワードを忘れた方をハンドリングするメソッド
   * 秘密の質問に回答するように促す
   * @return {undefined}
   */
  handleSecretQuestion(){
    this.props.dispatch(openSecretQuestionBoard());
  }

  handleIDChange(event,newValue){
    this.setState({current_id_text:newValue});
  }

  handlePassChange(event,newValue){
    this.setState({current_pass_text:newValue});
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
        <h4>ログイン</h4>
        <TextField
          hintText="User ID"
          floatingLabelText="User ID"
          value={this.state.current_id_text}
          ref="userid"
          onChange={this.handleIDChange}
        />
        <br />
        <PasswordField
          floatingLabelText="Password"
          value={this.state.current_pass_text}
          ref="password"
          onChange={this.handlePassChange}
          />
        <br />
        <br />
        <RaisedButton onClick={this.handleSubmit} label="Login" ref="loginbutton"/>
        <RaisedButton onClick={this.handleSecretQuestion} secondary={true} label="パスワードを忘れた方" ref="secretQustionButton"/>
        <br />
        <span style={{color:"red"}}>{message}</span>
        <SecretQuestion dispatch={this.props.dispatch} secretquestion={this.props.secretquestion} />
      </div>
    );
  }
}
