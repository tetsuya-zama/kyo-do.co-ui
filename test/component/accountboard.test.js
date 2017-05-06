import assert from 'power-assert';
import AccountBoard from '../../src/component/accountboard';
import {closeAccountInfoModal,changeAccountInfo,changeAccountInfoField} from '../../src/action/accountboard';
import React from 'react';
import ReactDOM from 'react-dom';
import {mountWithMUI} from './testutil';
import sinon from 'sinon';
import TestUtils from 'react-addons-test-utils';

/**@test {AccountBoard}*/
describe("<AccountBoard />",()=>{
  it("renders name and pass textboxes and submit and cancel button if 'open' of accountboard state is true",()=>{
    const props = {
      dispatch : sinon.spy(),
      accountboard : {
        open:true,
        nextuser:{
          nextname:"",
          nextpass:""
        }
      }
    };

    const wrapper = mountWithMUI(<AccountBoard {...props} />);

    assert(wrapper.ref("name").find("input").length === 1);
    assert(wrapper.ref("pass").find("input").length === 1);
    assert(wrapper.ref("submit").find("button").length === 1);
    assert(wrapper.ref("cancel").find("button").length === 1);
  });

  it("renders no inputs if 'open' of accountboard state is false",()=>{
    const props = {
      dispatch : sinon.spy(),
      accountboard : {
        open:false,
        nextuser:{
          nextname:"",
          nextpass:""
        }
      }
    };

    const wrapper = mountWithMUI(<AccountBoard {...props} />);

    assert(wrapper.ref("name").find("input").length === 0);
    assert(wrapper.ref("pass").find("input").length === 0);
    assert(wrapper.ref("submit").find("button").length === 0);
    assert(wrapper.ref("cancel").find("button").length === 0);
  });

  it("renders values which are passed as accountboard state",()=>{
    const props = {
      dispatch : sinon.spy(),
      accountboard : {
        open:true,
        nextuser:{
          nextname:"test",
          nextpass:"1q2w3e4r"
        }
      }
    };

    const wrapper = mountWithMUI(<AccountBoard {...props} />);

    assert(wrapper.ref("name").find("input").get(0).value === props.accountboard.nextuser.nextname);
    assert(wrapper.ref("pass").find("input").get(0).value === props.accountboard.nextuser.nextpass);
  });

  it("dispatches ACCOUNT_INFO_MODAL_CLOSE action when cancel button is clicked",()=>{
    const props = {
      dispatch : sinon.spy(),
      accountboard : {
        open:true,
        nextuser:{
          nextname:"",
          nextpass:""
        }
      }
    };

    const wrapper = mountWithMUI(<AccountBoard {...props} />);

    const element = wrapper.ref("cancel").find("button");
    const node  = ReactDOM.findDOMNode(element.node)
    TestUtils.Simulate.touchTap(node);

    assert(props.dispatch.called);
    assert.deepEqual(props.dispatch.getCall(0).args[0],closeAccountInfoModal());
  });

  it("dispatches CHANGE_ACCOUNT_INFO_FIELD action with current newname and newpass when value of pass textbox is changed",()=>{
    const props = {
      dispatch : sinon.spy(),
      accountboard : {
        open:true,
        nextuser:{
          nextname:"test",
          nextpass:""
        }
      }
    };

    const wrapper = mountWithMUI(<AccountBoard {...props} />);

    wrapper.ref("pass").find("input").simulate("change",{target:{value:"1q2w3e4r"}});

    assert(props.dispatch.called);
    assert(props.dispatch.getCall(0).args[0], changeAccountInfoField("test","1q2w3e4r"));
  });

  it("dispatches CHANGE_ACCOUNT_INFO_FIELD action with current newname and newpass when value of pass textbox is changed",()=>{
    const props = {
      dispatch : sinon.spy(),
      accountboard : {
        open:true,
        nextuser:{
          nextname:"test",
          nextpass:"1q2w3e4r"
        }
      }
    };

    const wrapper = mountWithMUI(<AccountBoard {...props} />);

    wrapper.ref("name").find("input").simulate("change",{target:{value:"test2"}});

    assert(props.dispatch.called);
    assert(props.dispatch.getCall(0).args[0], changeAccountInfoField("test2","1q2w3e4r"));
  });

  it("dispatches CHANGE_ACCOUNT_INFO aciton with current newname and newpass when submit button is clicked",()=>{
    const props = {
      dispatch : sinon.spy(),
      accountboard : {
        open:true,
        nextuser:{
          nextname:"test",
          nextpass:"1q2w3e4r"
        }
      }
    };

    const wrapper = mountWithMUI(<AccountBoard {...props} />);

    const element = wrapper.ref("submit").find("button");
    const node  = ReactDOM.findDOMNode(element.node)
    TestUtils.Simulate.touchTap(node);

    assert(props.dispatch.called);
    assert(props.dispatch.getCall(0).args[0], changeAccountInfo("test","1q2w3e4r"));
  });
});
