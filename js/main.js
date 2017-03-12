var myQuestions = [],
	myTopics = [];
var myCurrentScreen = 0,
	myCurrentTopQuestion = 0,
	myReadyState = 0;

function Topic(index, name, score) {
	this.index = index;
	this.name = name;
	this.score = score;
}

function UserInfo(email, name, title, company, phone) {
	this.email = email;
	this.name = name;
	this.title = title;
	this.company = company;
	this.phone = phone;
}

function Question(number, text, topic, screen, answer) {
	this.number = number;
	this.text = text;
	this.topic = topic;
	this.screen = screen;
	this.answer = answer;
}

function jumpToNextQuestion(myElement) {
	var myQuestionNumber = 1 + Number(myElement.getAttribute("name").replace(/hc-answers-/,""));
	var myNextQuestion = document.getElementById("hc-question-" + myQuestionNumber);
	if (myNextQuestion) {
		if (myElement.parentNode.getAttribute("data-scrolled") === "false") {
			window.scroll({ top: myNextQuestion.getBoundingClientRect().top + window.scrollY, left: 0, behavior: 'smooth' });
			myNextQuestion = myNextQuestion.getElementsByClassName("hc-answer-key")[0].getElementsByTagName("input")[2];
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

function toggleVisibility(element, waitTime = 500) {
	if (element.classList.contains("gone") || element.classList.contains("hidden")) {
		element.classList.remove("gone");
		setTimeout(function() {element.classList.remove("hidden"); console.log(element.classList + " becomes visible");}, waitTime);
	} else {
		element.classList.add("hidden");
		element.classList.add("gone");
	}
}

function calculateScores(callback) {
	//crunch numbers to calc results
	var indexTopic = 0,
		countQuestionsInTopic = 0;
	if (!(myTopics.length > 0)) {
		myTopics.push(new Topic(0, "Total Score", 0));
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
			myTopics.push(new Topic(indexTopic, "Topic " + indexTopic, myQuestions[i].answer));
		}
	}
	myTopics[indexTopic].score = myTopics[indexTopic].score / countQuestionsInTopic;
	myTopics[0].score += myTopics[indexTopic].score;
	myTopics[0].score = myTopics[0].score / (myTopics.length - 1);
	console.log("Scores by topic (index 0 is totals):")
	console.log(myTopics);
	callback();
}

function showScores() {
	//set topic score bars
	[].forEach.call(document.getElementById("hc-results-section").getElementsByClassName("hc-progress"), function(element, index) {
		toggleVisibility(element);
		console.log("Showing bar for topic #" + index + "...");
		element.style.transform = "scaleX(" + (1 / (6 - myTopics[index + 1].score)) + ")";
		element.style.transition = "transform 1.5s ease-in-out";
		if (myTopics[index + 1].score < 4) {
//			console.log(element);
			element.classList.add("warning");
		}
	});
	if (myTopics[0].score >= 4.7) {
		document.getElementById("hc-results-section").getElementsByClassName("hc-results-score")[0].innerHTML = "A+";
	} else if (myTopics[0].score >= 4.2) {
		document.getElementById("hc-results-section").getElementsByClassName("hc-results-score")[0].innerHTML = "A";
	} else if (myTopics[0].score >= 4.0) {
		document.getElementById("hc-results-section").getElementsByClassName("hc-results-score")[0].innerHTML = "A-";
	} else if (myTopics[0].score >= 3.7) {
		document.getElementById("hc-results-section").getElementsByClassName("hc-results-score")[0].innerHTML = "B+";
	} else if (myTopics[0].score >= 3.2) {
		document.getElementById("hc-results-section").getElementsByClassName("hc-results-score")[0].innerHTML = "B";
	} else if (myTopics[0].score >= 3.0) {
		document.getElementById("hc-results-section").getElementsByClassName("hc-results-score")[0].innerHTML = "B-";
	} else if (myTopics[0].score >= 2.7) {
		document.getElementById("hc-results-section").getElementsByClassName("hc-results-score")[0].innerHTML = "C+";
	} else if (myTopics[0].score >= 2.2) {
		document.getElementById("hc-results-section").getElementsByClassName("hc-results-score")[0].innerHTML = "C";
	} else if (myTopics[0].score >= 2.0) {
		document.getElementById("hc-results-section").getElementsByClassName("hc-results-score")[0].innerHTML = "C-";
	} else if (myTopics[0].score >= 1.7) {
		document.getElementById("hc-results-section").getElementsByClassName("hc-results-score")[0].innerHTML = "D+";
	} else if (myTopics[0].score >= 1.2) {
		document.getElementById("hc-results-section").getElementsByClassName("hc-results-score")[0].innerHTML = "D";
	} else if (myTopics[0].score >= 1.0) {
		document.getElementById("hc-results-section").getElementsByClassName("hc-results-score")[0].innerHTML = "D-";
	} else {
		document.getElementById("hc-results-section").getElementsByClassName("hc-results-score")[0].innerHTML = "F";
	}
}

function displayResults() {
	console.log("displayResults");

	toggleVisibility(document.getElementById("hc-results-section"));
	toggleVisibility(document.getElementById("hc-question-section"));
	toggleVisibility(document.getElementsByClassName("hc-results-actions-wrapper")[0],1000);
	toggleVisibility(document.getElementById("hc-user-info"), 1500);

	//calculate!
	console.log("Calculating...");
	calculateScores(showScores);

	document.getElementById("hc-results-request").addEventListener("click", function() {
		window.localStorage.clear();
	});
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
		theProgressBar;

	window.scroll({ top: 0, left: 0, behavior: 'smooth' });

	console.log("displayNextQuestionSet: Screen #" + myCurrentScreen + " out of " + myQuestions[myQuestions.length - 1].screen);
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
	theProgressBar = theQuestionSection.removeChild(theQuestionSection.getElementsByClassName("hc-progress-bar")[0]);
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

	document.getElementById("hc-question-1").getElementsByClassName("hc-answer-key")[0].getElementsByTagName("input")[2].focus();

	theProgressBar = theQuestionSection.insertBefore(theProgressBar, theQuestionSection.firstElementChild);
	theProgressBar.getElementsByClassName("hc-progress")[0].style.width = (1 + (99 * myCurrentTopQuestion / myQuestions.length)) + "%";
	theProgressBar.getElementsByTagName("p")[0].innerHTML = "";
	theProgressBar.getElementsByTagName("p")[0].appendChild(document.createTextNode(myCurrentTopQuestion + " of " + myQuestions.length + " completed (" + Math.trunc(1 + (99 * myCurrentTopQuestion / myQuestions.length)) + "%)"));

	theButton = theQuestionSection.appendChild(theButton);
	localStorage.setItem('theQuestionSection',theQuestionSection.innerHTML);

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
		console.log(myNumberArray.pop() + " removed from end of array");
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
	myReadyState++;
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
		console.log("Answer to #" + (myCurrentTopQuestion + index - 1) + " stored: " + myTotal);
		if (myCurrentTopQuestion + index === myQuestions.length) {
			flagDone = true; //end of survey!
			console.log((myCurrentTopQuestion + index) + " questions answered; complete!");
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
		console.log("Recovering " + myCurrentScreen + " screens...");

		if (localStorage.getItem('theQuestionSection')) {
			// alert("Local storage contains " + localStorage.getItem('theQuestionSection'));
			document.getElementById("hc-question-section").innerHTML = localStorage.getItem('theQuestionSection');
		}

		for (var i = 0; i < myQuestions.length; i++) {
			console.log("Looking for answers to question " + i);
			if (localStorage.getItem('answer' + i) ) {
				myQuestions[i].answer = Number(localStorage.getItem('answer' + i));
				console.log(i + ": " + myQuestions[i].answer);
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

function waitUntilReady(howMany, callback) {
	setTimeout(function() {
		if (myReadyState >= howMany) {
			callback();
		} else {
			waitUntilReady(callback);
		}
	}, 50);
}

function loadQuestions() {
	//Pull questions from the latest version hc_questions; metadata from the latest hc_question_numbers

	readFile("data/hc_questions_v2.0.txt", storeLoadedQuestions);
	readFile("data/hc_question_numbers_v2.0.csv", storeLoadedQuestionNumbers);

	waitUntilReady(2, function() {
		recoverLocalData(beginSurvey);
	});

	//note: should have error trapping, to be implemented
}

function createReport() {

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