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
	    var contentChef = function(deliveryUrl, spaceId, deliveryId, apiToken, apiCache, cacheTimeToLive) {
	        return contentChef.fn.initialize(deliveryUrl, spaceId, deliveryId, apiToken, apiCache, cacheTimeToLive);
	    };

	    var delivery = __webpack_require__(3);

	    contentChef.fn = contentChef.prototype = {

	        initialize: function(deliveryUrl, spaceId, deliveryId, apiToken, apiCache, cacheTimeToLive) {

	            var API_URL_DELIVERY = '/contentchef-delivery/v2/';

	            delivery.setUrl(deliveryUrl + contentChef.prototype.API_URL_DELIVERY);
	            delivery.setApiToken(apiToken + contentChef.prototype.API_URL_DELIVERY);
	            
	            this.spaceId = spaceId;
	            this.deliveryId = deliveryId;

	            this.apiCache = apiCache || defaultGlobalCache(); // not used for now
	            this.dataCacheTTL = cacheTimeToLive || 10;  // not used for now

	            return this;
	        },


	        lookupContentByRevision: function(contentId, contentRevision) {
	            return delivery.lookupContentByRevision(this.spaceId, this.deliveryId, contentId, contentRevision);
	        },

	        lookupContentLatestRevision: function(contentId) {
	            return delivery.lookupContentLatestRevision(this.spaceId, this.deliveryId, contentId);
	        },

	        lookupContentBySlug: function(contentSlug, contentRevision) {
	            return delivery.lookupContentBySlug(this.spaceId, this.deliveryId, contentSlug, contentRevision);
	        },

	        lookupContentLatestRevisionBySlug: function(contentSlug) {
	            return delivery.lookupContentLatestRevisionBySlug(this.spaceId, this.deliveryId, contentSlug);
	        },

	        listContentsByTag: function(tag) {
	            return delivery.listContentsByTag(this.spaceId, this.deliveryId, tag);
	        },

	        listContentsByTagAndDefinition: function(tag, definitionId) {
	            return delivery.listContentsByTagAndDefinition(this.spaceId, this.deliveryId, tag, definitionId);
	        },

	        listContentsByDefinition: function(definitionId) {
	            return delivery.listContentsByDefinition(this.spaceId, this.deliveryId, definitionId);
	        },

	        listContentsByDefinitionFromTo: function(definitionId, from, to) {
	            return delivery.listContentsByDefinitionFromTo(this.spaceId, this.deliveryId, definitionId, from, to);
	        },

	        listUnpublishedContentsByDefinition: function(definitionId, apiKeyForUnpublishedContent) {
	            return delivery.listUnpublishedContentsByDefinition(this.spaceId, this.deliveryId, definitionId, apiKeyForUnpublishedContent);
	        },

	        lookupWebPagesSitemapByUrl: function(baseURL, site) {
	            return delivery.lookupWebPagesSitemapByUrl(this.spaceId, this.deliveryId, baseURL, site);
	        },

	        lookupPageById: function(site, pageId) {
	            return delivery.lookupPageById(this.spaceId, this.deliveryId, pageId, site);
	        },

	        lookupPageByUrl: function(site, pageUrl) {
	            return delivery.lookupPageByUrl(this.spaceId, this.deliveryId, pageUrl, site);
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

	        searchContent: function(queryName, queryParam) {
	            return delivery.searchContent(this.spaceId, this.deliveryId, queryName, queryParam);
	        },

	        getAvailablePages: function() {
	            return delivery.getAvailablePages(this.spaceId, this.deliveryId);
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

	
	var http = __webpack_require__(4);
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

	function Content(contentId, revisionId, definitionInfo, tags, content) {
	    this.contentId = contentId;
	    this.revisionId = revisionId;
	    this.definitionInfo = definitionInfo;
	    this.tags = tags;
	    this.content = content;
	}

	function WebPage(webPageId, url, name, group, revisionId, templateId, templateRevision, variablesArea, contentAreas) {
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
/* 4 */
/***/ function(module, exports) {

	
	// var promise = require('es6-promise');
	// var axios = require('axios');
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


/***/ }
/******/ ]);