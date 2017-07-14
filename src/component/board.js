import React from 'react';
import ReactDOM from 'react-dom';
import MemberRow from './memberrow';
import TextField from 'material-ui/TextField';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import DropDownMenu from 'material-ui/DropDownMenu';

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
      current_sort_key:"4",
      value : 3
    };
    //ES2015版のReactだとこのおまじないをしないとメソッド内でthisが解決しない...
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleSortByIDAsc = this.handleSortByIDAsc.bind(this);
    this.handleSortByLastUpdateAsc = this.handleSortByLastUpdateAsc.bind(this);
    this.handleSortByNameAsc = this.handleSortByNameAsc.bind(this);
    this.handleSortByIDDes = this.handleSortByIDDes.bind(this);
    this.handleSortByLastUpdateDes = this.handleSortByLastUpdateDes.bind(this);
    this.handleSortByNameDes = this.handleSortByNameDes.bind(this);
    //this.handleSortByDefault = this.handleSortByDefault.bind(this);
    //this.handleSortByLastUpdate = this.handleSortByLastUpdate.bind(this);
    //this.handleSortByName = this.handleSortByName.bind(this);
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

  handleSortByIDAsc(event){
    this.setState({current_sort_key : "0"});
  }

  handleSortByLastUpdateAsc(event){
    this.setState({current_sort_key : "1"});
  }

  handleSortByNameAsc(event){
    this.setState({current_sort_key : "2"});
  }
  handleSortByIDDes(event){
    this.setState({current_sort_key : "3"});
  }
  handleSortByLastUpdateDes(event){
    this.setState({current_sort_key : "4"});
  }
  handleSortByNameDes(event){
    this.setState({current_sort_key : "5"});
  }
  handleSortByAttendance(event){
    this.setState({current_sort_key : "6"});
  }
  handleChange = (event, index, value) => this.setState({value});

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
          if(a.lastUpdate < b.lastUpdate) return -1;
          if(a.lastUpdate > b.lastUpdate) return 1;
          return 0;
      }
      if(this.state.current_sort_key === "2"){
          if(a.name < b.name) return -1;
          if(a.name > b.name) return 1;
          return 0;
      }
      if(this.state.current_sort_key === "3"){
          if(a.userid > b.userid) return -1;
          if(a.userid < b.userid) return 1;
          return 0;
      }
      if(this.state.current_sort_key === "4"){
          if(a.lastUpdate > b.lastUpdate) return -1;
          if(a.lastUpdate < b.lastUpdate) return 1;
          return 0;
      }
      if(this.state.current_sort_key === "5"){
          if(a.name > b.name) return -1;
          if(a.name < b.name) return 1;
          return 0;
      }
      if(this.state.current_sort_key === "6"){
          if(a.inBusiness===true) return -1;
          if(a.inBusiness===false) return 1;
          return 0;
      }
    });

    const memberRows = sortedMemberRows.map((member,idx) => <MemberRow dispatch={this.props.dispatch} key={idx} member={member}/>);
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
        <DropDownMenu value={this.state.value} onChange={this.handleChange} openImmediately={false}>
          <MenuItem value={1}
            primaryText="出勤者(降順)"
            style={style}
            onTouchTap={this.handleSortByAttendance}
          />
          <MenuItem value={2}
          primaryText="更新日時(昇順)"
          style={style}
          onTouchTap={this.handleSortByLastUpdateAsc}
          />
          <MenuItem value={3}
          primaryText="更新日時(降順)"
          style={style}
          onTouchTap={this.handleSortByLastUpdateDes}
          />
          <MenuItem value={4}
          primaryText="名前(昇順)"
          style={style}
          onTouchTap={this.handleSortByNameAsc}
          />
          <MenuItem value={5}
          primaryText="名前(降順)"
          style={style}
          onTouchTap={this.handleSortByNameDes}
          />
          <MenuItem value={6}
          primaryText="ユーザーID(昇順)"
          style={style}
          onTouchTap={this.handleSortByIDAsc}
          />
          <MenuItem value={7}
          primaryText="ユーザーID(降順)"
          style={style}
          onTouchTap={this.handleSortByNameDes}
          />
        </DropDownMenu>
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
