import React from 'react'

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
  */
  render(){
    return (
      <tr>
        <td>{this.props.member.name}</td>
        <td>{this.props.member.inBusiness ? "出勤" : "退勤"}</td>
        <td>{this.props.member.comment}</td>
      </tr>
    );
  }
}
