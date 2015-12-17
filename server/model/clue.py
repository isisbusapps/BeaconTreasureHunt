class Clue:
    #class for each clue, containing
    #the clue number, the clue string, and the clue code
    clueCount = 0

    def __init__(self, **entries):
        self.__dict__.update(entries)
        Clue.clueCount += 1

    def getId(self):
        return self._id

    def getClue(self):
        return self.clue

    def getCode(self):
        return self.code

    def displayInfo(self):
        returnString = "Clue Id: %d" % self._id
        returnString += "\nClue: %s" % self.clue
        returnString += "\nUnlock Code: %s" % self.code
        return returnString
