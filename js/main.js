var myVersion = "2.0";

var myQuestions = [],
	myTopics = [];

var myCurrentScreen = 0,
	myCurrentTopQuestion = 0,
	myReadyState = 0;


let Session = function (uuid, version, email) {
	return {
		uuid: uuid || "session1",
		version: version || "0.0",
    email: email || ""
	};
}

let Topic = function (index, name, score) {
  return {
		index: index || 0,
		name: name || "Topic",
    score: score || 0
	};
}

function User (name, title, company, phone, contactPreference) {
	this.name = name;
	this.title = title;
	this.company = company;
	this.phone = phone;
	this.contactPreference = contactPreference || "phone";

	return {
		name: name,
		title: title,
		company: company,
		phone: phone,
		contactPreference
	};
}

function Question (number, text, topic, screen, answer) {
	this.number = number;
	this.text = text;
	this.topic = topic;
	this.screen = screen;
	this.answer = answer;
}

function log (text) {
//  console.log(text);
}

function stripSpecialChars (string) {
  if (typeof string !== "string") {
    return "";
  }
  return string.replace(/[^\w\s@.-_*#]/gi, '');
}

function extendFormSubmit(event) {
  let theForm = document.forms["hc-user-info"];
  for (let i = 0; i < theForm.elements.length; i += 1) {
    theForm.elements[i].value = stripSpecialChars(theForm.elements[i].value);
  }
  window.localStorage.clear();
}

function jumpToNextQuestion (myElement) {
	var myQuestionNumber = 1 + Number(myElement.getAttribute("name").replace(/hc-answers-/,""));
	var myNextQuestion = document.getElementById("hc-question-" + myQuestionNumber);
	if (myNextQuestion) {
		if (myElement.parentNode.getAttribute("data-scrolled") === "false") {
			window.scroll({ top: (myNextQuestion.getBoundingClientRect().top + window.scrollY - 100), left: 0, behavior: 'smooth' });
			myNextQuestion = myNextQuestion.getElementsByClassName("hc-answer-key")[0].getElementsByTagName("input")[0];
			myNextQuestion.focus();
			myElement.parentNode.setAttribute("data-scrolled", "true");
		}
	} else {
		if (myElement.parentNode.getAttribute("data-scrolled") === "false") {
			myNextQuestion = document.getElementById("hc-button-next");
			window.scroll({ top: myNextQuestion.getBoundingClientRect().top + window.scrollY - 100, left: 0, behavior: 'smooth' });
			myNextQuestion.focus();
			myElement.parentNode.setAttribute("data-scrolled", "true");
		}
	}
}

function toggleVisibility (element, waitTime) {
	waitTime = waitTime || 500;
	if (element.classList.contains("gone") || element.classList.contains("hidden")) {
		element.classList.remove("gone");
		setTimeout(function () {
      element.classList.remove("hidden");
    }, waitTime);
	} else {
		element.classList.add("hidden");
		element.classList.add("gone");
	}
}

function calculateScores (callback) {
	var indexTopic = 0,
		countQuestionsInTopic = 0;

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
	callback();
}

function showScores () {
	var myScoreBox = document.getElementById("hc-results-section").getElementsByClassName("hc-results-score")[0];

	//set topic score bars -- currently invisible
	[].forEach.call(document.getElementById("hc-results-section").getElementsByClassName("hc-progress"), function (element, index) {
		element.nextElementSibling.innerHTML = myTopics[index + 1].name;
		element.style.transform = "scaleX(" + (0.5 * (myTopics[index + 1].score) + 0.02) + ")";
		element.style.transition = "transform 2s ease-in-out";
		if (myTopics[index + 1].score < 3 && myTopics[index + 1].score >= 2) {
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
	return Session (
    stripSpecialChars(document.getElementById('hc-session-id').innerHTML),
    myVersion,
    stripSpecialChars(document.getElementById('hc-user-email').innerHTML)
  );
}

function addHiddenToForm (theForm, key, value) {
    var input = document.createElement('input');
    input.type = 'hidden';
    input.name = key;
    input.value = value;
    theForm.appendChild(input);
}

function writeSessionToForm () {
	let sessionInfo = createSessionObj();
  let theForm = document.forms['hc-user-info'];

  for (let key in sessionInfo) {
    addHiddenToForm(theForm, 'hc-session-' + key, sessionInfo[key]);
  }

  myTopics.forEach(function (element, index) {
    for (let key in element) {
      addHiddenToForm(theForm, 'hc-topics[' + index + '][' + key + ']', element[key]);
    }
  });

  myQuestions.forEach(function (element, index) {
    for (let key in element) {
      addHiddenToForm(theForm, 'hc-questions[' + index + '][' + key + ']', element[key]);
    }
  });
}

function postSurveyData (url, callback) {
  let topics = myTopics,
    questions = myQuestions,
    session = createSessionObj(),
    json = encodeURIComponent(JSON.stringify([session, topics, questions]));
    postRequest = new XMLHttpRequest();

	postRequest.open("POST", url, true);
	postRequest.setRequestHeader("Content-type", 'application/json');//'application/json');

	postRequest.onreadystatechange = function () {
		if (postRequest.readyState === XMLHttpRequest.DONE && (postRequest.status === 200 || postRequest.status === 201)) {
      callback(postRequest.responseText);
		}
  };
	postRequest.send(json);
}

function displayResults () {
	toggleVisibility(document.getElementById("hc-results-section"));
	toggleVisibility(document.getElementById("hc-question-section"));
	toggleVisibility(document.getElementsByClassName("hc-results-actions-wrapper")[0],1000);
	toggleVisibility(document.getElementById("hc-user-info"), 1500);

	calculateScores(showScores);

	writeSessionToForm();
  postSurveyData('report/index.php', log);

  //postSurveyData('./report/index.php'); // doesn't work yet
  let theForm = document.forms["hc-user-info"];

  document.getElementById("hc-results-request").addEventListener(
    "click",
    extendFormSubmit
  );
}

function displayNextQuestionSet () {
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

	if (myCurrentScreen === myQuestions[myQuestions.length - 1].screen) {
		displayResults();
		return;
	}

	myCurrentScreen++;

	theQuestionSection = document.getElementById("hc-question-section");

	theQuestionTemplate = theQuestionSection.removeChild(document.getElementById("hc-question-1"));
	theButton = theQuestionSection.removeChild(document.getElementsByClassName("hc-button-wrapper")[0]);
	theTopicHeader = theQuestionSection.getElementsByClassName("hc-topic-header")[0];
	theProgressBar = theTopicHeader.removeChild(theTopicHeader.getElementsByClassName("hc-progress-bar")[0]);
	theTopicHeader = theQuestionSection.removeChild(theTopicHeader);
	theQuestionSection.innerHTML = "";

	myQuestions.forEach(function (element) {
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
			[].forEach.call(tempAnswers.getElementsByTagName("label"), function (element) {
				tempNumber++;
				element.setAttribute("for", "hc-answers-" + numQuestionsDisplayed + "-" + tempNumber);
			});
			tempNumber = 0;
			[].forEach.call(tempAnswers.getElementsByTagName("input"), function (element) {
				tempNumber++;
				element.setAttribute("name", "hc-answers-" + numQuestionsDisplayed);
				element.setAttribute("id", "hc-answers-" + numQuestionsDisplayed + "-" + tempNumber);
				element.checked = false;
				element.addEventListener("click", function (e) {if (e.screenX > 0) {jumpToNextQuestion(this);}}, {once: true});
				element.addEventListener("focusin", function (e) {this.parentNode.classList.add("focused"); this.parentNode.parentNode.parentNode.classList.add("focused");});
				element.addEventListener("focusout", function (e) {this.parentNode.classList.remove("focused"); this.parentNode.parentNode.parentNode.classList.remove("focused");});
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
	theProgressBar.getElementsByClassName("hc-progress")[0].style.transform = "scaleX(" + tempNumber + ")";
	theProgressBar.getElementsByTagName("p")[0].innerHTML = "";
	theProgressBar.getElementsByTagName("p")[0].appendChild(document.createTextNode(myCurrentTopQuestion + " of " + myQuestions.length + " completed (" + Math.trunc(1 + (99 * myCurrentTopQuestion / myQuestions.length)) + "%)"));

	theButton = theQuestionSection.appendChild(theButton);
	localStorage.setItem('theQuestionSection',theQuestionSection.innerHTML);

}

function storeLoadedTopics (rawText, callback) {
	var myArray = rawText.split('\n');

	myArray = myArray.map(function (element, index, array) {
		var tempTopicArray = element.split('\t');
		tempTopicArray[0] = Number(tempTopicArray[0]);
		return tempTopicArray;
	});

	while (myArray[myArray.length - 1][0] === 0 || isNaN(myArray[myArray.length - 1][0])) {
		myArray.pop();
	}

	if (!(myTopics.length < 0)) {
		myTopics.push(new Topic(0, "Total Score", 0));
		for (var i = 1; i <= myArray.length; i++) {
			myTopics.push(new Topic(myArray[i - 1][0], myArray[i - 1][1], 0));
		}
	}

	myReadyState++;
  callback();
}

function storeLoadedQuestions (rawText, callback) {
	var myQuestionArray = rawText.split('\n');
	myQuestionArray = myQuestionArray.map(function (element) {
		return element.trim();
	});
	for (var i = 0; i < myQuestionArray.length; i++) {
		if (myQuestionArray[i].length < 5) {
			myQuestionArray.splice(i, 1);
			i--;
		}
	}
	myQuestionArray.forEach(function (element, index, array) {
		if (myQuestions.length > index) {
			myQuestions[index].text = element;
		} else {
			myQuestions.push(new Question(0, element, 0, 0, 0));
		}
	});
	myReadyState++;
  callback();
}

function storeLoadedQuestionNumbers (rawText, callback) {
	var myNumberArray = rawText.split('\n');
	var tempNumberArray = [];
	var tempSubArray = [];
	var temp = [0];
	myNumberArray = myNumberArray.map(function (element, index, array) {
		var tempSubArray = element.split('\t');
		return tempSubArray.map(function (elt) {
			return Number(elt);
		});
	});
	while (myNumberArray[myNumberArray.length - 1][0] === 0 || isNaN(myNumberArray[myNumberArray.length - 1][0])) {
		myNumberArray.pop();
	}
	myNumberArray.forEach(function (element, index, array) {
		if (myQuestions.length > index) {
			myQuestions[index].number = element[0];
			myQuestions[index].topic = element[1];
			myQuestions[index].screen = element[2];
		} else {
			myQuestions.push(new Question(element[0], "", element[1], element[2], 0));
		}
	});
	myReadyState++;
  callback();
}

function readFile (url, callback) {
	var myFile = new XMLHttpRequest(),
		myFullText = "";
	myFile.open("GET", url, true);
	myFile.onreadystatechange = function () {
		if (myFile.readyState === XMLHttpRequest.DONE && myFile.status === 200) {
			callback(myFile.response, function () {
        checkFilesLoaded(3);
      });
		}
	}
	myFile.send();
}

function checkAnswers () {
	//Validate current set of responses; flag unanswered questions; returns 0 (error) or 1 (okay)
	var myAnswerSet = document.getElementsByClassName("hc-answer-key"),
		myTopUncheckedAnswer = null;

	[].forEach.call(myAnswerSet, function (element, index) {
		var isChecked = 0;
		[].forEach.call(element.getElementsByTagName("input"), function (innerElement) {
			isChecked += innerElement.checked;
		});
		if (isChecked === 0) {
			if (myTopUncheckedAnswer === null) {
				myTopUncheckedAnswer = element;
			}
			element.parentNode.parentNode.getElementsByClassName("hc-question-number")[0].classList.add("warning");
		} else {
			element.parentNode.parentNode.getElementsByClassName("hc-question-number")[0].classList.remove("warning");
		}
	});
	if (myTopUncheckedAnswer === null) {
		return true;
	}
	window.scroll({ top: myTopUncheckedAnswer.parentNode.parentNode.getBoundingClientRect().top + window.scrollY - 100, left: 0, behavior: 'smooth' });
	myTopUncheckedAnswer.focus();
	return false;
}

function scrapeAnswers () {
	//get current set of answers, check for completion, save answers in myQuestions, update local storage of myQuestions
	var myAnswerSet = document.getElementsByClassName("hc-answer-key"),
		flagDone = false;

	[].forEach.call(myAnswerSet, function (element, index) {
		var myTotal = 0;
		[].forEach.call(element.getElementsByTagName("input"), function (innerElement) {
			myTotal += innerElement.checked * innerElement.value;
		});
		myQuestions[myCurrentTopQuestion + index - 1].answer = myTotal;
		localStorage.setItem('answer' + (myCurrentTopQuestion + index - 1), myTotal);
		if (myCurrentTopQuestion + index === myQuestions.length) {
			flagDone = true; //end of survey!
		}
	});
	localStorage.setItem('myCurrentScreen', myCurrentScreen);
	if (flagDone) {
		myCurrentTopQuestion = myQuestions.length;
	}
}

function recoverLocalData (callback) {
	if (localStorage.getItem('myCurrentScreen') > 0) {
		myCurrentScreen = Number(localStorage.getItem('myCurrentScreen'));

		if (localStorage.getItem('theQuestionSection')) {
			document.getElementById("hc-question-section").innerHTML = localStorage.getItem('theQuestionSection');
		}

		for (var i = 0; i < myQuestions.length; i++) {
			if (localStorage.getItem('answer' + i) ) {
				myQuestions[i].answer = Number(localStorage.getItem('answer' + i));
			} else {
				i = myQuestions.length;
			}
		}
	}
	callback();
}

function beginSurvey () {
	document.getElementById("hc-button-next").addEventListener("click", function () {
    if (checkAnswers()) {
			scrapeAnswers();
			displayNextQuestionSet();
		}
	});

	displayNextQuestionSet();
}

function checkFilesLoaded () {
  if (myReadyState >= 3) {
		recoverLocalData(beginSurvey);
	}
}

function loadQuestions () {

	readFile("data/hc_questions_v" + myVersion + ".txt", storeLoadedQuestions);
	readFile("data/hc_question_numbers_v" + myVersion + ".csv", storeLoadedQuestionNumbers);
	readFile("data/hc_topics_v" + myVersion + ".txt", storeLoadedTopics);

}

window.addEventListener("load", loadQuestions);
