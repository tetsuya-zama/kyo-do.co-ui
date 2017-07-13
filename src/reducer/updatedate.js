import {SET_UPDATE_DATE} from '../action/updatedate';

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