import React from 'react'
import ReactDOM from 'react-dom'
import {myDestinationChange} from '../action/mydestination'
import Toggle from 'material-ui/Toggle'
import TextField from 'material-ui/TextField'
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
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

    //入力したinBusiness,comment,contactを一旦保持するstate
    this.state = {
      current_state_inBusiness:this.props.mydestination.inBusiness,
      current_text_comment:this.props.mydestination.comment, 
      current_text_contact:this.props.mydestination.contact
    };
    //ES2015版のReactだとこのおまじないをしないとメソッド内でthisが解決しない...
    this.handleToggle = this.handleToggle.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handleContactChange = this.handleContactChange.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleContactClear = this.handleContactClear.bind(this);
    this.handleMyDestinationSubmit = this.handleMyDestinationSubmit.bind(this);
  }
  /**
  * 出勤/退勤の切り替えをハンドリングするメソッド
  * @param {Object} event イベント
  * @param {boolean} isInputChecked "出勤"となっているかどうか
  * @return {undefined}
  */
  handleToggle(event,isInputChecked){
    this.setState({current_state_inBusiness:isInputChecked});
  }

  /**
  * コメントテキストボックスの変化をハンドリングするメソッド
  * @param {string} newValue 新しいテキストボックスの値
  * @return {undefined}
  */
  handleCommentChange(newValue) {
    this.setState({current_text_comment:newValue});
  }

  /**
  * 連絡先テキストボックスの変化をハンドリングするメソッド
  * @param {Object} event イベント
  * @param {string} newValue 新しい値
  * @return {undefined}
  */
  handleContactChange(event,newValue){
    this.setState({current_text_contact:newValue});
  }

  /**
  * クリアボタンの押下をハンドリングするメソッド
  * @param {Object} event イベント
  * @param {string} newValue 新しい値
  * @return {undefined}
  */
  handleClear(event,newValue){
    this.setState({current_text_comment:""});
  }

  /**
  * 連絡先クリアボタンの押下をハンドリングするメソッド
  * @param {Object} event イベント
  * @param {string} newValue 新しい値
  * @return {undefined}
  */
  handleContactClear(event,newValue){
    this.setState({current_text_contact:""});
  }

  /**
   * 更新ボタンの押下をハンドリングするメソッド
   * @param {Object} event イベント
   * @param {string} newValue 新しい値
   * @return {undefined}
   */
  handleMyDestinationSubmit(event){
    const inBusiness = this.state.current_state_inBusiness;
    const comment = this.state.current_text_comment;
    const contact = this.state.current_text_contact;
    this.props.dispatch(myDestinationChange({inBusiness, comment, contact}));
  }

  /**
  * 描画メソッド
  * @return {undefined}
  */
  render(){
    const style = {
      margin:10,
    };

    const styles = {
      block: {
        maxWidth: 320,
      },
      toggle: {
        margin: 10
      }
    };

    return (
      <div>
      <Paper style={{margin:5, padding:5}} zDepth={2}>
          <div style={styles.block}>
          <Toggle label={(this.state.current_state_inBusiness===true)?
            "[出勤]" :
            "[退勤]"}
            toggled={this.state.current_state_inBusiness} onToggle={this.handleToggle} ref="in_business"
            style={styles.toggle}
          />
          </div>
          <AutoComplete
            floatingLabelText="今日どこ？"
//            multiLine={true}
            filter={AutoComplete.fuzzyFilter}
            dataSource={this.props.mydestination.suggestion}
            maxSearchResults={10}
            openOnFocus={false}
            onNewRequest={this.handleCommentChange}
            onUpdateInput={this.handleCommentChange}
            searchText={this.state.current_text_comment}
//            value={this.state.current_text_comment}
            ref="comment"
          />
          <FlatButton label="クリア"
            primary={true}
            style={style}
            onTouchTap={this.handleClear}
          />
          <br />
          <TextField
            floatingLabelText="電話番号を入れてね"
            value={this.state.current_text_contact}
            onChange={this.handleContactChange}
            ref="contact"
          />
          <FlatButton label="クリア"
            primary={true}
            style={style}
            onTouchTap={this.handleContactClear}
          />
          <br />
          <RaisedButton label="送信"
            primary={true}
            style={style}
            onTouchTap={this.handleMyDestinationSubmit}
          />
      </Paper>
      </div>);
  }
}
