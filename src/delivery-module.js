
var http = require('./http-module');
var url = "";

module.exports = {

    setUrl: function(newUrl) {
        url = newUrl;
    },

    lookupContentByRevision: function(spaceId, deliveryId, contentId, contentRevision) {
        var theFullUrl = url + '/' + encodeURIComponent(spaceId) + '/' + encodeURIComponent(deliveryId) + '/getContent/' + encodeURIComponent(contentId) + '/' + encodeURIComponent(contentRevision);

        return http.getItem(theFullUrl, this.apiToken, mapSuccessfulResponseToContent);
    },

    lookupContentLatestRevision: function(spaceId, deliveryId, contentId) {
        var theFullUrl = url + '/' + encodeURIComponent(spaceId) + '/' + encodeURIComponent(deliveryId) + '/getLatestContent/' + encodeURIComponent(contentId);

        return http.getItem(theFullUrl, this.apiToken, mapSuccessfulResponseToContent);
    },

    lookupContentBySlug: function(spaceId, deliveryId, contentSlug, contentRevision) {
        var theFullUrl = url + '/' + encodeURIComponent(spaceId) + '/' + encodeURIComponent(deliveryId) + '/getContentBySlug/' + encodeURIComponent(contentSlug) + '/' + encodeURIComponent(contentRevision);

        return http.getItem(theFullUrl, this.apiToken, mapSuccessfulResponseToContent);
    },

    lookupContentLatestRevisionBySlug: function(spaceId, deliveryId, contentSlug) {
        var theFullUrl = url + '/' + encodeURIComponent(spaceId) + '/' + encodeURIComponent(deliveryId) + '/getLatestContentBySlug/' + encodeURIComponent(contentSlug);

        return http.getItem(theFullUrl, this.apiToken, mapSuccessfulResponseToContent);
    },

    listContentsByTag: function(spaceId, deliveryId, tag) {
        var theFullUrl = url + '/' + encodeURIComponent(spaceId) + '/' + encodeURIComponent(deliveryId) + '/listContentsByTag/' + encodeURIComponent(tag) ;

        return http.getItem(theFullUrl, this.apiToken, mapSuccessfulResponseToContentList);
    },

    listContentsByTagAndDefinition: function(spaceId, deliveryId, tag, definitionId) {
        var theFullUrl = url + '/' + encodeURIComponent(spaceId) + '/' + encodeURIComponent(deliveryId) + '/listContentsByTagAndDefinition/' + encodeURIComponent(tag) + '/' + encodeURIComponent(definitionId) ;

        return http.getItem(theFullUrl, this.apiToken, mapSuccessfulResponseToContentList);
    },

    listContentsByDefinition: function(spaceId, deliveryId, definitionId) {
        var theFullUrl = url + '/' + encodeURIComponent(spaceId) + '/' + encodeURIComponent(deliveryId) + '/listContentsByDefinitionId/' + encodeURIComponent(definitionId) ;

        return http.getItem(theFullUrl, this.apiToken, mapSuccessfulResponseToContentList);
    },

    listContentsByDefinitionFromTo: function(spaceId, deliveryId, definitionId, from, to) {
        var theFullUrl = url + '/' + encodeURIComponent(spaceId) + '/' + encodeURIComponent(deliveryId) + '/listContentsByDefinitionId/' + encodeURIComponent(definitionId) + '/' + encodeURIComponent(from) + '/' + encodeURIComponent(to) ;

        return http.getItem(theFullUrl, this.apiToken, mapSuccessfulResponseToContentList);
    },

    listUnpublishedContentsByDefinition: function(spaceId, deliveryId, definitionId, apiKey) {
        var theFullUrl = url + '/' + encodeURIComponent(spaceId) + '/' + encodeURIComponent(deliveryId) + '/listUnpublishedContentsByDefinitionId/' + encodeURIComponent(definitionId) ;

        return http.getProtectedItem(theFullUrl, this.apiToken, apiKey, mapSuccessfulResponseToContentList, apiKey);
    },

    lookupWebPagesSitemapByUrl: function(spaceId, deliveryId, baseURL, site) {
        var theFullUrl = url + '/' + encodeURIComponent(spaceId) + '/' + encodeURIComponent(deliveryId) + '/getWebpagesSitemap/' + encodeURIComponent(baseURL) + '/' + encodeURIComponent(site);

        return http.getItem(theFullUrl, this.apiToken, mapSuccessfulResponseToSiteMap);
    },

    lookupPageById : function(spaceId, deliveryId, pageId, site) {
        var theFullUrl = url + '/' + encodeURIComponent(spaceId) + '/' + encodeURIComponent(deliveryId) + '/getWebPageById/' + encodeURIComponent(site)  + '/' + encodeURIComponent(pageId);

        return http.getItem(theFullUrl, this.apiToken, mapSuccessfulResponseToWebPage);
    },

    lookupPageByUrl : function(spaceId, deliveryId, pageUrl, site) {
        var theFullUrl = url + '/' + encodeURIComponent(spaceId) + '/' + encodeURIComponent(deliveryId) + '/getWebPageByUrl/' + encodeURIComponent(site)  + '/' + encodeURIComponent(pageUrl);

        return http.getItem(theFullUrl, this.apiToken, mapSuccessfulResponseToWebPage);
    },

    storeQuery: function(spaceId, deliveryId, params) {
        var theFullUrl = url + '/' + encodeURIComponent(spaceId) + '/' + encodeURIComponent(deliveryId)  + '/storeQuery';

        return http.postItem(theFullUrl, this.apiToken, params);
    },

    createRelease: function(spaceId, deliveryId, params) {
        var theFullUrl = url + '/' + encodeURIComponent(spaceId) + '/' + encodeURIComponent(deliveryId)  + '/createRelease';

        return http.postItem(theFullUrl, this.apiToken, params);
    },

    addToRelease: function(spaceId, deliveryId, params) {
        var theFullUrl = url + '/' + encodeURIComponent(spaceId) + '/' + encodeURIComponent(deliveryId)  + '/addToRelease';

        return http.postItem(theFullUrl, this.apiToken, params);
    },

    stageRelease: function(spaceId, deliveryId, params) {
        var theFullUrl = url + '/' + encodeURIComponent(spaceId) + '/' + encodeURIComponent(deliveryId)  + '/stageRelease';

        return http.postItem(theFullUrl, this.apiToken, params);
    },

    publishStagedRelease: function(spaceId, deliveryId, params) {
        var theFullUrl = url + '/' + encodeURIComponent(spaceId) + '/' + encodeURIComponent(deliveryId)  + '/publishStagedRelease';

        return http.postItem(theFullUrl, this.apiToken, params);
    },

    searchContent: function(spaceId, deliveryId, queryName, queryParam) {

        var theFullUrl = url + '/' + encodeURIComponent(spaceId) + '/' + encodeURIComponent(deliveryId) + '/searchContent/' + encodeURIComponent(queryName) ;

        if (queryParam) {
            theFullUrl = theFullUrl + '?queryParam' + encodeURIComponent(queryParam);
        }

        return http.getItem(theFullUrl, this.apiToken, mapSuccessfulResponseToContentList);
    },

    getAvailablePages: function(spaceId, deliveryId) {

        var theFullUrl = url + '/' + encodeURIComponent(spaceId) + '/' + encodeURIComponent(deliveryId) + '/getAvailablePages';

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
    return data;
};
