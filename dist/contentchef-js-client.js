(function (Global, undefined) {
    "use strict";

    /**
     * The kit's main entry point; initialize your API like this: ContentChef.Api(baseUrl, apiToken, apiCache, cacheTimeToLive)
     *
     * @global
     * @alias Api
     * @constructor
     * @param {string} baseUrl - The base URL of the contentchef.io API endpoint
     * @param {string} origin - The base URL of the contentchef.io API endpoint
     * @param {string} apiToken - The apiToken
     * @param {function} apiCache - A cache object that will be used for caching API responses (if not provided a default one will be used)
     * @param {int} cacheTimeToLive - The time to leave , in seconds, for the items in the cache (if not provided a default will be used)
     * @returns {Api} - The created api object
     */
    var contentChef = function (baseUrl, apiToken,apiCache,cacheTimeToLive) {
        var theApi = contentChef.fn.initialize(baseUrl, apiToken, apiCache, cacheTimeToLive);

        return theApi;
    };

    contentChef.fn = contentChef.prototype = {

        API_URL : '/contentchef-delivery/v1/',

        NOT_FOUND : new NotFound(),
        GENERIC_ERROR : new GenericError(),

        initialize: function(baseUrl, origin, apiToken, apiCache, cacheTimeToLive) {
            this.url = baseUrl +  contentChef.prototype.API_URL;
            this.origin = origin;
            this.apiToken = apiToken;
            this.apiCache = apiCache || defaultGlobalCache();
            this.dataCacheTTL = cacheTimeToLive || 10;
            return this;
        },

        lookupPageByUrl : function(pageUrl) {
            var theFullUrl = this.url + 'getWebPageByUrl/' + this.origin  + '/' + encodeURIComponent(pageUrl);

            return lookupItem(theFullUrl,this.apiToken,mapSuccessfulResponseToWebPage,mapErrorResponse);
        },

        lookupPageById : function(pageId) {
            var theFullUrl = this.url + 'getWebPageById/' + this.origin  + '/' + encodeURIComponent(pageId);

            return lookupItem(theFullUrl,this.apiToken,mapSuccessfulResponseToWebPage,mapErrorResponse);
        },

        lookupContentLatestRevision: function(contentId, definitionId) {
            var theFullUrl = this.url + 'getLatestContent/' +
                this.origin  + '/' + encodeURIComponent(contentId) + '/' + encodeURIComponent(definitionId);

            return lookupItem(theFullUrl,this.apiToken,mapSuccessfulResponseToWebContent,mapContentErrorResponse);
        },

        lookupContentRevision: function(contentId, contentRevision) {
            var theFullUrl = this.url + 'getContent/' +
                this.origin  + '/' + encodeURIComponent(contentId) + '/' + encodeURIComponent(contentRevision);

            return lookupItem(theFullUrl,this.apiToken,mapSuccessfulResponseToWebContent,mapContentErrorResponse);
        }

    };

    var lookupItem = function(fullUrl, apiToken, successMappingFunction, failureMappingFunction) {
        return new Promise(function(resolve, reject) {
            axios.get(fullUrl, {headers: {'x-square-api-key':apiToken}})
                .then(function (result) {
                    resolve(successMappingFunction.call(this,result.data));
                })
                .catch(function (result) {
                    reject(failureMappingFunction.call(this,result));
                });

        });
    };

    function WebPage(webPageId,name,url,templateId,templateRevision,group,originId,contentAreas,variablesArea) {
        this.webPageId = webPageId;
        this.name = name;
        this.url = url;
        this.templateId = templateId;
        this.templateRevision = templateRevision;
        this.group = group;
        this.originId = originId;
        this.contentAreas = contentAreas;
        this.variablesArea = variablesArea;
    }

    WebPage.prototype = {};

    var transformAreas = function (contentAreas) {

        var areas = {};

        for (var i = 0; i<contentAreas.length;i++) {
            var contentArea = contentAreas[i];
            var areaName = contentArea.areaName;
            var contents = contentArea.contents;
            areas[areaName] = contents.length == 1? contents[0] : contentArea.contents;
        }

        return areas;
    };

    var mapSuccessfulResponseToWebPage = function(data) {

        return new WebPage(data.webPageId,
            data.name,
            data.url,
            data.templateId,
            data.templateRevision,
            data.group,
            data['#originId'],
            transformAreas(data.contentAreas),
            data.variablesArea);
    };

    var mapSuccessfulResponseToWebContent = function(data) {
        return data;
    };

    function NotFound() {
        this.message = 'Not found';
    }

    NotFound.prototype = {};

    function GenericError() {
        this.message = 'Generic error';
    }

    GenericError.prototype = {};

    function mapErrorResponse(result) {
        if (result.status != 400) {
            return contentChef.fn.GENERIC_ERROR;
        }

        var failureBody = result.data['failure body'];
        if (failureBody && failureBody.failure && failureBody.failure == 'not.found') {
            return contentChef.fn.NOT_FOUND;
        }

        return contentChef.fn.GENERIC_ERROR;

    }

    function mapContentErrorResponse(result) {
        if (result.status != 400) {
            return contentChef.fn.GENERIC_ERROR;
        }

        var failure = result.data.failure;
        if (failure && failure == 'not.found') {
            return contentChef.fn.NOT_FOUND;
        }

        return contentChef.fn.GENERIC_ERROR;

    }

    function defaultGlobalCache() {
        var isBrowser = typeof global != 'object';

        var g = isBrowser?window:global;

        if (!g.contentChefCache) {
            // todo create global cache object
            g.contentChefCache = {};
        }
        return g.contentChefCache;
    }

    Global.ContentChef = {
        Api: contentChef
    };
} (typeof exports === 'object' && exports ? exports : (typeof module === "object" && module && typeof module.exports === "object" ? module.exports : window)));;