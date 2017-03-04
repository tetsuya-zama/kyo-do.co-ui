import React from 'react'
import {LOGIN_STATUS} from '../const/login'
import {logoutRequested} from '../action/login'
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import Dialog from 'material-ui/Dialog';
import AccountBoard from './accountboard';
import {openAccountInfoModal} from '../action/accountboard'
import {
  indigo400,
  pink300,
  pink50
} from 'material-ui/styles/colors';
const styles = {
  toolbar: {
    backgroundColor: indigo400
  },
  moreItem: {
    right: 0
  },
  avatar: {
    backgroundColor: pink300
  },
  chip: {
    backgroundColor: pink50
  },
};

/**
* Headerコンポーネント
* @see http://qiita.com/nownabe/items/2d8b92d95186c3941de0
*/
export default class Header extends React.Component{
  /**
  * コンストラクタ
  * @param {Object} props プロパティ
  * @return {undefined}
  */
  constructor(props){
    super(props);
    //ES2015版のReactだとこのおまじないをしないとメソッド内でthisが解決しない...
    this.state = {open: false}
    this.hundleClick = this.hundleClick.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  /**
  * ログアウトボタンのクリックをハンドリングするメソッド
  * @return {undefined}
  */
  hundleClick(){
      this.props.dispatch(logoutRequested());
  }

  /**
  * モーダルのオープンをハンドリングするメソッド
  * @return {undefined}
  */
  handleOpen(){
      this.props.dispatch(openAccountInfoModal());
  }

  /**
  * モーダルのクローズをハンドリングするメソッド
  * @return {undefined}
  */
  handleClose(){
      this.setState({open: false});
  }

  /**
  * 描画メソッド
  * @return {undefined}
  */
  render(){
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        onTouchTap={this.handleClose}
      />,
    ];
    // ツールバーの表示
    const toolbar = this.props.login.status == LOGIN_STATUS.SUCCESS ?
      <Toolbar style={styles.toolbar}>
        <ToolbarGroup lastChild={false} style={styles.moreItem}>
          <Chip style={styles.chip}><Avatar style={styles.avatar}>{this.props.login.user.name.charAt(0).toUpperCase()}</Avatar>{this.props.login.user.name}</Chip>
          <ToolbarSeparator />
          <IconMenu
            iconButtonElement={
              <IconButton touch={true}>
                <NavigationExpandMoreIcon color="white" />
              </IconButton>
            }
          >
            <MenuItem primaryText="アカウント情報変更" onTouchTap={this.handleOpen} />
            <MenuItem primaryText="LOGOUT" onTouchTap={this.hundleClick} />
          </IconMenu>
        </ToolbarGroup>
        <AccountBoard dispatch={this.props.dispatch} accountboard={this.props.accountboard} />
      </Toolbar> :
      null

    return (
      <div><img src={"./img/logo.png"} />&nbsp;<br />{toolbar}</div>
    )
  }
}
