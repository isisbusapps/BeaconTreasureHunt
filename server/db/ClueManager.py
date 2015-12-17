import sys
sys.path.append("../model")
from clue import Clue
from BeaconTreasureHuntDAO import BeaconTreasureHuntDAO

class ClueManager:

    CLUE_COLLECTION = "clue"

    def getClueById(self, clueId):
        # NOTE: We are creating a new instance of the mongo client here just for testing purposes
        # This should be removed once we have the WS running and multiple "Managers" needing to use it
        # (How we get the managers to know about the single client is another problem)
        dao = BeaconTreasureHuntDAO()
        args = {"_id": clueId}
        doc = dao.find_doc_by_fields(CLUE_COLLECTION, args)
        return clue = Clue(**doc)
