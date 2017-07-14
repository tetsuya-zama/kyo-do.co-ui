import React from 'react';
import ReactDOM from 'react-dom';
import MemberRow from './memberrow';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu'; //追記
import MenuItem from 'material-ui/MenuItem'; //追記

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
      current_filter_text:"",
      current_sort_key:"1"
    };
    //ES2015版のReactだとこのおまじないをしないとメソッド内でthisが解決しない...
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleSortByDefault = this.handleSortByDefault.bind(this);
    this.handleSortByLastUpdate = this.handleSortByLastUpdate.bind(this);
    this.handleSortByName = this.handleSortByName.bind(this);
    this.handleSortByAttendance = this.handleSortByAttendance.bind(this);
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

  handleSortByDefault(event){
    this.setState({current_sort_key : "0"});
  }

  handleSortByLastUpdate(event){
    this.setState({current_sort_key : "1"});
  }

  handleSortByName(event){
    this.setState({current_sort_key : "２"});
  }

  handleSortByAttendance(event){
    this.setState({current_sort_key : "3"});
  }

  /**
  * 描画メソッド
  * @return {undefined}
  */
  render(){

    const filterMemberRows = this.props.memberStatus.filter((member) => (
      member.name.toLowerCase().indexOf(this.state.current_filter_text.toLowerCase()) >= 0
    ));

    const sortedMemberRows = filterMemberRows.sort((a,b)=>{
      if(this.state.current_sort_key === "0"){
          if(a.userid < b.userid) return -1;
          if(a.userid > b.userid) return 1;
          return 0;
      }
      if(this.state.current_sort_key === "1"){
          if(a.lastUpdate > b.lastUpdate) return -1;
          if(a.lastUpdate < b.lastUpdate) return 1;
          return 0;
      }
      if(this.state.current_sort_key === "２"){
          if(a.name > b.name) return -1;
          if(a.name < b.name) return 1;
          return 0;
      }
      if(this.state.current_sort_key === "3"){
          if(a.inBusiness===true) return -1;
          if(a.inBusiness===false) return 1;
          return 0;
      }
    });


    const memberRows = sortedMemberRows.map((member,idx) => <MemberRow key={idx} member={member}/>);
    const date = this.props.updatedate.date?
      this.props.updatedate.date.toLocaleString('ja-JP'):
      "";

    const style = {
      margin: 12,
    };

    return (
      <div>
      <h3>行き先掲示板（データ取得日時: {date}）</h3>
        <div>
          <RaisedButton
            label="ユーザーID(昇順)"
            primary={true}
            style={style}
            onTouchTap={this.handleSortByDefault}
          />
          <RaisedButton label="更新日時(降順)"
            primary={true}
            style={style}
            onTouchTap={this.handleSortByLastUpdate}
          />
          <RaisedButton label="名前(降順)"
            primary={true}
            style={style}
            onTouchTap={this.handleSortByName}
          />
          <RaisedButton label="出勤者(降順)"
            primary={true}
            style={style}
            onTouchTap={this.handleSortByAttendance}
          />
        </div>
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
