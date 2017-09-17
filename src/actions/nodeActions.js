import api from '../api';
import * as types from './actionTypes';

export function loadRoot() {
    return function(dispatch) {
        dispatch(rootLoader());
        return api.getRoot().then(nodes => {
            dispatch(loadRootSuccess(nodes));
        }).catch(error => {
            dispatch(rootError(error));
        });
    };
}

export function loadNodeById(nodeId, parents) {
    return function(dispatch) {
        dispatch(nodeLoader(parents));
        return api.getNodesById(nodeId).then(nodes => {
            nodes.parent = nodeId;
            nodes.parents = parents;
            dispatch(loadChildSuccess(nodes));
        }).catch(error => {
            dispatch(rootError(error));
        });
    };
}

export function openList(parents) {
    return {type: types.OPEN_LIST, parents};
}

export function closeList(parents) {
    return {type: types.CLOSE_LIST, parents};
}

export function loadChildSuccess(nodes) {
    return {type: types.SUCCESS_CHILD, nodes};
}

export function loadRootSuccess(nodes) {
    return {type: types.SUCCESS_ROOT, nodes};
}

export function rootLoader() {
    return {type: types.LOAD_ROOT};
}

export function nodeLoader(parents) {
    return {type: types.LOAD_NODE, parents};
}

export function rootError(error) {
    return {type: types.ERROR_ROOT, error};
}