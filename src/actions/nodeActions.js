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

export function loadNodeById(nodeId) {
    return function(dispatch) {
        dispatch(rootLoader());
        return api.getNodesById(nodeId).then(nodes => {
            nodes.parent = nodeId;
            dispatch(loadChildSuccess(nodes));
        }).catch(error => {
            dispatch(rootError(error));
        });
    };
}

export function openList(nodeId) {
    return {type: types.OPEN_LIST, nodeId};
}

export function closeList(nodeId) {
    return {type: types.CLOSE_LIST, nodeId};
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

export function rootError(error) {
    return {type: types.ERROR_ROOT, error};
}