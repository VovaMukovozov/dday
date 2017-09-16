import React from 'react';
import { Glyphicon } from 'react-bootstrap';
import NodeList from './NodeList';

const NodeChild = ({node, fetchChildren, closeChildren, openChildren, children, isOpen, fetchData, hasData}) => {
    const _fetchChildren = (e) => {
        e.stopPropagation();
        (fetchData) ? openChildren(node) : fetchChildren(node);
    };
    const _closeChildren = (e) => {
        e.stopPropagation();
        closeChildren(node)
    };
    let glyphIcon = (fetchData && !hasData) ? 'minus-sign' : (isOpen) ? 'triangle-bottom' : 'triangle-right';
    return (
        <div>
            <li className={(fetchData && !hasData) ? 'inactive-node' : 'active-node'} onClick={(fetchData && !hasData) ? null : (isOpen) ? _closeChildren : _fetchChildren}>
                <Glyphicon glyph={glyphIcon} />
                {node}
            </li>
            {(isOpen && children) ?
                <NodeList
                    nodes={children}
                    fetchChildren={fetchChildren}
                    closeChildren={closeChildren}
                    openChildren={openChildren}
                /> : null}
        </div>
    );
};


export default NodeChild;
