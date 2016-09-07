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

    lookupContentLatestRevisionBySlugAndDefinition(contentSlug, contentDefinition)

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

### Tests
 
1) add the following space resolving parameter to your env vars (this is needed only once per machine):

```
export STATIC_MONGODB_DELIVERY_RES_STRATEGY="true"
export STATIC_MONGODB_DELIVERY_SPACES_MAP="sdk_test_space@dev=mongodb://localhost:27017/delivery_functional_test_db"
```
2) run `node setup-mongo.js` to prepare the test data. 

3) run ContentChef Delivery microservice on port 9002 using `activator "run 9002"` command

4) run `grunt test` command to initiate the SDK tests

Note that tests will be run on a temporary database called "delivery_functional_test_db" which will be removed once tests are finished.
