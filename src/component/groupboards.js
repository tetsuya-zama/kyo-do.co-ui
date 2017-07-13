import React from 'react';
import ReactDOM from 'react-dom';
import {Tabs, Tab} from 'material-ui-scrollable-tabs/Tabs';
import Board from './board';
import FlatButton from 'material-ui/FlatButton';
import {openGroupManagementBoard} from '../action/groupboards';

/**
* グループ別の行き先掲示板コンポーネント
* @see http://qiita.com/nownabe/items/2d8b92d95186c3941de0
*/
export default class GroupBoards extends React.Component{
  /**
  * コンストラクタ
  * @param {Object} props プロパティ
  * @return {undefined}
  */
  constructor(props){
    super(props);
  }

  /**
  * 描画メソッド
  * @return {undefined}
  */
  render(){
    const groupTabs = this.props.group.usersGroups
      .map((group,idx) => {
        const isAdmin = group.admin.indexOf(this.props.login.user.userid) >= 0;
        const editButton = isAdmin ?
          <FlatButton label="グループ設定" primary={true} onTouchTap={()=> this.props.dispatch(openGroupManagementBoard(group.id))} ref="groupEdit" /> :
          null;

        return (
          <Tab
            key={idx}
            label={group.groupname}
          >
            {editButton}
            <Board
              memberStatus={group.member}
              updatedate={this.props.updatedate}
            />
          </Tab>
        )
      });

    const othergroupTabs = this.props.group.allGroups
      .filter((group) => {
        return !this.props.group.usersGroups.indexOf(group) == 0;
      })
      .sort(function(a, b) {
        return ( a.groupname > b.groupname ? 1 : -1);
      })
      .map((group,idx) => {
        return (
          <Tab
            key={idx}
            label={group.groupname}
            isMultiLine={true}
          >
            <Board
              memberStatus={group.member}
              updatedate={this.props.updatedate}
            />
          </Tab>
        )
      });
    if (groupTabs.length + othergroupTabs.length === 0) { return null; } //スクロールボタンを表示するためのおまじない的な

    return(
        <Tabs tabType={'scrollable-buttons'}>
          {groupTabs}
          <Tab label="すべてのメンバー">
            <Board
              memberStatus={this.props.board.memberStatus}
              updatedate={this.props.updatedate}
            />
          </Tab>
          {othergroupTabs}
        </Tabs>
    )
  }
}
