import assert from 'power-assert';
import LoginForm from '../../src/component/loginform';
import {LOGIN_STATUS} from '../../src/const/login';
import sinon from 'sinon';
import {mount,shallow} from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';
import {loginRequested} from '../../src/action/login';
import {mountWithMUI} from './testutil';

/**@test {LoginForm}*/
describe("<LoginForm />",()=>{
  //"userid","password"テキストボックスとログインボタンを描画する
  it("renders 'userid' textbox, 'password' textbox and one login button",()=>{
    const props = {
      dispatch : sinon.spy(),
      login : {status: LOGIN_STATUS.NOTYET}
    };

    const wrapper = mountWithMUI(<LoginForm {...props} />);

    assert(wrapper.ref("userid").find("input").length === 1);
    assert(wrapper.ref("password").find("input").length === 1);
    assert(wrapper.ref("loginbutton").find("button").length === 1);

  });
  //login statusがLOGIN_STATUS.FAILUREだった場合は、ログイン失敗メッセージを描画する
  it("renders login failure message if login status is LOGIN_STATUS.FAILURE", ()=>{
    const props = {
      dispatch : sinon.spy(),
      login : {status: LOGIN_STATUS.FAILURE}
    };

    const wrapper = shallow(<LoginForm {...props} />);

    const loginFailureMessage = "IDもしくはパスワードが正しくありません";

    assert(wrapper.text().indexOf(loginFailureMessage) >= 0);
  });

  //login statusがLOGIN_STATUS.FAILURE以外の場合はログイン失敗メッセージを表示しない
  it("doesn't render login failure message if login status is not LOGIN_STATUS.FAILURE",()=>{
    const props = {
      dispatch : sinon.spy(),
      login : {status: LOGIN_STATUS.NOTYET}
    };

    const wrapper = shallow(<LoginForm {...props} />);

    const loginFailureMessage = "IDもしくはパスワードが正しくありません";

    assert(wrapper.text().indexOf(loginFailureMessage) < 0);
  });

  //useridやpasswordが空の場合は、ログインボタンをクリックしても何のActionもdispatchしない
  it("doesn't dispatch any actions when button is clicked if two textboxes are empty",()=>{
    const props = {
      dispatch : sinon.spy(),
      login : {status: LOGIN_STATUS.NOTYET}
    };

    const wrapper = mountWithMUI(<LoginForm {...props} />);
    wrapper.ref("loginbutton").find("button").simulate("click");
    assert(!props.dispatch.called);
  });

  //useridやpasswordに文字が入力されている場合は、LOGIN_REQUESTEDアクションをdispatchする
  it("dispatches LOGIN_REQUESTED ation when button is clicked if two textboxes are not empty",()=>{
    const props = {
      dispatch : sinon.spy(),
      login : {status: LOGIN_STATUS.NOTYET}
    };

    const dummyInputs = {
      id:"test",
      pass:"pass"
    };

    const wrapper = mountWithMUI(<LoginForm {...props} />);

    wrapper.ref("userid").find("input").simulate("change",{target:{value:dummyInputs.id}});
    wrapper.ref("password").find("input").simulate("change",{target:{value:dummyInputs.pass}});


    wrapper.ref("loginbutton").find("button").simulate("click");

    assert(props.dispatch.called);
    assert.deepEqual(props.dispatch.getCall(0).args[0],loginRequested(dummyInputs.id,dummyInputs.pass));
  });
});
