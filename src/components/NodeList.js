import React from 'react';
import _ from 'lodash';
import NodeChild from './NodeChild';

const NodeList = ({nodes, fetchChildren, closeChildren, openChildren, parent}) => {
    return (
        <div>
            {Object.keys(nodes).map( (node, index) => {
                return <ul key={index} >
                    <NodeChild
                        node={node}
                        parent={parent}
                        fetchChildren={fetchChildren}
                        closeChildren={closeChildren}
                        openChildren={openChildren}
                        children={nodes[node].children.data || null}
                        loadChild={nodes[node].children.load}
                        fetchData={nodes[node].children.fetchData}
                        hasData={!_.isEmpty(nodes[node].children.data)}
                        isOpen={nodes[node].children.isOpen}/>
                </ul>
            })}
        </div>
    );
};


export default NodeList;
