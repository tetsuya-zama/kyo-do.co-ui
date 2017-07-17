import React from 'react';
import ReactDOM from 'react-dom';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import {addMemberToGroupRequired} from '../action/group';
import RaisedButton from 'material-ui/RaisedButton';
import AutoComplete from 'material-ui/AutoComplete';

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

    this.searchWord = {
      searchText: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleAddMemberButton = this.handleAddMemberButton.bind(this);
    this.handleMemberChange = this.handleMemberChange.bind(this);
    this.test = this.test.bind(this);
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
    console.log(this.state);
  }

  /**
  * メンバー追加ボタンのクリックをハンドリングするhandler
  * @return {undefined}
  */
  handleAddMemberButton(){
    if(this.state.currentUserId !== ""){
      const allMemberId = this.props.memberStatus.map(status => status.userid);
      const groupMemberId = this.props.group.member ?
        this.props.group.member.map(status => status.userid) :
        [];

      const memberIdNotInGroup = allMemberId.filter(id => groupMemberId.indexOf(id) < 0);

      const items = memberIdNotInGroup.map((id,idx) => <MenuItem key={idx+1} value={id} primaryText={id} />);
      const sortedItems = items.sort(function(name, namex){
        if(name.props.value < namex.props.value) return -1;
        if(name.props.value > namex.props.value) return 1;
        return 0;
      });
      const arrMemberValue = Object.keys(sortedItems).map(function(key) {return sortedItems[key].props.value});
      //const fillteredItems = arrMemberValue.filter(function(element){
        //return (element == test);
      //})();
      const fillteredItems = arrMemberValue.filter(function(element){
        return (element == this);
      }, this.state.currentUserId);
      if(fillteredItems.length == 1){
        this.props.dispatch(addMemberToGroupRequired(this.props.group.id, this.state.currentUserId));
        this.setState({currentUserId:""});
        this.setState({searchText:""});
      }
      //this.props.dispatch(addMemberToGroupRequired(this.props.group.id, this.state.currentUserId));
      //this.setState({currentUserId:""});
    }
  }

  test(element, state){
    return (element == state);
  }

  /**
  * コメントテキストボックスの変化をハンドリングするメソッド
  * @param {string} newValue 新しいテキストボックスの値
  * @return {undefined}
  */
  handleMemberChange(newValue) {
    this.state.currentUserId = newValue;
    console.log(this.state.currentUserId);
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
    const sortedItems = items.sort(function(name, namex){
      if(name.props.value < namex.props.value) return -1;
      if(name.props.value > namex.props.value) return 1;
      return 0;
    });
    const arrMemberValue = Object.keys(sortedItems).map(function(key) {return sortedItems[key].props.value});


    return(
      <div>
        <AutoComplete
          hintText="追加ユーザ"
          filter={AutoComplete.caseInsensitiveFilter}
          dataSource={arrMemberValue}
          maxSearchResults={10}
          openOnFocus={true}
          onUpdateInput={this.handleMemberChange}
          searchText={this.searchWord.searchText}
          ref="comment"
        />

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
