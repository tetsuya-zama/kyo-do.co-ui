import React from 'react';
/**
*メインコンポーネント
* @see http://qiita.com/nownabe/items/2d8b92d95186c3941de0
*/
export default class Kyodoco extends React.Component{
  /**
  * コンストタクタ
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
    return(
      <div>キョウ-ドコ？</div>
    );
  }
}
