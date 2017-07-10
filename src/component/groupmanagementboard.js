import React from 'react';
import ReactDOM from 'react-dom';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import {getGroupById} from '../module/group';
import {deleteGroupRequired,changeGroupNameRequired} from '../action/group';
import {closeGroupManagementBoard} from '../action/groupboards';

export default class GroupManagementBoard extends React.Component{
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

    this.hundleClose = this.hundleClose.bind(this);
    this.hundleDeleteGroupButton = this.hundleDeleteGroupButton.bind(this);
    this.hundleNameChange = this.hundleNameChange.bind(this);
    this.hundleChangeNameButton = this.hundleChangeNameButton.bind(this);
  }

  /**
  * キャンセルボタンのクリックをハンドリングするhundler
  * @return {undefined}
  */
  hundleClose(){
    this.setState({newGroupName:""});
    this.props.dispatch(closeGroupManagementBoard());
  }

  /**
  * グループの削除ボタンのクリックをハンドリングするhundler
  */
  hundleDeleteGroupButton(){
    if(confirm("削除します。よろしいですか？")){
      this.props.dispatch(deleteGroupRequired(this.props.managementBoard.groupId));
      this.setState({newGroupName:""});
      this.props.dispatch(closeGroupManagementBoard());
    }
  }

  /**
  * グループ名の変更をハンドリングするhundler
  * @param {Object} event イベント
  * @param {string} newValue 変更後の値
  * @return {undefined}
  */
  hundleNameChange(event,newValue){
    this.setState({newGroupName:newValue});
  }

  /**
  * グループ名の変更ボタンのクリックをハンドリングするhundler
  * @return {undefined}
  */
  hundleChangeNameButton(){
    if(this.state.newGroupName.trim().length > 0){
      this.props.dispatch(changeGroupNameRequired(
        this.props.managementBoard.groupId,
        this.state.newGroupName
      ));
    }
  }

  /**
  * 描画メソッド
  * @return {Object} JSX
  */
  render(){
    if(!this.props.managementBoard.isOpen){
      return null;
    }

    const targetGroup = getGroupById(this.props.group.allGroups,this.props.managementBoard.groupId);
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onTouchTap={this.hundleClose}
        ref="Close"
      />
    ];

    const groupNameText =
      this.state.newGroupName === "" ?
      targetGroup.name :
      this.state.newGroupName;

    return(
      <Dialog
        title={targetGroup.name + "を編集"}
        actions={actions}
        modal={true}
        open={this.props.managementBoard.isOpen}
      >
        <div>
          <FlatButton
            label="削除"
            primary={true}
            onTouchTap={this.hundleDeleteGroupButton}
            ref="deleteGroupButton"
          />
        </div>
        <div>
          <TextField
            hintText="グループ名"
            value={groupNameText}
            onChange={this.hundleNameChange}
            ref="groupName"
          />
          <FlatButton
            label="変更"
            primary={true}
            onTouchTap={this.hundleChangeNameButton}
            ref="changeNameButton"
          />
        </div>
      </Dialog>
    )
  }
}
