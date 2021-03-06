
(function(Global, undefined) {

    'use strict';

    /**
     * The kit's main entry point; initialize your API like this: ContentChef.Api(baseUrl, apiToken, apiCache, cacheTimeToLive)
     *
     * @global
     * @alias Api
     * @constructor
     * @param {string} baseUrl - The base URL of the contentchef.io API endpoint
     * @param {string} apiToken - The apiToken
     * @param {function} apiCache - A cache object that will be used for caching API responses (if not provided a default one will be used)
     * @param {int} cacheTimeToLive - The time to leave , in seconds, for the items in the cache (if not provided a default will be used)
     * @returns {Api} - The created api object
     */
    var contentChef = function(deliveryUrl, spaceId, deliveryId, apiToken, apiCache, cacheTimeToLive, apiUrlDelivery) {
        return contentChef.fn.initialize(deliveryUrl, spaceId, deliveryId, apiToken, apiCache, cacheTimeToLive, apiUrlDelivery);
    };

    var delivery = require('./delivery-module');

    contentChef.fn = contentChef.prototype = {

        initialize: function(deliveryUrl, spaceId, deliveryId, apiToken, apiCache, cacheTimeToLive, apiUrlDelivery) {

            var API_URL_DELIVERY = '/contentchef-delivery/v2';
            
            this.spaceId = spaceId;
            this.deliveryId = deliveryId;

            this.apiCache = apiCache || defaultGlobalCache(); // not used for now
            this.dataCacheTTL = cacheTimeToLive || 10;  // not used for now
            
            if (typeof apiUrlDelivery == 'undefined') {
                this.apiUrlDelivery = API_URL_DELIVERY;
            }
            else this.apiUrlDelivery = apiUrlDelivery;

            delivery.setUrl(deliveryUrl + this.apiUrlDelivery);
            delivery.setApiToken(apiToken);

            return this;
        },


        lookupContentByRevision: function(contentId, contentRevision, viewDate) {
            return delivery.lookupContentByRevision(this.spaceId, this.deliveryId, contentId, contentRevision, viewDate);
        },

        lookupContentLatestRevision: function(contentId, viewDate) {
            return delivery.lookupContentLatestRevision(this.spaceId, this.deliveryId, contentId, viewDate);
        },

        lookupContentBySlug: function(contentSlug, contentRevision) {
            return delivery.lookupContentBySlug(this.spaceId, this.deliveryId, contentSlug, contentRevision);
        },

        lookupContentLatestRevisionBySlug: function(contentSlug, viewDate) {
            return delivery.lookupContentLatestRevisionBySlug(this.spaceId, this.deliveryId, contentSlug, viewDate);
        },

        lookupContentLatestRevisionBySlugAndDefinition: function(contentSlug, contentDefinition, viewDate) {
            return delivery.lookupContentLatestRevisionBySlugAndDefinition(this.spaceId, this.deliveryId, contentSlug, contentDefinition, viewDate);
        },

        listContentsByTag: function(tag) {
            return delivery.listContentsByTag(this.spaceId, this.deliveryId, tag);
        },

        listContentsByTagAndDefinition: function(tag, definitionId) {
            return delivery.listContentsByTagAndDefinition(this.spaceId, this.deliveryId, tag, definitionId);
        },

        listContentsByDefinition: function(definitionId, viewDate) {
            return delivery.listContentsByDefinition(this.spaceId, this.deliveryId, definitionId, viewDate);
        },

        listContentsByDefinitionFromTo: function(definitionId, from, to) {
            return delivery.listContentsByDefinitionFromTo(this.spaceId, this.deliveryId, definitionId, from, to);
        },

        listUnpublishedContentsByDefinition: function(definitionId, apiKeyForUnpublishedContent) {
            return delivery.listUnpublishedContentsByDefinition(this.spaceId, this.deliveryId, definitionId, apiKeyForUnpublishedContent);
        },

        listContentsByListOfContentIds: function(listOfContentIds, viewDate) {
            return delivery.listContentsByListOfContentIds(this.spaceId, this.deliveryId, listOfContentIds, viewDate);
        },

        lookupWebPagesSitemapByUrl: function(baseURL, site) {
            return delivery.lookupWebPagesSitemapByUrl(this.spaceId, this.deliveryId, baseURL, site);
        },

        lookupPageById: function(site, pageId) {
            return delivery.lookupPageById(this.spaceId, this.deliveryId, pageId, site);
        },

        lookupPageByUrl: function(site, pageUrl, viewDate) {
            return delivery.lookupPageByUrl(this.spaceId, this.deliveryId, pageUrl, site, viewDate);
        },

        storeQuery: function(params) {
            return delivery.storeQuery(this.spaceId, this.deliveryId, params);
        },
        
        createRelease: function(params) {
            return delivery.createRelease(this.spaceId, this.deliveryId, params);
        },

        addToRelease: function(params) {
            return delivery.addToRelease(this.spaceId, this.deliveryId, params);
        },

        stageRelease: function(params) {
            return delivery.stageRelease(this.spaceId, this.deliveryId, params);
        },

        publishStagedRelease: function(params) {
            return delivery.publishStagedRelease(this.spaceId, this.deliveryId, params);
        },

        searchContent: function(queryName, queryParam, viewDate) {
            return delivery.searchContent(this.spaceId, this.deliveryId, queryName, queryParam, viewDate);
        },

        searchContentFromTo: function(queryName, from, to, queryParam) {
            return delivery.searchContentFromTo(this.spaceId, this.deliveryId, queryName, from, to, queryParam);
        },

        getAvailablePages: function() {
            return delivery.getAvailablePages(this.spaceId, this.deliveryId);
        },

        processTaxonomies: function() {
            return delivery.processTaxonomies(this.spaceId, this.deliveryId);
        },

        searchByTaxonomy: function(taxonomyId, facets, viewDate) {
            return delivery.searchByTaxonomy(this.spaceId, this.deliveryId, taxonomyId, facets, viewDate);
        },

        searchByTaxonomyByKeyValue: function(taxonomyId, keyValueObj) {
            return delivery.searchByTaxonomyByKeyValue(this.spaceId, this.deliveryId, taxonomyId, keyValueObj);
        },

        searchByTaxonomyQuery: function(taxonomyId, query) {
            return delivery.searchByTaxonomyQuery(this.spaceId, this.deliveryId, taxonomyId, query);
        },

        getTaxonomyAggregation: function(taxonomyId) {
            return delivery.getTaxonomyAggregation(this.spaceId, this.deliveryId, taxonomyId);
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
    Global.Api = contentChef;

}(typeof exports === 'object' && exports ? exports : (typeof module === "object" && module && typeof module.exports === "object" ? module.exports : window)));
