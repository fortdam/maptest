"use strict"

var jrdtest = jrdtest || {};
jrdtest.tzm = jrdtest.tzm || {};
jrdtest.tzm.utils = jrdtest.tzm.utils || {};

(function(){
    var obj = jrdtest.tzm.utils;
	
    if (obj.printError === undefined){
        obj.printError =  function (e) {
            var fileName = e.fileName;
            var lineNumber = e.lineNumber;
	
            fileName = fileName.slice(fileName.search(/\/[^/]*$/)+1); /*strip the pre-fix*/
	
            alert(e.name+"\n"+fileName+":"+lineNumber+"  "+e.message);
        }
    }

    if (obj.getScript === undefined){
        obj.getScript = function (src) {
	     console.log("Load Script:"+src);
	     var scriptElement = document.createElement("script");
	     scriptElement.type = "text/javascript";
	     scriptElement.src = src;
            document.head.appendChild(scriptElement);
        }
    }
}());