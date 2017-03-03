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
    console.log(props.mydestination.inBusiness);
    this.state = {
      currentInBusiness:!props.mydestination.inBusiness,
      currentComment:props.mydestination.comment
    };

    //ES2015版のReactだとこのおまじないをしないとメソッド内でthisが解決しない...
    this.hundleChange = this.hundleChange.bind(this);
    this.hundleClear = this.hundleClear.bind(this);
    this.hundleToggle = this.hundleToggle.bind(this);
    this.hundleTextChange = this.hundleTextChange.bind(this);
  }
  /**
  * 行き先の変更をハンドリングするメソッド
  * @return undefined
  */
  hundleChange(){
    this.props.dispatch(myDestinationChange({inBusiness:!this.state.currentInBusiness, comment:this.state.currentComment}));
  }

  hundleClear(){
    const action = myDestinationClear();
    this.props.dispatch(action);
  }

  hundleToggle(event,isInputChecked){
    this.setState({currentInBusiness : isInputChecked});
    this.hundleChange();
  }

  hundleTextChange(event,newValue){
    this.setState({currentComment:newValue});
    this.hundleChange();
  }

  /**
  * 描画メソッド
  * @return {undefined}
  */
  render(){
    const inBusinessValue = this.props.mydestination.inBusiness ? 1 : 0;
    const commentValue = this.props.mydestination.comment;
    return (
      <div>
      <h3>自分の行き先</h3>
      <table>
        <tbody>
        <tr>
          <td>{this.props.login.user.name}</td>
          <td>
            <Toggle label="出勤" toggled={this.state.currentInBusiness} onToggle={this.hundleToggle} />
          </td>
          <td>
            <TextField hintText="コメント" value={this.state.currentComment} onChange={this.hundleTextChange}/>
          </td>
          <td>
            <button onClick={this.hundleClear}>Clear</button>
          </td>
        </tr>
        </tbody>
      </table>
      </div>);
  }
}
