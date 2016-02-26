
"use strict";

var http = require('./http-module')
var url = ""

module.exports = {


    setUrl: function(newUrl) {
        url = newUrl
    },

    lookupContentByRevision: function(deliveryId, contentId, contentRevision) {
        var theFullUrl = url + '/' + deliveryId + '/getContent/' + encodeURIComponent(contentId) + '/' + encodeURIComponent(contentRevision);

        return http.getItem(theFullUrl, this.apiToken, mapSuccessfulResponseToContent);
    },

    lookupContentLatestRevision: function(deliveryId, contentId) {
        var theFullUrl = url + '/' + deliveryId + '/getLatestContent/' + encodeURIComponent(contentId);

        return http.getItem(theFullUrl, this.apiToken, mapSuccessfulResponseToContent);
    },

    lookupContentBySlug: function(deliveryId, contentSlug, contentRevision) {
        var theFullUrl = url + '/' + deliveryId + '/getContentBySlug/' + encodeURIComponent(contentSlug) + '/' + encodeURIComponent(contentRevision);

        return http.getItem(theFullUrl, this.apiToken, mapSuccessfulResponseToContent);
    },

    lookupContentLatestRevisionBySlug: function(deliveryId, contentSlug) {
        var theFullUrl = url + '/' + deliveryId + '/getLatestContentBySlug/' + encodeURIComponent(contentSlug);

        return http.getItem(theFullUrl, this.apiToken, mapSuccessfulResponseToContent);
    },

    listAllContentByDefinition: function(deliveryId, definitionId) {
        var theFullUrl = url + '/' + deliveryId + '/listContentsByDefinitionId/' + encodeURIComponent(definitionId) ;

        return http.getItem(theFullUrl, this.apiToken, mapSuccessfulResponseToContentList);
    },

    listUnpublishedContentsByDefinition: function(deliveryId, definitionId, apiKey) {
        var theFullUrl = url + '/' + deliveryId + '/listUnpublishedContentsByDefinitionId/' + encodeURIComponent(definitionId) ;

        return http.getProtectedItem(theFullUrl, this.apiToken, apiKey, mapSuccessfulResponseToContentList, apiKey);
    },

    lookupWebPagesSitemapByUrl: function(deliveryId, baseURL, site) {
        var theFullUrl = url + '/' + deliveryId + '/getWebpagesSitemap/' + encodeURIComponent(baseURL) + '/' + encodeURIComponent(site);

        return http.getItem(theFullUrl, this.apiToken, mapSuccessfulResponseToSiteMap);
    },

    lookupPageById : function(deliveryId, pageId) {
        var theFullUrl = url + '/' + deliveryId + '/getWebPageById/' + encodeURIComponent(pageId);

        return http.getItem(theFullUrl, this.apiToken, mapSuccessfulResponseToWebPage);
    },

    lookupPageByUrl : function(deliveryId, pageUrl) {
        var theFullUrl = url + '/' + deliveryId + '/getWebPageByUrl/' + encodeURIComponent(pageUrl);

        return http.getItem(theFullUrl, this.apiToken, mapSuccessfulResponseToWebPage);
    },

    storeQuery: function(deliveryId, params) {
        var theFullUrl = url + '/' + deliveryId  + '/storeQuery';

        return http.postItem(theFullUrl, this.apiToken, params);
    },

    createRelease: function(deliveryId, spaceId, params) {
        var theFullUrl = url + '/' + deliveryId  + '/' + spaceId  + '/createRelease';

        return http.postItem(theFullUrl, this.apiToken, params);
    },

    addToRelease: function(deliveryId, params) {
        var theFullUrl = url + '/' + deliveryId  + '/addToRelease';

        return http.postItem(theFullUrl, this.apiToken, params);
    },

    stageRelease: function(deliveryId, params) {
        var theFullUrl = url + '/' + deliveryId  + '/stageRelease';

        return http.postItem(theFullUrl, this.apiToken, params);
    },

    publishStagedRelease: function(deliveryId, params) {
        var theFullUrl = url + '/' + deliveryId  + '/publishStagedRelease';

        return http.postItem(theFullUrl, this.apiToken, params);
    },

    searchContent: function(deliveryId, queryName, queryParam) {

        var theFullUrl = url + '/' + deliveryId + '/searchContent/' + encodeURIComponent(queryName) ;

        if (queryParam) {
            theFullUrl = theFullUrl + '?queryParam' + encodeURIComponent(queryParam);
        }

        return http.getItem(theFullUrl, this.apiToken, mapSuccessfulResponseToContentList);
    },

    getAvailablePages: function(deliveryId) {

        var theFullUrl = url + '/' + deliveryId + '/getAvailablePages';

        return http.getItem(theFullUrl, this.apiToken, mapSuccessfulResponseToWebPageList);
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
    return data
};
