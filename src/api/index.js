import config from '../config/index'
class Api {
    static getRoot() {
        return fetch(`${config.api.host}${config.api.port}/root`).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

    static getNodesById(nodeId){
        return fetch(`${config.api.host}${config.api.port}/nodes/${nodeId}`).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }
}
export default Api;