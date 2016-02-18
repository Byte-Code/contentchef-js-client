
var cc = require('./../src/api');
var api = cc.ContentChef.Api("http://localhost:9002", "")

console.log("\nStarting script...\n###################")

var createSomeNewRelease = { 
    "releaseId" : "someNewRelease", 
    "expectedNumOfContents" : 1,
    "expectedNumOfWebPages" : 1
}

var addToSomeNewRelease = { 
    "releaseId" : "someNewRelease", 
    "contents" : [{
      "contentId" : "someNewContent",
      "revisionId" : "12b760163a1fde89024a7d98",
      "definitionInformation" : {
        "definitionId" : "definition1",
        "definitionRevisionId" : "56a760163a1fde89024a7d98"
      },
      "#originId" : "leroymerlin",
      "content" : { "a" : "b" }
    }],
    "webPages" : [{
      "releaseId" : "someNewRelease",
      "webPageId" : "someNewWebPage",
      "url" : "someNewWebPageURL",
      "name" : "someNewWebPageName",
      "revisionId" : "23b760163a1fde89024a7d98",
      "#originId" : "leroymerlin",
      "templateId": "",
      "templateRevision" : "",
      "group" : "",
      "contentAreas" : [{ 
      	"contents": [{}]
      }]
    }]
}

var stageSomeNewRelease = { 
    "releaseId" : "someNewRelease"
}

var publishSomeNewRelease = { 
    "releaseId" : "someNewRelease"
}



readPromise("lookupContentByRevision", api.lookupContentByRevision("leroymerlin", "content2", "56b891d78a456d13026afc1d"))
readPromise("lookupContentLatestRevision", api.lookupContentLatestRevision("leroymerlin", "content2", "definition1"))
readPromise("lookupContentBySlug", api.lookupContentBySlug("leroymerlin", "slug2", "56b891d78a456d13026afc1d"))
readPromise("lookupContentLatestRevisionBySlug", api.lookupContentLatestRevisionBySlug("leroymerlin", "slug2", "definition1"))
readPromise("listAllContentByDefinition", api.listAllContentByDefinition("leroymerlin", "definition1"))
readPromise("listUnpublishedContentsByDefinition", api.listUnpublishedContentsByDefinition("leroymerlin", "definition1", "someKey"))
readPromise("lookupWebPagesSitemapByUrl", api.lookupWebPagesSitemapByUrl("leroymerlin", "someBaseUrl"))
readPromise("lookupWebPagesSitemapByUrlAndOrigin", api.lookupWebPagesSitemapByUrlAndOrigin("leroymerlin", "someBaseUrl", "leroymerlin"))
readPromise("lookupPageById", api.lookupPageById("leroymerlin", "webPage2"))
readPromise("lookupPageByUrl", api.lookupPageByUrl("leroymerlin", "webPage2Url"))
readPromise("storeQuery", api.storeQuery("leroymerlin", {
	"deliveryId" : "leroymerlin",
	"find" : {"originId" : "leroymerlin"},
	"name" : "originName"
}))
readCreateReleasePromise("createRelease", api.createRelease("leroymerlin", createSomeNewRelease))
readPromise("searchContent", api.searchContent("leroymerlin", "query1"))
readPromise("getAvailablePages", api.getAvailablePages("leroymerlin"))


console.log("\nFinished.\n")

function readPromise(caller, promise) {
	promise.then(function(result) {
		console.log(caller + ": SUCCESS\n----------------------")
		console.log(JSON.stringify(result) +"\n"); 
	}, function(err) {
		console.log(caller + ": ERROR\n----------------------")
		console.log(JSON.stringify(err) +"\n");
	});
}

function readCreateReleasePromise(caller, promise) {
	promise.then(function(result) {
		console.log(caller + ": SUCCESS\n----------------------")
		console.log(JSON.stringify(result) +"\n"); 
		readAddToSomeNewReleasePromise("addToRelease", api.addToRelease("leroymerlin", addToSomeNewRelease))
	}, function(err) {
		console.log(caller + ": ERROR\n----------------------")
		console.log(JSON.stringify(err) +"\n");
	});
}

function readAddToSomeNewReleasePromise(caller, promise) {
	promise.then(function(result) {
		console.log(caller + ": SUCCESS\n----------------------")
		console.log(JSON.stringify(result) +"\n"); 
		readStageSomeNewReleasePromise("stageRelease", api.stageRelease("leroymerlin", stageSomeNewRelease))
	}, function(err) {
		console.log(caller + ": ERROR\n----------------------")
		console.log(JSON.stringify(err) +"\n");
	});
}

function readStageSomeNewReleasePromise(caller, promise) {
	promise.then(function(result) {
		console.log(caller + ": SUCCESS\n----------------------")
		console.log(JSON.stringify(result) +"\n"); 
		readPublishSomeNewReleasePromise("publishStagedRelease", api.publishStagedRelease("leroymerlin", publishSomeNewRelease))
	}, function(err) {
		console.log(caller + ": ERROR\n----------------------")
		console.log(JSON.stringify(err) +"\n");
	});
}

function readPublishSomeNewReleasePromise(caller, promise) {
	promise.then(function(result) {
		console.log(caller + ": SUCCESS\n----------------------")
		console.log(JSON.stringify(result) +"\n"); 
	}, function(err) {
		console.log(caller + ": ERROR\n----------------------")
		console.log(JSON.stringify(err) +"\n");
	});
}
