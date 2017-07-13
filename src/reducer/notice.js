import {OPEN_NOTICE, CLOSE_NOTICE} from '../action/notice';

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