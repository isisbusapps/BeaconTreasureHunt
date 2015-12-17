class Beacon:
	__beaconCount = 0

#Constructor
	def __init__(self, **entries):
        self.__dict__.update(entries)
        Beacon.beaconCount += 1

#Getters
	def getUrl(self):
		return self.url

	def getId(self):
		return self._id

	def getClueId(self):
		return self.clue_id

	def getOrder(self):
		return order

	def getRiddleId(self):
		return self.riddle_id

# Setters
	def setUrl(self, url):
		self.url = url

	def setClueId(self, clueId):
		self.clue_id = clueId

	def setOrder(self, order):
		self.order = order

	def setRiddleId(self, riddleId):
		self.riddle_id = riddleId

	def displayCount(self):
		return "Total Beacon " + str(Beacon.beaconCount)

	def displayBeacon(self):
		strToReturn = "Url : " + self.url + ", Id : " + self._id  + ", Clue Id: " + self.clue_id + ", Order : " + str(self.order) + ", Riddle Id : " + str(self.riddle_id)

		return strToReturn
