
'use strict';

var http = require('./http-module');
var url = "";
var header = {};

function appendViewDate(viewDate) {
    return appendQueryParam('viewDate', viewDate);
}

function appendQueryParam (queryParamName, queryParam) {
    var queryParams = {};
    queryParams[queryParamName] = queryParam;
    return handleQueryParams(queryParams);
}

function handleQueryParams(queryParams) {
    var params = '';
    var queryKeys = Object.keys(queryParams);
    queryKeys
        .filter(isValidParam(queryParams))
        .forEach(function (queryParamName) {
            var isFirst = params.length === 0;
            var separator = isFirst ? '?' : '&';

            params += handleQueryParam(queryParamName, queryParams[queryParamName], separator)
        });
    return params;
}

function handleQueryParam(queryParamName, queryParam, separator) {
    return separator + queryParamName + '=' + encodeURIComponent(queryParam);
}

function isValidParam(queryParams){
    return function(param){
        var valueToTest = queryParams[param];
        var isDefined = typeof valueToTest !== 'undefined' && !Array.isArray(valueToTest);
        if (!isDefined) {
            return Array.isArray(valueToTest) && valueToTest.length > 0 ;
        }
        return isDefined;
    }
}


module.exports = {

    setUrl: function(newUrl) {
        url = newUrl;
    },

    setApiToken: function(apiToken) {
        header = {"x-square-api-key" : apiToken};
    },

    lookupContentByRevision: function(spaceId, deliveryId, contentId, contentRevision, viewDate) {
        var theFullUrl = url + '/' + encodeURIComponent(spaceId) +
          '/' + encodeURIComponent(deliveryId) +
          '/getContent/' + encodeURIComponent(contentId) +
          '/' + encodeURIComponent(contentRevision) +
          appendViewDate(viewDate);

        return http.getItem(theFullUrl, mapSuccessfulResponseToContent, header);
    },

    lookupContentLatestRevision: function(spaceId, deliveryId, contentId, viewDate) {
        var theFullUrl = url + '/' + encodeURIComponent(spaceId) +
          '/' + encodeURIComponent(deliveryId) +
          '/getLatestContent/' + encodeURIComponent(contentId) +
          appendViewDate(viewDate);
        return http.getItem(theFullUrl, mapSuccessfulResponseToContent, header);
    },

    lookupContentBySlug: function(spaceId, deliveryId, contentSlug, contentRevision) {
        var theFullUrl = url + '/' + encodeURIComponent(spaceId) + '/' + encodeURIComponent(deliveryId) + '/getContentBySlug/' + encodeURIComponent(contentSlug) + '/' + encodeURIComponent(contentRevision);

        return http.getItem(theFullUrl, mapSuccessfulResponseToContent, header);
    },

    lookupContentLatestRevisionBySlug: function(spaceId, deliveryId, contentSlug, viewDate) {
        var theFullUrl = url + '/' + encodeURIComponent(spaceId) +
          '/' + encodeURIComponent(deliveryId) +
          '/getLatestContentBySlug/' + encodeURIComponent(contentSlug) +
          appendViewDate(viewDate);
        return http.getItem(theFullUrl, mapSuccessfulResponseToContent, header);
    },

    lookupContentLatestRevisionBySlugAndDefinition: function(spaceId, deliveryId, contentSlug, contentDefinition, viewDate) {
        var theFullUrl = url + '/' + encodeURIComponent(spaceId) +
          '/' + encodeURIComponent(deliveryId) +
          '/getLatestContentBySlugAndDefinition/' + encodeURIComponent(contentSlug) +
          "/" + encodeURIComponent(contentDefinition) +
          appendViewDate(viewDate);
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

    listContentsByDefinition: function(spaceId, deliveryId, definitionId, viewDate) {
        var theFullUrl = url + '/' + encodeURIComponent(spaceId) +
          '/' + encodeURIComponent(deliveryId) +
          '/listContentsByDefinitionId/' + encodeURIComponent(definitionId) +
          appendViewDate(viewDate);

        return http.getItem(theFullUrl, mapSuccessfulResponseToContentList, header);
    },

    listContentsByDefinitionFromTo: function(spaceId, deliveryId, definitionId, from, to) {
        var theFullUrl = url + '/' + encodeURIComponent(spaceId) + '/' + encodeURIComponent(deliveryId) + '/listContentsByDefinitionId/' + encodeURIComponent(definitionId) + '/' + encodeURIComponent(from) + '/' + encodeURIComponent(to) ;

        return http.getItem(theFullUrl, mapSuccessfulResponseToContentList, header);
    },

    listContentsByListOfContentIds: function(spaceId, deliveryId, listOfContentIds, viewDate) {
        var theFullUrl = url + '/' + encodeURIComponent(spaceId) +
          '/' + encodeURIComponent(deliveryId) +
          '/listContentsByListOfContentIds/' + encodeURIComponent(listOfContentIds) +
          appendViewDate(viewDate);
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

    lookupPageByUrl : function(spaceId, deliveryId, pageUrl, site , viewDate) {
        var theFullUrl = url + '/' + encodeURIComponent(spaceId) +
            '/' + encodeURIComponent(deliveryId) +
            '/getWebPageByUrl/' + encodeURIComponent(pageUrl)  +
            '/' + encodeURIComponent(site) +
            appendViewDate(viewDate);

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

    searchContent: function(spaceId, deliveryId, queryName, queryParam, viewDate) {
        var queryParams = {queryParam: queryParam, viewDate: viewDate};
        var theFullUrl = url + '/' + encodeURIComponent(spaceId) +
            '/' + encodeURIComponent(deliveryId) +
            '/searchContent/' + encodeURIComponent(queryName) +
            handleQueryParams(queryParams);

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

    searchByTaxonomy: function(spaceId, deliveryId, taxonomyId, facets, viewDate) {
        var theFullUrl = url +
        '/' + encodeURIComponent(spaceId) +
        '/' + encodeURIComponent(deliveryId) +
        '/searchByTaxonomy/' + encodeURIComponent(taxonomyId) +
        handleQueryParams({facets:facets, viewDate:viewDate});

        return http.getItem(theFullUrl, mapSuccessfulResponseToContentViewList, header);
    },

    searchByTaxonomyByKeyValue: function(spaceId, deliveryId, taxonomyId, keyValueObj) {
        var theFullUrl = url +
        '/' + encodeURIComponent(spaceId) +
        '/' + encodeURIComponent(deliveryId) +
        '/searchByTaxonomyByKeyValue' +
        '/' + encodeURIComponent(taxonomyId);
        if (typeof keyValueObj !== 'undefined') {
            var facetsString = "";
            for (var k in keyValueObj){
                if (keyValueObj.hasOwnProperty(k)) {
                   facetsString += encodeURIComponent(k) + "=" + encodeURIComponent(keyValueObj[k]) + "&";
               }
           }
           facetsString = facetsString.slice(0, -1);
           theFullUrl = theFullUrl + '?' + facetsString;
       }
       return http.getItem(theFullUrl, mapSuccessfulResponseToContentViewList, header);
   },

    searchByTaxonomyQuery: function(spaceId, deliveryId, taxonomyId, query) {
        var theFullUrl = url +
            '/' + encodeURIComponent(spaceId) +
            '/' + encodeURIComponent(deliveryId) +
            '/searchByTaxonomyByKeyValue' +
            '/' + encodeURIComponent(taxonomyId);
        if (typeof query !== 'undefined' && query.length > 0) {
            theFullUrl = theFullUrl + '?' + query;
        }
        return http.getItem(theFullUrl, mapSuccessfulResponseToContentViewList, header);
    }


};

function Content(contentId, revisionId, deliveryRevisionId, definitionInfo, tags, content, taxonomy, size, linkingContents) {
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
    if (typeof(linkingContents) !== 'undefined') {
        this.linkingContents = linkingContents;
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
        data.linkingContents);
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
        areas[areaName] = contents.length == 1? [contents[0]] : contentArea.contents;
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
