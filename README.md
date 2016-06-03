# Contentchef JS client

### What

An SDK for ContentChef. Provides easy usage of ContentChef REST API via JS methods.

### Why

So that JavaScript developers who use ContentChef CMS have an easier way of communicating with it (instead of manually sending raw HTTP requests and worrying about stuff like headers, format of the request body etc.).

### How

SDK needs to be initialized with following parameters:
- URL of the ContentChef Delivery microservice  
- space ID  
- delivery ID  
- API token [optional]  
- API cache [optional]  
- cache TTL [optional]  
    
Here's a list of supported methods:


    lookupContentByRevision: function(contentId, contentRevision)

    lookupContentLatestRevision: function(contentId)

    lookupContentBySlug: function(contentSlug, contentRevision)

    lookupContentLatestRevisionBySlug: function(contentSlug)

    listContentsByTag: function(tag)

    listContentsByTagAndDefinition: function(tag, definitionId)

    listContentsByDefinition: function(definitionId) 

    listContentsByDefinitionFromTo: function(definitionId, from, to) 

    listUnpublishedContentsByDefinition: function(definitionId, apiKeyForUnpublishedContent) 

    listContentsByListOfContentIds: function(listOfContentIds) 

    lookupWebPagesSitemapByUrl: function(baseURL, site)

    lookupPageById: function(site, pageId) 

    lookupPageByUrl: function(site, pageUrl) 

    storeQuery: function(params) 
        
    createRelease: function(params)

    addToRelease: function(params) 

    stageRelease: function(params) 

    publishStagedRelease: function(params)

    searchContent: function(queryName, queryParam)

    searchContentFromTo: function(queryName, from, to, queryParam)

    getAvailablePages: function()

    processTaxonomies: function()

    searchByTaxonomy: function(taxonomyId, facets) 

    getTaxonomyAggregation: function(taxonomyId)
