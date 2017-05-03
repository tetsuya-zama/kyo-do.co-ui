import assert from 'power-assert';
import SignUpForm from '../../src/component/signupform';
import {signupFailure,signupRequired} from '../../src/action/signup';
import {SIGNUP_FAILURE_REASONS} from '../../src/const/signup';
import sinon from 'sinon';
import {shallow} from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';
import {mountWithMUI} from './testutil';

const validationErrorMessages = [
  {reason : SIGNUP_FAILURE_REASONS.ID_DUPLICATED, msg : "ご指定のIDはすでに使われています"},
  {reason : SIGNUP_FAILURE_REASONS.SERVER_ERROR, msg:"サーバーエラーが発生しました"},
  {reason : SIGNUP_FAILURE_REASONS.INVALID_CONFIRM, msg : "パスワードとパスワード（確認）が一致しません"},
  {reason : SIGNUP_FAILURE_REASONS.EMPTY_ID, msg : "IDを入力してください"},
  {reason : SIGNUP_FAILURE_REASONS.EMPTY_PASSWORD, msg : "パスワードを入力してください"},
  {reason : SIGNUP_FAILURE_REASONS.EMPTY_NAME, msg : "名前を入力してください"},
  {reason : SIGNUP_FAILURE_REASONS.POLICY_PASSWORD, msg : "パスワードポリシーの要件を満たしていません(8文字以上，半角英数字を1文字以上含む)"}
];

const validationConditions = [
  {
    expect: [SIGNUP_FAILURE_REASONS.INVALID_CONFIRM],
    form : {
      id:"test_id",
      pass:"1q2w3e4r",
      pass_confirm:"1q2w3e4",
      name:"単体テスト"
    }
  },
  {
    expect: [SIGNUP_FAILURE_REASONS.EMPTY_ID],
    form : {
      id:"",
      pass:"1q2w3e4r",
      pass_confirm:"1q2w3e4r",
      name:"単体テスト"
    }
  },
  {
    expect: [SIGNUP_FAILURE_REASONS.EMPTY_PASSWORD, SIGNUP_FAILURE_REASONS.POLICY_PASSWORD],
    form : {
      id:"test_id",
      pass:"",
      pass_confirm:"",
      name:"単体テスト"
    }
  },
  {
    expect: [SIGNUP_FAILURE_REASONS.EMPTY_NAME],
    form : {
      id:"test_id",
      pass:"1q2w3e4r",
      pass_confirm:"1q2w3e4r",
      name:""
    }
  },
  {
    expect: [SIGNUP_FAILURE_REASONS.POLICY_PASSWORD],
    form : {
      id:"test_id",
      pass:"1q2w3e4",
      pass_confirm:"1q2w3e4",
      name:"単体テスト"
    }
  },
  {
    expect: [SIGNUP_FAILURE_REASONS.POLICY_PASSWORD],
    form : {
      id:"test_id",
      pass:"aaaaaaaa",
      pass_confirm:"aaaaaaaa",
      name:"単体テスト"
    }
  },
  {
    expect: [SIGNUP_FAILURE_REASONS.POLICY_PASSWORD],
    form : {
      id:"test_id",
      pass:"11111111",
      pass_confirm:"11111111",
      name:"単体テスト"
    }
  },
];

/**@test {SignUpForm}*/
describe("<SignUpForm />",()=>{
  //id,pass,pass_confirm,nameというテキストボックスとsign upボタンを描画する
  it("renders id,pass,pass_confirm,name textboxes and sign up button",()=>{
    const props = {
      dispatch:sinon.spy(),
      signup:{
        failure_reason:[]
      }
    };

    const wrapper = mountWithMUI(<SignUpForm {...props} />);

    assert(wrapper.ref("id").find("input").length === 1);
    assert(wrapper.ref("pass").find("input").length === 1);
    assert(wrapper.ref("pass_confirm").find("input").length === 1);
    assert(wrapper.ref("name").find("input").length === 1);
    assert(wrapper.ref("signup").find("button").length === 1);
  });
  //failure_reasonがなければバリデーションエラーメッセージを何も描画しない
  it("doesn't render any validation error messages if failure_reason is empty array.",()=>{
    const props = {
      dispatch:sinon.spy(),
      signup:{
        failure_reason:[]
      }
    };

    const wrapper = shallow(<SignUpForm {...props} />);

    validationErrorMessages.forEach(m => {
      assert(wrapper.text().indexOf(m.msg) < 0);
    });
  });
  //failure_reasonに応じたバリデーションエラーメッセージを描画する
  it("renders each validation error messages of failure_reason",()=>{
    validationErrorMessages.forEach(m =>{
      const props = {
        dispatch:sinon.spy(),
        signup:{
          failure_reason:[m.reason]
        }
      };

      const wrapper = shallow(<SignUpForm {...props} />);

      assert(wrapper.text().indexOf(m.msg) >= 0);
    });
  });
  //failure_reasonが複数あれば、複数のバリデーションエラーメッセージを描画する
  it("renders multipul validation error messages if failure_reason has multipul reasons",()=>{
    const messages = validationErrorMessages.filter(m => m.reason == (SIGNUP_FAILURE_REASONS.EMPTY_ID || SIGNUP_FAILURE_REASONS.EMPTY_PASSWORD));
    const props = {
      dispatch:sinon.spy(),
      signup:{
        failure_reason:messages.map(m=>m.reason)
      }
    };

    const wrapper = shallow(<SignUpForm {...props} />);

    messages.forEach(m => {
      assert(wrapper.text().indexOf(m.msg) >= 0);
    });
  });
  //すべての画面サイドバリデーションが通った場合、SIGNUP_REQUIREDアクションをdispatchする
  it("dispatches SIGNUP_REQUIRED action if all display side validations are passed",()=>{
    const formInput = {
      id:"test_id",
      pass:"1q2w3e4r",
      pass_confirm:"1q2w3e4r",
      name:"単体テスト"
    };

    const props = {
      dispatch:sinon.spy(),
      signup:{
        failure_reason:[]
      }
    };

    const wrapper = mountWithMUI(<SignUpForm {...props} />);

    Object.keys(formInput).forEach(k =>{
      wrapper.ref(k).find("input").simulate("change",{target:{value:formInput[k]}});
    });

    wrapper.ref("signup").find("button").simulate("click");

    assert(props.dispatch.called);
    assert.deepEqual(props.dispatch.getCall(0).args[0],signupRequired({id:formInput.id,password:formInput.pass,name:formInput.name}));
  });

  //画面バリデーションが１つでも通らない場合はSIGNUP_FAILUREアクションをdispatchする
  it("dispatches SIGNUP_FAILURE action if some display validations is not passed",()=>{
    const formInput = {
      id:"test_id",
      pass:"1q2w3e4r",
      pass_confirm:"1q2w3e4r",
      name:""
    };

    const props = {
      dispatch:sinon.spy(),
      signup:{
        failure_reason:[]
      }
    };

    const wrapper = mountWithMUI(<SignUpForm {...props} />);

    Object.keys(formInput).forEach(k =>{
      wrapper.ref(k).find("input").simulate("change",{target:{value:formInput[k]}});
    });

    wrapper.ref("signup").find("button").simulate("click");

    assert(props.dispatch.called);
    assert.deepEqual(props.dispatch.getCall(0).args[0],signupFailure([SIGNUP_FAILURE_REASONS.EMPTY_NAME]));
  });

  //画面サイドバリデーションが失敗した理由に応じてSIGNUP_FAILUREの引数に渡すSIGNUP_FAILURE_REASONSを決める
  it("dispatches SIGNUP_FAILURE action with each SIGNUP_FAILURE_REASONS of reasons why display side validation is not passed",()=>{
    validationConditions.forEach(cond =>{
      const props = {
        dispatch:sinon.spy(),
        signup:{
          failure_reason:[]
        }
      };

      const wrapper = mountWithMUI(<SignUpForm {...props} />);

      Object.keys(cond.form).forEach(k =>{
        wrapper.ref(k).find("input").simulate("change",{target:{value:cond.form[k]}});
      });

      wrapper.ref("signup").find("button").simulate("click");

      assert(props.dispatch.called);
      assert.deepEqual(props.dispatch.getCall(0).args[0],signupFailure(cond.expect));
    });
  });
});
