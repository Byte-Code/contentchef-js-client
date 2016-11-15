
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

var unpublishedContent = { 
  "_id" : new ObjectID.createFromHexString("56b891d78a456d13026afc1c"),
  "revisionId" : "56b891d78a456d13026afc1c",
  "definitionInformation" : {
    "definitionId" : "definition1", 
    "definitionRevisionId" : "56a760163a1fde89024a7d98"
  }, 
  "tags" : [
  "tag1"
  ], 
  "content" : {
    "foo" : "bar"
  }, 
  "repository" : "d2t", 
  "contentId" : "content1", 
  "itemType" : "content", 
  "releaseId" : "unpublishedReleaseOnDelivery", 
  "published" : false
};

var publishedContent2 = { 
  "_id" : new ObjectID.createFromHexString("56b891d78a456d13026afc1d"),
  "revisionId" : "56b891d78a456d13026afc1d",
  "definitionInformation" : {
    "definitionId" : "definition1", 
    "definitionRevisionId" : "56a760163a1fde89024a7d99"
  }, 
  "tags" : [
  "tag1"
  ], 
  "content" : {
    "foo" : "bar",
    "slug" : "slug2"
  },
  "taxonomy": {
    "id" : "taxonomy1" ,
    "matchCriteria" : [{
      "definition" : "definition1",
      "filters" :[{
        "key" : "foo",
        "value" : "bar"
      }]
    }], "facets" : [{
      "id" : "slug",
      "fields" : ["slug"],
      "labelFields" : ["slug"]
    }]
  },
  "repository" : "d2t", 
  "contentId" : "content2", 
  "itemType" : "content", 
  "releaseId" : "publishedReleaseOnDelivery", 
  "published" : true,
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
  }]
};

var publishedContent3 = { 
  "_id" : new ObjectID.createFromHexString("46b891d78a456d13026afc1e"),
  "revisionId" : "46b891d78a456d13026afc1e",
  "definitionInformation" : {
    "definitionId" : "definition1", 
    "definitionRevisionId" : "56a760163a1fde89024a7d99"
  }, 
  "tags" : [
  "tag1"
  ], 
  "content" : {
    "foo" : "bar",
    "slug" : "slug2"
  }, 
  "repository" : "d2t", 
  "contentId" : "content3", 
  "itemType" : "content", 
  "releaseId" : "publishedReleaseOnDelivery", 
  "published" : true,
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
  }]
};

var publishedWebPage = { 
  "_id" : new ObjectID.createFromHexString("56b891d78a456d13026afc2d"),
  "revisionId" : "56b891d78a456d13026afc2d",
  "webPageId" : "webPage1", 
  "itemType" : "webPage", 
  "releaseId" : "publishedReleaseOnDelivery", 
  "published" : true,
  "name" : "webPage", 
  "url" : "webPage1Url", 
  "site" : "site1", 
  "templateId" : "templateId", 
  "templateRevision" : "latest", 
  "group" : "group1", 
  "variablesArea" : {}, 
  "contentAreas" : [
  {
    "areaName" : "area1", 
    "areaDescription" : "area1", 
    "areaType" : "reflinked",
    "contents" : [
    {
      "contentId" : "contentFromRelease", 
      "#repository" : "d2t", 
      "contentDefinitionId" : "definition1", 
      "#definitionId" : "reflinked", 
      "#definitionRevision" : "56a760163a1fde89024a7d99", 
      "#definitionRepository" : "d2t"
    }
    ]
  }
  ]
};

var aggregation = { 
  "id" : "taxonomy1", 
  "facets" : [
  {
    "key" : "foo", 
    "keyLabel" : "Foo", 
    "values" : [
    ]
  }
  ]
}

var query = {
  "find" : "{\"repository\" : \"sdk_test_space\"}",
  "queryName" : "query1"
};

var query2 = {
  "find" : "{\"repository\" : \"$QUERY\"}",
  "queryName" : "query2"
};

MongoClient.connect("mongodb://localhost:27017/delivery_functional_test_db", function(err, db) {
  if(err) { return console.dir(err); }

  db.dropDatabase();

  var queries = db.collection('query', function(err, collection) {});
  var deliveryItems = db.collection('deliveryItem', function(err, collection) {});
  var releases = db.collection('release', function(err, collection) {});
  var taxonomyAggregations = db.collection('taxonomyAggregation', function(err, collection) {});

  queries.insert(query);
  queries.insert(query2);
  deliveryItems.insert(unpublishedContent);
  deliveryItems.insert(publishedContent2);
  deliveryItems.insert(publishedContent3);
  taxonomyAggregations.insert(aggregation);
  deliveryItems.insert(publishedWebPage);

  db.close();

});


