
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

            delivery.setUrl(deliveryUrl ); //+ contentChef.prototype.API_URL_DELIVERY)

            this.origin = origin;
            this.apiToken = apiToken;
            this.apiCache = apiCache || defaultGlobalCache();
            this.dataCacheTTL = cacheTimeToLive || 10;
            return this;
        },


        lookupContentByRevision: function(spaceId, deliveryId, contentId, contentRevision) {
            return delivery.lookupContentByRevision(spaceId, deliveryId, contentId, contentRevision);
        },

        lookupContentLatestRevision: function(spaceId, deliveryId, contentId) {
            return delivery.lookupContentLatestRevision(spaceId, deliveryId, contentId);
        },

        lookupContentBySlug: function(spaceId, deliveryId, contentSlug, contentRevision) {
            return delivery.lookupContentBySlug(spaceId, deliveryId, contentSlug, contentRevision);
        },

        lookupContentLatestRevisionBySlug: function(spaceId, deliveryId, contentSlug) {
            return delivery.lookupContentLatestRevisionBySlug(spaceId, deliveryId, contentSlug);
        },

        listContentsByTag: function(spaceId, deliveryId, tag) {
            return delivery.listContentsByTag(spaceId, deliveryId, tag);
        },

        listContentsByTagAndDefinition: function(spaceId, deliveryId, tag, definitionId) {
            return delivery.listContentsByTagAndDefinition(spaceId, deliveryId, tag, definitionId);
        },

        listContentsByDefinition: function(spaceId, deliveryId, definitionId) {
            return delivery.listContentsByDefinition(spaceId, deliveryId, definitionId);
        },

        listContentsByDefinitionFromTo: function(spaceId, deliveryId, definitionId, from, to) {
            return delivery.listContentsByDefinitionFromTo(spaceId, deliveryId, definitionId, from, to);
        },

        listUnpublishedContentsByDefinition: function(spaceId, deliveryId, definitionId, apiKey) {
            return delivery.listUnpublishedContentsByDefinition(spaceId, deliveryId, definitionId, apiKey);
        },

        lookupWebPagesSitemapByUrl: function(spaceId, deliveryId, baseURL, site) {
            return delivery.lookupWebPagesSitemapByUrl(spaceId, deliveryId, baseURL, site);
        },

        lookupPageById: function(spaceId, deliveryId, site, pageId) {
            return delivery.lookupPageById(spaceId, deliveryId, pageId, site);
        },

        lookupPageByUrl: function(spaceId, deliveryId, site, pageUrl) {
            return delivery.lookupPageByUrl(spaceId, deliveryId, pageUrl, site);
        },

        storeQuery: function(spaceId, deliveryId, params) {
            return delivery.storeQuery(spaceId, deliveryId, params);
        },
        
        createRelease: function(spaceId, deliveryId, params) {
            return delivery.createRelease(spaceId, deliveryId, params);
        },

        addToRelease: function(spaceId, deliveryId, params) {
            return delivery.addToRelease(spaceId, deliveryId, params);
        },

        stageRelease: function(spaceId, deliveryId, params) {
            return delivery.stageRelease(spaceId, deliveryId, params);
        },

        publishStagedRelease: function(spaceId, deliveryId, params) {
            return delivery.publishStagedRelease(spaceId, deliveryId, params);
        },

        searchContent: function(spaceId, deliveryId, queryName, queryParam) {
            return delivery.searchContent(spaceId, deliveryId, queryName, queryParam);
        },

        getAvailablePages: function(spaceId, deliveryId) {
            return delivery.getAvailablePages(spaceId, deliveryId);
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
