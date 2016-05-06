/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["ContentChef"] = __webpack_require__(1);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module, global) {
	(function (Global, undefined) {

	    "use strict";

	    var oldChef = __webpack_require__(3);
	    var newChef = __webpack_require__(4);

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

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)(module), (function() { return this; }())))

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module, global) {(function (Global, undefined) {
	    "use strict";

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
	     * @param {string} spaceId
	     * @param {string} deliveryId
	     * @param {string} site
	     */
	    var contentChef = function (baseUrl, apiToken,apiCache,cacheTimeToLive,spaceId, deliveryId, site) {
	        var theApi = contentChef.fn.initialize(baseUrl, apiToken, apiCache, cacheTimeToLive,spaceId, deliveryId, site);

	        return theApi;
	    };

	    contentChef.fn = contentChef.prototype = {

	        API_URL : '/contentchef-delivery/v2',

	        NOT_FOUND : new NotFound(),
	        GENERIC_ERROR : new GenericError(),

	        initialize: function(baseUrl, origin, apiToken, apiCache, cacheTimeToLive,spaceId, deliveryId, site) {
	            this.url = baseUrl +  contentChef.prototype.API_URL;
	            this.origin = origin;
	            this.apiToken = apiToken;
	            this.apiCache = apiCache || defaultGlobalCache();
	            this.dataCacheTTL = cacheTimeToLive || 10;
	            this.spaceId = spaceId;
	            this.deliveryId = deliveryId;
	            this.site = site;
	            return this;
	        },

	        lookupPageByUrl : function(pageUrl) {
	            var theFullUrl = this.url + '/' + encodeURIComponent(this.spaceId) + '/' + encodeURIComponent(this.deliveryId) + '/getWebPageByUrl/' + encodeURIComponent(this.site)  + '/' + encodeURIComponent(pageUrl);

	            return lookupItem(theFullUrl,this.apiToken,mapSuccessfulResponseToWebPage,mapErrorResponse);
	        },

	        lookupPageById : function(pageId) {
	            var theFullUrl = url + '/' + encodeURIComponent(this.spaceId) + '/' + encodeURIComponent(this.deliveryId) + '/getWebPageById/' + encodeURIComponent(this.site)  + '/' + encodeURIComponent(pageId);

	            return lookupItem(theFullUrl,this.apiToken,mapSuccessfulResponseToWebPage,mapErrorResponse);
	        },

	        lookupContentLatestRevision: function(contentId, definitionId) {
	            var theFullUrl = url + '/' + encodeURIComponent(this.spaceId) + '/' + encodeURIComponent(this.deliveryId) + '/getLatestContent/' + encodeURIComponent(contentId);

	            return lookupItem(theFullUrl,this.apiToken,mapSuccessfulResponseToWebContent,mapErrorResponse);
	        },

	        lookupContentLatestRevisionBySlug: function(contentSlug, definitionId) {
	            var theFullUrl = url + '/' + encodeURIComponent(this.spaceId) + '/' + encodeURIComponent(this.deliveryId) + '/getLatestContentBySlug/' + encodeURIComponent(contentSlug);

	            return lookupItem(theFullUrl,this.apiToken,mapSuccessfulResponseToWebContent,mapErrorResponse);
	        },

	        lookupContentRevision: function(contentId, contentRevision) {
	            var theFullUrl = url + '/' + encodeURIComponent(this.spaceId) + '/' + encodeURIComponent(this.deliveryId) + '/getContent/' + encodeURIComponent(contentId) + '/' + encodeURIComponent(contentRevision);

	            return lookupItem(theFullUrl,this.apiToken,mapSuccessfulResponseToWebContent,mapErrorResponse);
	        },

	        lookupContentRevisionBySlug: function(contentSlug, contentRevision) {
	            var theFullUrl = url + '/' + encodeURIComponent(this.spaceId) + '/' + encodeURIComponent(this.deliveryId) + '/getContentBySlug/' + encodeURIComponent(contentSlug) + '/' + encodeURIComponent(contentRevision);

	            return lookupItem(theFullUrl,this.apiToken,mapSuccessfulResponseToWebContent,mapErrorResponse);
	        },

	        listAllContentByDefinition: function(definitionId) {
	            var theFullUrl = url + '/' + encodeURIComponent(this.spaceId) + '/' + encodeURIComponent(this.deliveryId) + '/listContentsByDefinitionId/' + encodeURIComponent(definitionId) ;

	            return lookupItem(theFullUrl,this.apiToken,mapSuccessfulResponseToWebContentList,mapErrorResponse);
	        },

	        searchContent: function(queryName,queryParam) {

	            var theFullUrl = url + '/' + encodeURIComponent(this.spaceId) + '/' + encodeURIComponent(this.deliveryId) + '/searchContent/' + encodeURIComponent(queryName) ;


	            if (queryParam) {
	                theFullUrl = theFullUrl + '?queryParam=' + encodeURIComponent(queryParam);
	            }

	            return lookupItem(theFullUrl,this.apiToken,mapSuccessfulResponseToWebContentList,mapErrorResponse);
	        },

	        getAvailablePages: function() {

	            var theFullUrl = url + '/' + encodeURIComponent(this.spaceId) + '/' + encodeURIComponent(this.deliveryId) + '/getAvailablePages';

	            return lookupItem(theFullUrl,this.apiToken,mapSuccessfulResponseToWebPageReferenceList,mapErrorResponse);
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
	            return contentChef.fn.GENERIC_ERROR;
	        }

	        var failureBody = result.data.failureBody;
	        if (failureBody && failureBody.failure && failureBody.failure == 'not.found') {
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
	} (typeof exports === 'object' && exports ? exports : (typeof module === "object" && module && typeof module.exports === "object" ? module.exports : window)));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)(module), (function() { return this; }())))

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module, global) {
	(function(Global, undefined) {

	    "use strict";

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
	    var contentChef = function(deliveryUrl, apiToken, apiCache, cacheTimeToLive) {
	        var theApi = contentChef.fn.initialize(deliveryUrl, apiToken, apiCache, cacheTimeToLive);

	        return theApi;
	    };

	    var delivery = __webpack_require__(5);

	    contentChef.fn = contentChef.prototype = {

	        API_URL_DELIVERY: '/contentchef-delivery/v2/',

	        initialize: function(deliveryUrl, apiToken, apiCache, cacheTimeToLive) {

	            delivery.setUrl(deliveryUrl); //+ contentChef.prototype.API_URL_DELIVERY)
	            delivery.setApiToken(apiToken); //+ contentChef.prototype.API_URL_DELIVERY)

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

	        listUnpublishedContentsByDefinition: function(spaceId, deliveryId, definitionId, apiKeyForUnpublishedContent) {
	            return delivery.listUnpublishedContentsByDefinition(spaceId, deliveryId, definitionId, apiKeyForUnpublishedContent);
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

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)(module), (function() { return this; }())))

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	
	var http = __webpack_require__(6);
	var url = "";
	var header = {};

	module.exports = {

	    setUrl: function(newUrl) {
	        url = newUrl;
	    },

	    setApiToken: function(apiToken) {
	        header = {"x-square-api-token" : apiToken};
	    },

	    lookupContentByRevision: function(spaceId, deliveryId, contentId, contentRevision) {
	        var theFullUrl = url + '/' + encodeURIComponent(spaceId) + '/' + encodeURIComponent(deliveryId) + '/getContent/' + encodeURIComponent(contentId) + '/' + encodeURIComponent(contentRevision);

	        return http.getItem(theFullUrl, mapSuccessfulResponseToContent, header);
	    },

	    lookupContentLatestRevision: function(spaceId, deliveryId, contentId) {
	        var theFullUrl = url + '/' + encodeURIComponent(spaceId) + '/' + encodeURIComponent(deliveryId) + '/getLatestContent/' + encodeURIComponent(contentId);

	        return http.getItem(theFullUrl, mapSuccessfulResponseToContent, header);
	    },

	    lookupContentBySlug: function(spaceId, deliveryId, contentSlug, contentRevision) {
	        var theFullUrl = url + '/' + encodeURIComponent(spaceId) + '/' + encodeURIComponent(deliveryId) + '/getContentBySlug/' + encodeURIComponent(contentSlug) + '/' + encodeURIComponent(contentRevision);

	        return http.getItem(theFullUrl, mapSuccessfulResponseToContent, header);
	    },

	    lookupContentLatestRevisionBySlug: function(spaceId, deliveryId, contentSlug) {
	        var theFullUrl = url + '/' + encodeURIComponent(spaceId) + '/' + encodeURIComponent(deliveryId) + '/getLatestContentBySlug/' + encodeURIComponent(contentSlug);

	        return http.getItem(theFullUrl, mapSuccessfulResponseToContent, header);
	    },

	    listContentsByTag: function(spaceId, deliveryId, tag) {
	        var theFullUrl = url + '/' + encodeURIComponent(spaceId) + '/' + encodeURIComponent(deliveryId) + '/listContentsByTag/' + encodeURIComponent(tag) ;

	        return http.getItem(theFullUrl, mapSuccessfulResponseToContentList, header);
	    },

	    listContentsByTagAndDefinition: function(spaceId, deliveryId, tag, definitionId) {
	        var theFullUrl = url + '/' + encodeURIComponent(spaceId) + '/' + encodeURIComponent(deliveryId) + '/listContentsByTagAndDefinition/' + encodeURIComponent(tag) + '/' + encodeURIComponent(definitionId) ;

	        return http.getItem(theFullUrl, mapSuccessfulResponseToContentList, header);
	    },

	    listContentsByDefinition: function(spaceId, deliveryId, definitionId) {
	        var theFullUrl = url + '/' + encodeURIComponent(spaceId) + '/' + encodeURIComponent(deliveryId) + '/listContentsByDefinitionId/' + encodeURIComponent(definitionId) ;

	        return http.getItem(theFullUrl, mapSuccessfulResponseToContentList, header);
	    },

	    listContentsByDefinitionFromTo: function(spaceId, deliveryId, definitionId, from, to) {
	        var theFullUrl = url + '/' + encodeURIComponent(spaceId) + '/' + encodeURIComponent(deliveryId) + '/listContentsByDefinitionId/' + encodeURIComponent(definitionId) + '/' + encodeURIComponent(from) + '/' + encodeURIComponent(to) ;

	        return http.getItem(theFullUrl, mapSuccessfulResponseToContentList, header);
	    },

	    listUnpublishedContentsByDefinition: function(spaceId, deliveryId, definitionId, authToken) {
	        var theFullUrl = url + '/' + encodeURIComponent(spaceId) + '/' + encodeURIComponent(deliveryId) + '/listUnpublishedContentsByDefinitionId/' + encodeURIComponent(definitionId);
	        var authHeader = {};
	        for (var key in header) authHeader[key] = header[key];
	        authHeader["api-key"] = authToken;
	        return http.getItem(theFullUrl, mapSuccessfulResponseToContentList, authHeader);
	    },

	    lookupWebPagesSitemapByUrl: function(spaceId, deliveryId, baseURL, site) {
	        var theFullUrl = url + '/' + encodeURIComponent(spaceId) + '/' + encodeURIComponent(deliveryId) + '/getWebpagesSitemap/' + encodeURIComponent(baseURL) + '/' + encodeURIComponent(site);

	        return http.getItem(theFullUrl, mapSuccessfulResponseToSiteMap, header);
	    },

	    lookupPageById : function(spaceId, deliveryId, pageId, site) {
	        var theFullUrl = url + '/' + encodeURIComponent(spaceId) + '/' + encodeURIComponent(deliveryId) + '/getWebPageById/' + encodeURIComponent(site)  + '/' + encodeURIComponent(pageId);

	        return http.getItem(theFullUrl, mapSuccessfulResponseToWebPage, header);
	    },

	    lookupPageByUrl : function(spaceId, deliveryId, pageUrl, site) {
	        var theFullUrl = url + '/' + encodeURIComponent(spaceId) + '/' + encodeURIComponent(deliveryId) + '/getWebPageByUrl/' + encodeURIComponent(site)  + '/' + encodeURIComponent(pageUrl);

	        return http.getItem(theFullUrl, mapSuccessfulResponseToWebPage, header);
	    },

	    storeQuery: function(spaceId, deliveryId, params) {
	        var theFullUrl = url + '/' + encodeURIComponent(spaceId) + '/' + encodeURIComponent(deliveryId)  + '/storeQuery';

	        return http.postItem(theFullUrl, params, header);
	    },

	    createRelease: function(spaceId, deliveryId, params) {
	        var theFullUrl = url + '/' + encodeURIComponent(spaceId) + '/' + encodeURIComponent(deliveryId)  + '/createRelease';

	        return http.postItem(theFullUrl, params, header);
	    },

	    addToRelease: function(spaceId, deliveryId, params) {
	        var theFullUrl = url + '/' + encodeURIComponent(spaceId) + '/' + encodeURIComponent(deliveryId)  + '/addToRelease';

	        return http.postItem(theFullUrl, params, header);
	    },

	    stageRelease: function(spaceId, deliveryId, params) {
	        var theFullUrl = url + '/' + encodeURIComponent(spaceId) + '/' + encodeURIComponent(deliveryId)  + '/stageRelease';

	        return http.postItem(theFullUrl, params, header);
	    },

	    publishStagedRelease: function(spaceId, deliveryId, params) {
	        var theFullUrl = url + '/' + encodeURIComponent(spaceId) + '/' + encodeURIComponent(deliveryId)  + '/publishStagedRelease';

	        return http.postItem(theFullUrl, params, header);
	    },

	    searchContent: function(spaceId, deliveryId, queryName, queryParam) {

	        var theFullUrl = url + '/' + encodeURIComponent(spaceId) + '/' + encodeURIComponent(deliveryId) + '/searchContent/' + encodeURIComponent(queryName) ;

	        if (queryParam) {
	            theFullUrl = theFullUrl + '?queryParam' + encodeURIComponent(queryParam);
	        }

	        return http.getItem(theFullUrl, mapSuccessfulResponseToContentList, header);
	    },

	    getAvailablePages: function(spaceId, deliveryId) {

	        var theFullUrl = url + '/' + encodeURIComponent(spaceId) + '/' + encodeURIComponent(deliveryId) + '/getAvailablePages';

	        return http.getItem(theFullUrl, mapSuccessfulResponseToWebPageList, header);
	    }
	};

	function Content(contentId, revisionId, originId, definitionInfo, tags, content) {
	    this.contentId = contentId;
	    this.revisionId = revisionId;
	    this.originId = originId;
	    this.definitionInfo = definitionInfo;
	    this.tags = tags;
	    this.content = content;
	}

	function WebPage(originId, webPageId, url, name, group, revisionId, templateId, templateRevision, variablesArea, contentAreas) {
	    this.originId = originId;
	    this.webPageId = webPageId;
	    this.url = url;
	    this.name = name;
	    this.group = group;
	    this.revisionId = revisionId;
	    this.templateId = templateId;
	    this.templateRevision = templateRevision;
	    this.variablesArea = variablesArea;
	    this.contentAreas = contentAreas;
	}

	var mapSuccessfulResponseToContent = function(data) {
	    return new Content(
	        data.contentId,
	        data.revisionId,
	        data['#originId'],
	        data.definitionInformation,
	        data.tags,
	        data.content);
	};

	var mapSuccessfulResponseToContentList = function(data) {
	    var contents = [];
	    for (var i = 0; i < data.length; i++) {
	        var item = data[i];
	        contents.push(mapSuccessfulResponseToContent(item));
	    }
	    return contents;
	};

	var mapSuccessfulResponseToWebPage = function(data) {
	    return new WebPage(
	        data['#originId'],
	        data.webPageId,
	        data.url,
	        data.name,
	        data.group,
	        data.revisionId,
	        data.templateId,
	        data.templateRevision,
	        data.variablesArea,
	        data.contentAreas);
	};

	var mapSuccessfulResponseToWebPageList = function(data) {
	    var contents = [];
	    for (var i = 0; i < data.length; i++) {
	        var item = data[i];
	        contents.push(mapSuccessfulResponseToWebPage(item));
	    }
	    return contents;
	};

	var mapSuccessfulResponseToSiteMap = function(data) {
	    return data;
	};


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	
	var promise = __webpack_require__(7);
	var axios = __webpack_require__(11);
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

	    getItem: function(fullUrl, successFunction, header) {

	        var config = {
	            headers: header
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


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var require;var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(process, global, module) {/*!
	 * @overview es6-promise - a tiny implementation of Promises/A+.
	 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
	 * @license   Licensed under MIT license
	 *            See https://raw.githubusercontent.com/jakearchibald/es6-promise/master/LICENSE
	 * @version   3.0.2
	 */

	(function() {
	    "use strict";
	    function lib$es6$promise$utils$$objectOrFunction(x) {
	      return typeof x === 'function' || (typeof x === 'object' && x !== null);
	    }

	    function lib$es6$promise$utils$$isFunction(x) {
	      return typeof x === 'function';
	    }

	    function lib$es6$promise$utils$$isMaybeThenable(x) {
	      return typeof x === 'object' && x !== null;
	    }

	    var lib$es6$promise$utils$$_isArray;
	    if (!Array.isArray) {
	      lib$es6$promise$utils$$_isArray = function (x) {
	        return Object.prototype.toString.call(x) === '[object Array]';
	      };
	    } else {
	      lib$es6$promise$utils$$_isArray = Array.isArray;
	    }

	    var lib$es6$promise$utils$$isArray = lib$es6$promise$utils$$_isArray;
	    var lib$es6$promise$asap$$len = 0;
	    var lib$es6$promise$asap$$toString = {}.toString;
	    var lib$es6$promise$asap$$vertxNext;
	    var lib$es6$promise$asap$$customSchedulerFn;

	    var lib$es6$promise$asap$$asap = function asap(callback, arg) {
	      lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len] = callback;
	      lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len + 1] = arg;
	      lib$es6$promise$asap$$len += 2;
	      if (lib$es6$promise$asap$$len === 2) {
	        // If len is 2, that means that we need to schedule an async flush.
	        // If additional callbacks are queued before the queue is flushed, they
	        // will be processed by this flush that we are scheduling.
	        if (lib$es6$promise$asap$$customSchedulerFn) {
	          lib$es6$promise$asap$$customSchedulerFn(lib$es6$promise$asap$$flush);
	        } else {
	          lib$es6$promise$asap$$scheduleFlush();
	        }
	      }
	    }

	    function lib$es6$promise$asap$$setScheduler(scheduleFn) {
	      lib$es6$promise$asap$$customSchedulerFn = scheduleFn;
	    }

	    function lib$es6$promise$asap$$setAsap(asapFn) {
	      lib$es6$promise$asap$$asap = asapFn;
	    }

	    var lib$es6$promise$asap$$browserWindow = (typeof window !== 'undefined') ? window : undefined;
	    var lib$es6$promise$asap$$browserGlobal = lib$es6$promise$asap$$browserWindow || {};
	    var lib$es6$promise$asap$$BrowserMutationObserver = lib$es6$promise$asap$$browserGlobal.MutationObserver || lib$es6$promise$asap$$browserGlobal.WebKitMutationObserver;
	    var lib$es6$promise$asap$$isNode = typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

	    // test for web worker but not in IE10
	    var lib$es6$promise$asap$$isWorker = typeof Uint8ClampedArray !== 'undefined' &&
	      typeof importScripts !== 'undefined' &&
	      typeof MessageChannel !== 'undefined';

	    // node
	    function lib$es6$promise$asap$$useNextTick() {
	      // node version 0.10.x displays a deprecation warning when nextTick is used recursively
	      // see https://github.com/cujojs/when/issues/410 for details
	      return function() {
	        process.nextTick(lib$es6$promise$asap$$flush);
	      };
	    }

	    // vertx
	    function lib$es6$promise$asap$$useVertxTimer() {
	      return function() {
	        lib$es6$promise$asap$$vertxNext(lib$es6$promise$asap$$flush);
	      };
	    }

	    function lib$es6$promise$asap$$useMutationObserver() {
	      var iterations = 0;
	      var observer = new lib$es6$promise$asap$$BrowserMutationObserver(lib$es6$promise$asap$$flush);
	      var node = document.createTextNode('');
	      observer.observe(node, { characterData: true });

	      return function() {
	        node.data = (iterations = ++iterations % 2);
	      };
	    }

	    // web worker
	    function lib$es6$promise$asap$$useMessageChannel() {
	      var channel = new MessageChannel();
	      channel.port1.onmessage = lib$es6$promise$asap$$flush;
	      return function () {
	        channel.port2.postMessage(0);
	      };
	    }

	    function lib$es6$promise$asap$$useSetTimeout() {
	      return function() {
	        setTimeout(lib$es6$promise$asap$$flush, 1);
	      };
	    }

	    var lib$es6$promise$asap$$queue = new Array(1000);
	    function lib$es6$promise$asap$$flush() {
	      for (var i = 0; i < lib$es6$promise$asap$$len; i+=2) {
	        var callback = lib$es6$promise$asap$$queue[i];
	        var arg = lib$es6$promise$asap$$queue[i+1];

	        callback(arg);

	        lib$es6$promise$asap$$queue[i] = undefined;
	        lib$es6$promise$asap$$queue[i+1] = undefined;
	      }

	      lib$es6$promise$asap$$len = 0;
	    }

	    function lib$es6$promise$asap$$attemptVertx() {
	      try {
	        var r = require;
	        var vertx = __webpack_require__(9);
	        lib$es6$promise$asap$$vertxNext = vertx.runOnLoop || vertx.runOnContext;
	        return lib$es6$promise$asap$$useVertxTimer();
	      } catch(e) {
	        return lib$es6$promise$asap$$useSetTimeout();
	      }
	    }

	    var lib$es6$promise$asap$$scheduleFlush;
	    // Decide what async method to use to triggering processing of queued callbacks:
	    if (lib$es6$promise$asap$$isNode) {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useNextTick();
	    } else if (lib$es6$promise$asap$$BrowserMutationObserver) {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMutationObserver();
	    } else if (lib$es6$promise$asap$$isWorker) {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMessageChannel();
	    } else if (lib$es6$promise$asap$$browserWindow === undefined && "function" === 'function') {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$attemptVertx();
	    } else {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useSetTimeout();
	    }

	    function lib$es6$promise$$internal$$noop() {}

	    var lib$es6$promise$$internal$$PENDING   = void 0;
	    var lib$es6$promise$$internal$$FULFILLED = 1;
	    var lib$es6$promise$$internal$$REJECTED  = 2;

	    var lib$es6$promise$$internal$$GET_THEN_ERROR = new lib$es6$promise$$internal$$ErrorObject();

	    function lib$es6$promise$$internal$$selfFulfillment() {
	      return new TypeError("You cannot resolve a promise with itself");
	    }

	    function lib$es6$promise$$internal$$cannotReturnOwn() {
	      return new TypeError('A promises callback cannot return that same promise.');
	    }

	    function lib$es6$promise$$internal$$getThen(promise) {
	      try {
	        return promise.then;
	      } catch(error) {
	        lib$es6$promise$$internal$$GET_THEN_ERROR.error = error;
	        return lib$es6$promise$$internal$$GET_THEN_ERROR;
	      }
	    }

	    function lib$es6$promise$$internal$$tryThen(then, value, fulfillmentHandler, rejectionHandler) {
	      try {
	        then.call(value, fulfillmentHandler, rejectionHandler);
	      } catch(e) {
	        return e;
	      }
	    }

	    function lib$es6$promise$$internal$$handleForeignThenable(promise, thenable, then) {
	       lib$es6$promise$asap$$asap(function(promise) {
	        var sealed = false;
	        var error = lib$es6$promise$$internal$$tryThen(then, thenable, function(value) {
	          if (sealed) { return; }
	          sealed = true;
	          if (thenable !== value) {
	            lib$es6$promise$$internal$$resolve(promise, value);
	          } else {
	            lib$es6$promise$$internal$$fulfill(promise, value);
	          }
	        }, function(reason) {
	          if (sealed) { return; }
	          sealed = true;

	          lib$es6$promise$$internal$$reject(promise, reason);
	        }, 'Settle: ' + (promise._label || ' unknown promise'));

	        if (!sealed && error) {
	          sealed = true;
	          lib$es6$promise$$internal$$reject(promise, error);
	        }
	      }, promise);
	    }

	    function lib$es6$promise$$internal$$handleOwnThenable(promise, thenable) {
	      if (thenable._state === lib$es6$promise$$internal$$FULFILLED) {
	        lib$es6$promise$$internal$$fulfill(promise, thenable._result);
	      } else if (thenable._state === lib$es6$promise$$internal$$REJECTED) {
	        lib$es6$promise$$internal$$reject(promise, thenable._result);
	      } else {
	        lib$es6$promise$$internal$$subscribe(thenable, undefined, function(value) {
	          lib$es6$promise$$internal$$resolve(promise, value);
	        }, function(reason) {
	          lib$es6$promise$$internal$$reject(promise, reason);
	        });
	      }
	    }

	    function lib$es6$promise$$internal$$handleMaybeThenable(promise, maybeThenable) {
	      if (maybeThenable.constructor === promise.constructor) {
	        lib$es6$promise$$internal$$handleOwnThenable(promise, maybeThenable);
	      } else {
	        var then = lib$es6$promise$$internal$$getThen(maybeThenable);

	        if (then === lib$es6$promise$$internal$$GET_THEN_ERROR) {
	          lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$GET_THEN_ERROR.error);
	        } else if (then === undefined) {
	          lib$es6$promise$$internal$$fulfill(promise, maybeThenable);
	        } else if (lib$es6$promise$utils$$isFunction(then)) {
	          lib$es6$promise$$internal$$handleForeignThenable(promise, maybeThenable, then);
	        } else {
	          lib$es6$promise$$internal$$fulfill(promise, maybeThenable);
	        }
	      }
	    }

	    function lib$es6$promise$$internal$$resolve(promise, value) {
	      if (promise === value) {
	        lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$selfFulfillment());
	      } else if (lib$es6$promise$utils$$objectOrFunction(value)) {
	        lib$es6$promise$$internal$$handleMaybeThenable(promise, value);
	      } else {
	        lib$es6$promise$$internal$$fulfill(promise, value);
	      }
	    }

	    function lib$es6$promise$$internal$$publishRejection(promise) {
	      if (promise._onerror) {
	        promise._onerror(promise._result);
	      }

	      lib$es6$promise$$internal$$publish(promise);
	    }

	    function lib$es6$promise$$internal$$fulfill(promise, value) {
	      if (promise._state !== lib$es6$promise$$internal$$PENDING) { return; }

	      promise._result = value;
	      promise._state = lib$es6$promise$$internal$$FULFILLED;

	      if (promise._subscribers.length !== 0) {
	        lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, promise);
	      }
	    }

	    function lib$es6$promise$$internal$$reject(promise, reason) {
	      if (promise._state !== lib$es6$promise$$internal$$PENDING) { return; }
	      promise._state = lib$es6$promise$$internal$$REJECTED;
	      promise._result = reason;

	      lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publishRejection, promise);
	    }

	    function lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection) {
	      var subscribers = parent._subscribers;
	      var length = subscribers.length;

	      parent._onerror = null;

	      subscribers[length] = child;
	      subscribers[length + lib$es6$promise$$internal$$FULFILLED] = onFulfillment;
	      subscribers[length + lib$es6$promise$$internal$$REJECTED]  = onRejection;

	      if (length === 0 && parent._state) {
	        lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, parent);
	      }
	    }

	    function lib$es6$promise$$internal$$publish(promise) {
	      var subscribers = promise._subscribers;
	      var settled = promise._state;

	      if (subscribers.length === 0) { return; }

	      var child, callback, detail = promise._result;

	      for (var i = 0; i < subscribers.length; i += 3) {
	        child = subscribers[i];
	        callback = subscribers[i + settled];

	        if (child) {
	          lib$es6$promise$$internal$$invokeCallback(settled, child, callback, detail);
	        } else {
	          callback(detail);
	        }
	      }

	      promise._subscribers.length = 0;
	    }

	    function lib$es6$promise$$internal$$ErrorObject() {
	      this.error = null;
	    }

	    var lib$es6$promise$$internal$$TRY_CATCH_ERROR = new lib$es6$promise$$internal$$ErrorObject();

	    function lib$es6$promise$$internal$$tryCatch(callback, detail) {
	      try {
	        return callback(detail);
	      } catch(e) {
	        lib$es6$promise$$internal$$TRY_CATCH_ERROR.error = e;
	        return lib$es6$promise$$internal$$TRY_CATCH_ERROR;
	      }
	    }

	    function lib$es6$promise$$internal$$invokeCallback(settled, promise, callback, detail) {
	      var hasCallback = lib$es6$promise$utils$$isFunction(callback),
	          value, error, succeeded, failed;

	      if (hasCallback) {
	        value = lib$es6$promise$$internal$$tryCatch(callback, detail);

	        if (value === lib$es6$promise$$internal$$TRY_CATCH_ERROR) {
	          failed = true;
	          error = value.error;
	          value = null;
	        } else {
	          succeeded = true;
	        }

	        if (promise === value) {
	          lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$cannotReturnOwn());
	          return;
	        }

	      } else {
	        value = detail;
	        succeeded = true;
	      }

	      if (promise._state !== lib$es6$promise$$internal$$PENDING) {
	        // noop
	      } else if (hasCallback && succeeded) {
	        lib$es6$promise$$internal$$resolve(promise, value);
	      } else if (failed) {
	        lib$es6$promise$$internal$$reject(promise, error);
	      } else if (settled === lib$es6$promise$$internal$$FULFILLED) {
	        lib$es6$promise$$internal$$fulfill(promise, value);
	      } else if (settled === lib$es6$promise$$internal$$REJECTED) {
	        lib$es6$promise$$internal$$reject(promise, value);
	      }
	    }

	    function lib$es6$promise$$internal$$initializePromise(promise, resolver) {
	      try {
	        resolver(function resolvePromise(value){
	          lib$es6$promise$$internal$$resolve(promise, value);
	        }, function rejectPromise(reason) {
	          lib$es6$promise$$internal$$reject(promise, reason);
	        });
	      } catch(e) {
	        lib$es6$promise$$internal$$reject(promise, e);
	      }
	    }

	    function lib$es6$promise$enumerator$$Enumerator(Constructor, input) {
	      var enumerator = this;

	      enumerator._instanceConstructor = Constructor;
	      enumerator.promise = new Constructor(lib$es6$promise$$internal$$noop);

	      if (enumerator._validateInput(input)) {
	        enumerator._input     = input;
	        enumerator.length     = input.length;
	        enumerator._remaining = input.length;

	        enumerator._init();

	        if (enumerator.length === 0) {
	          lib$es6$promise$$internal$$fulfill(enumerator.promise, enumerator._result);
	        } else {
	          enumerator.length = enumerator.length || 0;
	          enumerator._enumerate();
	          if (enumerator._remaining === 0) {
	            lib$es6$promise$$internal$$fulfill(enumerator.promise, enumerator._result);
	          }
	        }
	      } else {
	        lib$es6$promise$$internal$$reject(enumerator.promise, enumerator._validationError());
	      }
	    }

	    lib$es6$promise$enumerator$$Enumerator.prototype._validateInput = function(input) {
	      return lib$es6$promise$utils$$isArray(input);
	    };

	    lib$es6$promise$enumerator$$Enumerator.prototype._validationError = function() {
	      return new Error('Array Methods must be provided an Array');
	    };

	    lib$es6$promise$enumerator$$Enumerator.prototype._init = function() {
	      this._result = new Array(this.length);
	    };

	    var lib$es6$promise$enumerator$$default = lib$es6$promise$enumerator$$Enumerator;

	    lib$es6$promise$enumerator$$Enumerator.prototype._enumerate = function() {
	      var enumerator = this;

	      var length  = enumerator.length;
	      var promise = enumerator.promise;
	      var input   = enumerator._input;

	      for (var i = 0; promise._state === lib$es6$promise$$internal$$PENDING && i < length; i++) {
	        enumerator._eachEntry(input[i], i);
	      }
	    };

	    lib$es6$promise$enumerator$$Enumerator.prototype._eachEntry = function(entry, i) {
	      var enumerator = this;
	      var c = enumerator._instanceConstructor;

	      if (lib$es6$promise$utils$$isMaybeThenable(entry)) {
	        if (entry.constructor === c && entry._state !== lib$es6$promise$$internal$$PENDING) {
	          entry._onerror = null;
	          enumerator._settledAt(entry._state, i, entry._result);
	        } else {
	          enumerator._willSettleAt(c.resolve(entry), i);
	        }
	      } else {
	        enumerator._remaining--;
	        enumerator._result[i] = entry;
	      }
	    };

	    lib$es6$promise$enumerator$$Enumerator.prototype._settledAt = function(state, i, value) {
	      var enumerator = this;
	      var promise = enumerator.promise;

	      if (promise._state === lib$es6$promise$$internal$$PENDING) {
	        enumerator._remaining--;

	        if (state === lib$es6$promise$$internal$$REJECTED) {
	          lib$es6$promise$$internal$$reject(promise, value);
	        } else {
	          enumerator._result[i] = value;
	        }
	      }

	      if (enumerator._remaining === 0) {
	        lib$es6$promise$$internal$$fulfill(promise, enumerator._result);
	      }
	    };

	    lib$es6$promise$enumerator$$Enumerator.prototype._willSettleAt = function(promise, i) {
	      var enumerator = this;

	      lib$es6$promise$$internal$$subscribe(promise, undefined, function(value) {
	        enumerator._settledAt(lib$es6$promise$$internal$$FULFILLED, i, value);
	      }, function(reason) {
	        enumerator._settledAt(lib$es6$promise$$internal$$REJECTED, i, reason);
	      });
	    };
	    function lib$es6$promise$promise$all$$all(entries) {
	      return new lib$es6$promise$enumerator$$default(this, entries).promise;
	    }
	    var lib$es6$promise$promise$all$$default = lib$es6$promise$promise$all$$all;
	    function lib$es6$promise$promise$race$$race(entries) {
	      /*jshint validthis:true */
	      var Constructor = this;

	      var promise = new Constructor(lib$es6$promise$$internal$$noop);

	      if (!lib$es6$promise$utils$$isArray(entries)) {
	        lib$es6$promise$$internal$$reject(promise, new TypeError('You must pass an array to race.'));
	        return promise;
	      }

	      var length = entries.length;

	      function onFulfillment(value) {
	        lib$es6$promise$$internal$$resolve(promise, value);
	      }

	      function onRejection(reason) {
	        lib$es6$promise$$internal$$reject(promise, reason);
	      }

	      for (var i = 0; promise._state === lib$es6$promise$$internal$$PENDING && i < length; i++) {
	        lib$es6$promise$$internal$$subscribe(Constructor.resolve(entries[i]), undefined, onFulfillment, onRejection);
	      }

	      return promise;
	    }
	    var lib$es6$promise$promise$race$$default = lib$es6$promise$promise$race$$race;
	    function lib$es6$promise$promise$resolve$$resolve(object) {
	      /*jshint validthis:true */
	      var Constructor = this;

	      if (object && typeof object === 'object' && object.constructor === Constructor) {
	        return object;
	      }

	      var promise = new Constructor(lib$es6$promise$$internal$$noop);
	      lib$es6$promise$$internal$$resolve(promise, object);
	      return promise;
	    }
	    var lib$es6$promise$promise$resolve$$default = lib$es6$promise$promise$resolve$$resolve;
	    function lib$es6$promise$promise$reject$$reject(reason) {
	      /*jshint validthis:true */
	      var Constructor = this;
	      var promise = new Constructor(lib$es6$promise$$internal$$noop);
	      lib$es6$promise$$internal$$reject(promise, reason);
	      return promise;
	    }
	    var lib$es6$promise$promise$reject$$default = lib$es6$promise$promise$reject$$reject;

	    var lib$es6$promise$promise$$counter = 0;

	    function lib$es6$promise$promise$$needsResolver() {
	      throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
	    }

	    function lib$es6$promise$promise$$needsNew() {
	      throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
	    }

	    var lib$es6$promise$promise$$default = lib$es6$promise$promise$$Promise;
	    /**
	      Promise objects represent the eventual result of an asynchronous operation. The
	      primary way of interacting with a promise is through its `then` method, which
	      registers callbacks to receive either a promise's eventual value or the reason
	      why the promise cannot be fulfilled.

	      Terminology
	      -----------

	      - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
	      - `thenable` is an object or function that defines a `then` method.
	      - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
	      - `exception` is a value that is thrown using the throw statement.
	      - `reason` is a value that indicates why a promise was rejected.
	      - `settled` the final resting state of a promise, fulfilled or rejected.

	      A promise can be in one of three states: pending, fulfilled, or rejected.

	      Promises that are fulfilled have a fulfillment value and are in the fulfilled
	      state.  Promises that are rejected have a rejection reason and are in the
	      rejected state.  A fulfillment value is never a thenable.

	      Promises can also be said to *resolve* a value.  If this value is also a
	      promise, then the original promise's settled state will match the value's
	      settled state.  So a promise that *resolves* a promise that rejects will
	      itself reject, and a promise that *resolves* a promise that fulfills will
	      itself fulfill.


	      Basic Usage:
	      ------------

	      ```js
	      var promise = new Promise(function(resolve, reject) {
	        // on success
	        resolve(value);

	        // on failure
	        reject(reason);
	      });

	      promise.then(function(value) {
	        // on fulfillment
	      }, function(reason) {
	        // on rejection
	      });
	      ```

	      Advanced Usage:
	      ---------------

	      Promises shine when abstracting away asynchronous interactions such as
	      `XMLHttpRequest`s.

	      ```js
	      function getJSON(url) {
	        return new Promise(function(resolve, reject){
	          var xhr = new XMLHttpRequest();

	          xhr.open('GET', url);
	          xhr.onreadystatechange = handler;
	          xhr.responseType = 'json';
	          xhr.setRequestHeader('Accept', 'application/json');
	          xhr.send();

	          function handler() {
	            if (this.readyState === this.DONE) {
	              if (this.status === 200) {
	                resolve(this.response);
	              } else {
	                reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
	              }
	            }
	          };
	        });
	      }

	      getJSON('/posts.json').then(function(json) {
	        // on fulfillment
	      }, function(reason) {
	        // on rejection
	      });
	      ```

	      Unlike callbacks, promises are great composable primitives.

	      ```js
	      Promise.all([
	        getJSON('/posts'),
	        getJSON('/comments')
	      ]).then(function(values){
	        values[0] // => postsJSON
	        values[1] // => commentsJSON

	        return values;
	      });
	      ```

	      @class Promise
	      @param {function} resolver
	      Useful for tooling.
	      @constructor
	    */
	    function lib$es6$promise$promise$$Promise(resolver) {
	      this._id = lib$es6$promise$promise$$counter++;
	      this._state = undefined;
	      this._result = undefined;
	      this._subscribers = [];

	      if (lib$es6$promise$$internal$$noop !== resolver) {
	        if (!lib$es6$promise$utils$$isFunction(resolver)) {
	          lib$es6$promise$promise$$needsResolver();
	        }

	        if (!(this instanceof lib$es6$promise$promise$$Promise)) {
	          lib$es6$promise$promise$$needsNew();
	        }

	        lib$es6$promise$$internal$$initializePromise(this, resolver);
	      }
	    }

	    lib$es6$promise$promise$$Promise.all = lib$es6$promise$promise$all$$default;
	    lib$es6$promise$promise$$Promise.race = lib$es6$promise$promise$race$$default;
	    lib$es6$promise$promise$$Promise.resolve = lib$es6$promise$promise$resolve$$default;
	    lib$es6$promise$promise$$Promise.reject = lib$es6$promise$promise$reject$$default;
	    lib$es6$promise$promise$$Promise._setScheduler = lib$es6$promise$asap$$setScheduler;
	    lib$es6$promise$promise$$Promise._setAsap = lib$es6$promise$asap$$setAsap;
	    lib$es6$promise$promise$$Promise._asap = lib$es6$promise$asap$$asap;

	    lib$es6$promise$promise$$Promise.prototype = {
	      constructor: lib$es6$promise$promise$$Promise,

	    /**
	      The primary way of interacting with a promise is through its `then` method,
	      which registers callbacks to receive either a promise's eventual value or the
	      reason why the promise cannot be fulfilled.

	      ```js
	      findUser().then(function(user){
	        // user is available
	      }, function(reason){
	        // user is unavailable, and you are given the reason why
	      });
	      ```

	      Chaining
	      --------

	      The return value of `then` is itself a promise.  This second, 'downstream'
	      promise is resolved with the return value of the first promise's fulfillment
	      or rejection handler, or rejected if the handler throws an exception.

	      ```js
	      findUser().then(function (user) {
	        return user.name;
	      }, function (reason) {
	        return 'default name';
	      }).then(function (userName) {
	        // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
	        // will be `'default name'`
	      });

	      findUser().then(function (user) {
	        throw new Error('Found user, but still unhappy');
	      }, function (reason) {
	        throw new Error('`findUser` rejected and we're unhappy');
	      }).then(function (value) {
	        // never reached
	      }, function (reason) {
	        // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
	        // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
	      });
	      ```
	      If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.

	      ```js
	      findUser().then(function (user) {
	        throw new PedagogicalException('Upstream error');
	      }).then(function (value) {
	        // never reached
	      }).then(function (value) {
	        // never reached
	      }, function (reason) {
	        // The `PedgagocialException` is propagated all the way down to here
	      });
	      ```

	      Assimilation
	      ------------

	      Sometimes the value you want to propagate to a downstream promise can only be
	      retrieved asynchronously. This can be achieved by returning a promise in the
	      fulfillment or rejection handler. The downstream promise will then be pending
	      until the returned promise is settled. This is called *assimilation*.

	      ```js
	      findUser().then(function (user) {
	        return findCommentsByAuthor(user);
	      }).then(function (comments) {
	        // The user's comments are now available
	      });
	      ```

	      If the assimliated promise rejects, then the downstream promise will also reject.

	      ```js
	      findUser().then(function (user) {
	        return findCommentsByAuthor(user);
	      }).then(function (comments) {
	        // If `findCommentsByAuthor` fulfills, we'll have the value here
	      }, function (reason) {
	        // If `findCommentsByAuthor` rejects, we'll have the reason here
	      });
	      ```

	      Simple Example
	      --------------

	      Synchronous Example

	      ```javascript
	      var result;

	      try {
	        result = findResult();
	        // success
	      } catch(reason) {
	        // failure
	      }
	      ```

	      Errback Example

	      ```js
	      findResult(function(result, err){
	        if (err) {
	          // failure
	        } else {
	          // success
	        }
	      });
	      ```

	      Promise Example;

	      ```javascript
	      findResult().then(function(result){
	        // success
	      }, function(reason){
	        // failure
	      });
	      ```

	      Advanced Example
	      --------------

	      Synchronous Example

	      ```javascript
	      var author, books;

	      try {
	        author = findAuthor();
	        books  = findBooksByAuthor(author);
	        // success
	      } catch(reason) {
	        // failure
	      }
	      ```

	      Errback Example

	      ```js

	      function foundBooks(books) {

	      }

	      function failure(reason) {

	      }

	      findAuthor(function(author, err){
	        if (err) {
	          failure(err);
	          // failure
	        } else {
	          try {
	            findBoooksByAuthor(author, function(books, err) {
	              if (err) {
	                failure(err);
	              } else {
	                try {
	                  foundBooks(books);
	                } catch(reason) {
	                  failure(reason);
	                }
	              }
	            });
	          } catch(error) {
	            failure(err);
	          }
	          // success
	        }
	      });
	      ```

	      Promise Example;

	      ```javascript
	      findAuthor().
	        then(findBooksByAuthor).
	        then(function(books){
	          // found books
	      }).catch(function(reason){
	        // something went wrong
	      });
	      ```

	      @method then
	      @param {Function} onFulfilled
	      @param {Function} onRejected
	      Useful for tooling.
	      @return {Promise}
	    */
	      then: function(onFulfillment, onRejection) {
	        var parent = this;
	        var state = parent._state;

	        if (state === lib$es6$promise$$internal$$FULFILLED && !onFulfillment || state === lib$es6$promise$$internal$$REJECTED && !onRejection) {
	          return this;
	        }

	        var child = new this.constructor(lib$es6$promise$$internal$$noop);
	        var result = parent._result;

	        if (state) {
	          var callback = arguments[state - 1];
	          lib$es6$promise$asap$$asap(function(){
	            lib$es6$promise$$internal$$invokeCallback(state, child, callback, result);
	          });
	        } else {
	          lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection);
	        }

	        return child;
	      },

	    /**
	      `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
	      as the catch block of a try/catch statement.

	      ```js
	      function findAuthor(){
	        throw new Error('couldn't find that author');
	      }

	      // synchronous
	      try {
	        findAuthor();
	      } catch(reason) {
	        // something went wrong
	      }

	      // async with promises
	      findAuthor().catch(function(reason){
	        // something went wrong
	      });
	      ```

	      @method catch
	      @param {Function} onRejection
	      Useful for tooling.
	      @return {Promise}
	    */
	      'catch': function(onRejection) {
	        return this.then(null, onRejection);
	      }
	    };
	    function lib$es6$promise$polyfill$$polyfill() {
	      var local;

	      if (typeof global !== 'undefined') {
	          local = global;
	      } else if (typeof self !== 'undefined') {
	          local = self;
	      } else {
	          try {
	              local = Function('return this')();
	          } catch (e) {
	              throw new Error('polyfill failed because global object is unavailable in this environment');
	          }
	      }

	      var P = local.Promise;

	      if (P && Object.prototype.toString.call(P.resolve()) === '[object Promise]' && !P.cast) {
	        return;
	      }

	      local.Promise = lib$es6$promise$promise$$default;
	    }
	    var lib$es6$promise$polyfill$$default = lib$es6$promise$polyfill$$polyfill;

	    var lib$es6$promise$umd$$ES6Promise = {
	      'Promise': lib$es6$promise$promise$$default,
	      'polyfill': lib$es6$promise$polyfill$$default
	    };

	    /* global define:true module:true window: true */
	    if ("function" === 'function' && __webpack_require__(10)['amd']) {
	      !(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return lib$es6$promise$umd$$ES6Promise; }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof module !== 'undefined' && module['exports']) {
	      module['exports'] = lib$es6$promise$umd$$ES6Promise;
	    } else if (typeof this !== 'undefined') {
	      this['ES6Promise'] = lib$es6$promise$umd$$ES6Promise;
	    }

	    lib$es6$promise$polyfill$$default();
	}).call(this);


	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8), (function() { return this; }()), __webpack_require__(2)(module)))

/***/ },
/* 8 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 9 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(12);

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var defaults = __webpack_require__(13);
	var utils = __webpack_require__(14);
	var dispatchRequest = __webpack_require__(15);
	var InterceptorManager = __webpack_require__(22);

	var axios = module.exports = function (config) {
	  // Allow for axios('example/url'[, config]) a la fetch API
	  if (typeof config === 'string') {
	    config = utils.merge({
	      url: arguments[0]
	    }, arguments[1]);
	  }

	  config = utils.merge({
	    method: 'get',
	    headers: {},
	    timeout: defaults.timeout,
	    transformRequest: defaults.transformRequest,
	    transformResponse: defaults.transformResponse
	  }, config);

	  // Don't allow overriding defaults.withCredentials
	  config.withCredentials = config.withCredentials || defaults.withCredentials;

	  // Hook up interceptors middleware
	  var chain = [dispatchRequest, undefined];
	  var promise = Promise.resolve(config);

	  axios.interceptors.request.forEach(function (interceptor) {
	    chain.unshift(interceptor.fulfilled, interceptor.rejected);
	  });

	  axios.interceptors.response.forEach(function (interceptor) {
	    chain.push(interceptor.fulfilled, interceptor.rejected);
	  });

	  while (chain.length) {
	    promise = promise.then(chain.shift(), chain.shift());
	  }

	  return promise;
	};

	// Expose defaults
	axios.defaults = defaults;

	// Expose all/spread
	axios.all = function (promises) {
	  return Promise.all(promises);
	};
	axios.spread = __webpack_require__(23);

	// Expose interceptors
	axios.interceptors = {
	  request: new InterceptorManager(),
	  response: new InterceptorManager()
	};

	// Provide aliases for supported request methods
	(function () {
	  function createShortMethods() {
	    utils.forEach(arguments, function (method) {
	      axios[method] = function (url, config) {
	        return axios(utils.merge(config || {}, {
	          method: method,
	          url: url
	        }));
	      };
	    });
	  }

	  function createShortMethodsWithData() {
	    utils.forEach(arguments, function (method) {
	      axios[method] = function (url, data, config) {
	        return axios(utils.merge(config || {}, {
	          method: method,
	          url: url,
	          data: data
	        }));
	      };
	    });
	  }

	  createShortMethods('delete', 'get', 'head');
	  createShortMethodsWithData('post', 'put', 'patch');
	})();


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(14);

	var PROTECTION_PREFIX = /^\)\]\}',?\n/;
	var DEFAULT_CONTENT_TYPE = {
	  'Content-Type': 'application/x-www-form-urlencoded'
	};

	module.exports = {
	  transformRequest: [function (data, headers) {
	    if(utils.isFormData(data)) {
	      return data;
	    }
	    if (utils.isArrayBuffer(data)) {
	      return data;
	    }
	    if (utils.isArrayBufferView(data)) {
	      return data.buffer;
	    }
	    if (utils.isObject(data) && !utils.isFile(data) && !utils.isBlob(data)) {
	      // Set application/json if no Content-Type has been specified
	      if (!utils.isUndefined(headers)) {
	        utils.forEach(headers, function (val, key) {
	          if (key.toLowerCase() === 'content-type') {
	            headers['Content-Type'] = val;
	          }
	        });

	        if (utils.isUndefined(headers['Content-Type'])) {
	          headers['Content-Type'] = 'application/json;charset=utf-8';
	        }
	      }
	      return JSON.stringify(data);
	    }
	    return data;
	  }],

	  transformResponse: [function (data) {
	    if (typeof data === 'string') {
	      data = data.replace(PROTECTION_PREFIX, '');
	      try {
	        data = JSON.parse(data);
	      } catch (e) { /* Ignore */ }
	    }
	    return data;
	  }],

	  headers: {
	    common: {
	      'Accept': 'application/json, text/plain, */*'
	    },
	    patch: utils.merge(DEFAULT_CONTENT_TYPE),
	    post: utils.merge(DEFAULT_CONTENT_TYPE),
	    put: utils.merge(DEFAULT_CONTENT_TYPE)
	  },

	  timeout: 0,

	  xsrfCookieName: 'XSRF-TOKEN',
	  xsrfHeaderName: 'X-XSRF-TOKEN'
	};


/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';

	/*global toString:true*/

	// utils is a library of generic helper functions non-specific to axios

	var toString = Object.prototype.toString;

	/**
	 * Determine if a value is an Array
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Array, otherwise false
	 */
	function isArray(val) {
	  return toString.call(val) === '[object Array]';
	}

	/**
	 * Determine if a value is an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
	 */
	function isArrayBuffer(val) {
	  return toString.call(val) === '[object ArrayBuffer]';
	}

	/**
	 * Determine if a value is a FormData
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an FormData, otherwise false
	 */
	function isFormData(val) {
	  return toString.call(val) === '[object FormData]';
	}

	/**
	 * Determine if a value is a view on an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
	 */
	function isArrayBufferView(val) {
	  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
	    return ArrayBuffer.isView(val);
	  } else {
	    return (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
	  }
	}

	/**
	 * Determine if a value is a String
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a String, otherwise false
	 */
	function isString(val) {
	  return typeof val === 'string';
	}

	/**
	 * Determine if a value is a Number
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Number, otherwise false
	 */
	function isNumber(val) {
	  return typeof val === 'number';
	}

	/**
	 * Determine if a value is undefined
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if the value is undefined, otherwise false
	 */
	function isUndefined(val) {
	  return typeof val === 'undefined';
	}

	/**
	 * Determine if a value is an Object
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Object, otherwise false
	 */
	function isObject(val) {
	  return val !== null && typeof val === 'object';
	}

	/**
	 * Determine if a value is a Date
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Date, otherwise false
	 */
	function isDate(val) {
	  return toString.call(val) === '[object Date]';
	}

	/**
	 * Determine if a value is a File
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a File, otherwise false
	 */
	function isFile(val) {
	  return toString.call(val) === '[object File]';
	}

	/**
	 * Determine if a value is a Blob
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Blob, otherwise false
	 */
	function isBlob(val) {
	  return toString.call(val) === '[object Blob]';
	}

	/**
	 * Trim excess whitespace off the beginning and end of a string
	 *
	 * @param {String} str The String to trim
	 * @returns {String} The String freed of excess whitespace
	 */
	function trim(str) {
	  return str.replace(/^\s*/, '').replace(/\s*$/, '');
	}

	/**
	 * Determine if a value is an Arguments object
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Arguments object, otherwise false
	 */
	function isArguments(val) {
	  return toString.call(val) === '[object Arguments]';
	}

	/**
	 * Determine if we're running in a standard browser environment
	 *
	 * This allows axios to run in a web worker, and react-native.
	 * Both environments support XMLHttpRequest, but not fully standard globals.
	 *
	 * web workers:
	 *  typeof window -> undefined
	 *  typeof document -> undefined
	 *
	 * react-native:
	 *  typeof document.createelement -> undefined
	 */
	function isStandardBrowserEnv() {
	  return (
	    typeof window !== 'undefined' &&
	    typeof document !== 'undefined' &&
	    typeof document.createElement === 'function'
	  );
	}

	/**
	 * Iterate over an Array or an Object invoking a function for each item.
	 *
	 * If `obj` is an Array or arguments callback will be called passing
	 * the value, index, and complete array for each item.
	 *
	 * If 'obj' is an Object callback will be called passing
	 * the value, key, and complete object for each property.
	 *
	 * @param {Object|Array} obj The object to iterate
	 * @param {Function} fn The callback to invoke for each item
	 */
	function forEach(obj, fn) {
	  // Don't bother if no value provided
	  if (obj === null || typeof obj === 'undefined') {
	    return;
	  }

	  // Check if obj is array-like
	  var isArrayLike = isArray(obj) || isArguments(obj);

	  // Force an array if not already something iterable
	  if (typeof obj !== 'object' && !isArrayLike) {
	    obj = [obj];
	  }

	  // Iterate over array values
	  if (isArrayLike) {
	    for (var i = 0, l = obj.length; i < l; i++) {
	      fn.call(null, obj[i], i, obj);
	    }
	  }
	  // Iterate over object keys
	  else {
	    for (var key in obj) {
	      if (obj.hasOwnProperty(key)) {
	        fn.call(null, obj[key], key, obj);
	      }
	    }
	  }
	}

	/**
	 * Accepts varargs expecting each argument to be an object, then
	 * immutably merges the properties of each object and returns result.
	 *
	 * When multiple objects contain the same key the later object in
	 * the arguments list will take precedence.
	 *
	 * Example:
	 *
	 * ```js
	 * var result = merge({foo: 123}, {foo: 456});
	 * console.log(result.foo); // outputs 456
	 * ```
	 *
	 * @param {Object} obj1 Object to merge
	 * @returns {Object} Result of all merge properties
	 */
	function merge(/*obj1, obj2, obj3, ...*/) {
	  var result = {};
	  forEach(arguments, function (obj) {
	    forEach(obj, function (val, key) {
	      result[key] = val;
	    });
	  });
	  return result;
	}

	module.exports = {
	  isArray: isArray,
	  isArrayBuffer: isArrayBuffer,
	  isFormData: isFormData,
	  isArrayBufferView: isArrayBufferView,
	  isString: isString,
	  isNumber: isNumber,
	  isObject: isObject,
	  isUndefined: isUndefined,
	  isDate: isDate,
	  isFile: isFile,
	  isBlob: isBlob,
	  isStandardBrowserEnv: isStandardBrowserEnv,
	  forEach: forEach,
	  merge: merge,
	  trim: trim
	};


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	/**
	 * Dispatch a request to the server using whichever adapter
	 * is supported by the current environment.
	 *
	 * @param {object} config The config that is to be used for the request
	 * @returns {Promise} The Promise to be fulfilled
	 */
	module.exports = function dispatchRequest(config) {
	  return new Promise(function (resolve, reject) {
	    try {
	      // For browsers use XHR adapter
	      if ((typeof XMLHttpRequest !== 'undefined') || (typeof ActiveXObject !== 'undefined')) {
	        __webpack_require__(16)(resolve, reject, config);
	      }
	      // For node use HTTP adapter
	      else if (typeof process !== 'undefined') {
	        __webpack_require__(16)(resolve, reject, config);
	      }
	    } catch (e) {
	      reject(e);
	    }
	  });
	};


	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/*global ActiveXObject:true*/

	var defaults = __webpack_require__(13);
	var utils = __webpack_require__(14);
	var buildUrl = __webpack_require__(17);
	var parseHeaders = __webpack_require__(18);
	var transformData = __webpack_require__(19);

	module.exports = function xhrAdapter(resolve, reject, config) {
	  // Transform request data
	  var data = transformData(
	    config.data,
	    config.headers,
	    config.transformRequest
	  );

	  // Merge headers
	  var requestHeaders = utils.merge(
	    defaults.headers.common,
	    defaults.headers[config.method] || {},
	    config.headers || {}
	  );

	  if (utils.isFormData(data)) {
	    delete requestHeaders['Content-Type']; // Let the browser set it
	  }

	  // Create the request
	  var request = new (XMLHttpRequest || ActiveXObject)('Microsoft.XMLHTTP');
	  request.open(config.method.toUpperCase(), buildUrl(config.url, config.params), true);

	  // Set the request timeout in MS
	  request.timeout = config.timeout;

	  // Listen for ready state
	  request.onreadystatechange = function () {
	    if (request && request.readyState === 4) {
	      // Prepare the response
	      var responseHeaders = parseHeaders(request.getAllResponseHeaders());
	      var responseData = ['text', ''].indexOf(config.responseType || '') !== -1 ? request.responseText : request.response;
	      var response = {
	        data: transformData(
	          responseData,
	          responseHeaders,
	          config.transformResponse
	        ),
	        status: request.status,
	        statusText: request.statusText,
	        headers: responseHeaders,
	        config: config
	      };

	      // Resolve or reject the Promise based on the status
	      (request.status >= 200 && request.status < 300 ?
	        resolve :
	        reject)(response);

	      // Clean up request
	      request = null;
	    }
	  };

	  // Add xsrf header
	  // This is only done if running in a standard browser environment.
	  // Specifically not if we're in a web worker, or react-native.
	  if (utils.isStandardBrowserEnv()) {
	    var cookies = __webpack_require__(20);
	    var urlIsSameOrigin = __webpack_require__(21);

	    // Add xsrf header
	    var xsrfValue = urlIsSameOrigin(config.url) ?
	        cookies.read(config.xsrfCookieName || defaults.xsrfCookieName) :
	        undefined;

	    if (xsrfValue) {
	      requestHeaders[config.xsrfHeaderName || defaults.xsrfHeaderName] = xsrfValue;
	    }
	  }

	  // Add headers to the request
	  utils.forEach(requestHeaders, function (val, key) {
	    // Remove Content-Type if data is undefined
	    if (!data && key.toLowerCase() === 'content-type') {
	      delete requestHeaders[key];
	    }
	    // Otherwise add header to the request
	    else {
	      request.setRequestHeader(key, val);
	    }
	  });

	  // Add withCredentials to request if needed
	  if (config.withCredentials) {
	    request.withCredentials = true;
	  }

	  // Add responseType to request if needed
	  if (config.responseType) {
	    try {
	      request.responseType = config.responseType;
	    } catch (e) {
	      if (request.responseType !== 'json') {
	        throw e;
	      }
	    }
	  }

	  if (utils.isArrayBuffer(data)) {
	    data = new DataView(data);
	  }

	  // Send the request
	  request.send(data);
	};


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(14);

	function encode(val) {
	  return encodeURIComponent(val).
	    replace(/%40/gi, '@').
	    replace(/%3A/gi, ':').
	    replace(/%24/g, '$').
	    replace(/%2C/gi, ',').
	    replace(/%20/g, '+').
	    replace(/%5B/gi, '[').
	    replace(/%5D/gi, ']');
	}

	/**
	 * Build a URL by appending params to the end
	 *
	 * @param {string} url The base of the url (e.g., http://www.google.com)
	 * @param {object} [params] The params to be appended
	 * @returns {string} The formatted url
	 */
	module.exports = function buildUrl(url, params) {
	  if (!params) {
	    return url;
	  }

	  var parts = [];

	  utils.forEach(params, function (val, key) {
	    if (val === null || typeof val === 'undefined') {
	      return;
	    }

	    if (utils.isArray(val)) {
	      key = key + '[]';
	    }

	    if (!utils.isArray(val)) {
	      val = [val];
	    }

	    utils.forEach(val, function (v) {
	      if (utils.isDate(v)) {
	        v = v.toISOString();
	      }
	      else if (utils.isObject(v)) {
	        v = JSON.stringify(v);
	      }
	      parts.push(encode(key) + '=' + encode(v));
	    });
	  });

	  if (parts.length > 0) {
	    url += (url.indexOf('?') === -1 ? '?' : '&') + parts.join('&');
	  }

	  return url;
	};


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(14);

	/**
	 * Parse headers into an object
	 *
	 * ```
	 * Date: Wed, 27 Aug 2014 08:58:49 GMT
	 * Content-Type: application/json
	 * Connection: keep-alive
	 * Transfer-Encoding: chunked
	 * ```
	 *
	 * @param {String} headers Headers needing to be parsed
	 * @returns {Object} Headers parsed into an object
	 */
	module.exports = function parseHeaders(headers) {
	  var parsed = {}, key, val, i;

	  if (!headers) { return parsed; }

	  utils.forEach(headers.split('\n'), function(line) {
	    i = line.indexOf(':');
	    key = utils.trim(line.substr(0, i)).toLowerCase();
	    val = utils.trim(line.substr(i + 1));

	    if (key) {
	      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
	    }
	  });

	  return parsed;
	};


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(14);

	/**
	 * Transform the data for a request or a response
	 *
	 * @param {Object|String} data The data to be transformed
	 * @param {Array} headers The headers for the request or response
	 * @param {Array|Function} fns A single function or Array of functions
	 * @returns {*} The resulting transformed data
	 */
	module.exports = function transformData(data, headers, fns) {
	  utils.forEach(fns, function (fn) {
	    data = fn(data, headers);
	  });

	  return data;
	};


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * WARNING:
	 *  This file makes references to objects that aren't safe in all environments.
	 *  Please see lib/utils.isStandardBrowserEnv before including this file.
	 */

	var utils = __webpack_require__(14);

	module.exports = {
	  write: function write(name, value, expires, path, domain, secure) {
	    var cookie = [];
	    cookie.push(name + '=' + encodeURIComponent(value));

	    if (utils.isNumber(expires)) {
	      cookie.push('expires=' + new Date(expires).toGMTString());
	    }

	    if (utils.isString(path)) {
	      cookie.push('path=' + path);
	    }

	    if (utils.isString(domain)) {
	      cookie.push('domain=' + domain);
	    }

	    if (secure === true) {
	      cookie.push('secure');
	    }

	    document.cookie = cookie.join('; ');
	  },

	  read: function read(name) {
	    var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
	    return (match ? decodeURIComponent(match[3]) : null);
	  },

	  remove: function remove(name) {
	    this.write(name, '', Date.now() - 86400000);
	  }
	};


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * WARNING:
	 *  This file makes references to objects that aren't safe in all environments.
	 *  Please see lib/utils.isStandardBrowserEnv before including this file.
	 */

	var utils = __webpack_require__(14);
	var msie = /(msie|trident)/i.test(navigator.userAgent);
	var urlParsingNode = document.createElement('a');
	var originUrl;

	/**
	 * Parse a URL to discover it's components
	 *
	 * @param {String} url The URL to be parsed
	 * @returns {Object}
	 */
	function urlResolve(url) {
	  var href = url;

	  if (msie) {
	    // IE needs attribute set twice to normalize properties
	    urlParsingNode.setAttribute('href', href);
	    href = urlParsingNode.href;
	  }

	  urlParsingNode.setAttribute('href', href);

	  // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
	  return {
	    href: urlParsingNode.href,
	    protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
	    host: urlParsingNode.host,
	    search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
	    hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
	    hostname: urlParsingNode.hostname,
	    port: urlParsingNode.port,
	    pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
	              urlParsingNode.pathname :
	              '/' + urlParsingNode.pathname
	  };
	}

	originUrl = urlResolve(window.location.href);

	/**
	 * Determine if a URL shares the same origin as the current location
	 *
	 * @param {String} requestUrl The URL to test
	 * @returns {boolean} True if URL shares the same origin, otherwise false
	 */
	module.exports = function urlIsSameOrigin(requestUrl) {
	  var parsed = (utils.isString(requestUrl)) ? urlResolve(requestUrl) : requestUrl;
	  return (parsed.protocol === originUrl.protocol &&
	        parsed.host === originUrl.host);
	};


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(14);

	function InterceptorManager() {
	  this.handlers = [];
	}

	/**
	 * Add a new interceptor to the stack
	 *
	 * @param {Function} fulfilled The function to handle `then` for a `Promise`
	 * @param {Function} rejected The function to handle `reject` for a `Promise`
	 *
	 * @return {Number} An ID used to remove interceptor later
	 */
	InterceptorManager.prototype.use = function (fulfilled, rejected) {
	  this.handlers.push({
	    fulfilled: fulfilled,
	    rejected: rejected
	  });
	  return this.handlers.length - 1;
	};

	/**
	 * Remove an interceptor from the stack
	 *
	 * @param {Number} id The ID that was returned by `use`
	 */
	InterceptorManager.prototype.eject = function (id) {
	  if (this.handlers[id]) {
	    this.handlers[id] = null;
	  }
	};

	/**
	 * Iterate over all the registered interceptors
	 *
	 * This method is particularly useful for skipping over any
	 * interceptors that may have become `null` calling `remove`.
	 *
	 * @param {Function} fn The function to call for each interceptor
	 */
	InterceptorManager.prototype.forEach = function (fn) {
	  utils.forEach(this.handlers, function (h) {
	    if (h !== null) {
	      fn(h);
	    }
	  });
	};

	module.exports = InterceptorManager;


/***/ },
/* 23 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Syntactic sugar for invoking a function and expanding an array for arguments.
	 *
	 * Common use case would be to use `Function.prototype.apply`.
	 *
	 *  ```js
	 *  function f(x, y, z) {}
	 *  var args = [1, 2, 3];
	 *  f.apply(null, args);
	 *  ```
	 *
	 * With `spread` this example can be re-written.
	 *
	 *  ```js
	 *  spread(function(x, y, z) {})([1, 2, 3]);
	 *  ```
	 *
	 * @param {Function} callback
	 * @returns {Function}
	 */
	module.exports = function spread(callback) {
	  return function (arr) {
	    return callback.apply(null, arr);
	  };
	};


/***/ }
/******/ ]);