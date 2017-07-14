import assert from 'power-assert';
import {OPEN_NOTICE,CLOSE_NOTICE} from '../../src/action/notice';
import {openNotice,closeNotice} from '../../src/action/notice';

/** @test {openNotice} */
describe("openNotice action creator",()=>{
  it("creates OPEN_NOTICE action with message",()=>{
    const DummyMessage = "Dummy";

    const result = openNotice(DummyMessage);

    assert(result.type === OPEN_NOTICE);
    assert(result.payload.message === DummyMessage);
  });
  it("creates OPEN_NOTICE action with no argument",()=>{
    const result = openNotice();

    assert(result.type === OPEN_NOTICE);
    assert(result.payload.message === "");
  });
  it("creates OPEN_NOTICE action with null",()=>{
    const result = openNotice(null);

    assert(result.type === OPEN_NOTICE);
    assert(result.payload.message === "");
  });
});
/** @test {closeNotice} */
describe("closeNotice action creator",()=>{
  it("creates CLOSE_NOTICE action with no argument",()=>{
    const result = closeNotice();

    assert(result.type === CLOSE_NOTICE);
  });
});