import assert from "power-assert";
import Board from "../../src/component/board";
import React from 'react';
import ReactDOM from 'react-dom';
import {mountWithMUI} from './testutil';

/**@test {Board}*/
describe("<Board />",()=>{
  it("renders memberfilter textbox and <MemberRow /> as meny as number of mamberStatus prop",()=>{
    const dummyMemberStatus = [
      {userid:"testA",name:"Aさん",inBusiness:false,comment:"",contact:"090-XXX-XXXX",lastUpdate:"2017/05/01 10:00:00"},
      {userid:"testB",name:"Bさん",inBusiness:true,comment:"在宅勤務",contact:"090-YYY-YYYY",lastUpdate:"2017/05/01 10:00:00"},
      {userid:"testC",name:"Cさん",inBusiness:true,comment:"京橋",contact:"",lastUpdate:"2017/05/01 10:00:00"},
      {userid:"testD",name:"Dさん",inBusiness:true,comment:"自席",contact:"090-ZZZZ-ZZZZ",lastUpdate:"2017/05/01 10:00:00"}
    ];

    const props = {
      memberStatus:dummyMemberStatus
    };

    const wrapper = mountWithMUI(<Board {...props} />);

    assert(wrapper.ref("memberfilter").find("input").length === 1);
    assert(wrapper.find("MemberRow").length === dummyMemberStatus.length);
  });

  it("filters narrows down <MemberRow /> by name which is input at memberfilter textbox",()=>{
    const dummyMemberStatus = [
      {userid:"testA",name:"山田",inBusiness:false,comment:"",contact:"090-XXX-XXXX",lastUpdate:"2017/05/01 10:00:00"},
      {userid:"testB",name:"田中",inBusiness:true,comment:"在宅勤務",contact:"090-YYY-YYYY",lastUpdate:"2017/05/01 10:00:00"},
      {userid:"testC",name:"中村",inBusiness:true,comment:"京橋",contact:"",lastUpdate:"2017/05/01 10:00:00"},
      {userid:"testD",name:"村田",inBusiness:true,comment:"自席",contact:"090-ZZZZ-ZZZZ",lastUpdate:"2017/05/01 10:00:00"}
    ];

    const props = {
      memberStatus:dummyMemberStatus
    };

    const wrapper = mountWithMUI(<Board {...props} />);

    wrapper.ref("memberfilter").find("input").simulate("change",{target:{value:"田"}});
    assert(wrapper.find("MemberRow").length === 3);
    wrapper.ref("memberfilter").find("input").simulate("change",{target:{value:"中"}});
    assert(wrapper.find("MemberRow").length === 2);
    wrapper.ref("memberfilter").find("input").simulate("change",{target:{value:"田中"}});
    assert(wrapper.find("MemberRow").length === 1);
    wrapper.ref("memberfilter").find("input").simulate("change",{target:{value:"鈴木"}});
    assert(wrapper.find("MemberRow").length === 0);
    wrapper.ref("memberfilter").find("input").simulate("change",{target:{value:""}});
    assert(wrapper.find("MemberRow").length === 4);
  });
});
