
var cc = require('./../src/api');
var api = cc.ContentChef.Api("http://localhost:9002", "d2t", "dev", "apiTokenWhatever");

var chai = require("chai");
chai.use(require("chai-as-promised"));

var content = {
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
    return chai.expect(promise).to.eventually.become([content]);
  });

});

describe("List contents by tag and definition", function() {

  var promise;

  beforeEach(function(){
    promise = api.listContentsByTagAndDefinition("tag1", "definition1");
  });

  it("should return proper result", function(){
    return chai.expect(promise).to.eventually.become([content]);
  });

});

describe("List contents by definition", function() {

  var promise;

  beforeEach(function(){
    promise = api.listContentsByDefinition("definition1");
  });

  it("should return proper result", function(){
    return chai.expect(promise).to.eventually.become([content]);
  });

});

describe("List contents by definition and from-to", function() {

  var promise;

  beforeEach(function(){
    promise = api.listContentsByDefinitionFromTo("definition1", 0, 1);
  });

  it("should return proper result", function(){
    return chai.expect(promise).to.eventually.become([content]);
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





