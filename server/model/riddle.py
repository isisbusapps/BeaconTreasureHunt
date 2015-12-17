class Riddle:
    #Class for each beacon, containing
    #the unique address, riddle string, answer and id
    riddleCount = 0

    def __init__(self, **entries):
        self.__dict__.update(entries)
        Riddle.riddleCount += 1

    def getId(self):
        return self._id

    def getRiddle(self):
        return self.riddle

    def setRiddle(self, riddle):
        self.riddle = riddle

    def getAnswer(self):
        return self.answer

    def setAnswer(self, answer):
        self.answer = answer

    def displayInfo(self):
        returnString = "Riddle Id: %d" % self._id
        returnString += "\nCurrent Address: %s" % self.url
        returnString += "\nRiddle: %s" % self.riddle
        returnString += "\nAnswer: %s" % self.answer
        return returnString
