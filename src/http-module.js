

var promise = require('es6-promise');
var axios = require('axios');
axios.defaults.headers.post['Content-Type'] = 'application/json';

var BAD_REQUEST = 400;
var NOT_FOUND = 404;
var INTERNAL_SERVER_ERROR = 500;

var mapErrorResponse = function(response) {

    var data = response.data;

    if (data && data.failure && data.failure == 'not.found') {
        return new NotFound(response);
    }

    if (response.status == BAD_REQUEST) {
        return new BadRequest(response);
    }

    if (response.status == INTERNAL_SERVER_ERROR) {
        return new InternalServerError(response);
    }

    return new GenericError(response);
};

function Error(response) {
    this.responseData = response.data;
    this.status = response.status;
    this.statusText = response.statusText;
    this.headers = response.headers;
    this.config = response.config;
    this.timeout = response.timeout;
    this.transformRequest = response.transformRequest;
    this.transformResponse = response.transformResponse;
    this.url = response.url;
}

function BadRequest(response) {
    response.status = BAD_REQUEST;
    Error.call(this, response);
}

function NotFound(response) {
    response.status = NOT_FOUND;
    Error.call(this, response);
}

function InternalServerError(response) {
    response.status = INTERNAL_SERVER_ERROR;
    Error.call(this, response);
}

function GenericError(response) {
    Error.call(this, response);
}

module.exports = {

    getItem: function(fullUrl, successFunction, apiKeyJson) {

        var config = {
            headers: apiKeyJson
        };

        return new Promise(function(resolve, reject) {
            axios.get(fullUrl, config)
            .then(function(result) {
                resolve(successFunction.call(this, result.data));
            })
            .catch(function(result) {
                reject(mapErrorResponse.call(this, result));
            });
        });
    },

    postItem: function(fullUrl, params) {

        return new Promise(function(resolve, reject) {
            axios.post(fullUrl, params)
            .then(function(result) {
                resolve(result.data);
            })
            .catch(function(result) {
                reject(mapErrorResponse.call(this, result));
            });
        });
    }

};