import React from 'react';
import ReactDOM from 'react-dom';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import Dialog from 'material-ui/Dialog';
import {closeAccountInfoModal,changeAccountInfo,changeAccountInfoField} from '../action/accountboard';

/**
* AccountBoardコンポーネント
* @see http://qiita.com/nownabe/items/2d8b92d95186c3941de0
*/
export default class AccountBoard extends React.Component{
  /**
  * コンストラクタ
  * @param {Object} props プロパティ
  * @return {undefined}
  */
  constructor(props){
    super(props);
    //ES2015版のReactだとこのおまじないをしないとメソッド内でthisが解決しない...
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  /**
  * アカウント情報変更ボタンのクリックをハンドリングするメソッド
  * @return {undefined}
  */
  handleSubmit(){
      this.props.dispatch(changeAccountInfo(this.props.accountboard.nextuser.nextname, this.props.accountboard.nextuser.nextpass));
  }

  /**
  * モーダルのクローズをハンドリングするメソッド
  * @return {undefined}
  */
  handleClose(){
      this.props.dispatch(closeAccountInfoModal());
  }

  /**
  * passテキストボックスの変更をハンドリングするメソッド
  * @param {Object} event イベント
  * @param {string} newValue 変更後の値
  * @return {undefined}
  */
  handlePassChange(event,newValue){
    this.props.dispatch(changeAccountInfoField(this.props.accountboard.nextuser.nextname, newValue));
  }

  /**
  * nameテキストボックスの変更をハンドリングするメソッド
  * @param {Object} event イベント
  * @param {string} newValue 変更後の値
  * @return {undefined}
  */
  handleNameChange(event,newValue){
    this.props.dispatch(changeAccountInfoField(newValue, this.props.accountboard.nextuser.nextpass));
  }

  /**
  * 描画メソッド
  * @return {undefined}
  */
  render(){
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
        ref="cancel"
      />,
      <FlatButton
        label="Submit"
        primary={true}
        onTouchTap={this.handleSubmit}
        ref="submit"
      />,
    ];

    // ツールバーの表示
    const accountboard =
        <Dialog
          title="アカウント情報変更"
          actions={actions}
          modal={true}
          open={this.props.accountboard.open}
        >
          <TextField
          hintText="表示名"
          value={this.props.accountboard.nextuser.nextname}
          onChange={this.handleNameChange}
          ref="name"
          />
          <br />
          <TextField
          hintText="Password"
          value={this.props.accountboard.nextuser.nextpass}
          type="password"
          onChange={this.handlePassChange}
          ref="pass"
          />
        </Dialog>

    return (
      <div>{accountboard}</div>
    )
  }
}
