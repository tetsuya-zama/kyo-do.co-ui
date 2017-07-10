import React from 'react'
import { connect } from 'react-redux'
import Header from './header'
import LoginForm from './loginform'
import SignUpForm from './signupform'
import Board from './board'
import MyDestination from './mydestination'
import {LOGIN_STATUS} from '../const/login'
import Paper from 'material-ui/Paper';


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
        <MyDestination
          dispatch={this.props.dispatch}
          login={this.props.login}
          mydestination={this.props.mydestination}
        />
        <Board
          memberStatus={this.props.board.memberStatus}
        />
       </div>
      ) :
      (
        <div>
          <Paper style={style} zDepth={2}>
            <LoginForm
            dispatch={this.props.dispatch}
            login={this.props.login}/>
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
        />
      </header>
      <hr />
      {content}
      <hr />
      copyright NST i-lab All Rights Reserved.
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
