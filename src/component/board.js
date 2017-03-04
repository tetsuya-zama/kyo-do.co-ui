import React from 'react'
import ReactDOM from 'react-dom';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';

/**
* 行き先掲示板コンポーネント
* @see http://qiita.com/nownabe/items/2d8b92d95186c3941de0
*/
export default class Board extends React.Component{
  /**
  * コンストラクタ
  * @param {Object} props プロパティ
  * @return {undefined}
  */
  constructor(props){
    super(props);
    this.state = {
      current_filter_text:""
    }
    this.hundleFilterChange = this.hundleFilterChange.bind(this);
  }


  /**
  * 描画メソッド
  * @return {undefined}
  */

  hundleFilterChange(event,newValue){
//    const line = this.props.memberStatus;
//    const line = this.props.memberStatus.filter((name) => (
//      name.toLowerCase().indexOf(newValue) >= 0
//    ));
//
    this.setState({current_filter_text : newValue});
  }

  render(){
    //チームの数だけTeamBoardコンポーネントを作成する
    //const teamBoards = this.props.memberStatus.map(team => <TeamBoard key={team.teamId} team={team}/>);
    //const memberRows = this.state.filterdMemberStatus.map((member,idx) => <MemberRow key={idx} member={member}/>);

    const filterMemberRows = this.props.memberStatus.filter((member) => (
      member.name.toLowerCase().indexOf(this.state.current_filter_text) >= 0
    ));

    const memberRows = filterMemberRows.map((member,idx) => <MemberRow key={idx} member={member}/>);
    return (
      <div>
      <h3>行き先掲示板</h3>
      <TextField
        hintText="Filter"
        value={this.state.current_filter_text}
        onChange={this.hundleFilterChange}
        />
      {memberRows}
      </div>);
  }
}
/**
* チーム別行き先掲示板コンポーネント
* @see http://qiita.com/nownabe/items/2d8b92d95186c3941de0
*/
class TeamBoard extends React.Component{
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
    //メンバーの数だけMemberRowコンポーネント作成する
//    const memberRows = this.props.team.members.map((member,idx) => <MemberRow key={idx} member={member}/>);
    return (
      <div>
        <h4>{this.props.team.name}</h4>
        <table>
        <tbody>
        {memberRows}
        </tbody>
        </table>
      </div>
    );
  }
}
/**
* 描画メソッド
* @return {undefined}
*/
class MemberRow extends React.Component{
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
  {this.props.member.name}
  <td>{this.props.member.name}</td>
  <td>{this.props.member.inBusiness ? "出勤" : "退勤"}</td>
  <td>{this.props.member.comment}</td>
  leftAvatar={<Avatar>{this.props.member.name.charAt(0).toUpperCase()}</Avatar>}
  */
  render(){

    return (
        <List>
          <ListItem
            primaryText={this.props.member.name}
            secondaryText={this.props.member.comment}
            rightAvatar={<Avatar>{this.props.member.inBusiness ? "出" : "退"}</Avatar>}
          />
        </List>
    );
  }
}
