import React from 'react';
import ReactDOM from 'react-dom';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import {
  red600,
  grey400
} from 'material-ui/styles/colors';
import {getDestHistory} from '../action/historyboard';

/**
* メンバーごとの行き先コンポーネント
* @see http://qiita.com/nownabe/items/2d8b92d95186c3941de0
*/
export default class MemberRow extends React.Component{
  /**
  * コンストラクタ
  * @param {Object} props プロパティ
  * @return {undefined}
  */
  constructor(props){
    super(props);
    //ES2015版のReactだとこのおまじないをしないとメソッド内でthisが解決しない...
    this.handleMemberRow = this.handleMemberRow.bind(this);
  }
    
  /**
   * メンバーのクリックをハンドルするメソッド
   */

  handleMemberRow(){
    this.props.dispatch(getDestHistory(this.props.member.userid));
  }

  /**
  * 描画メソッド
  * @return {undefined}
  */
  render(){
    return (
      <List>
        <ListItem
          primaryText={this.props.member.name + "：" + (this.props.member.comment == null ? "" : this.props.member.comment)}
            secondaryText={
              <p>
                {this.props.member.contact}  <br />
                {"最終更新日:" + this.props.member.lastUpdate.substr(0,16)}
              </p>
            }
            secondaryTextLines={2}
//              tertiaryText={"最終更新日:" + this.props.member.lastUpdate.substr(0,16)}
          leftAvatar={<Avatar backgroundColor={this.props.member.inBusiness ? red600 : grey400} > {this.props.member.inBusiness ? "出" : "退"}</Avatar>} 
          onTouchTap={this.handleMemberRow}
          />
      </List>
    );
  }
}
