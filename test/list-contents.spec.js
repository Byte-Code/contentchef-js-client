
'use strict';

var cc = require('./../src/api');
var api = cc.ContentChef.Api("http://localhost:9002", "sdk_test_space", "dev", "apiTokenWhatever", "apiCacheWhatever", 10, "");

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
  "linkingContents" : [{
    "id": "taxonomy1",
    "contentId": "content2",
    "contentDefinition": "definition1",
    "facets" : [{
      "key":"slug",
      "value":"slug3",
      "normalizedValue":"taxonomy1_slug_slug3",
      "label":"slug",
      "valueLabel":"someLabel"}]
    }],
    "revisionId": "56b891d78a456d13026afc1d",
    "deliveryRevisionId": "56b891d78a456d13026afc1d",
    "tags": [
    "tag1"
    ],
    "taxonomy": {
      "id" : "taxonomy1" ,
      "matchCriteria" : [{
        "definition" : "definition1",
        "filters" : [{
          "key" : "foo",
          "value" : "bar"
        }]
      }], "facets" : [{
        "id" : "slug",
        "fields" : ["slug"],
        "labelFields" : ["slug"]
      }]
    },
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
    "linkingContents" : [{
      "id": "taxonomy1",
      "contentId": "content2",
      "contentDefinition": "definition1",
      "facets" : [{
        "key":"slug",
        "value":"slug2",
        "normalizedValue":"taxonomy1_slug_slug2",
        "label":"slug2",
        "valueLabel":"someLabel"
      }]
    }],
    "revisionId": "46b891d78a456d13026afc1e",
    "deliveryRevisionId": "46b891d78a456d13026afc1e",
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
    "deliveryRevisionId": "56b891d78a456d13026afc1c",
    "tags": [
    "tag1"
    ]
  };

  describe("List contents by tag", function() {

    var promise;

    promise = api.listContentsByTag("tag1");

    it("should contain content2", function(){
      return chai.expect(promise).to.eventually.include(content2);
    });

    it("should contain content3", function(){
      return chai.expect(promise).to.eventually.include(content3);
    });

  });

  describe("List contents by tag and definition", function() {

    var promise;

    promise = api.listContentsByTagAndDefinition("tag1", "definition1");

    it("should contain content2", function(){
      return chai.expect(promise).to.eventually.include(content2);
    });

    it("should contain content3", function(){
      return chai.expect(promise).to.eventually.include(content3);
    });

  });

  describe("List contents by definition", function() {

    var promise;

    promise = api.listContentsByDefinition("definition1");

    it("should contain content2", function(){
      return chai.expect(promise).to.eventually.include(content2);
    });

    it("should contain content3", function(){
      return chai.expect(promise).to.eventually.include(content3);
    });

  });

  describe("List contents by definition and from-to", function() {

    var promise;
    var promise2

    var contentWithSize2 = Object.assign({},content2);
    contentWithSize2.size = 2;

    var contentWithSize3 = Object.assign({},content3);
    contentWithSize3.size = 2;

    promise = api.listContentsByDefinitionFromTo("definition1", 0, 1);

    it("should contain content2", function(){
      return chai.expect(promise).to.eventually.include(contentWithSize2);
    });

    it("should contain content3", function(){
      return chai.expect(promise).to.eventually.include(contentWithSize3);
    });

    promise2 = api.listContentsByDefinitionFromTo("definition1", 0, 0);

    it("should contain content2", function(){
      return chai.expect(promise2).to.eventually.include(contentWithSize2);
    });

    it("should not contain content3", function(){
      return chai.expect(promise2).to.not.eventually.include(contentWithSize3);
    });

  });

  describe("List contents by list of content IDs", function() {

    var promise;

    promise = api.listContentsByListOfContentIds("content2,content3");

    it("should contain content2", function(){
      return chai.expect(promise).to.eventually.include(content2);
    });

    it("should contain content3", function(){
      return chai.expect(promise).to.eventually.include(content3);
    });

  });

  describe("List unpublished contents by contents and definition", function() {

    var promise;

    promise = api.listUnpublishedContentsByDefinition("definition1", "someKey");

    it("should return proper result", function(){
      return chai.expect(promise).to.eventually.include(unpublishedContent);
    });

  });

  describe("Search contents by taxonomy", function() {

    var promise;

    promise = api.searchByTaxonomy("taxonomy1", "taxonomy1_::_slug_::_slug2");

    var searchResult = {
      contents: [{"contentId":"content3"}],
      facets: [
      {
        "key":"foo",
        "keyLabel":"Foo",
        "values":[]
      }
      ],
      "contentId": "content2",
      "definitionId": "definition1"
    };

    it("should return proper result", function(){
      return chai.expect(promise).to.eventually.become(searchResult);
    });

  });

  describe("Search contents by taxonomy (key-value)", function() {

    var promise;

    promise = api.searchByTaxonomyByKeyValue("taxonomy1", { slug: "slug2" });

    var searchResult = {
      contents: [{"contentId":"content3"}],
      facets: [
      {
        "key":"foo",
        "keyLabel":"Foo",
        "values":[]
      }
      ],
      "contentId": "content2",
      "definitionId": "definition1"
    };

    it("should return proper result", function(){
      return chai.expect(promise).to.eventually.become(searchResult);
    });

  });





