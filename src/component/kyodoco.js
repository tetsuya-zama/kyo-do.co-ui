import React from 'react'
import { connect } from 'react-redux'
import Header from './header'
import LoginForm from './loginform'
import SignUpForm from './signupform'
import GroupBoards from './groupboards'
import {LOGIN_STATUS} from '../const/login'
import Paper from 'material-ui/Paper';
import Snackbar from 'material-ui/Snackbar';
import {closeNotice} from '../action/notice'


/**
*メインコンポーネント
* @see http://qiita.com/nownabe/items/2d8b92d95186c3941de0
*/
class Kyodoco extends React.Component{
  /**
  * コンストラクタ
  * @param {Object} props プロパティ
  * @return {undefined}
  */
  constructor(props){
    super(props);
    //ES2015版のReactだとこのおまじないをしないとメソッド内でthisが解決しない...
    this.handleRequestNoticeClose = this.handleRequestNoticeClose.bind(this);
  }
  /**
   * 通知SnackbarのCloseイベントハンドラ
   */
  handleRequestNoticeClose(){
    this.props.dispatch(closeNotice());
  }
  /**
  * 描画メソッド
  * @return {undefined}
  */
  render(){
    const style = {
      margin: 10,
      padding: 10,
      textAlign: 'center',
      display: 'inline-block',
    };

    //ログインしていればメイン画面を、そうでなければログインフォームを描画する
    const content =
      this.props.login.status == LOGIN_STATUS.SUCCESS ?
      (<div>
        <GroupBoards
          dispatch={this.props.dispatch}
          board={this.props.board}
          group={this.props.group}
          login={this.props.login}
          updatedate={this.props.updatedate}
        />
       </div>
      ) :
      (
        <div>
          <Paper style={style} zDepth={2}>
            <LoginForm
            dispatch={this.props.dispatch}
            login={this.props.login}
            secretquestion={this.props.secretquestion}
            />
          </Paper>
          <br />
          <Paper style={style} zDepth={2}>
            <SignUpForm
            dispatch={this.props.dispatch}
            signup={this.props.signup}/>
          </Paper>
        </div>
      );

    return(
      <div>
      <header>
        <Header
          dispatch={this.props.dispatch}
          login={this.props.login}
          accountboard={this.props.accountboard}
          groupboards={this.props.groupboards}
          group={this.props.group}
          board={this.props.board}
          mydestination={this.props.mydestination}
        />
      </header>
      <hr />
      {content}
      <hr />
      copyright NST i-lab All Rights Reserved.
      <Snackbar
          open={this.props.notice.open}
          message={this.props.notice.message}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestNoticeClose}
        />
      </div>
    );
  }
}
/**
* reduxのstore上のstateをcomponentに接続する関数
* @see http://qiita.com/kompiro/items/7fe90c4abc92fd32b343
*/
function mapStateToProp(state){
  return state;
}

/**
* メインコンポーネントをstoreと接続してexportする
* @see http://qiita.com/nownabe/items/2d8b92d95186c3941de0
* @see http://qiita.com/kompiro/items/7fe90c4abc92fd32b343
*/
export default connect(mapStateToProp)(Kyodoco);
