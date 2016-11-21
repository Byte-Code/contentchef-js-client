
var cc = require('./../src/api');
var api = cc.ContentChef.Api("http://localhost:9002", "sdk_test_space", "dev", "apiTokenWhatever", "apiCacheWhatever", 10, "");

var chai = require("chai");
chai.use(require("chai-as-promised"));

var siteMap = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">      <url>          <loc>baseUrl/webPage1Url</loc>        </url>      </urlset>';

var webPage = {
  "webPageId" : "webPage1", 
  "name" : "webPage", 
  "revisionId": "56b891d78a456d13026afc2d",
  "deliveryRevisionId": "56b891d78a456d13026afc2d",
  "url" : "webPage1Url", 
  "site" : "site1", 
  "templateId" : "templateId", 
  "templateRevision" : "latest", 
  "group" : "group1", 
  "variablesArea" : {

  }, 
  "contentAreas" : {
    "area1" : [
    {
      "contentId" : "contentFromRelease", 
      "#repository" : "d2t", 
      "#status" : "not_resolved", 
      "contentDefinitionId" : "definition1", 
      "#definitionId" : "reflinked", 
      "#definitionRevision" : "56a760163a1fde89024a7d99", 
      "#definitionRepository" : "d2t"
    }
    ]
  }
};

describe("Lookup web pages sitemap by URL", function() {

  var promise;

  promise = api.lookupWebPagesSitemapByUrl("baseUrl/", "site1");

  it("should return proper result", function(){
    return chai.expect(promise).to.eventually.become(siteMap);
  });

});

describe("Lookup page by ID", function() {

  var promise;

  promise = api.lookupPageById("site1", "webPage1");

  it("should return proper result", function(){
    return chai.expect(promise).to.eventually.become(webPage);
  });

});

describe("Lookup page by URL", function() {

  var promise;

  promise = api.lookupPageByUrl("site1", "webPage1Url");

  it("should return proper result", function(){
    return chai.expect(promise).to.eventually.become(webPage);
  });

});





