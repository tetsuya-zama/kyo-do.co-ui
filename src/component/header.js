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
import HistoryBoard from './historyboard'
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
    this.state = {
      open_my_destination:false,
    };
    //ES2015版のReactだとこのおまじないをしないとメソッド内でthisが解決しない...
    this.handleLogout = this.handleLogout.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleCreateGroup = this.handleCreateGroup.bind(this);
    this.handleOpenMyDestination = this.handleOpenMyDestination.bind(this);
    this.handleCloseMyDestination = this.handleCloseMyDestination.bind(this);
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
  * 行き先情報入力ダイアログのopenをハンドリングするメソッド
  * @return {undefined}
  */
  handleOpenMyDestination(){
      this.setState({open_my_destination:true});
  }
  /**
  * 行き先情報入力ダイアログのcloseをハンドリングするメソッド
  * @return {undefined}
  */
  handleCloseMyDestination(){
      this.setState({open_my_destination:false});
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
    const style = {
      margin:10,
    };
    
    // ツールバーの表示
    const toolbar = this.props.login.status == LOGIN_STATUS.SUCCESS ?
      <Toolbar>
        <ToolbarGroup>
          <Chip><Avatar backgroundColor={this.props.mydestination.inBusiness ? "red" : "gray"}>{this.props.mydestination.inBusiness ? "出" : "退"}</Avatar>{this.props.login.user.name}</Chip>
          <RaisedButton label="行先入力"
            primary={true}
            style={style} 
            onTouchTap={this.handleOpenMyDestination} 
          />
          <Dialog
            title="行先情報入力"
            actions={
              <FlatButton
                label="閉じる"
                primary={true}
                onTouchTap={this.handleCloseMyDestination}
              />
            }
            modal={false}
            open={this.state.open_my_destination}
            onRequestClose={this.handleCloseMyDestination}
          >
            <MyDestination
              dispatch={this.props.dispatch}
              login={this.props.login}
              mydestination={this.props.mydestination}
            />
        </Dialog>
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
        <HistoryBoard dispatch={this.props.dispatch} historyboard={this.props.historyboard} />
      </Toolbar>:
      null

    // 行先情報変更画面のアクション表示
    const actionsMyDestination = [
      <FlatButton
        label="閉じる"
        primary={true}
        onTouchTap={this.handleCloseMyDestination}
      />
    ];

    return (
      <div><img src={"./img/logo.png"} />&nbsp;<br />{toolbar}</div>
    )
  }
}
