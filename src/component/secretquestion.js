import React from 'react';
import ReactDOM from 'react-dom';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import {closeSecretQuestionBoard ,getSecretQuestion} from '../action/secretquestion';

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
      userid:""
    }

    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleGetSecretQuestion = this.handleGetSecretQuestion.bind(this);
  }

  /**
  * 秘密の質問取得ボタン押下をハンドリングするメソッド
  * @return {undefined}
  */
  handleGetSecretQuestion(){
    /*
    *入力されたID/Passを取得して、
    *それを元にLOGIN_REQUESTED(ログイン要求)アクションを作成してdispatchする
    */
    const userid = this.state.userid.trim();
    if(userid){
      this.props.dispatch(getSecretQuestion());
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
  * キャンセルボタンのクリックをハンドリングするhandler
  * @return {undefined}
  */
  handleClose(){
    this.setState({userid:""});
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

    const contents = this.props.secretquestion.isFouduser ?
      (<div>
        <MyDestination
          dispatch={this.props.dispatch}
          login={this.props.login}
          mydestination={this.props.mydestination}
        />
        <GroupBoards
          dispatch={this.props.dispatch}
          board={this.props.board}
          group={this.props.group}
          login={this.props.login}
          updatedate={this.props.updatedate}
        />
       </div>
      ) :
        (<div>
            <TextField
                hintText="ユーザID"
                defaultValue={this.state.userid || null}
                onChange={this.handleUserChange}
                ref="userid"
            />
            <FlatButton
                onClick={this.handleGetSecretQuestion}
                label="秘密の質問取得"
                ref="secretquestion" />
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
