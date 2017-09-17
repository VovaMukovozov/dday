import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as nodesAction from './actions/nodeActions';
import NodeList from './components/NodeList';
import './style/index.css';

class App extends Component {
    constructor(props, context) {
        super(props, context);
        this.fetchChildren = this.fetchChildren.bind(this);
        this.closeChildren = this.closeChildren.bind(this);
        this.openChildren = this.openChildren.bind(this);
    }

    fetchChildren(id, parent) {
        this.props.action.loadNodeById(id, parent);
    }

    openChildren(id, parent) {
        this.props.action.openList(id, parent);
    }

    closeChildren(id) {
        this.props.action.closeList(id);
    }

    render() {
        const self = this;
        const nodes = this.props.nodes;
        if (nodes.load) {
            return <div>Loading...</div>;
        }
        if (nodes.error) {
            return (
                <div>Error...</div>
            );
        }
        return (
            <div>
                <ul className="my-list">
                    <NodeList
                        parent="root"
                        nodes={nodes.data}
                        fetchChildren={self.fetchChildren}
                        closeChildren={self.closeChildren}
                        openChildren={self.openChildren}
                    />
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    const nodes = state.nodes;
    return {
        nodes
    };
}

function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(nodesAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

