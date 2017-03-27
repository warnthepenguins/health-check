/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*!
	Papa Parse
	v4.1.2
	https://github.com/mholt/PapaParse
*/
!function(e){"use strict";function t(t,r){if(r=r||{},r.worker&&S.WORKERS_SUPPORTED){var n=f();return n.userStep=r.step,n.userChunk=r.chunk,n.userComplete=r.complete,n.userError=r.error,r.step=m(r.step),r.chunk=m(r.chunk),r.complete=m(r.complete),r.error=m(r.error),delete r.worker,void n.postMessage({input:t,config:r,workerId:n.id})}var o=null;return"string"==typeof t?o=r.download?new i(r):new a(r):(e.File&&t instanceof File||t instanceof Object)&&(o=new s(r)),o.stream(t)}function r(e,t){function r(){"object"==typeof t&&("string"==typeof t.delimiter&&1==t.delimiter.length&&-1==S.BAD_DELIMITERS.indexOf(t.delimiter)&&(u=t.delimiter),("boolean"==typeof t.quotes||t.quotes instanceof Array)&&(o=t.quotes),"string"==typeof t.newline&&(h=t.newline))}function n(e){if("object"!=typeof e)return[];var t=[];for(var r in e)t.push(r);return t}function i(e,t){var r="";"string"==typeof e&&(e=JSON.parse(e)),"string"==typeof t&&(t=JSON.parse(t));var n=e instanceof Array&&e.length>0,i=!(t[0]instanceof Array);if(n){for(var a=0;a<e.length;a++)a>0&&(r+=u),r+=s(e[a],a);t.length>0&&(r+=h)}for(var o=0;o<t.length;o++){for(var f=n?e.length:t[o].length,c=0;f>c;c++){c>0&&(r+=u);var d=n&&i?e[c]:c;r+=s(t[o][d],c)}o<t.length-1&&(r+=h)}return r}function s(e,t){if("undefined"==typeof e||null===e)return"";e=e.toString().replace(/"/g,'""');var r="boolean"==typeof o&&o||o instanceof Array&&o[t]||a(e,S.BAD_DELIMITERS)||e.indexOf(u)>-1||" "==e.charAt(0)||" "==e.charAt(e.length-1);return r?'"'+e+'"':e}function a(e,t){for(var r=0;r<t.length;r++)if(e.indexOf(t[r])>-1)return!0;return!1}var o=!1,u=",",h="\r\n";if(r(),"string"==typeof e&&(e=JSON.parse(e)),e instanceof Array){if(!e.length||e[0]instanceof Array)return i(null,e);if("object"==typeof e[0])return i(n(e[0]),e)}else if("object"==typeof e)return"string"==typeof e.data&&(e.data=JSON.parse(e.data)),e.data instanceof Array&&(e.fields||(e.fields=e.data[0]instanceof Array?e.fields:n(e.data[0])),e.data[0]instanceof Array||"object"==typeof e.data[0]||(e.data=[e.data])),i(e.fields||[],e.data||[]);throw"exception: Unable to serialize unrecognized input"}function n(t){function r(e){var t=_(e);t.chunkSize=parseInt(t.chunkSize),e.step||e.chunk||(t.chunkSize=null),this._handle=new o(t),this._handle.streamer=this,this._config=t}this._handle=null,this._paused=!1,this._finished=!1,this._input=null,this._baseIndex=0,this._partialLine="",this._rowCount=0,this._start=0,this._nextChunk=null,this.isFirstChunk=!0,this._completeResults={data:[],errors:[],meta:{}},r.call(this,t),this.parseChunk=function(t){if(this.isFirstChunk&&m(this._config.beforeFirstChunk)){var r=this._config.beforeFirstChunk(t);void 0!==r&&(t=r)}this.isFirstChunk=!1;var n=this._partialLine+t;this._partialLine="";var i=this._handle.parse(n,this._baseIndex,!this._finished);if(!this._handle.paused()&&!this._handle.aborted()){var s=i.meta.cursor;this._finished||(this._partialLine=n.substring(s-this._baseIndex),this._baseIndex=s),i&&i.data&&(this._rowCount+=i.data.length);var a=this._finished||this._config.preview&&this._rowCount>=this._config.preview;if(y)e.postMessage({results:i,workerId:S.WORKER_ID,finished:a});else if(m(this._config.chunk)){if(this._config.chunk(i,this._handle),this._paused)return;i=void 0,this._completeResults=void 0}return this._config.step||this._config.chunk||(this._completeResults.data=this._completeResults.data.concat(i.data),this._completeResults.errors=this._completeResults.errors.concat(i.errors),this._completeResults.meta=i.meta),!a||!m(this._config.complete)||i&&i.meta.aborted||this._config.complete(this._completeResults),a||i&&i.meta.paused||this._nextChunk(),i}},this._sendError=function(t){m(this._config.error)?this._config.error(t):y&&this._config.error&&e.postMessage({workerId:S.WORKER_ID,error:t,finished:!1})}}function i(e){function t(e){var t=e.getResponseHeader("Content-Range");return parseInt(t.substr(t.lastIndexOf("/")+1))}e=e||{},e.chunkSize||(e.chunkSize=S.RemoteChunkSize),n.call(this,e);var r;this._nextChunk=k?function(){this._readChunk(),this._chunkLoaded()}:function(){this._readChunk()},this.stream=function(e){this._input=e,this._nextChunk()},this._readChunk=function(){if(this._finished)return void this._chunkLoaded();if(r=new XMLHttpRequest,k||(r.onload=g(this._chunkLoaded,this),r.onerror=g(this._chunkError,this)),r.open("GET",this._input,!k),this._config.chunkSize){var e=this._start+this._config.chunkSize-1;r.setRequestHeader("Range","bytes="+this._start+"-"+e),r.setRequestHeader("If-None-Match","webkit-no-cache")}try{r.send()}catch(t){this._chunkError(t.message)}k&&0==r.status?this._chunkError():this._start+=this._config.chunkSize},this._chunkLoaded=function(){if(4==r.readyState){if(r.status<200||r.status>=400)return void this._chunkError();this._finished=!this._config.chunkSize||this._start>t(r),this.parseChunk(r.responseText)}},this._chunkError=function(e){var t=r.statusText||e;this._sendError(t)}}function s(e){e=e||{},e.chunkSize||(e.chunkSize=S.LocalChunkSize),n.call(this,e);var t,r,i="undefined"!=typeof FileReader;this.stream=function(e){this._input=e,r=e.slice||e.webkitSlice||e.mozSlice,i?(t=new FileReader,t.onload=g(this._chunkLoaded,this),t.onerror=g(this._chunkError,this)):t=new FileReaderSync,this._nextChunk()},this._nextChunk=function(){this._finished||this._config.preview&&!(this._rowCount<this._config.preview)||this._readChunk()},this._readChunk=function(){var e=this._input;if(this._config.chunkSize){var n=Math.min(this._start+this._config.chunkSize,this._input.size);e=r.call(e,this._start,n)}var s=t.readAsText(e,this._config.encoding);i||this._chunkLoaded({target:{result:s}})},this._chunkLoaded=function(e){this._start+=this._config.chunkSize,this._finished=!this._config.chunkSize||this._start>=this._input.size,this.parseChunk(e.target.result)},this._chunkError=function(){this._sendError(t.error)}}function a(e){e=e||{},n.call(this,e);var t,r;this.stream=function(e){return t=e,r=e,this._nextChunk()},this._nextChunk=function(){if(!this._finished){var e=this._config.chunkSize,t=e?r.substr(0,e):r;return r=e?r.substr(e):"",this._finished=!r,this.parseChunk(t)}}}function o(e){function t(){if(b&&d&&(h("Delimiter","UndetectableDelimiter","Unable to auto-detect delimiting character; defaulted to '"+S.DefaultDelimiter+"'"),d=!1),e.skipEmptyLines)for(var t=0;t<b.data.length;t++)1==b.data[t].length&&""==b.data[t][0]&&b.data.splice(t--,1);return r()&&n(),i()}function r(){return e.header&&0==y.length}function n(){if(b){for(var e=0;r()&&e<b.data.length;e++)for(var t=0;t<b.data[e].length;t++)y.push(b.data[e][t]);b.data.splice(0,1)}}function i(){if(!b||!e.header&&!e.dynamicTyping)return b;for(var t=0;t<b.data.length;t++){for(var r={},n=0;n<b.data[t].length;n++){if(e.dynamicTyping){var i=b.data[t][n];b.data[t][n]="true"==i||"TRUE"==i?!0:"false"==i||"FALSE"==i?!1:o(i)}e.header&&(n>=y.length?(r.__parsed_extra||(r.__parsed_extra=[]),r.__parsed_extra.push(b.data[t][n])):r[y[n]]=b.data[t][n])}e.header&&(b.data[t]=r,n>y.length?h("FieldMismatch","TooManyFields","Too many fields: expected "+y.length+" fields but parsed "+n,t):n<y.length&&h("FieldMismatch","TooFewFields","Too few fields: expected "+y.length+" fields but parsed "+n,t))}return e.header&&b.meta&&(b.meta.fields=y),b}function s(t){for(var r,n,i,s=[",","	","|",";",S.RECORD_SEP,S.UNIT_SEP],a=0;a<s.length;a++){var o=s[a],h=0,f=0;i=void 0;for(var c=new u({delimiter:o,preview:10}).parse(t),d=0;d<c.data.length;d++){var l=c.data[d].length;f+=l,"undefined"!=typeof i?l>1&&(h+=Math.abs(l-i),i=l):i=l}c.data.length>0&&(f/=c.data.length),("undefined"==typeof n||n>h)&&f>1.99&&(n=h,r=o)}return e.delimiter=r,{successful:!!r,bestDelimiter:r}}function a(e){e=e.substr(0,1048576);var t=e.split("\r");if(1==t.length)return"\n";for(var r=0,n=0;n<t.length;n++)"\n"==t[n][0]&&r++;return r>=t.length/2?"\r\n":"\r"}function o(e){var t=l.test(e);return t?parseFloat(e):e}function h(e,t,r,n){b.errors.push({type:e,code:t,message:r,row:n})}var f,c,d,l=/^\s*-?(\d*\.?\d+|\d+\.?\d*)(e[-+]?\d+)?\s*$/i,p=this,g=0,v=!1,k=!1,y=[],b={data:[],errors:[],meta:{}};if(m(e.step)){var R=e.step;e.step=function(n){if(b=n,r())t();else{if(t(),0==b.data.length)return;g+=n.data.length,e.preview&&g>e.preview?c.abort():R(b,p)}}}this.parse=function(r,n,i){if(e.newline||(e.newline=a(r)),d=!1,!e.delimiter){var o=s(r);o.successful?e.delimiter=o.bestDelimiter:(d=!0,e.delimiter=S.DefaultDelimiter),b.meta.delimiter=e.delimiter}var h=_(e);return e.preview&&e.header&&h.preview++,f=r,c=new u(h),b=c.parse(f,n,i),t(),v?{meta:{paused:!0}}:b||{meta:{paused:!1}}},this.paused=function(){return v},this.pause=function(){v=!0,c.abort(),f=f.substr(c.getCharIndex())},this.resume=function(){v=!1,p.streamer.parseChunk(f)},this.aborted=function(){return k},this.abort=function(){k=!0,c.abort(),b.meta.aborted=!0,m(e.complete)&&e.complete(b),f=""}}function u(e){e=e||{};var t=e.delimiter,r=e.newline,n=e.comments,i=e.step,s=e.preview,a=e.fastMode;if(("string"!=typeof t||S.BAD_DELIMITERS.indexOf(t)>-1)&&(t=","),n===t)throw"Comment character same as delimiter";n===!0?n="#":("string"!=typeof n||S.BAD_DELIMITERS.indexOf(n)>-1)&&(n=!1),"\n"!=r&&"\r"!=r&&"\r\n"!=r&&(r="\n");var o=0,u=!1;this.parse=function(e,h,f){function c(e){b.push(e),S=o}function d(t){return f?p():("undefined"==typeof t&&(t=e.substr(o)),w.push(t),o=g,c(w),y&&_(),p())}function l(t){o=t,c(w),w=[],O=e.indexOf(r,o)}function p(e){return{data:b,errors:R,meta:{delimiter:t,linebreak:r,aborted:u,truncated:!!e,cursor:S+(h||0)}}}function _(){i(p()),b=[],R=[]}if("string"!=typeof e)throw"Input must be a string";var g=e.length,m=t.length,v=r.length,k=n.length,y="function"==typeof i;o=0;var b=[],R=[],w=[],S=0;if(!e)return p();if(a||a!==!1&&-1===e.indexOf('"')){for(var C=e.split(r),E=0;E<C.length;E++){var w=C[E];if(o+=w.length,E!==C.length-1)o+=r.length;else if(f)return p();if(!n||w.substr(0,k)!=n){if(y){if(b=[],c(w.split(t)),_(),u)return p()}else c(w.split(t));if(s&&E>=s)return b=b.slice(0,s),p(!0)}}return p()}for(var x=e.indexOf(t,o),O=e.indexOf(r,o);;)if('"'!=e[o])if(n&&0===w.length&&e.substr(o,k)===n){if(-1==O)return p();o=O+v,O=e.indexOf(r,o),x=e.indexOf(t,o)}else if(-1!==x&&(O>x||-1===O))w.push(e.substring(o,x)),o=x+m,x=e.indexOf(t,o);else{if(-1===O)break;if(w.push(e.substring(o,O)),l(O+v),y&&(_(),u))return p();if(s&&b.length>=s)return p(!0)}else{var I=o;for(o++;;){var I=e.indexOf('"',I+1);if(-1===I)return f||R.push({type:"Quotes",code:"MissingQuotes",message:"Quoted field unterminated",row:b.length,index:o}),d();if(I===g-1){var D=e.substring(o,I).replace(/""/g,'"');return d(D)}if('"'!=e[I+1]){if(e[I+1]==t){w.push(e.substring(o,I).replace(/""/g,'"')),o=I+1+m,x=e.indexOf(t,o),O=e.indexOf(r,o);break}if(e.substr(I+1,v)===r){if(w.push(e.substring(o,I).replace(/""/g,'"')),l(I+1+v),x=e.indexOf(t,o),y&&(_(),u))return p();if(s&&b.length>=s)return p(!0);break}}else I++}}return d()},this.abort=function(){u=!0},this.getCharIndex=function(){return o}}function h(){var e=document.getElementsByTagName("script");return e.length?e[e.length-1].src:""}function f(){if(!S.WORKERS_SUPPORTED)return!1;if(!b&&null===S.SCRIPT_PATH)throw new Error("Script path cannot be determined automatically when Papa Parse is loaded asynchronously. You need to set Papa.SCRIPT_PATH manually.");var t=S.SCRIPT_PATH||v;t+=(-1!==t.indexOf("?")?"&":"?")+"papaworker";var r=new e.Worker(t);return r.onmessage=c,r.id=w++,R[r.id]=r,r}function c(e){var t=e.data,r=R[t.workerId],n=!1;if(t.error)r.userError(t.error,t.file);else if(t.results&&t.results.data){var i=function(){n=!0,d(t.workerId,{data:[],errors:[],meta:{aborted:!0}})},s={abort:i,pause:l,resume:l};if(m(r.userStep)){for(var a=0;a<t.results.data.length&&(r.userStep({data:[t.results.data[a]],errors:t.results.errors,meta:t.results.meta},s),!n);a++);delete t.results}else m(r.userChunk)&&(r.userChunk(t.results,s,t.file),delete t.results)}t.finished&&!n&&d(t.workerId,t.results)}function d(e,t){var r=R[e];m(r.userComplete)&&r.userComplete(t),r.terminate(),delete R[e]}function l(){throw"Not implemented."}function p(t){var r=t.data;if("undefined"==typeof S.WORKER_ID&&r&&(S.WORKER_ID=r.workerId),"string"==typeof r.input)e.postMessage({workerId:S.WORKER_ID,results:S.parse(r.input,r.config),finished:!0});else if(e.File&&r.input instanceof File||r.input instanceof Object){var n=S.parse(r.input,r.config);n&&e.postMessage({workerId:S.WORKER_ID,results:n,finished:!0})}}function _(e){if("object"!=typeof e)return e;var t=e instanceof Array?[]:{};for(var r in e)t[r]=_(e[r]);return t}function g(e,t){return function(){e.apply(t,arguments)}}function m(e){return"function"==typeof e}var v,k=!e.document&&!!e.postMessage,y=k&&/(\?|&)papaworker(=|&|$)/.test(e.location.search),b=!1,R={},w=0,S={};if(S.parse=t,S.unparse=r,S.RECORD_SEP=String.fromCharCode(30),S.UNIT_SEP=String.fromCharCode(31),S.BYTE_ORDER_MARK="﻿",S.BAD_DELIMITERS=["\r","\n",'"',S.BYTE_ORDER_MARK],S.WORKERS_SUPPORTED=!k&&!!e.Worker,S.SCRIPT_PATH=null,S.LocalChunkSize=10485760,S.RemoteChunkSize=5242880,S.DefaultDelimiter=",",S.Parser=u,S.ParserHandle=o,S.NetworkStreamer=i,S.FileStreamer=s,S.StringStreamer=a,"undefined"!=typeof module&&module.exports?module.exports=S:m(e.define)&&e.define.amd?!(__WEBPACK_AMD_DEFINE_RESULT__ = function(){return S}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):e.Papa=S,e.jQuery){var C=e.jQuery;C.fn.parse=function(t){function r(){if(0==a.length)return void(m(t.complete)&&t.complete());var e=a[0];if(m(t.before)){var r=t.before(e.file,e.inputElem);if("object"==typeof r){if("abort"==r.action)return void n("AbortError",e.file,e.inputElem,r.reason);if("skip"==r.action)return void i();"object"==typeof r.config&&(e.instanceConfig=C.extend(e.instanceConfig,r.config))}else if("skip"==r)return void i()}var s=e.instanceConfig.complete;e.instanceConfig.complete=function(t){m(s)&&s(t,e.file,e.inputElem),i()},S.parse(e.file,e.instanceConfig)}function n(e,r,n,i){m(t.error)&&t.error({name:e},r,n,i)}function i(){a.splice(0,1),r()}var s=t.config||{},a=[];return this.each(function(){var t="INPUT"==C(this).prop("tagName").toUpperCase()&&"file"==C(this).attr("type").toLowerCase()&&e.FileReader;if(!t||!this.files||0==this.files.length)return!0;for(var r=0;r<this.files.length;r++)a.push({file:this.files[r],inputElem:this,instanceConfig:C.extend({},s)})}),r(),this}}y?e.onmessage=p:S.WORKERS_SUPPORTED&&(v=h(),document.body?document.addEventListener("DOMContentLoaded",function(){b=!0},!0):b=!0),i.prototype=Object.create(n.prototype),i.prototype.constructor=i,s.prototype=Object.create(n.prototype),s.prototype.constructor=s,a.prototype=Object.create(a.prototype),a.prototype.constructor=a}("undefined"!=typeof window?window:this);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var papa = __webpack_require__(0);

var myVersion = "2.0";

var myQuestions = [],
	myTopics = [];

var myCurrentScreen = 0,
	myCurrentTopQuestion = 0,
	myReadyState = 0;


let Session = function (uuid, version) {
//	this.uuid = uuid;
//	this.version = version;
	return {
		uuid: uuid || "session1",
		version: version || "0.0",
	};
}

function Topic(index, name, score) {
	this.index = index;
	this.name = name;
	this.score = score;
}

function User(email, name, title, company, phone, contactPreference) {
	this.email = email;
	this.name = name;
	this.title = title;
	this.company = company;
	this.phone = phone;
	this.contactPreference = contactPreference || "phone";

	return {
		email: email,
		name: name,
		title: title,
		company: company,
		phone: phone,
		contactPreference
	};
}

function Question(number, text, topic, screen, answer) {
	this.number = number;
	this.text = text;
	this.topic = topic;
	this.screen = screen;
	this.answer = answer;
}

// The POST will include these JSON objects:
// User { email, name, title, company, phone, contact_preference }
// Scores { all_topic_scores, how_many_scores, total_score, version, how_many_questions }
// A serialized string of Questions --- "number\ttext\ttopic\tanswer\nnumber\ttext\ttopic\tanswer..."


function jumpToNextQuestion(myElement) {
	var myQuestionNumber = 1 + Number(myElement.getAttribute("name").replace(/hc-answers-/,""));
	var myNextQuestion = document.getElementById("hc-question-" + myQuestionNumber);
	if (myNextQuestion) {
		if (myElement.parentNode.getAttribute("data-scrolled") === "false") {
			window.scroll({ top: myNextQuestion.getBoundingClientRect().top + window.scrollY, left: 0, behavior: 'smooth' });
			myNextQuestion = myNextQuestion.getElementsByClassName("hc-answer-key")[0].getElementsByTagName("input")[0];
			myNextQuestion.focus();
			myElement.parentNode.setAttribute("data-scrolled", "true");
		}
		// jumpToNextQuestion(myNextQuestion, myNextQuestion.getBoundingClientRect().top - window.screenY);
	} else {
		if (myElement.parentNode.getAttribute("data-scrolled") === "false") {
			myNextQuestion = document.getElementById("hc-button-next");
			window.scroll({ top: myNextQuestion.getBoundingClientRect().top + window.scrollY, left: 0, behavior: 'smooth' });
			myNextQuestion.focus();
			myElement.parentNode.setAttribute("data-scrolled", "true");
		}
	}
// } else if (myStep > 0 && window.innerHeight + window.scrollY < document.body.offsetHeight - 10) {
// 	console.log(window.screenY + " out of " + myStep);
// 	window.scrollBy(0, 10);
// 	setTimeout(jumpToNextQuestion(myElement, myStep - 10), 100);
// } else {
// 	//
}

function toggleVisibility(element, waitTime) {
	waitTime = waitTime || 500;
	if (element.classList.contains("gone") || element.classList.contains("hidden")) {
		element.classList.remove("gone");
		setTimeout(function() {
      element.classList.remove("hidden");
      // console.log(element.classList + " becomes visible");
    }, waitTime);
	} else {
		element.classList.add("hidden");
		element.classList.add("gone");
	}
}

function calculateScores(callback) {
	//crunch numbers to calc results
	var indexTopic = 0,
		countQuestionsInTopic = 0;

	// console.log("calculateScores");
	if (!(myTopics.length > 0)) {
		myTopics.push(new Topic(0, "Total Score", 0));
		console.log("WARNING: myTopics is empty!");
	}
	for (var i = 0; i < myQuestions.length; i++) {
		if (indexTopic === myQuestions[i].topic) {
			countQuestionsInTopic++;
			myTopics[indexTopic].score += myQuestions[i].answer;
		} else {
			if (countQuestionsInTopic > 0) {
				myTopics[indexTopic].score = myTopics[indexTopic].score / countQuestionsInTopic;
				myTopics[0].score += myTopics[indexTopic].score;
			}
			indexTopic = myQuestions[i].topic;
			countQuestionsInTopic = 1;
			if (myTopics.length < indexTopic) {
				myTopics.push(new Topic(indexTopic, "Topic " + indexTopic, myQuestions[i].answer));
			} else {
				myTopics[indexTopic].score = myQuestions[i].answer;
			}
		}
	}
	myTopics[indexTopic].score = myTopics[indexTopic].score / countQuestionsInTopic;
	myTopics[0].score += myTopics[indexTopic].score;
	myTopics[0].score = myTopics[0].score / (myTopics.length - 1);
	// console.log("Scores by topic (index 0 is totals):")
  // console.log(myTopics);
	callback();
}

function showScores() {
	var myScoreBox = document.getElementById("hc-results-section").getElementsByClassName("hc-results-score")[0];

	//set topic score bars -- currently invisible
	[].forEach.call(document.getElementById("hc-results-section").getElementsByClassName("hc-progress"), function(element, index) {
		// toggleVisibility(element);
		// console.log("Showing bar for topic #" + index + "...");
		element.nextElementSibling.innerHTML = myTopics[index + 1].name;
		element.style.transform = "scaleX(" + (0.5 * (myTopics[index + 1].score) + 0.02) + ")";
		element.style.transition = "transform 2s ease-in-out";
		if (myTopics[index + 1].score < 3 && myTopics[index + 1].score >= 2) {
//			console.log(element);
			element.classList.add("warning");
		} else if (myTopics[index + 1].score < 2) {
			element.classList.add("warning-strong");
		}
	});
	if (myTopics[0].score >= 3.9) {
		myScoreBox.innerHTML = "A+";
	} else if (myTopics[0].score >= 3.4) {
		myScoreBox.innerHTML = "A";
	} else if (myTopics[0].score >= 3.0) {
		myScoreBox.innerHTML = "A-";
	} else if (myTopics[0].score >= 3.9) {
		myScoreBox.innerHTML = "B+";
	} else if (myTopics[0].score >= 3.4) {
		myScoreBox.innerHTML = "B";
	} else if (myTopics[0].score >= 3.0) {
		myScoreBox.innerHTML = "B-";
	} else if (myTopics[0].score >= 2.9) {
		myScoreBox.innerHTML = "C+";
	} else if (myTopics[0].score >= 2.4) {
		myScoreBox.innerHTML = "C";
	} else if (myTopics[0].score >= 2.0) {
		myScoreBox.innerHTML = "C-";
	} else if (myTopics[0].score >= 1.9) {
		myScoreBox.innerHTML = "D+";
	} else if (myTopics[0].score >= 1.4) {
		myScoreBox.innerHTML = "D";
	} else if (myTopics[0].score >= 1.0) {
		myScoreBox.innerHTML = "D-";
	} else {
		myScoreBox.innerHTML = "F";
	}
}

function createSessionObj () {
	return Session (document.getElementById('hc-session-id').innerHTML, myVersion);
}

function addHiddenToForm (theForm, key, value) {
    // Create a hidden input element, and append it to the form:
    var input = document.createElement('input');
    input.type = 'hidden';
    input.name = key; // 'name-as-seen-at-the-server';
    input.value = value;
    theForm.appendChild(input);
}

function writeSessionToForm () {
	let sessionInfo = createSessionObj();
  let theForm = document.forms['hc-user-info'];

  for (let key in sessionInfo) {
    addHiddenToForm(theForm, key, sessionInfo[key]);
  }
  // myQuestions.forEach(element, index) {
  //   addHiddenToForm(theForm, 'questions[' + index + ']', JSON.stringify(element));
  // }
}

function postSurveyData(url, callback) {
  let topics = [],
    questions = [],
    session = createSessionObj(),
    json = "";//JSON.stringify({session, topics, questions});
    postRequest = new XMLHttpRequest();

  json = "session[uuid]=" + encodeURIComponent(session.uuid) + "&" +
    "session[version]=" + encodeURIComponent(session.version) + "&";

  var myAjax = new Ajax.Request('report/index.php?lorem=ipsum&name=binny', {
  	method: 'post',
  	onComplete:callback
  });

/*	postRequest.open("POST", url, true);
	postRequest.setRequestHeader("Content-type", 'application/x-www-form-urlencoded');
  postRequest.setRequestHeader("Content-length", json.length);
  postRequest.setRequestHeader("Connection", "close");

	postRequest.onreadystatechange = function() {
		if (postRequest.readyState === XMLHttpRequest.DONE && postRequest.status === 200) {
			if (typeof callback !== "undefined") {
        callback();
      }
		}
  };
	postRequest.send(json);
  console.log(json);
  */
}

function displayResults() {
	toggleVisibility(document.getElementById("hc-results-section"));
	toggleVisibility(document.getElementById("hc-question-section"));
	toggleVisibility(document.getElementsByClassName("hc-results-actions-wrapper")[0],1000);
	toggleVisibility(document.getElementById("hc-user-info"), 1500);

	calculateScores(showScores);

  console.log(myVersion);

	writeSessionToForm();
  postSurveyData('report');

  //postSurveyData('./report/index.php'); // doesn't work yet
	document.getElementById("hc-results-request").addEventListener(
    "click", function() {
		  // window.localStorage.clear();
	  }
  );
}

function displayNextQuestionSet() {
	//increment the screen counter
	//for each question with matching screen value in myQuestions
		//write HTML for the question and answer elements, including unique ids and names
		//update heads-up progress bar, section heading, Next button
	var numQuestionsDisplayed = 0,
		tempQuestion,
		tempAnswers,
		tempNumber,
		theQuestionTemplate,
		theQuestionSection,
		theButton,
		theProgressBar,
		theTopicHeader;

	window.scroll({ top: 0, left: 0, behavior: 'smooth' });

	// console.log("displayNextQuestionSet: Screen #" + myCurrentScreen + " out of " + myQuestions[myQuestions.length - 1].screen);
	if (myCurrentScreen === myQuestions[myQuestions.length - 1].screen) {
		displayResults();
		return;
	}

	myCurrentScreen++;

	theQuestionSection = document.getElementById("hc-question-section");

	// if (localStorage.getItem('theQuestionSection')) {
	// 	alert("Local storage contains " + localStorage.getItem('theQuestionSection'));
	// 	theQuestionSection.innerHTML = localStorage.getItem('theQuestionSection');
	// }

	theQuestionTemplate = theQuestionSection.removeChild(document.getElementById("hc-question-1"));
	theButton = theQuestionSection.removeChild(document.getElementsByClassName("hc-button-wrapper")[0]);
	theTopicHeader = theQuestionSection.getElementsByClassName("hc-topic-header")[0];
	theProgressBar = theTopicHeader.removeChild(theTopicHeader.getElementsByClassName("hc-progress-bar")[0]);
	theTopicHeader = theQuestionSection.removeChild(theTopicHeader);
	theQuestionSection.innerHTML = "";

	myQuestions.forEach(function(element) {
		if (element.screen === myCurrentScreen) {
			numQuestionsDisplayed++;
			if (numQuestionsDisplayed === 1) {
				myCurrentTopQuestion = element.number;
			}
			tempQuestion = theQuestionTemplate.cloneNode(true);
			tempQuestion.setAttribute("id","hc-question-" + numQuestionsDisplayed);
			tempQuestion = theQuestionSection.appendChild(tempQuestion);
			tempQuestion.getElementsByClassName("hc-question-link")[0].getElementsByTagName("a")[0].setAttribute("name", "hc-question-link-" + numQuestionsDisplayed);
			tempQuestion.getElementsByClassName("hc-question-number")[0].innerHTML = (element.number < 10 ? "0" : "") + element.number;
			tempQuestion.getElementsByClassName("hc-question-text")[0].innerHTML = element.text;
			tempAnswers = tempQuestion.getElementsByClassName("hc-answer-key")[0];
			tempAnswers.setAttribute("data-scrolled", false);
			tempNumber = 0;
			[].forEach.call(tempAnswers.getElementsByTagName("label"), function(element) {
				tempNumber++;
				element.setAttribute("for", "hc-answers-" + numQuestionsDisplayed + "-" + tempNumber);
			});
			tempNumber = 0;
			[].forEach.call(tempAnswers.getElementsByTagName("input"), function(element) {
				tempNumber++;
				element.setAttribute("name", "hc-answers-" + numQuestionsDisplayed);
				element.setAttribute("id", "hc-answers-" + numQuestionsDisplayed + "-" + tempNumber);
				element.checked = false;
				element.addEventListener("click", function(e) {if (e.screenX > 0) {jumpToNextQuestion(this);}}, {once: true});
				element.addEventListener("focusin", function(e) {this.parentNode.classList.add("focused"); this.parentNode.parentNode.parentNode.classList.add("focused");});
				element.addEventListener("focusout", function(e) {this.parentNode.classList.remove("focused"); this.parentNode.parentNode.parentNode.classList.remove("focused");});
			});
		}
	});

	document.getElementById("hc-question-1").getElementsByClassName("hc-answer-key")[0].getElementsByTagName("input")[0].focus();

	switch (tempNumber = myTopics[myQuestions[myCurrentTopQuestion - 1].topic].index) {
		case 1: tempNumber = "I";
			break;
		case 2: tempNumber = "II";
			break;
		case 3: tempNumber = "III";
			break;
		case 4: tempNumber = "IV";
			break;
		case 5: tempNumber = "V";
			break;
		case 6: tempNumber = "VI";
			break;
		case 7: tempNumber = "VII";
			break;
		case 8: tempNumber = "IIX";
			break;
		case 9: tempNumber = "IX";
			break;
		case 10: tempNumber = "X";
			break;
		default: tempNumber = tempNumber;
	}

	theTopicHeader = theQuestionSection.insertBefore(theTopicHeader, theQuestionSection.firstElementChild);
	theTopicHeader.getElementsByTagName("h2")[0].innerHTML = "";
	theTopicHeader.getElementsByTagName("h2")[0].appendChild(document.createTextNode(tempNumber + " \u2219 " + myTopics[myQuestions[myCurrentTopQuestion - 1].topic].name));

	if (myCurrentScreen === 2) {
		toggleVisibility(theProgressBar, 1);
	}

	tempNumber = (myCurrentTopQuestion / myQuestions.length) * 2;
	theProgressBar = theTopicHeader.appendChild(theProgressBar);
	// console.log(theProgressBar);
	// theProgressBar.getElementsByClassName("hc-progress")[0].style.marginLeft = ((Number(theProgressBar.getElementsByClassName("hc-progress")[0].offsetWidth) * -(1 - tempNumber) + 1)) + "px";
	theProgressBar.getElementsByClassName("hc-progress")[0].style.transform = "scaleX(" + tempNumber + ")";
	theProgressBar.getElementsByTagName("p")[0].innerHTML = "";
	theProgressBar.getElementsByTagName("p")[0].appendChild(document.createTextNode(myCurrentTopQuestion + " of " + myQuestions.length + " completed (" + Math.trunc(1 + (99 * myCurrentTopQuestion / myQuestions.length)) + "%)"));

	theButton = theQuestionSection.appendChild(theButton);
	localStorage.setItem('theQuestionSection',theQuestionSection.innerHTML);

}

function storeLoadedTopics(rawText) {
	var myArray = rawText.split('\n');

	myArray = myArray.map(function(element, index, array) {
		var tempTopicArray = element.split('\t');
		tempTopicArray[0] = Number(tempTopicArray[0]);
		return tempTopicArray;
	});

	while (myArray[myArray.length - 1][0] === 0 || isNaN(myArray[myArray.length - 1][0])) {
		myArray.pop();
	}

	if (!(myTopics.length < 0)) {
		// console.log("Topics list empty, creating list");
		myTopics.push(new Topic(0, "Total Score", 0));
		for (var i = 1; i <= myArray.length; i++) {
			myTopics.push(new Topic(myArray[i - 1][0], myArray[i - 1][1], 0));
		}
	}

	myReadyState++;
	// console.log(myReadyState);
}

function storeLoadedQuestions(rawText) {
	var myQuestionArray = rawText.split('\n');
	myQuestionArray = myQuestionArray.map(function(element) {
		return element.trim();
	});
	for (var i = 0; i < myQuestionArray.length; i++) {
		if (myQuestionArray[i].length < 5) {
			myQuestionArray.splice(i, 1);
			i--;
		}
	}
	myQuestionArray.forEach(function(element, index, array) {
		if (myQuestions.length > index) {
			myQuestions[index].text = element;
		} else {
			myQuestions.push(new Question(0, element, 0, 0, 0));
		}
	});
	myReadyState++;
	// console.log(myReadyState);
}

function storeLoadedQuestionNumbers(rawText) {
	var myNumberArray = rawText.split('\n');
	var tempNumberArray = [];
	var tempSubArray = [];
	var temp = [0];
	myNumberArray = myNumberArray.map(function(element, index, array) {
		var tempSubArray = element.split('\t');
		return tempSubArray.map(function(elt) {
			return Number(elt);
		});
	});
	while (myNumberArray[myNumberArray.length - 1][0] === 0 || isNaN(myNumberArray[myNumberArray.length - 1][0])) {
		myNumberArray.pop();
	}
	myNumberArray.forEach(function(element, index, array) {
		if (myQuestions.length > index) {
			myQuestions[index].number = element[0];
			myQuestions[index].topic = element[1];
			myQuestions[index].screen = element[2];
		} else {
			myQuestions.push(new Question(element[0], "", element[1], element[2], 0));
		}
	});
	//checkReadyState
	myReadyState++;
	// console.log(myReadyState);
}

function readFile(url, callback) {
	var myFile = new XMLHttpRequest(),
		myFullText = "";
	myFile.open("GET", url, true);
	myFile.onreadystatechange = function() {
		if (myFile.readyState === XMLHttpRequest.DONE && myFile.status === 200) {
			callback(myFile.response);
		}
	}
	myFile.send();
}

function checkAnswers() {
	//Validate current set of responses; flag unanswered questions; returns 0 (error) or 1 (okay)
	var myAnswerSet = document.getElementsByClassName("hc-answer-key"),
		myTopUncheckedAnswer = null;

	[].forEach.call(myAnswerSet, function(element, index) {
		var isChecked = 0;
		[].forEach.call(element.getElementsByTagName("input"), function(innerElement) {
			isChecked += innerElement.checked;
		});
		if (isChecked === 0) {
			if (myTopUncheckedAnswer === null) {
				myTopUncheckedAnswer = element;
			}
			element.parentNode.parentNode.classList.add("warning");
		} else {
			element.parentNode.parentNode.classList.remove("warning");
		}
	});
	if (myTopUncheckedAnswer === null) {
		return true;
	}
	window.scroll({ top: myTopUncheckedAnswer.parentNode.parentNode.getBoundingClientRect().top + window.scrollY, left: 0, behavior: 'smooth' });
	myTopUncheckedAnswer.focus();
	return false;
}

function scrapeAnswers() {
	//get current set of answers, check for completion, save answers in myQuestions, update local storage of myQuestions
	var myAnswerSet = document.getElementsByClassName("hc-answer-key"),
		flagDone = false;

	[].forEach.call(myAnswerSet, function(element, index) {
		var myTotal = 0;
		[].forEach.call(element.getElementsByTagName("input"), function(innerElement) {
			myTotal += innerElement.checked * innerElement.value;
		});
		myQuestions[myCurrentTopQuestion + index - 1].answer = myTotal;
		localStorage.setItem('answer' + (myCurrentTopQuestion + index - 1), myTotal);
		// console.log("Answer to #" + (myCurrentTopQuestion + index - 1) + " stored: " + myTotal);
		if (myCurrentTopQuestion + index === myQuestions.length) {
			flagDone = true; //end of survey!
			// console.log((myCurrentTopQuestion + index) + " questions answered; complete!");
		}
	});
	localStorage.setItem('myCurrentScreen', myCurrentScreen);
	if (flagDone) {
		myCurrentTopQuestion = myQuestions.length;
	}
}

function recoverLocalData(callback) {
	if (localStorage.getItem('myCurrentScreen') > 0) {
		myCurrentScreen = Number(localStorage.getItem('myCurrentScreen'));
		// console.log("Recovering " + myCurrentScreen + " screens...");

		if (localStorage.getItem('theQuestionSection')) {
			// alert("Local storage contains " + localStorage.getItem('theQuestionSection'));
			document.getElementById("hc-question-section").innerHTML = localStorage.getItem('theQuestionSection');
		}

		for (var i = 0; i < myQuestions.length; i++) {
			// console.log("Looking for answers to question " + i);
			if (localStorage.getItem('answer' + i) ) {
				myQuestions[i].answer = Number(localStorage.getItem('answer' + i));
				// console.log(i + ": " + myQuestions[i].answer);
			} else {
				i = myQuestions.length;
			}
		}
	}
	callback();
}

function beginSurvey() {
	document.getElementById("hc-button-next").addEventListener("click", function() {
		if (myCurrentTopQuestion === myQuestions.length) {
//			displayResults();
		} else if (checkAnswers()) {
			scrapeAnswers();
			displayNextQuestionSet();
		}
	});

	displayNextQuestionSet();
}

function waitUntilReady(howMany, ticks, callback) {
	setTimeout(function() {
		if (myReadyState >= howMany || ticks <= 0) {
			callback();
		} else {
			waitUntilReady(3, ticks - 1, callback);
		}
	}, 100);
}

function loadQuestions() {
	//Pull questions from the latest version hc_questions; metadata from the latest hc_question_numbers

	readFile("data/hc_questions_v" + myVersion + ".txt", storeLoadedQuestions);
	readFile("data/hc_question_numbers_v" + myVersion + ".csv", storeLoadedQuestionNumbers);
	readFile("data/hc_topics_v" + myVersion + ".txt", storeLoadedTopics);

	// console.log(myReadyState + " is the current ready state");
	waitUntilReady(3, 100, function() {
		// console.log(myReadyState + " is the current ready state");
		// console.log("Data loaded, getting started.");
		recoverLocalData(beginSurvey);
	});

	//note: should have error trapping, to be implemented
}

window.addEventListener("load", loadQuestions);

/*function <<document load>> () {
	run loadQuestions;
	map showNextScreen function to NEXT button
	somehow create myAnswers[] as an accessible global, or set up infrastructure to store it in db
}*/




//puzzle: 	how to preserve myAnswers[] as a global variable?
//			Should answer data be written directly to database as it's scraped?
//				^probably, for saveability

//puzz2 	how to pull data from file?

//puzz3		how to get children of named element by class?

//puzz4		how to rewrite onClick?

//puzz5		how to toggle display attribute?

//puzz6


/***/ })
/******/ ]);