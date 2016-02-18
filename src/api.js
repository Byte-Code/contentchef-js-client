
(function(Global, undefined) {
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
    var contentChef = function(deliveryUrl, origin, apiToken, apiCache, cacheTimeToLive) {
        var theApi = contentChef.fn.initialize(deliveryUrl, origin, apiToken, apiCache, cacheTimeToLive);

        return theApi;
    };

    var delivery = require('./delivery-module');

    contentChef.fn = contentChef.prototype = {

        API_URL_DELIVERY: '/contentchef-delivery/v1/',

        initialize: function(deliveryUrl, origin, apiToken, apiCache, cacheTimeToLive) {

            delivery.setUrl(deliveryUrl )//+ contentChef.prototype.API_URL_DELIVERY)

            this.origin = origin;
            this.apiToken = apiToken;
            this.apiCache = apiCache || defaultGlobalCache();
            this.dataCacheTTL = cacheTimeToLive || 10;
            return this;
        },

        /******  AUTHORING  ******/


        lookupContentByRevision: function(deliveryId, contentId, contentRevision) {
            return delivery.lookupContentByRevision(deliveryId, contentId, contentRevision);
        },

        lookupContentLatestRevision: function(deliveryId, contentId, definitionId) {
            return delivery.lookupContentLatestRevision(deliveryId, contentId, definitionId);
        },

        lookupContentBySlug: function(deliveryId, contentSlug, contentRevision) {
            return delivery.lookupContentBySlug(deliveryId, contentSlug, contentRevision);
        },

        lookupContentLatestRevisionBySlug: function(deliveryId, contentSlug, definitionId) {
            return delivery.lookupContentLatestRevisionBySlug(deliveryId, contentSlug, definitionId);
        },

        listAllContentByDefinition: function(deliveryId, definitionId) {
            return delivery.listAllContentByDefinition(deliveryId, definitionId);
        },

        listUnpublishedContentsByDefinition: function(deliveryId, definitionId, apiKey) {
            return delivery.listUnpublishedContentsByDefinition(deliveryId, definitionId, apiKey);
        },

        lookupWebPagesSitemapByUrl: function(deliveryId, baseURL) {
            return delivery.lookupWebPagesSitemapByUrl(deliveryId, baseURL);
        },

        lookupWebPagesSitemapByUrlAndOrigin: function(deliveryId, baseURL, originId) {
            return delivery.lookupWebPagesSitemapByUrlAndOrigin(deliveryId, baseURL, originId);
        },

        lookupPageById: function(deliveryId, pageId) {
            return delivery.lookupPageById(deliveryId, pageId);
        },

        lookupPageByUrl: function(deliveryId, pageUrl) {
            return delivery.lookupPageByUrl(deliveryId, pageUrl);
        },

        storeQuery: function(deliveryId, params) {
            return delivery.storeQuery(deliveryId, params);
        },
        
        createRelease: function(deliveryId, params) {
            return delivery.createRelease(deliveryId, params);
        },

        addToRelease: function(deliveryId, params) {
            return delivery.addToRelease(deliveryId, params);
        },

        stageRelease: function(deliveryId, params) {
            return delivery.stageRelease(deliveryId, params);
        },

        publishStagedRelease: function(deliveryId, params) {
            return delivery.publishStagedRelease(deliveryId, params);
        },

        searchContent: function(deliveryId, queryName, queryParam) {
            return delivery.searchContent(deliveryId, queryName, queryParam);
        },

        getAvailablePages: function(deliveryId) {
            return delivery.getAvailablePages(deliveryId);
        }

    };

    function defaultGlobalCache() {
        var isBrowser = typeof global != 'object';

        var g = isBrowser ? window : global;

        if (!g.contentChefCache) {
            // todo create global cache object
            g.contentChefCache = {};
        }
        return g.contentChefCache;
    }

    Global.ContentChef = {
        Api: contentChef
    };

}(typeof exports === 'object' && exports ? exports : (typeof module === "object" && module && typeof module.exports === "object" ? module.exports : window)));
