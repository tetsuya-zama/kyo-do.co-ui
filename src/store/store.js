import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'
import rootReducer from '../reducer/root'
import rootSaga from '../saga/root'
import {LOGIN_STATUS} from '../const/login'
import {DEFAULT_MY_DESTINATION} from '../const/mydestination';
import {DEFAULT_GROUP} from '../const/group';
import {DEFAULT_GROUPBORADS} from '../const/groupboards';


/**
* reduxのstoreのセットアップ。redux-saga対応。
* @see http://qiita.com/kuy/items/716affc808ebb3e1e8ac
*/
export function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    {
      login:{status:LOGIN_STATUS.NOTYET, user:{}},
      mydestination:DEFAULT_MY_DESTINATION,
      board:{memberStatus:[]},
      accountboard:{open:false, nextuser:{}},
      groups:DEFAULT_GROUPS,
      groupboards:DEFAULT_GROUPBORADS
    },
    applyMiddleware(
      sagaMiddleware, logger()
    )
  );
  sagaMiddleware.run(rootSaga);
  return store;
}
