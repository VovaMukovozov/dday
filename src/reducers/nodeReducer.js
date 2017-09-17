import _ from 'lodash';
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
            newState = openChild(state.data, action.parents);
            return {
                error: false,
                load: false,
                data: state.data
            };
        case types.LOAD_NODE:
            newState = loadNode(state.data, action.parents);
            return {
                error: false,
                load: false,
                data: {
                    ...newState
                }
            };
        case types.CLOSE_LIST:
            newState = closeChild(state.data, action.parents);
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

function openChild(state, parents){
    let newState = Object.assign({}, state);
    let parent = _.get(newState, parents);
    parent.children.isOpen = true;
    return newState;
}

function closeChild(state, parents){
    let newState = Object.assign({}, state);
    let parent = _.get(newState, parents);
    parent.children.isOpen = false;
    return newState;
}

function loadNode(state, parents){
    let newState = Object.assign({}, state);
    let parent = _.get(newState, parents);
    parent.children.load = true;
    return newState;
}


function addChild(state, child){
    let newState = Object.assign({}, state);
    let parent = _.get(newState, child.parents);
    parent.children.isOpen = true;
    parent.children.fetchData = true;
    parent.children.load = false;
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