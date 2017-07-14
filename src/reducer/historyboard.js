import {
    GET_DEST_HISTORY,
    GET_DEST_HISTORY_SUCCESS,
    GET_DEST_HISTORY_FAILED,
    CLOSE_DEST_HISTORY_BOARD
} from '../action/historyboard';
import {DEFAULT_HISTORYBORAD} from '../const/historyboard';


export default function historyboard( state = DEFAULT_HISTORYBORAD, action ){
    switch(action.type){
        case(GET_DEST_HISTORY):
            return Object.assign({}, state);
        case(GET_DEST_HISTORY_SUCCESS):
            return Object.assign({}, state, {history:action.payload.history, isOpen:true});
        case(GET_DEST_HISTORY_FAILED):
            return Object.assign({}, state, {history:[]});
        case(CLOSE_DEST_HISTORY_BOARD):
            return Object.assign({}, state, {history:[], isOpen:false});
        default:
            return state;
    }
}
