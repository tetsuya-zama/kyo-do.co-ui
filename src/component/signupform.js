import React from 'react'
import ReactDOM from 'react-dom'
import {signupFailure,signupRequired} from '../action/signup'
import {SIGNUP_FAILURE_REASONS,SIGNUP_VALIDATION_ERROR_MESSAGES} from '../const/signup'
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
    this.renderValidationError = this.renderValidationError.bind(this);
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

  /**
  * id textboxの更新イベントハンドラ
  * @param {Object} event イベント
  * @param {string} newValue 更新後の値
  * @return {undefined}
  */
  hundleIDChange(event,newValue){
    this.setState({id_text:newValue});
  }

  /**
  * pass textboxの更新イベントハンドラ
  * @param {Object} event イベント
  * @param {string} newValue 更新後の値
  * @return {undefined}
  */
  hundlePassChange(event,newValue){
    this.setState({pass_text:newValue});
  }

  /**
  * pass_confirm textboxの更新イベントハンドラ
  * @param {Object} event イベント
  * @param {string} newValue 更新後の値
  * @return {undefined}
  */
  hundleConfirmPasswordChange(event,newValue){
    this.setState({confirm_pass_text:newValue});
  }

  /**
  * name textboxの更新イベントハンドラ
  * @param {Object} event イベント
  * @param {string} newValue 更新後の値
  * @return {undefined}
  */
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
    const match_pattern = /^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,}$/i;

    if(!forminfo.id || forminfo.id.trim().length == 0){
      errors.push(SIGNUP_FAILURE_REASONS.EMPTY_ID);
    }
    if(!forminfo.pass || forminfo.pass.trim().length == 0){
      errors.push(SIGNUP_FAILURE_REASONS.EMPTY_PASSWORD);
    }else if(!forminfo.pass.match(match_pattern)){
      errors.push(SIGNUP_FAILURE_REASONS.POLICY_PASSWORD);
    }
    if(!forminfo.name || forminfo.name.trim().length == 0){
      errors.push(SIGNUP_FAILURE_REASONS.EMPTY_NAME);
    }
    if(forminfo.pass !== forminfo.pass_confirm){
      errors.push(SIGNUP_FAILURE_REASONS.INVALID_CONFIRM);
    }

    return errors;

  }

  renderValidationError(singleFailureReason){
    if(this.props.signup.failure_reason.indexOf(singleFailureReason) >=0){
      const errorMessage = SIGNUP_VALIDATION_ERROR_MESSAGES
        .filter(m=>m.reason === singleFailureReason)
        .map(m=>m.msg)[0];

      return (
        <span style={{color:"red"}}>
          {errorMessage}
        </span>
      );
    }else{
      return null;
    }
  }
  /**
  * 描画メソッド
  * @return {undefined}
  */
  render(){
    return (
      <div>
        <h4>ユーザー登録</h4>
        <h7>初めての方はこちらから登録下さい</h7>
        <br />
        <TextField
        hintText="User ID"
        floatingLabelText="User ID"
        value={this.state.id_text}
        ref="id"
        onChange={this.hundleIDChange}
        />
        <br />
        {this.renderValidationError(SIGNUP_FAILURE_REASONS.EMPTY_ID)}
        {this.renderValidationError(SIGNUP_FAILURE_REASONS.ID_DUPLICATED)}
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
        {this.renderValidationError(SIGNUP_FAILURE_REASONS.EMPTY_PASSWORD)}
        {this.renderValidationError(SIGNUP_FAILURE_REASONS.POLICY_PASSWORD)}
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
        {this.renderValidationError(SIGNUP_FAILURE_REASONS.INVALID_CONFIRM)}
        <br />
        <TextField
        hintText="表示名"
        floatingLabelText="表示名"
        value={this.state.name_text}
        ref="name"
        onChange={this.hundleNameChange}
        />
        <br />
        {this.renderValidationError(SIGNUP_FAILURE_REASONS.EMPTY_NAME)}
        <br />
        <br />
        <RaisedButton ref="signup" onClick={this.hundleSubmit} label="Sign Up"/>
        <br />
        {this.renderValidationError(SIGNUP_FAILURE_REASONS.SERVER_ERROR)}
      </div>
    )
  }
}
