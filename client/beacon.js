var Model = function() {


  this.getNextClue = function(currentBeacon, answerKey) {
    return "clue text";
  }

  this.getBeaconInfo = function(beaconGuid) {
        return {
            "beaconNumber":"1",
            "beacon_riddle":"this is a riddle"
        }
    }

    this.getBeaconNumber = function(beaconGuid) {
        return this.getBeaconInfo(beaconGuid).beaconNumber;
    }
    
    this.getRiddle = function(beaconGuid) {
        return this.getBeaconInfo(beaconGuid).beacon_riddle;
    }
    
    this.verifyAnswer = function(riddleAnswer) {
        return "answerKey";
    }
};

var View = function() {
  this.setBeaconNumber = function(beaconNumber) {
    document.getElementById("beacon-number").innerHTML = beaconNumber;
  }
  
  this.setRiddle = function(riddle) {
    document.getElementById("riddle").innerHTML = riddle;
  }
    
  this.setCurrentAnswer = function (answer) {
    document.getElementById("current-answer").innerHTML = answer;
  }

  this.setCurrentAnswerCorrectness = function (correctness) {
    document.getElementById("current-answer").class = "wrong";
  }

  this.addIncorrectAnswer = function (answer) {
    answerList = document.getElementById("answer-list");
    answerList.innerHTML = answerList.innerHTML + "<div class=\"incorrect-answer\">" + answer + "</div>";
  }

  this.removeCurrentAnswer = function () {
    
  }
}

view = new View();
model = new Model();

function updateAnswer(answer) {
  Console.log(answer);

  view.setCurrentAnswer(answer);
  answerCorrectness = model.verifyAnswer(answer);

  view.setCurrentAnswerCorrectness(answerCorrectness);

  if(answerCorrectness) {
    view.setNextClue(model.getBeaconNumber(beaconGuid));
  } else {
    view.addIncorrectAnswer(currentAnswer);
    view.removeCurrentAnswer(answer);
  }
}

window.onload = function() {
    view.setBeaconNumber(model.getBeaconNumber("guid"));
    view.setRiddle(model.getRiddle("guid"));
}

var recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.onresult = function(event) {
  console.log(event);
  for (var i = event.resultIndex; i < event.results.length; ++i) {
    if (event.results[i].isFinal) {
      updateAnswer(event.results[i][0].result);
    } 
  }
}
recognition.start();