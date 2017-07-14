import React from 'react'
import ReactDOM from 'react-dom'
import {myDestinationChange} from '../action/mydestination'
import Toggle from 'material-ui/Toggle'
import TextField from 'material-ui/TextField'
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

/**
* "自分の行き先"コンポーネント
* @see http://qiita.com/nownabe/items/2d8b92d95186c3941de0
*/
export default class MyDestination extends React.Component{
  /**
  * コンストラクタ
  * @param {Object} props
  * @return {undefined}
  */
  constructor(props){
    super(props);

    //ES2015版のReactだとこのおまじないをしないとメソッド内でthisが解決しない...
    this.handleToggle = this.handleToggle.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handleContactChange = this.handleContactChange.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleContactClear = this.handleContactClear.bind(this);
  }
  /**
  * 出勤/退勤の切り替えをハンドリングするメソッド
  * @param {Object} event イベント
  * @param {boolean} isInputChecked "出勤"となっているかどうか
  * @return {undefined}
  */
  handleToggle(event,isInputChecked){
    this.props.dispatch(myDestinationChange({
        inBusiness:isInputChecked, comment:this.props.mydestination.comment, contact:this.props.mydestination.contact
    }));
  }

  /**
  * コメントテキストボックスの変化をハンドリングするメソッド
  * @param {string} newValue 新しいテキストボックスの値
  * @return {undefined}
  */
  handleCommentChange(newValue) {
    this.props.dispatch(myDestinationChange({
        inBusiness:this.props.mydestination.inBusiness, comment:newValue, contact:this.props.mydestination.contact
    }));
  }

  /**
  * 連絡先テキストボックスの変化をハンドリングするメソッド
  * @param {Object} event イベント
  * @param {string} newValue 新しい値
  * @return {undefined}
  */
  handleContactChange(event,newValue){
    this.props.dispatch(myDestinationChange({
        inBusiness:this.props.mydestination.inBusiness, comment:this.props.mydestination.comment, contact:newValue
    }));
  }

  /**
  * クリアボタンの押下をハンドリングするメソッド
  * @param {Object} event イベント
  * @param {string} newValue 新しい値
  * @return {undefined}
  */
  handleClear(event,newValue){
    this.props.dispatch(myDestinationChange({
        inBusiness:this.props.mydestination.inBusiness, comment:"", contact:this.props.mydestination.contact
    }));
  }

  /**
  * 連絡先クリアボタンの押下をハンドリングするメソッド
  * @param {Object} event イベント
  * @param {string} newValue 新しい値
  * @return {undefined}
  */
  handleContactClear(event,newValue){
    this.props.dispatch(myDestinationChange({
        inBusiness:this.props.mydestination.inBusiness, comment:this.props.mydestination.comment, contact:""
    }));
  }

  /**
  * 描画メソッド
  * @return {undefined}
  */
  render(){
    const style = {
      margin:10,
    };

    return (
      <div>
      <Paper style={{margin:5, padding:5}} zDepth={2}>
        <h3>自分の行き先編集</h3>
          <Toggle label={(this.props.mydestination.inBusiness===true)?
            "[出勤]" :
            "[退勤]"}
            toggled={this.props.mydestination.inBusiness} onToggle={this.handleToggle} ref="in_business"
          />
          <AutoComplete
            floatingLabelText="今日どこ？"
            filter={AutoComplete.fuzzyFilter}
            dataSource={this.props.mydestination.suggestion}
            maxSearchResults={10}
            openOnFocus={true}
            onUpdateInput={this.handleCommentChange}
            searchText={this.props.mydestination.comment}
            ref="comment"
          />
          <RaisedButton label="クリア"
            primary={true}
            style={style}
            onTouchTap={this.handleClear}
          />
          <br />
          <TextField floatingLabelText="電話番号を入れてね" value={this.props.mydestination.contact} onChange={this.handleContactChange} ref="contact"/>
          <RaisedButton label="クリア"
            primary={true}
            style={style}
            onTouchTap={this.handleContactClear}
          />
      </Paper>
      </div>);
  }
}
