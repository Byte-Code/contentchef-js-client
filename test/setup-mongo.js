
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

var unpublishedContent = { 
    "_id" : new ObjectID.createFromHexString("56b891d78a456d13026afc1c"),
  "definitionInformation" : {
    "definitionId" : "definition1", 
    "definitionRevisionId" : "56a760163a1fde89024a7d98"
  }, 
  "tags" : [
  ""
  ], 
  "content" : {
    "foo" : "bar"
  }, 
  "originId" : "leroymerlin", 
  "itemId" : "content1", 
  "itemType" : "content", 
  "releaseId" : "unpublishedReleaseOnDelivery", 
  "published" : false
}

var publishedContent = { 
    "_id" : new ObjectID.createFromHexString("56b891d78a456d13026afc1d"),
  "definitionInformation" : {
    "definitionId" : "definition1", 
    "definitionRevisionId" : "56a760163a1fde89024a7d99"
  }, 
  "tags" : [
  ""
  ], 
  "content" : {
    "foo" : "bar",
    "slug" : "slug2"
  }, 
  "originId" : "leroymerlin", 
  "itemId" : "content2", 
  "itemType" : "content", 
  "releaseId" : "publishedReleaseOnDelivery", 
  "published" : true
}

var unpublishedWebPage = { 
    "_id" : new ObjectID.createFromHexString("56b891d78a456d13026afc2c"),
  "originId" : "leroymerlin", 
  "itemId" : "webPage1", 
  "itemType" : "webPage", 
  "releaseId" : "unpublishedReleaseOnDelivery", 
  "published" : false,
  "webPageName" : "webPage", 
  "webPageUrl" : "webPage1Url", 
  "webPageTemplateId" : "templateId", 
  "webPageTemplateRevision" : "latest", 
  "webPageGroup" : "group1", 
  "variablesArea" : {}, 
  "contentAreas" : [
  {
    "areaName" : "area1", 
    "areaDescription" : "area1", 
    "areaType" : "reflinked",
    "contents" : [
    {
      "contentId" : "contentFromRelease", 
      "#originId" : "leroymerlin", 
      "contentDefinitionId" : "definition1", 
      "#definitionId" : "reflinked", 
      "#definitionRevision" : "56a760163a1fde89024a7d99", 
      "#definitionOrigin" : "leroymerlin"
    }
    ]
  }
  ]
}

var publishedWebPage = { 
    "_id" : new ObjectID.createFromHexString("56b891d78a456d13026afc2d"),
  "originId" : "leroymerlin", 
  "itemId" : "webPage2", 
  "itemType" : "webPage", 
  "releaseId" : "publishedReleaseOnDelivery", 
  "published" : true,
  "webPageName" : "webPage", 
  "webPageUrl" : "webPage2Url", 
  "webPageTemplateId" : "templateId", 
  "webPageTemplateRevision" : "latest", 
  "webPageGroup" : "group1", 
  "variablesArea" : {}, 
  "contentAreas" : [
  {
    "areaName" : "area1", 
    "areaDescription" : "area1", 
    "areaType" : "reflinked",
    "contents" : [
    {
      "contentId" : "contentFromRelease", 
      "#originId" : "leroymerlin", 
      "contentDefinitionId" : "definition1", 
      "#definitionId" : "reflinked", 
      "#definitionRevision" : "56a760163a1fde89024a7d99", 
      "#definitionOrigin" : "leroymerlin"
    }
    ]
  }
  ]
}

var query = {
  "find" : "{\"originId\" : \"leroymerlin\"}",
  "queryName" : "query1"
}

MongoClient.connect("mongodb://localhost:27017/clientApiTest-delivery", function(err, db) {
  if(err) { return console.dir(err); }

  db.dropDatabase();

  var queries = db.collection('query', function(err, collection) {});
  var deliveryItems = db.collection('deliveryItem', function(err, collection) {});
  var releases = db.collection('release', function(err, collection) {});

  queries.insert(query);
  deliveryItems.insert(unpublishedContent);
  deliveryItems.insert(publishedContent);
  deliveryItems.insert(unpublishedWebPage);
  deliveryItems.insert(publishedWebPage);

  db.close();

});


