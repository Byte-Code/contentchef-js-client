# ContentChef JavaScript SDK

### What

An SDK for ContentChef CMS (Delivery microservice only). Provides easy usage of ContentChef REST API via JS methods.

### Why

So that JavaScript developers who use ContentChef CMS have an easier way of communicating with it (instead of manually sending raw HTTP requests and worrying about stuff like headers, format of the request body etc.).

### How

SDK needs to be initialized with following parameters:
- URL of the ContentChef Delivery microservice  
- space ID  
- delivery ID  
- API token [optional]  
- API cache [optional, not used for now]  
- cache time-to-live [optional]  

Example:

    var cc = require('./../contentchef-js-client.js');
    cc.ContentChef.Api("http://contentchef-delivery-url.com", "john-smith-space", "mobile-platform-delivery", "api-token", "api-cache", 10);

Here's a list of supported methods:


    lookupContentByRevision(contentId, contentRevision)

    lookupContentLatestRevision(contentId)

    lookupContentBySlug(contentSlug, contentRevision)

    lookupContentLatestRevisionBySlug(contentSlug)

    listContentsByTag(tag)

    listContentsByTagAndDefinition(tag, definitionId)

    listContentsByDefinition(definitionId) 

    listContentsByDefinitionFromTo(definitionId, from, to) 

    listUnpublishedContentsByDefinition(definitionId, apiKeyForUnpublishedContent) 

    listContentsByListOfContentIds(listOfContentIds) 

    lookupWebPagesSitemapByUrl(baseURL, site)

    lookupPageById(site, pageId) 

    lookupPageByUrl(site, pageUrl) 

    storeQuery(params) 
        
    createRelease(params)

    addToRelease(params) 

    stageRelease(params) 

    publishStagedRelease(params)

    searchContent(queryName, queryParam)

    searchContentFromTo(queryName, from, to, queryParam)

    getAvailablePages()

    processTaxonomies()

    searchByTaxonomy(taxonomyId, facets) 

    getTaxonomyAggregation(taxonomyId)
