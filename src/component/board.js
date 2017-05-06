import React from 'react';
import ReactDOM from 'react-dom';
import MemberRow from './memberrow';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import {
  red600,
  grey400
} from 'material-ui/styles/colors';

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
  * Filterテキストボックスの変更をハンドリングするメソッド
  * @param {Object} event イベント
  * @param {string} newValue 変更後の値
  * @return {undefined}
  */
  hundleFilterChange(event,newValue){
    this.setState({current_filter_text : newValue});
  }
  /**
  * 描画メソッド
  * @return {undefined}
  */
  render(){

    const filterMemberRows = this.props.memberStatus.filter((member) => (
      member.name.toLowerCase().indexOf(this.state.current_filter_text) >= 0
    ));

    const memberRows = filterMemberRows.map((member,idx) => <MemberRow key={idx} member={member}/>);
    const date = new Date().toLocaleDateString('ja-JP');

    return (
      <div>
      <h3>行き先掲示板</h3>
      <p>{date}</p>
      <TextField
        hintText="Filter"
        value={this.state.current_filter_text}
        onChange={this.hundleFilterChange}
        />
      {memberRows}
      </div>);
  }
}
