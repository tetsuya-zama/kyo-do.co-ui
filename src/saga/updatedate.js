import {take,put,select,takeEvery,takeLatest,call} from 'redux-saga/effects'
import {UPDATE_MEMBER_STATUS} from '../action/board'
import {setUpdateDate} from '../action/updatedate'

export function* updateDateSaga(){
  yield takeEvery(UPDATE_MEMBER_STATUS,updateDateTask);  //takeEveryやってる状態で止まると、UPDATE_MEMBER_STATUSが発行されるまで待つ
}

export function* updateDateTask(){
  const currentDate = yield call(() => new Date());
  yield put(setUpdateDate(currentDate))
}
