import React from 'react';
import ReactDOM from 'react-dom';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import {closeGroupCreationBoard} from '../action/groupboards';
import {createGroupRequired} from '../action/group';

/**
* GroupCreationBoardコンポーネント
* @see http://qiita.com/nownabe/items/2d8b92d95186c3941de0
*/
export default class GroupCreationBoard extends React.Component{
  /**
  * コンストラクタ
  * @param {Object} props プロパティ
  * @return {undefined}
  */
  constructor(props){
    super(props);

    this.state = {
      newGroupName:""
    }

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOK = this.handleOK.bind(this);
  }
  /**
  * グループ名の変更をハンドリングするhandler
  * @param {Object} event イベント
  * @param {string} newValue 変更後の値
  * @return {undefined}
  */
  handleNameChange(event,newValue){
    this.setState({newGroupName:newValue});
  }

  /**
  * キャンセルボタンのクリックをハンドリングするhandler
  * @return {undefined}
  */
  handleClose(){
    this.setState({newGroupName:""});
    this.props.dispatch(closeGroupCreationBoard());
  }
  /**
  * OKボタンのクリックをハンドリングするhandler
  * @return {undefined}
  */
  handleOK(){
    const newGroupName = this.state.newGroupName;
    if(newGroupName.trim().length > 0){
      this.setState({newGroupName:""});
      this.props.dispatch(createGroupRequired(newGroupName));
    }
  }

  /**
  * 描画メソッド
  * @return {Object} JSX
  */
  render(){
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onTouchTap={this.handleClose}
        ref="Close"
      />,
      <FlatButton
        label="OK"
        primary={true}
        onTouchTap={this.handleOK}
        ref="ok"
      />,
    ];

    return(
      <Dialog
        title="新しいグループを作成"
        actions={actions}
        modal={true}
        open={this.props.groupboards.creationBoard.isOpen}
      >
        <TextField
        hintText="グループ名"
        value={this.state.newGroupName}
        onChange={this.handleNameChange}
        ref="newGroupName"
        />
      </Dialog>
    );
  }
}
