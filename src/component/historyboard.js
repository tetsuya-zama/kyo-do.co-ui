import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from 'material-ui/Dialog';
import {
    closeDestHistoryBoard,
    getDestHistorySuceess
} from '../action/historyboard'
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import {
  red600,
  grey400
} from 'material-ui/styles/colors';

/**
* 行先履歴コンポーネント
* @see http://qiita.com/nownabe/items/2d8b92d95186c3941de0
*/
export default class HistoryBoard extends React.Component{
  /**
  * コンストラクタ
  * @param {Object} props プロパティ
  * @return {undefined}
  */
  constructor(props){
    super(props);

    this.handleClose = this.handleClose.bind(this);
  }

  /**
  * 閉じるボタンのクリックをハンドリングするhandler
  * @return {undefined}
  */
  handleClose(){
    this.props.dispatch(closeDestHistoryBoard());
  }

  render(){
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onTouchTap={this.handleClose}
        ref="Close"
      />
    ];

    const history = this.props.historyboard.history.sort((a,b)=>{
                                if(a.datetime > b.datetime) return -1;
                                if(a.datetime < b.datetime) return 1;
                                return 0;
                            }).map((hist, idx) => {
                            return(
                                <ListItem
                                    key={idx}
                                    primaryText={(hist.comment == null ? "" : hist.comment)}
                                    secondaryText={
                                    <p>
                                        {hist.contact}  <br />
                                        {"最終更新日:" + hist.datetime.substr(0,16)}
                                    </p>
                                    }
                                    secondaryTextLines={2}
                                leftAvatar={<Avatar backgroundColor={hist.inBusiness ? red600 : grey400} > {hist.inBusiness ? "出" : "退"}</Avatar>} />
                            )
                        });
    return(
        <div>
            <Dialog
                title="行先履歴"
                actions={actions}
                modal={true}
                open={this.props.historyboard.isOpen}
                autoScrollBodyContent={true}
            >
                <List>
                    {history}
                </List>
            </Dialog>
        </div>
    )
  }
}
