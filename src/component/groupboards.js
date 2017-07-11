import React from 'react';
import ReactDOM from 'react-dom';
import {Tabs, Tab} from 'material-ui/Tabs';
import Board from './board';
import FlatButton from 'material-ui/FlatButton';
import openGroupManagementBoard from '../action/groupboards';

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
        const isAdmin = group.admin.indexOf(this.login.user.userid) >= 0;
        const editButton = isAdmin ?
          <FlatButton label="グループ設定" primary={true} onTouchTap={()=> this.props.dispatch(openGroupManagementBoard(group.id))} ref="groupEdit" /> :
          null;

        return (
          <Tab
            key={idx}
            label={group.name}
          >
            {editButton}
            <Board
              memberStatus={group.member}
            />
          </Tab>
        )
      });

    return(
        <Tabs>
          {groupTabs}
          <Tab label="すべてのメンバー">
            <Board
              memberStatus={this.props.board.memberStatus}
            />
          </Tab>
        </Tabs>
    )
  }
}
