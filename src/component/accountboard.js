import React from 'react';
import ReactDOM from 'react-dom';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import Dialog from 'material-ui/Dialog';
import {closeccountInfoModal,changeAccountInfo,changeAccountInfoField} from '../action/accountboard';

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
    this.state = {pass_text:"",confirm_pass_text:"",name_text:""};
    //ES2015版のReactだとこのおまじないをしないとメソッド内でthisが解決しない...
    this.hundleClick = this.hundleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.hundlePassChange = this.hundlePassChange.bind(this);
    this.hundleNameChange = this.hundleNameChange.bind(this);
  }

  /**
  * アカウント情報変更ボタンのクリックをハンドリングするメソッド
  * @return {undefined}
  */
  hundleClick(){
      this.props.dispatch(changeAccountInfo(this.props.accountboard.nextuser.nextname, this.props.accountboard.nextuser.nextpass));
  }

  /**
  * モーダルのクローズをハンドリングするメソッド
  * @return {undefined}
  */
  handleClose(){
      this.props.dispatch(closeccountInfoModal());
  }

  hundlePassChange(event,newValue){
    this.props.dispatch(changeAccountInfoField(this.props.accountboard.nextuser.nextname, newValue));
  }

  hundleNameChange(event,newValue){
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
      />,
      <FlatButton
        label="Submit"
        primary={true}
        onTouchTap={this.hundleClick}
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
          onChange={this.hundleNameChange}
          />
          <br />
          <TextField
          hintText="Password"
          value={this.props.accountboard.nextuser.nextpass}
          type="password"
          onChange={this.hundlePassChange}
          />
        </Dialog>

    return (
      <div>{accountboard}</div>
    )
  }
}
