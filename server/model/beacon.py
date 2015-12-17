class Beacon:
	__beaconCount = 0

#Constructor
	def __init__(self, number, url, locationClueNumber, order, riddleNumber):		
		self.__number = number
		self.__url = url
		self.__locationClueNumber = locationClueNumber
		self.__order = order
		self.__riddleNumber = riddleNumber
		Beacon.__beaconCount += 1

#Getters		
	def getUrl(self):
		return self.__url
		
	def getNumber(self):
		return __number
		
	def getLocationClueNumber(self):
		return __locationClueNumber
	
	def getOrder(self):
		return __order
	
	def getRiddleNumber(self):
		return __riddleNumber
	
# Setters	
	def setUrl(self, url):
		self.__url = url
		
	def setGuid(self, guid):
		self.__guid = guid
		
	def setLocationClue(self, ocationClueNumber):
		self.__locationClueNumber = locationClueNumber
	
	def setOrder(self, order):
		self.__order = order
	
	def setRiddleNumber(self, riddleNumber):
		self.__riddleNumber = riddleNumber
	
	def displayCount(self):
		return "Total Beacon " + str(Beacon.__beaconCount)
		
	def displayBeacon(self):
		strToReturn = "Url : " + self.__url + ", Number : " + self.__number  + ", Location Clue Number: " + self.__locationClueNumber + ", Order : " + str(self.__order) + ", Riddle Number : " + str(self.__riddleNumber)
	
		return strToReturn
		

