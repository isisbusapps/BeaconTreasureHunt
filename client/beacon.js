var Model = function() {
  this.getNextClue = function(beaconGuid, answerKey) {
    if(answerKey === 1234) {
      return "clue text";
    }
  }

  this.getBeaconInfo = function(beaconGuid) {
        return {
            "beaconNumber":"1",
            "beaconRiddle":"this is a riddle"
        }
    }

    this.getBeaconNumber = function(beaconGuid) {
        return this.getBeaconInfo(beaconGuid).beaconNumber;
    }
    
    this.getRiddle = function(beaconGuid) {
        return this.getBeaconInfo(beaconGuid).beaconRiddle;
    }
    
    this.verifyAnswer = function(beaconGuid, riddleAnswer) {
      if(riddleAnswer.trim() === "hello world") {
        return 1234;
      }
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
    this.setCurrentAnswer("");
  }

  this.setNextClue = function (clue) {
    document.getElementById("next-clue").innerHTML = clue;
  }
}

view = new View();
model = new Model();
beaconGuid = window.location.search.slice(1);

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
      updateAnswer(event.results[i][0].transcript);
    } 
  }
}
recognition.start();

function updateAnswer(answer) {
  view.setCurrentAnswer(answer);
  answerCorrectness = model.verifyAnswer(answer);

  view.setCurrentAnswerCorrectness(answerCorrectness);

  if(answerCorrectness) {
    view.setNextClue(model.getNextClue(beaconGuid, answerCorrectness));
    recognition.stop();
  } else {
    view.addIncorrectAnswer(answer);
    view.removeCurrentAnswer(answer);
  }

}