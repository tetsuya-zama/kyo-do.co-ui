import React from 'react';
import ReactDOM from 'react-dom';
import MemberRow from './memberrow';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

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

    const sortedMemberRows = filterMemberRows.sort(function(a,b){
      if(a.lastUpdate > b.lastUpdate) return -1;
      if(a.lastUpdate < b.lastUpdate) return 1;
      return 0;
    });
  
    const RaisedButtonExampleSimple = () => (
      <div>
        <RaisedButton label="Default" style={style} />
        <RaisedButton label="Primary" primary={true} style={style} />
        <RaisedButton label="Secondary" secondary={true} style={style} />
        <RaisedButton label="Disabled" disabled={true} style={style} />
        <br />
        <br />
        <RaisedButton label="Full width" fullWidth={true} />
      </div>
    );

    const memberRows = sortedMemberRows.map((member,idx) => <MemberRow key={idx} member={member}/>);
    const date = this.props.updatedate.date?
      this.props.updatedate.date.toLocaleString('ja-JP'):
      "";

    return (
      <div>
      <h3>行き先掲示板（データ取得日時: {date}）</h3>
      <p>{RaisedButtonExampleSimple}</p>
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
