
"use strict";

var promise = require('es6-promise');
var axios = require('axios');
axios.defaults.headers.post['Content-Type'] = 'application/json';

const BAD_REQUEST = 400
const NOT_FOUND = 404
const INTERNAL_SERVER_ERROR = 500

var mapSuccessfulResponse = function(data) {
    return data;
}

var mapErrorResponse = function(response) {

    var data = response.data;

    if (data && data.failure && data.failure == 'not.found') {
        return new NotFound(response)
    }

    if (response.status == BAD_REQUEST) {
        return new BadRequest(response)
    }

    if (response.status == INTERNAL_SERVER_ERROR) {
        return new InternalServerError(response)
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

    getItem: function(fullUrl, apiToken, successMappingFunction) {

        var successFunction = (successMappingFunction) ? successMappingFunction : mapSuccessfulResponse;

        return new Promise(function(resolve, reject) {
            axios.get(fullUrl)
            .then(function(result) {
                resolve(successFunction.call(this, result.data));
            })
            .catch(function(result) {
                reject(mapErrorResponse.call(this, result));
            });
        });
    },

    getProtectedItem: function(fullUrl, apiToken, apiKey, successMappingFunction) {

        var config = {
            headers: {'api-key': apiKey}
        };

        var successFunction = (successMappingFunction) ? successMappingFunction : mapSuccessfulResponse;

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

    postItem: function(fullUrl, apiToken, params) {

        return new Promise(function(resolve, reject) {
            axios.post(fullUrl, params)
            .then(function(result) {
                resolve(mapSuccessfulResponse.call(this, result.data));
            })
            .catch(function(result) {
                reject(mapErrorResponse.call(this, result));
            });
        });
    }

};