import React from 'react';
import ReactDOM from 'react-dom';
import Checkbox from 'material-ui/Checkbox';
import FlatButton from 'material-ui/FlatButton';
import {
  setMemberAsGroupAdminRequired,
  unsetMemberAsGroupAdminRequired,
  deleteMemberFromGroupRequired
} from '../action/group';

/**
* グループメンバー管理 コンポーネント
* @see http://qiita.com/nownabe/items/2d8b92d95186c3941de0
*/
export default class GroupMember extends React.Component{
  /**
  * コンストラクタ
  * @param {Object} props プロパティ
  * @return {undefined}
  */
  constructor(props){
    super(props);

    this.handleAdminCheck = this.handleAdminCheck.bind(this);
    this.handleDeleteMemberButton = this.handleDeleteMemberButton.bind(this);
  }

  /**
  * 管理者チェックボックスのチェックをハンドリングするhandler
  * @param {Object} event
  * @param {checked} チェックされた場合はtrue/外れた場合はfalse
  * @return {undefined}
  */
  handleAdminCheck(event,checked){
    if(checked){
      this.props.dispatch(setMemberAsGroupAdminRequired(this.props.groupId,this.props.memberId));
    }else{
      this.props.dispatch(unsetMemberAsGroupAdminRequired(this.props.groupId,this.props.memberId));
    }
  }

  /**
  * メンバーの削除ボタンのクリックをハンドリングするhandler
  */
  handleDeleteMemberButton(){
    if(confirm("メンバーから削除します。よろしいですか？")){
      this.props.dispatch(deleteMemberFromGroupRequired(this.props.groupId,this.props.memberId));
    }
  }

  /**
  * 描画メソッド
  * @return {Object} JSX
  */
  render(){
    return(
      <div>
        <span>{this.props.memberId}</span>
        <Checkbox
          label="管理者"
          defaultChecked={this.props.isAdmin}
          onCheck={this.handleAdminCheck}
          ref="adminCheckBox"
        />
        <FlatButton
          label="削除"
          primary={true}
          onTouchTap={this.handleDeleteMemberButton}
          ref="deleteMemberButton"
        />
      </div>
    )
  }
}
