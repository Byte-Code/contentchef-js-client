
var http = require('./http-module');
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
