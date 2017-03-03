import React from 'react'
import ReactDOM from 'react-dom'
import {signupFailure,signupRequired} from '../action/signup'
import {SIGNUP_FAILURE_REASONS} from '../const/signup'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
/**
* サインアップフォームのComponent
* @see http://qiita.com/nownabe/items/2d8b92d95186c3941de0
*/
export default class SignUpForm extends React.Component{
  /**
  * コンストラクタ
  * @param {Object} props
  * @return {undefined}
  */
  constructor(props){
    super(props);
    this.state = {id_text:"",pass_text:"",confirm_pass_text:"",name_text:""};
    //ES2015版のReactだとこのおまじないをしないとメソッド内でthisが解決しない...
    this.hundleSubmit = this.hundleSubmit.bind(this);
    this.validate = this.validate.bind(this);
    this.hundleIDChange = this.hundleIDChange.bind(this);
    this.hundlePassChange = this.hundlePassChange.bind(this);
    this.hundleConfirmPasswordChange = this.hundleConfirmPasswordChange.bind(this);
    this.hundleNameChange = this.hundleNameChange.bind(this);
  }
  /**
  * Sign Upボタンのクリックをハンドリングするメソッド
  * @return {undefined}
  */
  hundleSubmit(){
    const id = this.state.id_text.trim();
    const pass = this.state.pass_text.trim();
    const pass_confirm = this.state.confirm_pass_text.trim();
    const name = this.state.name_text.trim();

    //入力値の画面サイドバリデーション
    const forminfo = {id:id,pass:pass,pass_confirm:pass_confirm,name:name};
    const validationErrors = this.validate(forminfo);


    if(validationErrors.length > 0){
      //画面サイドバリデーションが通らないので失敗
      this.props.dispatch(signupFailure(validationErrors));
    }else{
      //画面サイドバリデーションが通ったので、サインアップ要求する
      this.props.dispatch(signupRequired({id:id,password:pass,name:name}));
    }

  }

  // handle郡
  hundleIDChange(event,newValue){
    this.setState({id_text:newValue});
  }

  hundlePassChange(event,newValue){
    this.setState({pass_text:newValue});
  }

  hundleConfirmPasswordChange(event,newValue){
    this.setState({confirm_pass_text:newValue});
  }

  hundleNameChange(event,newValue){
    this.setState({name_text:newValue});
  }

  /**
  * フォームデータのバリデーション
  * @param {{id:string,pass:string,pass_confirm:string,name:string}} forminfo フォームデータ
  * @return {array} SIGNUP_FAILURE_REASONSの配列
  */
  validate(forminfo){
    const errors = [];

    if(!forminfo.id || forminfo.id.trim().length == 0){
      errors.push(SIGNUP_FAILURE_REASONS.EMPTY_ID);
    }
    if(!forminfo.pass || forminfo.pass.trim().length == 0){
      errors.push(SIGNUP_FAILURE_REASONS.EMPTY_PASSWORD);
    }
    if(!forminfo.name || forminfo.name.trim().length == 0){
      errors.push(SIGNUP_FAILURE_REASONS.EMPTY_NAME);
    }
    if(forminfo.pass !== forminfo.pass_confirm){
      errors.push(SIGNUP_FAILURE_REASONS.INVALID_CONFIRM);
    }
    return errors;

  }
  /**
  * 描画メソッド
  * @return {undefined}
  */
  render(){
    const failure_reason = this.props.signup.failure_reason;
    const emptyIdMessage = failure_reason.indexOf(SIGNUP_FAILURE_REASONS.EMPTY_ID) >= 0 ?
      "IDを入力してください" : "";
    const emptyPassMessage = failure_reason.indexOf(SIGNUP_FAILURE_REASONS.EMPTY_PASSWORD) >= 0 ?
      "パスワードを入力してください" : "";
    const emptyNameMessage = failure_reason.indexOf(SIGNUP_FAILURE_REASONS.EMPTY_NAME) >= 0 ?
      "名前を入力してください" : "";
    const invalidConfirmMessage = failure_reason.indexOf(SIGNUP_FAILURE_REASONS.INVALID_CONFIRM) >= 0 ?
      "パスワードとパスワード（確認）が一致しません" : "";
    const idDuplicatedMessage = failure_reason.indexOf(SIGNUP_FAILURE_REASONS.ID_DUPLICATED) >= 0 ?
      "ご指定のIDはすでに使われています" : "";
    const serverErrorMessage = failure_reason.indexOf(SIGNUP_FAILURE_REASONS.SERVER_ERROR) >= 0 ?
      "サーバーエラーが発生しました" : "";

    return (
      <div>
        <h4>ユーザー登録</h4>
        <TextField
        hintText="User ID"
        floatingLabelText="User ID"
        value={this.state.id_text}
        ref="id"
        onChange={this.hundleIDChange}
        />
        <br />
        <span style={{color:"red"}}>
          {emptyIdMessage}{idDuplicatedMessage}
        </span>
        <br />
        <TextField
        hintText="Password"
        floatingLabelText="Password"
        value={this.state.pass_text}
        ref="pass"
        type="password"
        onChange={this.hundlePassChange}
        />
        <br />
        <span style={{color:"red"}}>
          {emptyPassMessage}
        </span>
        <br />
        <TextField
        hintText="Password(Confirm)"
        floatingLabelText="Password(Confirm)"
        value={this.state.confirm_pass_text}
        ref="pass_confirm"
        type="password"
        onChange={this.hundleConfirmPasswordChange}
        />
        <br />
        <span style={{color:"red"}}>
          {invalidConfirmMessage}
        </span>
        <br />
        <TextField
        hintText="表示名"
        floatingLabelText="表示名"
        value={this.state.name_text}
        ref="name"
        onChange={this.hundleNameChange}
        />
        <br />
        <span style={{color:"red"}}>
          {emptyNameMessage}
        </span>
        <br />
        <br />
        <RaisedButton onClick={this.hundleSubmit} label="Sign Up"/>
      </div>
    )
  }
}
