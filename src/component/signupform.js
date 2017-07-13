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
    this.state = {
          id_text: "",
          pass_text: "",
          confirm_pass_text: "",
          name_text: "",
          secret_quetsion_text: "",
          secret_answer_text: ""
        };
    //ES2015版のReactだとこのおまじないをしないとメソッド内でthisが解決しない...
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validate = this.validate.bind(this);
    this.handleIDChange = this.handleIDChange.bind(this);
    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSecretQuestionChange = this.handleSecretQuestionChange.bind(this);
    this.handleSecretAnswerChange = this.handleSecretAnswerChange.bind(this);
    this.renderValidationError = this.renderValidationError.bind(this);
  }
  /**
  * Sign Upボタンのクリックをハンドリングするメソッド
  * @return {undefined}
  */
  handleSubmit(){
    const id = this.state.id_text.trim();
    const pass = this.state.pass_text.trim();
    const pass_confirm = this.state.confirm_pass_text.trim();
    const name = this.state.name_text.trim();
    const secret_quetsion = this.state.secret_quetsion_text.trim();
    const secret_answer = this.state.secret_answer_text.trim();

    //入力値の画面サイドバリデーション
    const forminfo = {
            id:id,
            pass:pass,
            pass_confirm:pass_confirm,
            name:name,
            secret_quetsion:secret_quetsion,
            secret_answer:secret_answer
          };
    const validationErrors = this.validate(forminfo);


    if(validationErrors.length > 0){
      //画面サイドバリデーションが通らないので失敗
      this.props.dispatch(signupFailure(validationErrors));
    }else{
      //画面サイドバリデーションが通ったので、サインアップ要求する
      this.props.dispatch(
                    signupRequired({
                      id:id,
                      password:pass,
                      name:name,
                      secret_question:secret_quetsion,
                      secret_answer:secret_answer}));
    }
  }

  /**
  * id textboxの更新イベントハンドラ
  * @param {Object} event イベント
  * @param {string} newValue 更新後の値
  * @return {undefined}
  */
  handleIDChange(event,newValue){
    this.setState({id_text:newValue});
  }

  /**
  * pass textboxの更新イベントハンドラ
  * @param {Object} event イベント
  * @param {string} newValue 更新後の値
  * @return {undefined}
  */
  handlePassChange(event,newValue){
    this.setState({pass_text:newValue});
  }

  /**
  * pass_confirm textboxの更新イベントハンドラ
  * @param {Object} event イベント
  * @param {string} newValue 更新後の値
  * @return {undefined}
  */
  handleConfirmPasswordChange(event,newValue){
    this.setState({confirm_pass_text:newValue});
  }

  /**
  * name textboxの更新イベントハンドラ
  * @param {Object} event イベント
  * @param {string} newValue 更新後の値
  * @return {undefined}
  */
  handleNameChange(event,newValue){
    this.setState({name_text:newValue});
  }

  /**
   * 秘密の質問 TextBoxの更新イベントハンドラ 
   * @param {Object} event イベント
   * @param {string} newValue 更新後の値
   * @return {undefined}
   */
  handleSecretQuestionChange(event,newValue){
    this.setState({secret_quetsion_text:newValue});
  }
  
  /**
   * 秘密の質問の答え TextBoxの更新イベントハンドラ 
   * @param {Object} event イベント
   * @param {string} newValue 更新後の値
   * @return {undefined}
   */
  handleSecretAnswerChange(event,newValue){
    this.setState({secret_answer_text:newValue});
  }

  /**
  * フォームデータのバリデーション
  * @param {{id:string,pass:string,pass_confirm:string,name:string}} forminfo フォームデータ
  * @return {array} SIGNUP_FAILURE_REASONSの配列
  */
  validate(forminfo){
    const errors = [];
    const match_pattern = /^(?=.*?\d)(?=.*?[A-Za-z!-\/:-@[-`{-~])[!-~]{8,}$/i;

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
    if(!forminfo.secret_quetsion || forminfo.secret_quetsion.trim().length == 0){
      errors.push(SIGNUP_FAILURE_REASONS.EMPTY_SECRET_QUESTION);
    }
    if(!forminfo.secret_answer || forminfo.secret_answer.trim().length == 0){
      errors.push(SIGNUP_FAILURE_REASONS.EMPTY_SECRET_ANSWER);
    }

    return errors;
  }
  /**
  * props.failure_reasonの状況に応じて引数に与えられたエラー理由に対応するエラーメッセージを描画する
  * @param {string} singleFailureReason SIGNUP_FAILURE_REASONSのうち１つ
  * @return {Symbol} エラーメッセージを描画するreact-dom
  */
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
  render() {
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
          onChange={this.handleIDChange}
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
          onChange={this.handlePassChange}
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
          onChange={this.handleConfirmPasswordChange}
        />
        <br />
        {this.renderValidationError(SIGNUP_FAILURE_REASONS.INVALID_CONFIRM)}
        <br />
        <TextField
          hintText="表示名"
          floatingLabelText="表示名"
          value={this.state.name_text}
          ref="name"
          onChange={this.handleNameChange}
        />
        <br />
        {this.renderValidationError(SIGNUP_FAILURE_REASONS.EMPTY_NAME)}
        <br />
        <TextField
          hintText="秘密の質問"
          floatingLabelText="秘密の質問"
          value={this.state.secret_quetsion_text}
          ref="secret_question"
          onChange={this.handleSecretQuestionChange}
        />
        <br />
        {this.renderValidationError(SIGNUP_FAILURE_REASONS.EMPTY_SECRET_QUESTION)}
        <br />
        <TextField
          hintText="秘密の質問の答え"
          floatingLabelText="秘密の質問の答え"
          value={this.state.secret_answer_text}
          ref="secret_answer"
          onChange={this.handleSecretAnswerChange}
        />
        <br />
        {this.renderValidationError(SIGNUP_FAILURE_REASONS.EMPTY_SECRET_ANSWER)}
        <br />
        <RaisedButton ref="signup" onClick={this.handleSubmit} label="Sign Up" />
        <br />
        {this.renderValidationError(SIGNUP_FAILURE_REASONS.SERVER_ERROR)}
        <br />
      </div>
    )
  }
}
