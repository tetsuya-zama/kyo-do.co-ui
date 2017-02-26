import React from 'react'
import ReactDOM from 'react-dom'
import {myDestinationChange} from '../action/mydestination'

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
    this.hundleChange = this.hundleChange.bind(this);
  }
  /**
  * 行き先の変更をハンドリングするメソッド
  * @return undefined
  */
  hundleChange(){
    //入力された出勤・退勤とコメントを両方取得してMY_DESTINATION_CHANGEアクションをdispatchする
    const inBusiness = ReactDOM.findDOMNode(this.refs.inBusiness).value == 1; // state上はbooleanなのでここで変換
    const comment = ReactDOM.findDOMNode(this.refs.comment).value;

    this.props.dispatch(myDestinationChange({inBusiness:inBusiness, comment:comment}));
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
            <select ref="inBusiness" value={inBusinessValue} onChange={this.hundleChange}>
             <option value={0}>退勤</option>
             <option value={1}>出勤</option>
            </select>
          </td>
          <td>
            <input type="text" ref="comment" value={commentValue} onChange={this.hundleChange}/>
          </td>
        </tr>
        </tbody>
      </table>
      </div>);
  }
}
