import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'
import rootReducer from '../reducer/root'
import rootSaga from '../saga/root'
import {LOGIN_STATUS} from '../const/login'


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
      mydestination:{inBusiness:false,comment:""},
      board:{memberStatus:{}}
    },
    applyMiddleware(
      sagaMiddleware, logger()
    )
  );
  sagaMiddleware.run(rootSaga);
  return store;
};
