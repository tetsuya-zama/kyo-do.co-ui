import assert from 'power-assert';
import {updateDateSaga,updateDateTask} from "../../src/saga/updatedate";
import {take,put,select,takeEvery,takeLatest,call} from 'redux-saga/effects';
import {UPDATE_MEMBER_STATUS} from "../../src/action/board";
import {setUpdateDate} from "../../src/action/updatedate";

describe("updateDateSaga",()=>{
  it("takes every UPDATE_MEMBER_STATUS action and pass it to updateDateTask",()=>{
    const gen = updateDateSaga();
    let ret = gen.next();

    assert.deepEqual(ret.value,takeEvery(UPDATE_MEMBER_STATUS,updateDateTask));

    ret = gen.next();
    assert(ret.done);
  });
});

describe("updateDateTask",()=>{
  it("puts SET_UPDATE_DATE action with current time",()=>{
    const dummyCurrentDate = new Date(2016,1,1);

    const gen = updateDateTask();
    let ret = gen.next();
    ret = gen.next(dummyCurrentDate);

    assert.deepEqual(ret.value,put(setUpdateDate(dummyCurrentDate)));

    ret = gen.next();
    assert(ret.done);

  });
});
