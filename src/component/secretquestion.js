import React from 'react';
import ReactDOM from 'react-dom';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import {
  closeSecretQuestionBoard,
  getSecretQuestion,
  checkSecretAnswer} from '../action/secretquestion';
import RaisedButton from 'material-ui/RaisedButton'
import PasswordField from 'material-ui-password-field'

/**
* GroupCreationBoardコンポーネント
* @see http://qiita.com/nownabe/items/2d8b92d95186c3941de0
*/
export default class SecretQuestion extends React.Component{
  /**
  * コンストラクタ
  * @param {Object} props プロパティ
  * @return {undefined}
  */
  constructor(props){
    super(props);

    this.state = {
      userid:"",
      password:"",
      secretAnswer:"",
    }

    this.handleUserChange = this.handleUserChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSecretAnswerChange = this.handleSecretAnswerChange.bind(this);

    this.handleClose = this.handleClose.bind(this);

    this.handleGetSecretQuestion = this.handleGetSecretQuestion.bind(this);
    this.handleCheckSecretQuestion = this.handleCheckSecretQuestion.bind(this);
  }

  /**
  * 秘密の質問取得ボタン押下をハンドリングするメソッド
  * @return {undefined}
  */
  handleGetSecretQuestion(){
    /*
    *入力されたIDを取得し、
    *それを元にGET_SECRET_QUESTION(秘密の質問取得)アクションを作成してdispatchする
    */
    const userid = this.state.userid.trim();
    if(userid){
      this.props.dispatch(getSecretQuestion(userid));
    }
  }
  
  /**
  * パスワード変更ボタン押下をハンドリングするメソッド
  * @return {undefined}
  */
  handleCheckSecretQuestion(){
    /*
    *入力された秘密の質問／新しいパスワードを取得し、
    *それを元にCHECK_SECRET_ANSWER(秘密の質問チェック＋パスワード変更)アクションを作成してdispatchする
    */
    const userid = this.state.userid.trim();
    const secretAnswer = this.state.secretAnswer.trim();
    const password = this.state.password.trim();
    if(userid){
      this.props.dispatch(checkSecretAnswer({userid:userid, password:password, secretAnswer:secretAnswer}));
    }
  }

  /**
  * ユーザ名の変更をハンドリングするhandler
  * @param {Object} event イベント
  * @param {string} newValue 変更後の値
  * @return {undefined}
  */
  handleUserChange(event,newValue){
    this.setState({userid:newValue});
  }

  /**
  * パスワードの変更をハンドリングするhandler
  * @param {Object} event イベント
  * @param {string} newValue 変更後の値
  * @return {undefined}
  */
  handlePasswordChange(event,newValue){
    this.setState({password:newValue});
  }

  /**
  * 秘密の質問回答の変更をハンドリングするhandler
  * @param {Object} event イベント
  * @param {string} newValue 変更後の値
  * @return {undefined}
  */
  handleSecretAnswerChange(event,newValue){
    this.setState({secretAnswer:newValue});
  }

  /**
  * キャンセルボタンのクリックをハンドリングするhandler
  * @return {undefined}
  */
  handleClose(){
    this.setState({userid:"",pass:"",pass_confirm:"",secret_answer:""});
    this.props.dispatch(closeSecretQuestionBoard());
  }

  /**
  * 描画メソッド
  * @return {undefined}
  */
  render(){
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onTouchTap={this.handleClose}
        ref="Close"
      />
    ];

    // 秘密の質問取得前はユーザID入力画面
    // 秘密の質問取得後は秘密の質問回答画面にする
    const contents = !this.props.secretquestion.secretQuestion ?
      (<div>
          <TextField
              floatingLabelText="ユーザID"
              defaultValue={null}
              onChange={this.handleUserChange}
              ref="userid"
          />
          <br />
          <RaisedButton
              onClick={this.handleGetSecretQuestion}
              label="秘密の質問取得"
              ref="secretquestion" />
       </div>
      ) :
        (<div>
        {this.props.secretquestion.secretQuestion}
        <br />
        <TextField
            floatingLabelText="秘密の質問の答え"
            defaultValue={null}
            onChange={this.handleSecretAnswerChange}
            ref="secretanswer"
        />
        <br />
        <PasswordField
            floatingLabelText="新しいパスワード"
            defaultValue={null}
            onChange={this.handlePasswordChange}
            ref="pass"
        />
        <br />
        <RaisedButton
            onClick={this.handleCheckSecretQuestion}
            label="パスワード変更"
            ref="submit" />
        </div>
      );
    return (
        <div>
            <Dialog
                title="秘密の質問に回答"
                actions={actions}
                modal={true}
                open={this.props.secretquestion.isOpen}
            >
                {contents}
            </Dialog>
        </div>
        )
  }
}
