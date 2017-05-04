import React from 'react'
import ReactDOM from 'react-dom'
import {myDestinationChange,myDestinationClear} from '../action/mydestination'
import Toggle from 'material-ui/Toggle'
import TextField from 'material-ui/TextField'
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';

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
    this.hundleClear = this.hundleClear.bind(this);
    this.hundleToggle = this.hundleToggle.bind(this);
    this.hundleCommentChange = this.hundleCommentChange.bind(this);
    this.hundleContactChange = this.hundleContactChange.bind(this);
  }
  /**
  * クリアボタンをクリックをハンドリングするメソッド
  * @return {undefined}
  */
  hundleClear(){
    const action = myDestinationClear();
    this.props.dispatch(action);
  }
  /**
  * 出勤/退勤の切り替えをハンドリングするメソッド
  * @param {Object} event イベント
  * @param {boolean} isInputChecked "出勤"となっているかどうか
  * @return {undefined}
  */
  hundleToggle(event,isInputChecked){
    this.props.dispatch(myDestinationChange({
        inBusiness:isInputChecked, comment:this.props.mydestination.comment, contact:this.props.mydestination.contact
    }));
  }

  /**
  * コメントテキストボックスの変化をハンドリングするメソッド
  * @param {string} newValue 新しいテキストボックスの値
  * @return {undefined}
  */
  hundleCommentChange(newValue) {
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
  hundleContactChange(event,newValue){
    this.props.dispatch(myDestinationChange({
        inBusiness:this.props.mydestination.inBusiness, comment:this.props.mydestination.comment, contact:newValue
    }));
  }

  /**
  * 描画メソッド
  * @return {undefined}
  */
  render(){
    return (
      <div>
      <h3>自分の行き先</h3>
      <table>
        <tbody>
        <tr>
          <td>{this.props.login.user.name}</td>
          <td>
            <Toggle label="出勤" toggled={this.props.mydestination.inBusiness} onToggle={this.hundleToggle} ref="in_business"/>
          </td>
          <td>
            <AutoComplete
              hintText="コメント"
              filter={AutoComplete.fuzzyFilter}
              dataSource={this.props.suggestion.length > 0 ? this.props.suggestion : ["EAST 8F", "EAST 3F", "宝町", "NRI 13F", "NRI 12F"]}
              maxSearchResults={10}
              openOnFocus={true}
              onUpdateInput={this.hundleCommentChange}
              value={this.props.mydestination.comment}
              ref="comment"
            />
          </td>
          <td>
            <RaisedButton label="Clear" secondary={true} onClick={this.hundleClear} ref="clear_button"/>
          </td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td>
            <TextField hintText="連絡先" value={this.props.mydestination.contact} onChange={this.hundleContactChange} ref="contact"/>
          </td>
          <td></td>
        </tr>
        </tbody>
      </table>
      </div>);
  }
}
