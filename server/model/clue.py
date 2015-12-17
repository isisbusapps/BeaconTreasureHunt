class Clue:
    #class for each clue, containing
    #the clue number, the clue string, and the clue code
    clueCount = 0

    def __init__(self,number,clue,code):
        self.__number = number
        self.__clue = clue
        self.__code = code
        Clue.clueCount += 1

    def getNumber(self):
        return self.__number

    def getClue(self):
        return self.__clue

    def getCode(self):
        return self.__code

    def displayInfo(self):
        returnString = "Clue Number: %d" % self.__number
        returnString += "\nClue: %s" % self.__clue
        returnString += "\nUnlock Code: %s" % self.__code
        return returnString
