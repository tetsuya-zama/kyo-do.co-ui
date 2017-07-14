import {SET_UPDATE_DATE} from '../action/updatedate';
/**
* データ更新日付 reducer
* @see http://qiita.com/yasuhiro-okada-aktsk/items/9d9025cb58ffba35f864
* @param {Object} state 変更前のstate
* @param {Object} action dispatchされたaction
* @return {Object} 変更後のstate
*/
export default function updatedate(state={date:null}, action){
    switch(action.type){
        case(SET_UPDATE_DATE):
            return Object.assign(// 合成する
                {},// 空のオブジェクトと
                state,// 持ってきたstateを合成して
                {date:action.payload.currentDate}// その上にdateの変更を上書きする
                );
        default:
            return state;
    }
}
