class Riddle:
    #Class for each beacon, containing
    #the unique address, riddle string, answer and id
    riddleCount = 0

    def __init__(self, number,url, riddle, answer):
        self.__number = number
        self.__riddle = riddle
        self.__answer = answer
        self.__url = url
        Riddle.riddleCount += 1

    def getNumber(self):
        return self.__number
    
    def getUrl(self):
        return self.__url

    def getRiddle(self):
        return self.__riddle

    def getAnswer(self):
        return self.__answer

    def displayInfo(self):
        returnString = "Riddle Number: %d" % self.__number
        returnString += "\nCurrent Address: %s" % self.__url
        returnString += "\nRiddle: %s" % self.__riddle
        returnString += "\nAnswer: %s" % self.__answer
        return returnString

    
