import React from 'react';
import { Glyphicon } from 'react-bootstrap';
import NodeList from './NodeList';

const NodeChild = ({node, fetchChildren, closeChildren, openChildren, children, isOpen, fetchData, hasData, parent}) => {
    const myParents = (parent==='root') ? node: `${parent}.children.data.${node}`;
    const _fetchChildren = (e) => {
        e.stopPropagation();
        (fetchData) ? openChildren(myParents) : fetchChildren(node, myParents);
    };
    const _closeChildren = (e) => {
        e.stopPropagation();
        closeChildren(myParents)
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
                    parent={ myParents }
                    nodes={children}
                    fetchChildren={fetchChildren}
                    closeChildren={closeChildren}
                    openChildren={openChildren}
                /> : null}
        </div>
    );
};


export default NodeChild;
