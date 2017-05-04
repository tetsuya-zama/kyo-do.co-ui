import assert from 'power-assert';
import {loadDestinationSaga,loadDestinationTask,changeDestinationSaga,changeDestinationTask} from '../../src/saga/mydestination';
import {MY_DESTINATION_CHANGE,myDestinationChange,myDestinationSaveComplete} from '../../src/action/mydestination';
import {LOGIN_SUCCESS} from '../../src/action/login';
import axios from 'axios';
import {take,put,select,takeEvery,takeLatest,call} from 'redux-saga/effects';
import {getApiBaseURL} from '../../src/module/environment';

const API_BASE_URL = getApiBaseURL();

/**@test {loadDestinationSaga}*/
describe("loadDestinationSaga",()=>{
  it("takes every LOGIN_SUCCESS action and pass it to loadDestinationTask",()=>{
    const gen = loadDestinationSaga();
    const ret = gen.next();

    assert(!ret.done);
    assert.deepEqual(ret.value, takeEvery(LOGIN_SUCCESS,loadDestinationTask));
  });
});

/**@test {loadDestinationTask}*/
describe("loadDestinationTask",()=>{
  it("load user's destination data from server via api and puts MY_DESTINATION_CHANGE action",()=>{
    const dummyAPIToken = "dummyAPIToken";
    const dummyAPIResult = {
      inBusiness:true,
      comment:"自席",
      contact:"090-XXX-XXXX"
    };

    const gen = loadDestinationTask();
    let ret = gen.next();

    //gen calls yield select(state => state.login.user.token));
    ret = gen.next(dummyAPIToken);//stateの中にトークンが格納されているものとする

    assert.deepEqual(ret.value, call(axios,{
      method:"GET",
      url:API_BASE_URL + "status",
      headers:{"Authorization":"Bearer " + dummyAPIToken}
    }));
    ret = gen.next({data:dummyAPIResult}); //APIからdummyAPIResultが返ってきたものとする

    assert.deepEqual(ret.value, put(myDestinationChange(dummyAPIResult)));
    ret = gen.next();

    assert(ret.done);
  });
});

/**@test {changeDestinationSaga}*/
describe("changeDestinationSaga",()=>{
  it("takes latest MY_DESTINATION_CHANGE action and pass it to changeDestinationTask",()=>{
    const gen = changeDestinationSaga();
    const ret = gen.next();

    assert(!ret.done);
    assert.deepEqual(ret.value, takeLatest(MY_DESTINATION_CHANGE,changeDestinationTask));
  });
});

/**@test {changeDestinationTask}*/
describe("changeDestinationTask",()=>{
  it("save user's destination which is payload of MY_DESTINATION_CHANGE action into server via api and puts MY_DESTINATION_SAVE_COMPLETE action",()=>{
    const dummyAPIToken = "dummyAPIToken";
    const dummyAction = {
      type:MY_DESTINATION_CHANGE,
      payload:{
        inBusiness:false,
        comment:"",
        contact:"090-XXX-XXXX"
      }
    };

    const gen = changeDestinationTask(dummyAction);
    let ret = gen.next();

    //waits some minutes
    ret = gen.next();

    //gen calls yield select(state => state.login.user.token));
    ret = gen.next(dummyAPIToken);//stateの中にトークンが格納されているものとする

    assert.deepEqual(ret.value,call(axios.put,
      API_BASE_URL + "status",
      {inBusiness:dummyAction.payload.inBusiness,comment:dummyAction.payload.comment,contact:dummyAction.payload.contact},
      {headers:{"Authorization":"Bearer " + dummyAPIToken}}
    ));

    ret = gen.next(dummyAction.payload); //APIへのセーブは成功したものとする

    assert.deepEqual(ret.value, put(myDestinationSaveComplete()));

    ret = gen.next();
    assert(ret.done);
  })
});
