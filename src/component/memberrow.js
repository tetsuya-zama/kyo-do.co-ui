import React from 'react';
import ReactDOM from 'react-dom';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import {
  red600,
  grey400
} from 'material-ui/styles/colors';

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
  }
  /**
  * 描画メソッド
  * @return {undefined}
  */
  render(){
    return (
      <List>
        <ListItem
          primaryText={this.props.member.name + "：" + this.props.member.contact}
            secondaryText={"最終更新日:" + this.props.member.lastUpdate.substr(0,16)+" "+(this.props.member.comment == null ? "" : this.props.member.comment)}
          leftAvatar={<Avatar backgroundColor={this.props.member.inBusiness ? red600 : grey400} > {this.props.member.inBusiness ? "出" : "退"}</Avatar>} />
      </List>
    );
  }
}
