import assert from 'power-assert';
import {loadSuggestionSaga,loadSuggestionTask,changeSuggestionSaga,changeSuggestionTask} from '../../src/saga/suggestion';
import {suggestionChange} from '../../src/action/suggestion';
import {DEFAULT_SUGGENSTIONS} from '../../src/const/suggestion';
import {LOGIN_SUCCESS} from '../../src/action/login';
import {MY_DESTINATION_SAVE_COMPLETE} from '../../src/action/mydestination';
import {take,put,select,takeEvery,takeLatest,call} from 'redux-saga/effects';

describe("loadSuggestionSaga",()=>{
  it("takes every LOGIN_SUCCESS action and pass it to loadSuggestionTask",()=>{
    const gen = loadSuggestionSaga();
    const ret = gen.next();

    assert(!ret.done);
    assert.deepEqual(ret.value, takeEvery(LOGIN_SUCCESS,loadSuggestionTask));
  });
});

describe("loadSuggestionTask",()=>{
  it("loads suggestion from storage and puts SUGGESTION_CHANGE action with it",()=>{
    const suggestionInStorage = ["東銀座","EAST 8F", "EAST 3F", "宝町", "NRI 13F", "NRI 12F"];

    const gen = loadSuggestionTask();
    let ret = gen.next();

    //gen calls yield select(state => state.login.user.userid);
    ret = gen.next("dummy_userid");
    //gen calls yield existsKeyOnStorage(STORAGE_KEY_SUGGESTION + userid)
    ret = gen.next(true); //localStorageへ既にsuggestionが保存されているものとする
    //gen calls yield getFromStorage(STORAGE_KEY_SUGGESTION + userid);
    ret = gen.next(suggestionInStorage);// suggestionInStorageが保存されているものとする

    assert.deepEqual(ret.value, put(suggestionChange(suggestionInStorage)));

    ret = gen.next();
    assert(ret.done);
  });

  it("doesn't put any actions if suggestion is not saved in storage",()=>{
    const gen = loadSuggestionTask();
    let ret = gen.next();

    //gen calls yield select(state => state.login.user.userid);
    ret = gen.next("dummy_userid");
    //gen calls yield existsKeyOnStorage(STORAGE_KEY_SUGGESTION + userid)
    ret = gen.next(false); //localStorageへ既にsuggestionが保存されていないものとする

    assert(ret.done);
  });
});

describe("changeSuggestionSaga",()=>{
  it("takes every MY_DESTINATION_SAVE_COMPLETE action and pass it to changeSuggestionTask",()=>{
    const gen = changeSuggestionSaga();
    const ret = gen.next();

    assert(!ret.done);
    assert.deepEqual(ret.value, takeEvery(MY_DESTINATION_SAVE_COMPLETE,changeSuggestionTask));
  });
});

describe("changeSuggestionTask",()=>{
  it("adds comment in payload of action to top of saved suggestion and puts SUGGESTION_CHANGE action with it",()=>{
    const dummyAction = {
      type:MY_DESTINATION_SAVE_COMPLETE,
      payload:{
        inBusiness:true,
        comment:"高輪",
        contact:""
      }
    };

    const suggestionInStorage = ["東銀座","EAST 8F", "EAST 3F", "宝町", "NRI 13F", "NRI 12F"];

    const gen = changeSuggestionTask(dummyAction);
    let ret = gen.next();

    //gen calls yield select(state => state.login.user.userid);
    ret = gen.next("dummy_userid");
    //gen calls yield existsKeyOnStorage(STORAGE_KEY_SUGGESTION + userid)
    ret = gen.next(true); //localStorageへ既にsuggestionが保存されているものとする
    //gen calls yield getFromStorage(STORAGE_KEY_SUGGESTION + userid);
    ret = gen.next(suggestionInStorage);// suggestionInStorageが保存されているものとする
    //gen calls yield setToStorage(STORAGE_KEY_SUGGESTION + logonUser.userid, histarr);
    ret = gen.next(true); //localStorageへの保存が成功したものとする

    const expectNewSuggestion = [dummyAction.payload.comment].concat(suggestionInStorage);

    assert.deepEqual(ret.value, put(suggestionChange(expectNewSuggestion)));

    ret = gen.next();
    assert(ret.done);
  });

  it("does nothing if comment in payload of action is empty",()=>{
    const dummyAction = {
      type:MY_DESTINATION_SAVE_COMPLETE,
      payload:{
        inBusiness:true,
        comment:"",
        contact:""
      }
    };

    const gen = changeSuggestionTask(dummyAction);
    const ret = gen.next();

    assert(ret.done);
  });

  it("add comment to top of DEFAULT_SUGGENSTIONS if suggestion hasn't saved yet",()=>{
    const dummyAction = {
      type:MY_DESTINATION_SAVE_COMPLETE,
      payload:{
        inBusiness:true,
        comment:"高輪",
        contact:""
      }
    };

    const gen = changeSuggestionTask(dummyAction);
    let ret = gen.next();

    //gen calls yield select(state => state.login.user.userid);
    ret = gen.next("dummy_userid");
    //gen calls yield existsKeyOnStorage(STORAGE_KEY_SUGGESTION + userid)
    ret = gen.next(false); //localStorageへ既にsuggestionが保存されていないものとする
    //gen calls yield setToStorage(STORAGE_KEY_SUGGESTION + logonUser.userid, histarr);
    ret = gen.next(true); //localStorageへの保存が成功したものとする

    const expectNewSuggestion = [dummyAction.payload.comment].concat(DEFAULT_SUGGENSTIONS);

    assert.deepEqual(ret.value, put(suggestionChange(expectNewSuggestion)));

    ret = gen.next();
    assert(ret.done);
  });

  it("doesn't add comment if it has already been in suggestion array",()=>{
    const dummyAction = {
      type:MY_DESTINATION_SAVE_COMPLETE,
      payload:{
        inBusiness:true,
        comment:"宝町",
        contact:""
      }
    };

    const suggestionInStorage = ["東銀座","EAST 8F", "EAST 3F", "宝町", "NRI 13F", "NRI 12F"];

    const gen = changeSuggestionTask(dummyAction);
    let ret = gen.next();

    //gen calls yield select(state => state.login.user.userid);
    ret = gen.next("dummy_userid");
    //gen calls yield existsKeyOnStorage(STORAGE_KEY_SUGGESTION + userid)
    ret = gen.next(true); //localStorageへ既にsuggestionが保存されているものとする
    //gen calls yield getFromStorage(STORAGE_KEY_SUGGESTION + userid);
    ret = gen.next(suggestionInStorage);// suggestionInStorageが保存されているものとする
    //gen calls yield setToStorage(STORAGE_KEY_SUGGESTION + logonUser.userid, histarr);
    ret = gen.next(true); //localStorageへの保存が成功したものとする

    const expectNewSuggestion = suggestionInStorage;

    assert.deepEqual(ret.value, put(suggestionChange(expectNewSuggestion)));

    ret = gen.next();
    assert(ret.done);
  });

  it("pops out the last suggestion of array if size of the array exceeds 15",()=>{
    const dummyAction = {
      type:MY_DESTINATION_SAVE_COMPLETE,
      payload:{
        inBusiness:true,
        comment:"宝町",
        contact:""
      }
    };

    const suggestionInStorage = ["1","2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"];

    const gen = changeSuggestionTask(dummyAction);
    let ret = gen.next();

    //gen calls yield select(state => state.login.user.userid);
    ret = gen.next("dummy_userid");
    //gen calls yield existsKeyOnStorage(STORAGE_KEY_SUGGESTION + userid)
    ret = gen.next(true); //localStorageへ既にsuggestionが保存されているものとする
    //gen calls yield getFromStorage(STORAGE_KEY_SUGGESTION + userid);
    ret = gen.next(suggestionInStorage);// suggestionInStorageが保存されているものとする
    //gen calls yield setToStorage(STORAGE_KEY_SUGGESTION + logonUser.userid, histarr);
    ret = gen.next(true); //localStorageへの保存が成功したものとする

    const expectNewSuggestion = [dummyAction.payload.comment].concat(suggestionInStorage).slice(0,15);

    assert.deepEqual(ret.value, put(suggestionChange(expectNewSuggestion)));

    ret = gen.next();
    assert(ret.done);
  });
});
