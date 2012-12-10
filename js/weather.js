"use strict";

(function (){
    window.jrdtest = window.jrdtest || {};
    window.jrdtest.tzm = window.jrdtest.tzm || {};
    window.jrdtest.tzm.weather = window.jrdtest.tzm.weather || {};

    var utils = window.jrdtest.tzm.utils;


   if (!utils){
   	throw new Error("Utils not loaded");
   }

    var fahrToCent = function (temp){
        return (((temp-32)*5)/9).toFixed(1);
    };
	
    jrdtest.tzm.weatherCB =  function (wi){
        var container = document.getElementById("weather_info");
        var currentNode = wi.value.items[0]["yweather:condition"];
        var forcastNode = wi.value.items[0]["yweather:forecast"];

	 if (!container){
	     throw new Error("No weather container available");
	 }
    
        var weekDay = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        var imgUrl="http://l.yimg.com/a/i/us/we/52/<img>.gif";
        var cellWidth =((document.getElementById("weather_info").clientWidth)/3).toFixed(0);
    
        /*current*/
        var current={};
        current.label = document.createElement("td");
        current.label.style.width = cellWidth+"px";
        current.label.innerHTML="Current";
        document.getElementById("weather_day").appendChild(current.label);
    
    
        current.imgWrap = document.createElement("td");
        current.imgCenter = document.createElement("center");
        current.img=document.createElement("img");
        current.img.src=imgUrl.replace("<img>",currentNode.code);
        current.imgCenter.appendChild(current.img);
        current.imgWrap.appendChild(current.imgCenter);
        document.getElementById("weather_icon").appendChild(current.imgWrap);
    
        current.weatherTxt=document.createElement("td");
        current.weatherTxt.innerHTML=currentNode.text;
        document.getElementById("weather_txt").appendChild(current.weatherTxt);
    
        current.Temp=document.createElement("td");
        current.Temp.innerHTML=fahrToCent(currentNode.temp) + " C";
        current.Temp.style.textAlign = "center";
        document.getElementById("weather_temp").appendChild(current.Temp);
    
        /*today*/
        var today={};
        today.label = document.createElement("td");
        today.label.style.width = cellWidth+"px";
        today.label.innerHTML="Today";
        (document.getElementById("weather_day")).appendChild(today.label);  
    
        today.imgWrap = document.createElement("td");
        today.imgCenter = document.createElement("center");
        today.img=document.createElement("img");
        //today.img.height=35;
        today.img.src=imgUrl.replace("<img>",forcastNode[0].code);
        today.imgCenter.appendChild(today.img);
        today.imgWrap.appendChild(today.imgCenter);
        document.getElementById("weather_icon").appendChild(today.imgWrap);		
    
        today.weatherTxt=document.createElement("td");
        today.weatherTxt.innerHTML=forcastNode[0].text;
       document.getElementById("weather_txt").appendChild(today.weatherTxt);
    
        today.Temp=document.createElement("td");
        today.Temp.innerHTML=fahrToCent(forcastNode[0].low) +"/"+fahrToCent(forcastNode[0].high) + " C";
        document.getElementById("weather_temp").appendChild(today.Temp);
        /*tomorrow*/
    	
        var tomorrow={};
        tomorrow.label = document.createElement("td");
        tomorrow.label.style.width = cellWidth+"px";
        tomorrow.label.innerHTML=weekDay[((new Date()).getDay()+1)%6];
        (document.getElementById("weather_day")).appendChild(tomorrow.label);    
    	
        tomorrow.imgWrap = document.createElement("td");
        tomorrow.imgCenter = document.createElement("center");
        tomorrow.img=document.createElement("img");
        tomorrow.img.src=imgUrl.replace("<img>",forcastNode[1].code);
        //tomorrow.img.height=35;
        tomorrow.imgCenter.appendChild(tomorrow.img);
        tomorrow.imgWrap.appendChild(tomorrow.imgCenter);
        document.getElementById("weather_icon").appendChild(tomorrow.imgWrap);	
    
        tomorrow.weatherTxt=document.createElement("td");
        tomorrow.weatherTxt.innerHTML=forcastNode[1].text;
        document.getElementById("weather_txt").appendChild(tomorrow.weatherTxt);
    
        tomorrow.Temp=document.createElement("td");
        tomorrow.Temp.innerHTML=fahrToCent(forcastNode[1].low) +"/"+fahrToCent(forcastNode[1].high) + " C";
        document.getElementById("weather_temp").appendChild(tomorrow.Temp);
    };

    var getWeather = function (woeid){
        if (!woeid){
            throw  new Error("Wrong woeid");
        }
        utils.getScript("http://pipes.yahoo.com/pipes/pipe.run?_callback=jrdtest.tzm.weatherCB&_id=9oyONQzA2xGOkM4FqGIyXQ&_render=json&feed=http://weather.yahooapis.com/forecastrss?w=<woeid>&u=c".replace("<woeid>", woeid));
    };

    window.addEventListener("load", function(){getWeather(2491610);/*For Shanghai*/}, false);
})();
