import React from 'react'
import ReactDOM from 'react-dom'
import {myDestinationChange,myDestinationClear} from '../action/mydestination'
import Toggle from 'material-ui/Toggle'
import TextField from 'material-ui/TextField'

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
    this.hundleTextChange = this.hundleTextChange.bind(this);
    this.hundleContactChange = this.hundleContactChange.bind(this);
  }

  hundleClear(){
    const action = myDestinationClear();
    this.props.dispatch(action);
  }

  hundleToggle(event,isInputChecked){
    this.props.dispatch(myDestinationChange({inBusiness:isInputChecked, comment:this.props.mydestination.comment}));
  }

  hundleTextChange(event,newValue){
    this.props.dispatch(myDestinationChange({inBusiness:this.props.mydestination.inBusiness, comment:newValue}));
  }

  hundleContactChange(event,newValue){
    this.props.dispatch(myDestinationChange({contact:newValue}));
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
            <Toggle label="出勤" toggled={this.props.mydestination.inBusiness} onToggle={this.hundleToggle} />
          </td>
          <td>
            <TextField hintText="コメント" value={this.props.mydestination.comment} onChange={this.hundleTextChange}/>
          </td>
          <td>
            <button onClick={this.hundleClear}>Clear</button>
          </td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td>
            <TextField hintText="連絡先" />
          </td>
          <td></td>
        </tr>
        </tbody>
      </table>
      </div>);
  }
}
