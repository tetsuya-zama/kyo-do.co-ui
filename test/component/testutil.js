import React from 'react';
import ReactDOM from 'react-dom'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {mount} from 'enzyme';

const muiTheme = getMuiTheme();

/**
* enzymeでmountする際、material-uiのthemeをcontextにinjectする
* @param {Object} node mountしたいReact node
* @return {Object} enzyme::ReactWrapper
*/
export function mountWithMUI(node){
  return mount(node,{
    context: {muiTheme},
    childContextTypes: {muiTheme: React.PropTypes.object}
  });
}
