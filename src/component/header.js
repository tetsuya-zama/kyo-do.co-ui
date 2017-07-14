import React from 'react'
import {LOGIN_STATUS} from '../const/login'
import {logoutRequested} from '../action/login'
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import ContentCreateIcon from 'material-ui/svg-icons/content/create';
import AccountCircleIcon from 'material-ui/svg-icons/action/account-circle';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import Dialog from 'material-ui/Dialog';
import AccountBoard from './accountboard';
import GroupCreationBoard from './groupcreationboard';
import GroupManagementBoard from './groupmanagementboard';
import {openAccountInfoModal} from '../action/accountboard';
import {openGroupCreationBoard} from '../action/groupboards';
import MyDestination from './mydestination'
import {cyan300,cyan600} from 'material-ui/styles/colors';

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
    this.handleLogout = this.handleLogout.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleCreateGroup = this.handleCreateGroup.bind(this);
  }

  /**
  * ログアウトボタンのクリックをハンドリングするメソッド
  * @return {undefined}
  */
  handleLogout(){
      this.props.dispatch(logoutRequested());
  }

  /**
  * モーダルのオープンをハンドリングするメソッド
  * @return {undefined}
  */
  handleOpen(){
      this.props.dispatch(openAccountInfoModal(this.props.login.user.name));
  }
  /**
  * グループ作成ボタンのクリックをハンドリングするメソッド
  * @return {undefined}
  *
  */
  handleCreateGroup(){
      this.props.dispatch(openGroupCreationBoard());
  }

  /**
  * 描画メソッド
  * @return {undefined}
  */
  render(){
    // ツールバーの表示
    const toolbar = this.props.login.status == LOGIN_STATUS.SUCCESS ?
      <Toolbar>
        <ToolbarGroup>
          <Chip><Avatar backgroundColor={this.props.mydestination.inBusiness ? "red" : "gray"}>{this.props.mydestination.inBusiness ? "出" : "退"}</Avatar>{this.props.login.user.name}</Chip>
          <IconMenu
            iconButtonElement={
              <IconButton touch={true} tooltip="出退勤" tooltipPosition="top-right">
                <ContentCreateIcon />
              </IconButton>
            }
            targetOrigin={{ vertical: 'bottom', horizontal: 'left',}}
            touchTapCloseDelay={0}
          >
              <MyDestination
                dispatch={this.props.dispatch}
                login={this.props.login}
                mydestination={this.props.mydestination}
              />
          </IconMenu>
          <ToolbarSeparator />
          <IconMenu
            iconButtonElement={
              <IconButton touch={true} tooltip="アカウント情報" tooltipPosition="top-right">
                <AccountCircleIcon/>
              </IconButton>
            }
            ref="menu_button"
          >
            <MenuItem ref="change_account_button" primaryText="アカウント情報変更" onTouchTap={this.handleOpen} />
            <MenuItem ref="create_group_button" primaryText="グループ作成" onTouchTap={this.handleCreateGroup} />
            <MenuItem ref="logout_button" primaryText="LOGOUT" onTouchTap={this.handleLogout} />
          </IconMenu>
        </ToolbarGroup>
        <AccountBoard dispatch={this.props.dispatch} accountboard={this.props.accountboard} />
        <GroupCreationBoard dispatch={this.props.dispatch} groupboards ={this.props.groupboards} />
        <GroupManagementBoard
          dispatch={this.props.dispatch}
          managementBoard={this.props.groupboards.managementBoard}
          group={this.props.group}
          board={this.props.board}
        />
      </Toolbar>:
      null

    return (
      <div><img src={"./img/logo.png"} />&nbsp;<br />{toolbar}</div>
    )
  }
}
