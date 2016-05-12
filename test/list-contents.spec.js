
var cc = require('./../src/api');
var api = cc.ContentChef.Api("http://localhost:9002", "d2t", "dev", "apiTokenWhatever", "apiCacheWhatever", 10, "");

var chai = require("chai");
chai.use(require("chai-as-promised"));

var content2 = {
  "content": {
    "foo": "bar",
    "slug": "slug2"
  },
  "contentId": "content2",
  "definitionInfo": {
    "definitionId": "definition1",
    "definitionRevisionId": "56a760163a1fde89024a7d99"
  },
  "facets" : ["taxonomy1_slug_slug2"],
  "revisionId": "56b891d78a456d13026afc1d",
  "tags": [
    "tag1"
  ]
};

var content3 = {
  "content": {
    "foo": "bar",
    "slug": "slug2"
  },
  "contentId": "content3",
  "definitionInfo": {
    "definitionId": "definition1",
    "definitionRevisionId": "56a760163a1fde89024a7d99"
  },
  "facets" : ["taxonomy1_slug_slug2"],
  "revisionId": "46b891d78a456d13026afc1e",
  "tags": [
    "tag1"
  ]
};

var unpublishedContent = { 
  "content": {
    "foo": "bar"
  },
  "contentId": "content1",
  "definitionInfo": {
    "definitionId": "definition1",
    "definitionRevisionId": "56a760163a1fde89024a7d98"
  },
  "revisionId": "56b891d78a456d13026afc1c",
  "tags": [
    "tag1"
  ]
};

describe("List contents by tag", function() {

  var promise;

  beforeEach(function(){
    promise = api.listContentsByTag("tag1");
  });

  it("should return proper result", function(){
    return chai.expect(promise).to.eventually.become([content2, content3]);
  });

});

describe("List contents by tag and definition", function() {

  var promise;

  beforeEach(function(){
    promise = api.listContentsByTagAndDefinition("tag1", "definition1");
  });

  it("should return proper result", function(){
    return chai.expect(promise).to.eventually.become([content2, content3]);
  });

});

describe("List contents by definition", function() {

  var promise;

  beforeEach(function(){
    promise = api.listContentsByDefinition("definition1");
  });

  it("should return proper result", function(){
    return chai.expect(promise).to.eventually.become([content2, content3]);
  });

});

describe("List contents by definition and from-to", function() {

  var promise;

  var contentWithSize = Object.create(content2);
  contentWithSize.size = 2;

  beforeEach(function(){
    promise = api.listContentsByDefinitionFromTo("definition1", 0, 1);
  });

  it("should return proper result", function(){
    return chai.expect(promise).to.eventually.become([contentWithSize]);
  });

});

describe("List contents by list of content IDs", function() {

  var promise;

  beforeEach(function(){
    promise = api.listContentsByListOfContentIds("content2,content3");
  });

  it("should return proper result", function(){
    return chai.expect(promise).to.eventually.become([content2,content3]);
  });

});

describe("List unpublished contents by contents and definition", function() {

  var promise;

  beforeEach(function(){
    promise = api.listUnpublishedContentsByDefinition("definition1", "someKey");
  });

  it("should return proper result", function(){
    return chai.expect(promise).to.eventually.include(unpublishedContent);
  });

});

describe("Search contents by taxonomy", function() {

  var promise;

  beforeEach(function(){
    promise = api.searchByTaxonomy("taxonomy1", "taxonomy1_slug_slug2");
  });

  var searchResult = {
    contentIds: ["content2", "content3"],
    facets: [
    {
      "key":"foo",
      "label":"Foo",
      "values":[]
    }
    ]
  };

  it("should return proper result", function(){
    return chai.expect(promise).to.eventually.become(searchResult);
  });

});





