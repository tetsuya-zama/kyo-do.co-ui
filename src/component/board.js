import React from 'react';
import ReactDOM from 'react-dom';
import MemberRow from './memberrow';
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
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  /**
  * Filterテキストボックスの変更をハンドリングするメソッド
  * @param {Object} event イベント
  * @param {string} newValue 変更後の値
  * @return {undefined}
  */
  handleFilterChange(event,newValue){
    this.setState({current_filter_text : newValue});
  }
  /**
  * 描画メソッド
  * @return {undefined}
  */
  render(){

    const filterMemberRows = this.props.memberStatus.filter((member) => (
      member.name.toLowerCase().indexOf(this.state.current_filter_text.toLowerCase()) >= 0
    ));

    const memberRows = filterMemberRows.map((member,idx) => <MemberRow key={idx} member={member}/>);
    const date = this.props.updatedate.date ?
      this.props.updatedate.date.toLocaleDateString('ja-JP'):
    "";
    //const date = ner Date().toLocaleDateString('ja-JP');

    return (
      <div>
      <h3>行き先掲示板</h3>
      <p>{date}</p>
      <TextField
        hintText="Filter"
        value={this.state.current_filter_text}
        onChange={this.handleFilterChange}
        ref="memberfilter"
        />
      {memberRows}
      </div>);
  }
}
