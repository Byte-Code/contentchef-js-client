
var cc = require('./../src/api');
var api = cc.ContentChef.Api("http://localhost:9002", "sdk_test_space", "dev", "apiTokenWhatever", "apiCacheWhatever", 10, "");

var chai = require("chai");
chai.use(require("chai-as-promised"));

var siteMap = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">      <url>          <loc>webPage2UrlwebPage1Url</loc>        </url><url>          <loc>webPage2UrlwebPage2Url</loc>        </url>      </urlset>';

var webPage = {
  "webPageId" : "webPage2", 
  "name" : "webPage", 
  "revisionId": "56b891d78a456d13026afc2d",
  "deliveryRevisionId": "56b891d78a456d13026afc2d",
  "url" : "webPage2Url", 
  "site" : "site1", 
  "templateId" : "templateId", 
  "templateRevision" : "latest", 
  "group" : "group1", 
  "variablesArea" : {

  }, 
  "contentAreas" : [
  {
    "areaName" : "area1", 
    "areaDescription" : "area1", 
    "areaType" : "reflinked", 
    "contents" : [
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
  ]
};

describe("Lookup web pages sitemap by URL", function() {

  var promise;

  beforeEach(function(){
    promise = api.lookupWebPagesSitemapByUrl("webPage2Url", "site1");
  });

  it("should return proper result", function(){
    return chai.expect(promise).to.eventually.become(siteMap);
  });

});

describe("Lookup page by ID", function() {

  var promise;

  beforeEach(function(){
    promise = api.lookupPageById("webPage2", "site1");
  });

  it("should return proper result", function(){
    return chai.expect(promise).to.eventually.become(webPage);
  });

});

describe("Lookup page by URL", function() {

  var promise;

  beforeEach(function(){
    promise = api.lookupPageByUrl("webPage2Url", "site1");
  });

  it("should return proper result", function(){
    return chai.expect(promise).to.eventually.become(webPage);
  });

});





