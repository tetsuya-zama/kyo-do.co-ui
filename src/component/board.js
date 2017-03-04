import React from 'react'
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

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
  }

  /**
  * 描画メソッド
  * @return {undefined}
  */
  render(){
    //チームの数だけTeamBoardコンポーネントを作成する
    const memberRows = this.props.memberStatus.map((member,idx) => <MemberRow key={idx} member={member}/>);

    const date = new Date().toLocaleDateString('ja-JP');

    return (
      <div>
      <h3>行き先掲示板</h3>
      <p>{date}</p>
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
    const memberRows = this.props.team.members.map((member,idx) => <MemberRow key={idx} member={member}/>);
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
      //const memberRows = this.props.memberStatus.map((member,idx) => <MemberRow key={idx} member={member}/>);
    return (
        <List>
          <ListItem
            primaryText={this.props.member.name + "：" + this.props.member.contact}
            secondaryText={this.props.member.comment}
            rightAvatar={<Avatar backgroundColor={this.props.member.inBusiness ? red600 : grey400} > {this.props.member.inBusiness ? "出" : "退"}</Avatar>} />
      </List>
    );
  }
}
