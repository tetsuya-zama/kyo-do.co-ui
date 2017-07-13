import {take,put,select,takeEvery,takeLatest,call} from 'redux-saga/effects'
import {UPDATE_MEMBER_STATUS} from '../action/board'
import {setUpdateDate} from '../action/updatedate';

/* function*...ジェネレータ関数。 */
/* 
    yield...実行前に一時停止する。外部から再開の指示があるまで待機する
            そして、再開前に、yieldのあとのコードを差し替えることができる…！？「new Date()だとテストがめんどいから固定の日付をいれちゃお」
 */
export function* updateDateSaga(){
    yield takeEvery(UPDATE_MEMBER_STATUS, updateDateTask);// takeEvery...第一引数のイベントが発火するまで待つ。発火されたら第二引数を実行する。
}

export function* updateDateTask(){
    const currentDate = yield call(() => new Date());
    yield put(setUpdateDate(currentDate));
}