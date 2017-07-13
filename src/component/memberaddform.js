import React from 'react';
import ReactDOM from 'react-dom';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import {addMemberToGroupRequired} from '../action/group';

/**
* グループメンバー追加form コンポーネント
* @see http://qiita.com/nownabe/items/2d8b92d95186c3941de0
*/
export default class MemberAddForm extends React.Component{
  /**
  * コンストラクタ
  * @param {Object} props プロパティ
  * @return {undefined}
  */
  constructor(props){
    super(props);

    this.state = {
      currentUserId:""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleAddMemberButton = this.handleAddMemberButton.bind(this);
  }

  /**
  * 追加メンバーセレクトボックスの変更をハンドリングするhandler
  * @param {Object} event イベント
  * @param {number} key MenuItemのインデックス
  * @param {String} payload 変更後の値
  * @return {undefined}
  */
  handleChange(event,key,payload){
    this.setState({currentUserId:payload});
  }

  /**
  * メンバー追加ボタンのクリックをハンドリングするhandler
  * @return {undefined}
  */
  handleAddMemberButton(){
    if(this.state.currentUserId !== ""){
      this.props.dispatch(addMemberToGroupRequired(this.props.group.id, this.state.currentUserId));
      this.setState({currentUserId:""});
    }
  }

  /**
  * 描画メソッド
  * @return {Object} JSX
  */
  render(){
    const allMembers = this.props.memberStatus.map(
      status => {
        return {userid:status.userid,name:status.name};
      }
    );
    const groupMembers = this.props.group.member ?
      this.props.group.member.map(status => {
          return {userid:status.userid,name:status.name}
        }
      ) :
      [];

      console.log(allMembers,groupMembers);

    //TODO: filter機能の実装
    //    Group　memberでないメンバーを表示する
    const membersNotInGroup = allMembers.filter(member => groupMembers.indexOf(member) < 0);

    const items = allMembers.map((member,idx) =>
      <MenuItem
        key={idx+1}
        value={member.name + "(" + member.userid + ")"}
        primaryText={member.name + "(" + member.userid + ")"}
      />s
    );

    return(
      <div>
        <SelectField
          floatingLabelText="追加ユーザー"
          value={this.state.currentUserId}
          onChange={this.handleChange}
        >
          <MenuItem value={""} primaryText="" />
          {items}
        </SelectField>
        <br />
        <FlatButton
          label="追加"
          primary={true}
          onTouchTap={this.handleAddMemberButton}
          ref="addMemberButton"
        />
      </div>
    );
  }
}
