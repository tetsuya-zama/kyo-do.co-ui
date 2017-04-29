const assert = require("assert");
import LoginForm from '../../src/component/loginform';
import {LOGIN_STATUS} from '../../src/const/login';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import sinon from 'sinon';
import React from 'react';
import ReactDOM from 'react-dom'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {shallow,mount} from 'enzyme';
import {loginRequested} from '../../src/action/login';

//XXX mui周りは共通のUtil関数を作る
const muiTheme = getMuiTheme();

const mountWithMUI = (node) =>{
  return mount(node,{
    context: {muiTheme},
    childContextTypes: {muiTheme: React.PropTypes.object}
  });
}

/**@test {LoginForm}*/
describe("<LoginForm />",()=>{
  it("renders 'userid' textbox, 'password' textbox and one login button",()=>{
    const props = {
      dispatch : sinon.spy(),
      login : {status: LOGIN_STATUS.NOTYET}
    };

    const wrapper = mountWithMUI(<LoginForm {...props} />);

    assert.ok(wrapper.ref("userid").find("input"));
    assert.ok(wrapper.ref("password").find("input"));
    assert.ok(wrapper.ref("loginbutton").find("button"));

  });

  it("renders login failure message if login status is LOGIN_STATUS.FAILURE", ()=>{
    const props = {
      dispatch : sinon.spy(),
      login : {status: LOGIN_STATUS.FAILURE}
    };

    const wrapper = shallow(<LoginForm {...props} />);

    const loginFailureMessage = "IDもしくはパスワードが正しくありません";

    assert(wrapper.text().indexOf(loginFailureMessage) >= 0);
  });

  it("doesn't render login failure message if login status is not LOGIN_STATUS.FAILURE",()=>{
    const props = {
      dispatch : sinon.spy(),
      login : {status: LOGIN_STATUS.NOTYET}
    };

    const wrapper = shallow(<LoginForm {...props} />);

    const loginFailureMessage = "IDもしくはパスワードが正しくありません";

    assert(wrapper.text().indexOf(loginFailureMessage) < 0);
  });

  it("doesn't dispatch any actions when button is clicked if two textboxes are empty",()=>{
    const props = {
      dispatch : sinon.spy(),
      login : {status: LOGIN_STATUS.NOTYET}
    };

    const wrapper = mountWithMUI(<LoginForm {...props} />);
    wrapper.ref("loginbutton").find("button").simulate("click");
    assert(!props.dispatch.called);
  });

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
