import {OPEN_NOTICE, CLOSE_NOTICE} from '../action/notice';

/**
 * 通知Snackbar reducer
* @param {Object} state 変更前のstate
* @param {Object} action dispatchされたaction
* @return {Object} 変更後のstate
 */
export default function notice(state={open:false, message:""}, action){
    switch(action.type){
        case(OPEN_NOTICE):
            return Object.assign(// 合成する
                {},// 空のオブジェクトと
                state,// 持ってきたstateを合成して
                {
                    open:true,
                    message:action.payload.message
                }// その上にdateの変更を上書きする
                );
        case(CLOSE_NOTICE):
            return Object.assign(// 合成する
                {},// 空のオブジェクトと
                state,// 持ってきたstateを合成して
                {
                    open:false,
                    message:""
                }// その上にdateの変更を上書きする
                );
        default:
            return state;
    }
}