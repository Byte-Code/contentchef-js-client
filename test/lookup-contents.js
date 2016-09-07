
var cc = require('./../src/api');
var api = cc.ContentChef.Api("http://localhost:9002", "sdk_test_space", "dev", "apiTokenWhatever", "apiCacheWhatever", 10, "");

var chai = require("chai");
chai.use(require("chai-as-promised"));

var contentJson = {
  "content": {
    "foo": "bar",
    "slug": "slug2"
  },
  "contentId": "content2",
  "definitionInfo": {
    "definitionId": "definition1",
    "definitionRevisionId": "56a760163a1fde89024a7d99"
  },
  "revisionId": "56b891d78a456d13026afc1d",
  "deliveryRevisionId": "56b891d78a456d13026afc1d",
  "tags": [
    "tag1"
  ],
  "facets": [
    "taxonomy1_slug_slug2"
  ]
};

describe("Lookup content by ID and revision", function() {

  var promise;

  beforeEach(function(){
    promise = api.lookupContentByRevision("content2", "56b891d78a456d13026afc1d");
  });

  it("should return proper result", function(){
    return chai.expect(promise).to.eventually.become(contentJson);
  });

});

describe("Lookup latest content by ID", function() {

  var promise;

  beforeEach(function(){
    promise = api.lookupContentLatestRevision("content2");
  });

  it("should return proper result", function(){
    return chai.expect(promise).to.eventually.become(contentJson);
  });

});

describe("Lookup content by slug and revision", function() {

  var promise;

  beforeEach(function(){
    promise = api.lookupContentBySlug("slug2", "56b891d78a456d13026afc1d");
  });

  it("should return proper result", function(){
    return chai.expect(promise).to.eventually.become(contentJson);
  });

});

describe("Lookup latest content by slug", function() {

  var promise;

  beforeEach(function(){
    promise = api.lookupContentLatestRevisionBySlug("slug2");
  });

  it("should return proper result", function(){
    return chai.expect(promise).to.eventually.become(contentJson);
  });

});



