import assert from 'power-assert';
import {SUGGESTION_CHANGE,SUGGESTION_CLEAR} from '../../src/action/suggestion';
import {suggestionChange,suggestionClear} from '../../src/action/suggestion';

/**@test {suggestionChange}*/
describe("suggestionChange action creator",()=>{
  it("creates SUGGESTION_CHANGE action with array of suggestion string",()=>{
    const suggestion = ["東銀座","EAST 8F", "EAST 3F", "宝町", "NRI 13F", "NRI 12F"];
    const result = suggestionChange(suggestion);

    assert(result.type === SUGGESTION_CHANGE);
    assert.deepEqual(result.payload, suggestion);
  });
});

/**@test {suggestionClear}*/
describe("suggestionClear action creator",()=>{
  it("creates SUGGESTION_CLEAR action with no arguments",()=>{
    const result = suggestionClear();

    assert(result.type === SUGGESTION_CLEAR);
  });
});
