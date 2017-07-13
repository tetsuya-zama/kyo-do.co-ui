import React from 'react';
import ReactDOM from 'react-dom';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import {addMemberToGroupRequired} from '../action/group';
import RaisedButton from 'material-ui/RaisedButton';

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
    const allMemberId = this.props.memberStatus.map(status => status.userid);
    const groupMemberId = this.props.group.member ?
      this.props.group.member.map(status => status.userid) :
      [];

    const memberIdNotInGroup = allMemberId.filter(id => groupMemberId.indexOf(id) < 0);

    const items = memberIdNotInGroup.map((id,idx) => <MenuItem key={idx+1} value={id} primaryText={id} />);

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
        <RaisedButton
          label="追加"
          primary={true}
          onTouchTap={this.handleAddMemberButton}
          ref="addMemberButton"
        />
      </div>
    );
  }
}
