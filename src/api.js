
(function (Global, undefined) {

    "use strict";

    var oldChef = require('./../src/api-v1');
    var newChef = require('./../src/api-v2');

    var oldChefApi = {}; // reference for proxying calls to old api 
    var newChefApi = {}; // reference for proxying calls to new api 


    /**
     * The kit's main entry point; initialize your API like this: ContentChef.Api(baseUrl, apiToken, apiCache, cacheTimeToLive)
     *
     * @global
     * @alias Api
     * @constructor
     * @param {string} baseUrl - The base URL of the contentchef.io API endpoint
     * @param {string} origin - The origin of the contents in the authoring microservice
     * @param {string} apiToken - The apiToken
     * @param {function} apiCache - A cache object that will be used for caching API responses (if not provided a default one will be used)
     * @param {int} cacheTimeToLive - The time to leave , in seconds, for the items in the cache (if not provided a default will be used)
     * @returns {Api} - The created api object
     * @param {string} spaceId - not needed from v2
     * @param {string} deliveryId - not needed from v2
     * @param {string} site - not needed from v2
     */
    var adapter = function (baseUrl, origin, apiToken, apiCache, cacheTimeToLive, spaceId, deliveryId, site) {
        var theApi = adapter.fn.initialize(baseUrl, origin, apiToken, apiCache, cacheTimeToLive, spaceId, deliveryId, site);

        return theApi;
    };

    adapter.fn = adapter.prototype = {

        NOT_FOUND : new NotFound(),
        GENERIC_ERROR : new GenericError(),

        initialize: function(baseUrl, origin, apiToken, apiCache, cacheTimeToLive, spaceId, deliveryId, site) {

            oldChefApi = oldChef.ContentChef.Api(baseUrl, origin, apiToken, apiCache, cacheTimeToLive,spaceId, deliveryId, site);
            newChefApi = newChef.ContentChef.Api(baseUrl, apiToken, apiCache, cacheTimeToLive);

            return this;
        },

        lookupPageByUrl : function(p1, p2, p3, p4) {

            var spaceId = p1, deliveryId = p2, site = p3, pageUrl = p4;

            if (typeof p2 !== 'undefined') {
                return newChefApi.lookupPageByUrl(spaceId, deliveryId, site, pageUrl);
            } else {
                pageUrl = p1;
                return oldChefApi.lookupPageByUrl(pageUrl);
            }
        },

        lookupPageById : function(p1, p2, p3, p4) {

            var spaceId = p1, deliveryId = p2, site = p3, pageId = p4;

            if (typeof p2 !== 'undefined') {
                return newChefApi.lookupPageById(spaceId, deliveryId, site, pageId);
            } else {
                pageId = p1;
                return oldChefApi.lookupPageById(pageId);
            }
        },

        lookupContentLatestRevision: function(p1, p2, p3) {

            var spaceId = p1, deliveryId = p2, contentId = p3;

            if (typeof p3 !== 'undefined') {
                return newChefApi.lookupContentLatestRevision(spaceId, deliveryId, contentId);
            } else {
                contentId = p1;
                var definitionId = p2;
                return oldChefApi.lookupContentLatestRevision(contentId, definitionId);
            }
        },

        lookupContentLatestRevisionBySlug: function(p1, p2, p3) {

            var spaceId = p1, deliveryId = p2, contentSlug = p3;

            if (typeof p3 !== 'undefined') {
                return newChefApi.lookupContentLatestRevisionBySlug(spaceId, deliveryId, contentSlug);
            } else {
                contentSlug = p1;
                var definitionId = p2;
                return oldChefApi.lookupContentLatestRevisionBySlug(contentSlug, definitionId);
            }
        },

        lookupContentRevision: function(contentId, contentRevision) {
            // v1.0
            return oldChefApi.lookupContentRevision(contentId, contentRevision) ;
            
        },

        lookupContentByRevision: function(spaceId, deliveryId, contentId, contentRevision) {
            // v2.0
            return newChefApi.lookupContentByRevision(spaceId, deliveryId, contentId, contentRevision);
        },

        lookupContentRevisionBySlug: function(contentSlug, contentRevision) {
            // v1.0
            return oldChefApi.lookupContentRevisionBySlug(contentSlug, contentRevision);
        },

        lookupContentBySlug: function(spaceId, deliveryId, contentSlug, contentRevision) {
            // v2.0    
            return newChefApi.lookupContentBySlug(spaceId, deliveryId, contentSlug, contentRevision);
        },

        listAllContentByDefinition: function(definitionId) {
            // v1.0
               return oldChefApi.listAllContentByDefinition(definitionId);
        },

        listContentsByDefinition: function(spaceId, deliveryId, definitionId) {
            // v2.0
            return newChefApi.listContentsByDefinition(spaceId, deliveryId, definitionId);
        },

        searchContent: function(p1, p2, p3, p4) {
                
            var spaceId = p1, deliveryId = p2, queryName = p3, queryParam = p4;

            if (typeof p3 !== 'undefined') {
                return newChefApi.searchContent(spaceId, deliveryId, queryName, queryParam);
            } else {
                queryName = p1;
                queryParam = p2;
                return oldChefApi.searchContent(queryName, queryParam);
            }

        },

        getAvailablePages: function(p1, p2) {
            if (typeof p1 !== 'undefined') {
                var spaceId = p1, deliveryId = p2;
                return newChefApi.getAvailablePages(spaceId, deliveryId);
            } else {
                return oldChefApi.getAvailablePages();
            }
        },

        listContentsByTag: function(spaceId, deliveryId, tag) {
            // v2.0
            return newChefApi.listContentsByTag(spaceId, deliveryId, tag);
        },

        listContentsByTagAndDefinition: function(spaceId, deliveryId, tag, definitionId) {
            // v2.0
            return newChefApi.listContentsByTagAndDefinition(spaceId, deliveryId, tag, definitionId);
        },   

        listContentsByDefinitionFromTo: function(spaceId, deliveryId, definitionId, from, to) {
            // v2.0
            return newChefApi.listContentsByDefinitionFromTo(spaceId, deliveryId, definitionId, from, to);
        },

        listUnpublishedContentsByDefinition: function(spaceId, deliveryId, definitionId, apiKeyForUnpublishedContent) {
            // v2.0
            return newChefApi.listUnpublishedContentsByDefinition(spaceId, deliveryId, definitionId, apiKeyForUnpublishedContent);
        },

        lookupWebPagesSitemapByUrl: function(spaceId, deliveryId, baseURL, site) {
            // v2.0
            return newChefApi.lookupWebPagesSitemapByUrl(spaceId, deliveryId, baseURL, site);
        },

        storeQuery: function(spaceId, deliveryId, params) {
            // v2.0
            return newChefApi.storeQuery(spaceId, deliveryId, params);
        },
        
        createRelease: function(spaceId, deliveryId, params) {
            // v2.0
            return newChefApi.createRelease(spaceId, deliveryId, params);
        },

        addToRelease: function(spaceId, deliveryId, params) {
            // v2.0
            return newChefApi.addToRelease(spaceId, deliveryId, params);
        },

        stageRelease: function(spaceId, deliveryId, params) {
            // v2.0
            return newChefApi.stageRelease(spaceId, deliveryId, params);
        },

        publishStagedRelease: function(spaceId, deliveryId, params) {
            // v2.0
            return newChefApi.publishStagedRelease(spaceId, deliveryId, params);
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

    function WebPageReference(webPageId,name,url,templateId,templateRevision,group,originId,revisionId) {
        this.webPageId = webPageId;
        this.name = name;
        this.url = url;
        this.templateId = templateId;
        this.templateRevision = templateRevision;
        this.group = group;
        this.originId = originId;
        this.revisionId = revisionId;
    }

    WebPageReference.prototype = {};

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

    var mapSuccessfulResponseToWebPageReferenceList = function(data) {
        var webPageReferences=[];
        for (var i=0;i<data.length;i++) {
            var item = data[i];
            webPageReferences.push(new WebPageReference(
                item.webPageId,
                item.name,
                item.url,
                item.templateId,
                item.templateRevision,
                item.group,
                item['#originId'],
                item.revisionId
            ));
        }
        return data;
    };

    var mapSuccessfulResponseToWebContent = function(data) {
        return data;
    };

    var mapSuccessfulResponseToWebContentList = function(data) {
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
            return adapter.fn.GENERIC_ERROR;
        }

        var failureBody = result.data.failureBody;
        if (failureBody && failureBody.failure && failureBody.failure == 'not.found') {
            return adapter.fn.NOT_FOUND;
        }

        return adapter.fn.GENERIC_ERROR;

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
        Api: adapter
    };
    Global.Api = adapter;
} (typeof exports === 'object' && exports ? exports : (typeof module === "object" && module && typeof module.exports === "object" ? module.exports : window)));
