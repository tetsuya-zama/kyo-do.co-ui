import assert from 'power-assert';
import MyDestination from '../../src/component/mydestination';
import {myDestinationChange,myDestinationClear} from '../../src/action/mydestination';
import {shallow} from 'enzyme';
import sinon from 'sinon';
import {mountWithMUI} from "./testutil";
import React from 'react';
import ReactDOM from 'react-dom';
import {DEFAULT_MY_DESTINATION} from '../../src/const/mydestination';
import {LOGIN_STATUS} from '../../src/const/login';

/**@test {MyDestination}*/
describe("<MyDestination />",()=>{
  it("renders in_business toggle, comment and contact textboxes and clear button",()=>{
    const props = {
      dispatch:sinon.spy(),
      mydestination:DEFAULT_MY_DESTINATION,
      suggestion:[],
      login:{
        status:LOGIN_STATUS.SUCCESS,
        user:{
          id:"test",
          name:"テスト",
          token:"dummy"
        }
      }
    };

    const wrapper = mountWithMUI(<MyDestination {...props} />);

    assert(wrapper.ref("in_business").find("input").length === 1);
    assert(wrapper.ref("comment").find("input").length === 1);
    assert(wrapper.ref("clear_button").find("button").length === 1);
    assert(wrapper.ref("contact").find("input").length === 1);
  });

  it("dispatches MY_DESTINATION_CHANGE action if in_business is toggled",()=>{
    const props = {
      dispatch:sinon.spy(),
      mydestination:DEFAULT_MY_DESTINATION,
      suggestion:[],
      login:{
        status:LOGIN_STATUS.SUCCESS,
        user:{
          id:"test",
          name:"テスト",
          token:"dummy"
        }
      }
    };

    const wrapper = mountWithMUI(<MyDestination {...props} />);

    wrapper.ref("in_business").find("input").simulate("change",{target:{checked:true}});

    assert(props.dispatch.called);
    assert(props.dispatch.getCall(0).args[0],myDestinationChange({
      inBusiness:!DEFAULT_MY_DESTINATION.inBusiness,
      comment:DEFAULT_MY_DESTINATION.comment,
      contact:DEFAULT_MY_DESTINATION.contact
    }));
  });

  it("dispatches MY_DESTINATION_CHANGE action if comment is changed",()=>{
    const props = {
      dispatch:sinon.spy(),
      mydestination:DEFAULT_MY_DESTINATION,
      suggestion:[],
      login:{
        status:LOGIN_STATUS.SUCCESS,
        user:{
          id:"test",
          name:"テスト",
          token:"dummy"
        }
      }
    };

    const nextComment = "EAST3F";

    const wrapper = mountWithMUI(<MyDestination {...props} />);

    wrapper.ref("comment").find("input").simulate("change",{target:{value:nextComment}});

    assert(props.dispatch.called);
    assert(props.dispatch.getCall(0).args[0],myDestinationChange({
      inBusiness:DEFAULT_MY_DESTINATION.inBusiness,
      comment:nextComment,
      contact:DEFAULT_MY_DESTINATION.contact
    }));
  });

  it("dispatches MY_DESTINATION_CHANGE action if contact is changed",()=>{
    const props = {
      dispatch:sinon.spy(),
      mydestination:DEFAULT_MY_DESTINATION,
      suggestion:[],
      login:{
        status:LOGIN_STATUS.SUCCESS,
        user:{
          id:"test",
          name:"テスト",
          token:"dummy"
        }
      }
    };

    const nextContact = "090-XXXX-XXXX";

    const wrapper = mountWithMUI(<MyDestination {...props} />);

    wrapper.ref("contact").find("input").simulate("change",{target:{value:nextContact}});

    assert(props.dispatch.called);
    assert(props.dispatch.getCall(0).args[0],myDestinationChange({
      inBusiness:DEFAULT_MY_DESTINATION.inBusiness,
      comment:DEFAULT_MY_DESTINATION.comment,
      contact:nextContact
    }));
  });
});
