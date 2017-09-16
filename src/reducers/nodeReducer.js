import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function nodeReducer(state = initialState, action) {
    let newState = {};
    switch(action.type) {
        case types.SUCCESS_ROOT:
            return {
                error: false,
                load: false,
                data: {
                    [action.nodes.root]:{
                        children: {
                            isOpen: false,
                            fetchData: false
                        }
                    }
                }
            };
        case types.LOAD_ROOT:
            return {
                error: false,
                load: true,
                data: state.data
            };
        case types.OPEN_LIST:
            newState = openChild(state.data, action.nodeId);
            return {
                error: false,
                load: false,
                data: state.data
            };
        case types.CLOSE_LIST:
            newState = closeChild(state.data, action.nodeId);
            return {
                error: false,
                load: false,
                data: {
                    ...newState
                }
            };
        case types.ERROR_ROOT:
            return {
                error: true,
                load: false,
                data: state.data,
                errorData: action.error
            };
        case types.SUCCESS_CHILD:
            newState = addChild(state.data, action.nodes);
            return {
                error: false,
                load: false,
                data: {
                    ...newState
                }
            };
        default:
            return state;
    }
}

function openChild(state, nodeId){
    let newState = Object.assign({}, state);
    let parent = findNested(newState, nodeId);
    parent.children.isOpen = true;
    return newState;
}

function closeChild(state, nodeId){
    let newState = Object.assign({}, state);
    let parent = findNested(newState, nodeId);
    parent.children.isOpen = false;
    return newState;
}

function addChild(state, child){
    let newState = Object.assign({}, state);
    let parent = findNested(newState, child.parent);
    parent.children.isOpen = true;
    parent.children.fetchData = true;
    parent.children.data = child.nodes.reduce(function(prev, cur){
         prev[cur] = {
             children:{
                 isOpen: false,
                 fetchData: false
             }
         };
        return prev;
    }, {});
    return newState;
}

function findNested(obj, key, ret) {
    var i;
    for (i in obj) {
        if (i === key) {
            ret =  obj[i];
        }
        ret = findNested(obj[i], key, ret);
    }
    return ret;
}