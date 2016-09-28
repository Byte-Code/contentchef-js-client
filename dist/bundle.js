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
	    var contentChef = function(deliveryUrl, spaceId, deliveryId, apiToken, apiCache, cacheTimeToLive, apiUrlDelivery) {
	        return contentChef.fn.initialize(deliveryUrl, spaceId, deliveryId, apiToken, apiCache, cacheTimeToLive, apiUrlDelivery);
	    };

	    var delivery = __webpack_require__(3);

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

	        lookupContentLatestRevisionBySlugAndDefinition: function(contentSlug, contentDefinition) {
	            return delivery.lookupContentLatestRevisionBySlugAndDefinition(this.spaceId, this.deliveryId, contentSlug, contentDefinition);
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

	        listContentsByListOfContentIds: function(listOfContentIds) {
	            return delivery.listContentsByListOfContentIds(this.spaceId, this.deliveryId, listOfContentIds);
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

	        searchContentFromTo: function(queryName, from, to, queryParam) {
	            return delivery.searchContentFromTo(this.spaceId, this.deliveryId, queryName, from, to, queryParam);
	        },

	        getAvailablePages: function() {
	            return delivery.getAvailablePages(this.spaceId, this.deliveryId);
	        },

	        processTaxonomies: function() {
	            return delivery.processTaxonomies(this.spaceId, this.deliveryId);
	        },

	        searchByTaxonomy: function(taxonomyId, facets) {
	            return delivery.searchByTaxonomy(this.spaceId, this.deliveryId, taxonomyId, facets);
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
	        header = {"x-square-api-key" : apiToken};
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

	    lookupContentLatestRevisionBySlugAndDefinition: function(spaceId, deliveryId, contentSlug, contentDefinition) {
	        var theFullUrl = url + '/' + encodeURIComponent(spaceId) + '/' + encodeURIComponent(deliveryId) + '/getLatestContentBySlugAndDefinition/' + encodeURIComponent(contentSlug) + "/" + encodeURIComponent(contentDefinition);

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

	    listContentsByListOfContentIds: function(spaceId, deliveryId, listOfContentIds) {
	        var theFullUrl = url + '/' + encodeURIComponent(spaceId) + '/' + encodeURIComponent(deliveryId) + '/listContentsByListOfContentIds/' + encodeURIComponent(listOfContentIds);

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
	        var theFullUrl = url + '/' + encodeURIComponent(spaceId) + '/' + encodeURIComponent(deliveryId) + '/getWebPageById/' + encodeURIComponent(pageId)  + '/' + encodeURIComponent(site);

	        return http.getItem(theFullUrl, mapSuccessfulResponseToWebPage, header);
	    },

	    lookupPageByUrl : function(spaceId, deliveryId, pageUrl, site) {
	        var theFullUrl = url + '/' + encodeURIComponent(spaceId) + '/' + encodeURIComponent(deliveryId) + '/getWebPageByUrl/' + encodeURIComponent(pageUrl)  + '/' + encodeURIComponent(site);

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
	        if (typeof queryParam !== 'undefined') {
	            theFullUrl = theFullUrl + '?queryParam=' + encodeURIComponent(queryParam);
	        }
	        return http.getItem(theFullUrl, mapSuccessfulResponseToContentList, header);
	    },

	    searchContentFromTo: function(spaceId, deliveryId, queryName, from, to, queryParam) {
	        var theFullUrl = url + '/' + encodeURIComponent(spaceId) + '/' + encodeURIComponent(deliveryId) + '/searchContent/' + encodeURIComponent(queryName) + '/' + from + '/' + to ;
	        if (typeof queryParam !== 'undefined') {
	            theFullUrl = theFullUrl + '?queryParam=' + encodeURIComponent(queryParam);
	        }
	        return http.getItem(theFullUrl, mapSuccessfulResponseToContentList, header);
	    },

	    getAvailablePages: function(spaceId, deliveryId) {
	        var theFullUrl = url + '/' + encodeURIComponent(spaceId) + '/' + encodeURIComponent(deliveryId) + '/getAvailablePages';
	        return http.getItem(theFullUrl, mapSuccessfulResponseToWebPageList, header);
	    },

	    processTaxonomies: function() {
	        var theFullUrl = url + '/' + encodeURIComponent(spaceId) + '/' + encodeURIComponent(deliveryId) + '/processTaxonomies';
	        return http.postItem(theFullUrl, params, header);
	    },

	    getTaxonomyAggregation: function(spaceId, deliveryId, taxonomyId) {
	        var theFullUrl = url +
	          '/' + encodeURIComponent(spaceId) +
	          '/' + encodeURIComponent(deliveryId) +
	          '/getTaxonomyAggregation' +
	          '/' + encodeURIComponent(taxonomyId) ;
	        return http.getItem(theFullUrl, mapSuccessfulResponseToTaxAgg, header);
	    },

	    searchByTaxonomy: function(spaceId, deliveryId, taxonomyId, facets) {
	        var theFullUrl = url +
	          '/' + encodeURIComponent(spaceId) +
	          '/' + encodeURIComponent(deliveryId) +
	          '/searchByTaxonomy' +
	          '/' + encodeURIComponent(taxonomyId);
	        if (typeof facets !== 'undefined' && facets.length > 0) {
	            theFullUrl = theFullUrl + '?facets=' + encodeURIComponent(facets);
	        }
	        return http.getItem(theFullUrl, mapSuccessfulResponseToContentViewList, header);
	    }


	};

	function Content(contentId, revisionId, deliveryRevisionId, definitionInfo, tags, content, taxonomy, size, facets) {
	    this.contentId = contentId;
	    this.revisionId = revisionId;
	    this.deliveryRevisionId = deliveryRevisionId;
	    this.definitionInfo = definitionInfo;
	    this.tags = tags;
	    this.content = content;
	    if (typeof(taxonomy) !== 'undefined') {
	        this.taxonomy = taxonomy;
	    }
	    if (typeof(size) !== 'undefined') {
	    	this.size = size;
	    }
	    if (typeof(facets) !== 'undefined') {
	        this.facets = facets;
	    }
	}

	function WebPage(webPageId, url, name, group, site, revisionId, deliveryRevisionId, templateId, templateRevision, variablesArea, contentAreas) {
	    this.webPageId = webPageId;
	    this.url = url;
	    this.name = name;
	    this.group = group;
	    this.site = site;
	    this.revisionId = revisionId;
	    this.deliveryRevisionId = deliveryRevisionId;
	    this.templateId = templateId;
	    this.templateRevision = templateRevision;
	    this.variablesArea = variablesArea;
	    this.contentAreas = contentAreas;
	}

	var mapSuccessfulResponseToContent = function(data) {
	    return new Content(
	        data.contentId,
	        data.revisionId,
	        data.deliveryRevisionId,
	        data.definitionInformation,
	        data.tags,
	        data.content,
	        data.taxonomy,
		data.size,
	    data.facets);
	};

	var mapSuccessfulResponseToContentList = function(data) {
	    var contents = [];
	    for (var i = 0; i < data.length; i++) {
	        var item = data[i];
	        contents.push(mapSuccessfulResponseToContent(item));
	    }
	    return contents;
	};

	var mapSuccessfulResponseToContentViewList = function(data) {
	    return data;
	};

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
	    return new WebPage(
	        data.webPageId,
	        data.url,
	        data.name,
	        data.group,
	        data.site,
	        data.revisionId,
	        data.deliveryRevisionId,
	        data.templateId,
	        data.templateRevision,
	        data.variablesArea,
	        transformAreas(data.contentAreas));
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

	var mapSuccessfulResponseToTaxAgg = function(data) {
	    return data;
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	
	// var promise = require('es6-promise');
	var axios = __webpack_require__(5);
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

	    postItem: function(fullUrl, params, header) {

	        var config = {
	            headers: header
	        };

	        return new Promise(function(resolve, reject) {
	            axios.post(fullUrl, params, config)
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(6);

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var defaults = __webpack_require__(7);
	var utils = __webpack_require__(8);
	var dispatchRequest = __webpack_require__(9);
	var InterceptorManager = __webpack_require__(17);

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
	axios.spread = __webpack_require__(18);

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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(8);

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
/* 8 */
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
/* 9 */
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
	        __webpack_require__(11)(resolve, reject, config);
	      }
	      // For node use HTTP adapter
	      else if (typeof process !== 'undefined') {
	        __webpack_require__(11)(resolve, reject, config);
	      }
	    } catch (e) {
	      reject(e);
	    }
	  });
	};


	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)))

/***/ },
/* 10 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
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
	    var timeout = runTimeout(cleanUpNextTick);
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
	    runClearTimeout(timeout);
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
	        runTimeout(drainQueue);
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
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/*global ActiveXObject:true*/

	var defaults = __webpack_require__(7);
	var utils = __webpack_require__(8);
	var buildUrl = __webpack_require__(12);
	var parseHeaders = __webpack_require__(13);
	var transformData = __webpack_require__(14);

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
	    var cookies = __webpack_require__(15);
	    var urlIsSameOrigin = __webpack_require__(16);

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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(8);

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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(8);

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
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(8);

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
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * WARNING:
	 *  This file makes references to objects that aren't safe in all environments.
	 *  Please see lib/utils.isStandardBrowserEnv before including this file.
	 */

	var utils = __webpack_require__(8);

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
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * WARNING:
	 *  This file makes references to objects that aren't safe in all environments.
	 *  Please see lib/utils.isStandardBrowserEnv before including this file.
	 */

	var utils = __webpack_require__(8);
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
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(8);

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
/* 18 */
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