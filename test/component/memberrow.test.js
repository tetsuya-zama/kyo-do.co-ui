import assert from "power-assert";
import MemberRow from "../../src/component/memberrow";
import React from 'react';
import ReactDOM from 'react-dom';
import {mountWithMUI} from './testutil';

/**@test {MemberRow}*/
describe("<MemberRow />",()=>{
  it("renders name, comment and contact text of member prop",()=>{
    const dummyMember = {userid:"testA",name:"山田",inBusiness:false,comment:"",contact:"090-XXX-XXXX",lastUpdate:"2017/05/01 10:00:00"};

    const props = {
      member : dummyMember
    };

    const wrapper = mountWithMUI(<MemberRow {...props} />);

    assert(wrapper.text().indexOf(dummyMember.name) >= 0);
    assert(wrapper.text().indexOf(dummyMember.comment) >= 0);
    assert(wrapper.text().indexOf(dummyMember.contact) >= 0);
  });

  it("renders '退' text if inBusiness is false",()=>{
    const dummyMember = {userid:"testA",name:"山田",inBusiness:false,comment:"",contact:"090-XXX-XXXX",lastUpdate:"2017/05/01 10:00:00"};

    const props = {
      member : dummyMember
    };

    const wrapper = mountWithMUI(<MemberRow {...props} />);

    assert(wrapper.text().indexOf("退") >= 0);
  });

  it("renders '出' text if inBusiness is true",()=>{
    const dummyMember = {userid:"testA",name:"山田",inBusiness:true,comment:"",contact:"090-XXX-XXXX",lastUpdate:"2017/05/01 10:00:00"};

    const props = {
      member : dummyMember
    };

    const wrapper = mountWithMUI(<MemberRow {...props} />);

    assert(wrapper.text().indexOf("出") >= 0);
  });
});
