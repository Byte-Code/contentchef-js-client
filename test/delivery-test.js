
var cc = require('./../src/api');
var api = cc.ContentChef.Api("http://localhost:9002", "");

var createSomeNewRelease = { 
    "releaseId" : "someNewRelease",
    "spaceId" : "leroymerlin",
    "expectedNumOfContents" : 1,
    "expectedNumOfWebPages" : 1
};

var addToSomeNewRelease = { 
    "releaseId" : "someNewRelease", 
    "contents" : [{
      "contentId" : "someNewContent",
      "revisionId" : "12b760163a1fde89024a7d98",
      "definitionInformation" : {
        "definitionId" : "definition1",
        "definitionRevisionId" : "56a760163a1fde89024a7d98"
      },
      "tags" : ["tag1"],
      "content" : { "a" : "b" }
    }],
    "webPages" : [{
      "releaseId" : "someNewRelease",
      "webPageId" : "someNewWebPage",
      "url" : "someNewWebPageURL",
      "name" : "someNewWebPageName",
      "revisionId" : "23b760163a1fde89024a7d98",
      "site" : "site1",
      "templateId": "",
      "templateRevision" : "",
      "variablesArea" : {},
      "group" : "",
      "contentAreas" : [{ 
	  	"areaName": "area1",
	  	"areaType": "areaType",
	  	"areaDescription": "areaDescription",
	  	"contents": [{
	    	"contentId": "content1",
	    	"contentDefinitionId": "contentDefinition1",
	    	"#repository": "repo1",
	    	"#definitionRepository": "repo1",
	    	"#definitionId" : "definitionId",
	    	"#definitionRevision" : "revision"
	  	}]
	  }]
    }]
};

var stageSomeNewRelease = { 
    "releaseId" : "someNewRelease"
};

var publishSomeNewRelease = { 
    "releaseId" : "someNewRelease"
};

console.log("Testing in progress...\n");

readPromise("lookupContentByRevision", api.lookupContentByRevision("leroymerlin", "prod", "content2", "56b891d78a456d13026afc1d"));
readPromise("lookupContentLatestRevision", api.lookupContentLatestRevision("leroymerlin", "prod", "content2"));
readPromise("lookupContentBySlug", api.lookupContentBySlug("leroymerlin", "prod", "slug2", "56b891d78a456d13026afc1d"));
readPromise("lookupContentLatestRevisionBySlug", api.lookupContentLatestRevisionBySlug("leroymerlin", "prod", "slug2"));
readPromise("listContentsByTag", api.listContentsByTag("leroymerlin", "prod", "tag1"));
readPromise("listContentsByTagAndDefinition", api.listContentsByTagAndDefinition("leroymerlin", "prod", "tag1", "definition1"));
readPromise("listContentsByDefinition", api.listContentsByDefinition("leroymerlin", "prod", "definition1"));
readPromise("listContentsByDefinitionFromTo", api.listContentsByDefinitionFromTo("leroymerlin", "prod", "definition1", 0, 1));
readPromise("listUnpublishedContentsByDefinition", api.listUnpublishedContentsByDefinition("leroymerlin", "prod", "definition1", "someKey"));
readPromise("lookupWebPagesSitemapByUrl", api.lookupWebPagesSitemapByUrl("leroymerlin", "prod", "webPage2Url", "site1"));
readPromise("lookupPageById", api.lookupPageById("leroymerlin", "prod", "webPage2", "site1"));
readPromise("lookupPageByUrl", api.lookupPageByUrl("leroymerlin", "prod", "webPage2Url", "site1"));
readPromise("storeQuery", api.storeQuery("leroymerlin", "prod", {
	"deliveryId" : "leroymerlin",
	"find" : {"repository" : "leroymerlin"},
	"name" : "someNewQuery"
}));
readCreateReleasePromise("createRelease", api.createRelease("leroymerlin", "prod", createSomeNewRelease));
readPromise("searchContent", api.searchContent("leroymerlin", "prod", "query1"));
readPromise("getAvailablePages", api.getAvailablePages("leroymerlin", "prod"));

function readPromise(caller, promise) {
	promise.then(function(result) {
		console.log(caller + ": SUCCESS");
	}, function(err) {
		console.log(caller + ": ERROR\n----------------------");
		console.log(JSON.stringify(err) +"\n");
	});
}

function readCreateReleasePromise(caller, promise) {
	promise.then(function(result) {
		console.log(caller + ": SUCCESS");
		readAddToSomeNewReleasePromise("addToRelease", api.addToRelease("leroymerlin", "prod", addToSomeNewRelease));
	}, function(err) {
		console.log(caller + ": ERROR\n----------------------");
		console.log(JSON.stringify(err) +"\n");
	});
}

function readAddToSomeNewReleasePromise(caller, promise) {
	promise.then(function(result) {
		console.log(caller + ": SUCCESS");
		readStageSomeNewReleasePromise("stageRelease", api.stageRelease("leroymerlin", "prod", stageSomeNewRelease));
	}, function(err) {
		console.log(caller + ": ERROR\n----------------------");
		console.log(JSON.stringify(err) +"\n");
	});
}

function readStageSomeNewReleasePromise(caller, promise) {
	promise.then(function(result) {
		console.log(caller + ": SUCCESS");
		readPromise("publishStagedRelease", api.publishStagedRelease("leroymerlin", "prod", publishSomeNewRelease));
	}, function(err) {
		console.log(caller + ": ERROR\n----------------------");
		console.log(JSON.stringify(err) +"\n");
	});
}
