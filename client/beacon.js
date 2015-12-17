var Model = function() {
    var baseUrl = "http://vm150.nubes.stfc.ac.uk/api";
    
    this.getNextClue = function(beaconGuid, answerKey, cb) {
        fetch(baseUrl + '/beacon/' + beaconGuid + '/nextclue?' + answerKey)
        .then(function(response) {
            return response.json();
        })
        .then(cb)
        .catch(function(message) {
            console.log(message);
        });
    }
    
    this.getBeaconInfo = function(beaconGuid, cb) {
        fetch(baseUrl + '/beacon/' + beaconGuid)
        .then(function(response) {
            return response.json();
        })
        .then(cb)
        .catch(function(message) {
            console.log(message);
        });
    }
    ;
    
    this.verifyAnswer = function(beaconGuid, riddleAnswer, cb) {
        fetch(baseUrl + '/beacon/' + beaconGuid + '/answer?' + riddleAnswer)
        .then(function(response) {
            return response.json();
        })
        .then(cb)
        .catch(function(message) {
            console.log(message);
        });
    }
}

var View = function() {
    this.setBeaconNumber = function(beaconNumber) {
        document.getElementById("beacon-number").innerHTML = beaconNumber;
    }
    
    this.setRiddle = function(riddle) {
        document.getElementById("riddle").innerHTML = riddle;
    }
    
    this.setCurrentAnswer = function(answer) {
        document.getElementById("current-answer").innerHTML = answer;
    }
    
    this.setCurrentAnswerCorrectness = function(correctness) {
        document.getElementById("current-answer").class = "wrong";
    }
    
    this.addIncorrectAnswer = function(answer) {
        answerList = document.getElementById("answer-list");
        answerList.innerHTML = answerList.innerHTML + "<div class=\"incorrect-answer\">" + answer + "</div>";
    }
    
    this.removeCurrentAnswer = function() {
        this.setCurrentAnswer("");
    }
    
    this.setNextClue = function(clue) {
        document.getElementById("next-clue").innerHTML = clue;
    }
}

view = new View();
model = new Model();
beaconGuid = window.location.search.slice(1);

window.onload = function() {
    view.setBeaconNumber(model.getBeaconNumber(beaconGuid));
    view.setRiddle(model.getRiddle(beaconGuid));
}

var recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.onresult = function(event) {
    for (var i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
            updateAnswer(event.results[i][0].transcript);
        }
    }
}
recognition.start();

function updateAnswer(answer) {
    view.setCurrentAnswer(answer);
    model.verifyAnswer(beaconGuid, answer, function(json) {
        var answerCorrectness = json
        
        view.setCurrentAnswerCorrectness(answerCorrectness);
        
        if (answerCorrectness) {
            view.setNextClue(model.getNextClue(beaconGuid, answerCorrectness));
            recognition.stop();
        } else {
            view.addIncorrectAnswer(answer);
            view.removeCurrentAnswer(answer);
        }
    });
}
