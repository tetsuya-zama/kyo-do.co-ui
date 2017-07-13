import {SET_UPDATE_DATE} from '../action/updatedate';

export default function updatedate(state={date:null},action){  //引数は変更前のstateとaction
  switch(action.type){
    case(SET_UPDATE_DATE):
      return Object.assign(　//戻り値：変更後のstate
        {},
        state,
        {date:action.payload.currentDate}
      );
    default:
      return state;　//日付がセットされない場合、stateは変わらず。
  }
}