import React from 'react'
import ReactDOM from 'react-dom'
import {signupFailure,signupRequired} from '../action/signup'
import {SIGNUP_FAILURE_REASONS} from '../const/signup'
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
    //ES2015版のReactだとこのおまじないをしないとメソッド内でthisが解決しない...
    this.hundleSubmit = this.hundleSubmit.bind(this);
    this.validate = this.validate.bind(this);
  }
  /**
  * Sign Upボタンのクリックをハンドリングするメソッド
  * @return {undefined}
  */
  hundleSubmit(){
    const id = ReactDOM.findDOMNode(this.refs.id).value;
    const pass = ReactDOM.findDOMNode(this.refs.pass).value;
    const pass_confirm = ReactDOM.findDOMNode(this.refs.pass_confirm).value;
    const name = ReactDOM.findDOMNode(this.refs.name).value;

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
        <table>
          <tbody>
            <tr>
              <td>
                ユーザーID
              </td>
              <td>
                <input type="text" ref="id"/>
              </td>
              <td>
                <span style={{color:"red"}}>
                  {emptyIdMessage}{idDuplicatedMessage}
                </span>
              </td>
            </tr>
            <tr>
              <td>
                パスワード
              </td>
              <td>
                <input type="password" ref="pass"/>
              </td>
              <td>
                <span style={{color:"red"}}>
                  {emptyPassMessage}
                </span>
              </td>
            </tr>
            <tr>
              <td>
                パスワード(確認)
              </td>
              <td>
                <input type="password" ref="pass_confirm"/>
              </td>
              <td>
                <span style={{color:"red"}}>
                  {invalidConfirmMessage}
                </span>
              </td>
            </tr>
            <tr>
              <td>
                表示名
              </td>
              <td>
                <input type="text" ref="name"/>
              </td>
              <td>
                <span style={{color:"red"}}>
                  {emptyNameMessage}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        <button onClick={this.hundleSubmit}>Sign Up</button>
        <span style={{color:"red"}}>
          {serverErrorMessage}
        </span>
      </div>
    )
  }
}
