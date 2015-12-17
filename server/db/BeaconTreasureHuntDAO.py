from pymongo import MongoClient
from bson.json_util import dumps

class BeaconTreasureHuntDAO:

    def __init__(self):
        self.SERVER = 'vm150.nubes.stfc.ac.uk'
        self.PORT = 27017
        self.TREASURE_HUNT_DB = 'beacontreasurehunt'

        self.init_mongo_client();

    def init_mongo_client(self):
        client = MongoClient(self.SERVER, self.PORT)
        self.__db = client[self.TREASURE_HUNT_DB]

    # Returns a single document from the given collection that matches the value in the given field map
    def find_doc_by_fields(self, collection_name, field_map):
        col = self.__db[collection_name]
        return col.find_one(field_map)

    # Returns a ___ from the given collection that matches the value in the given field map
    def find_docs_by_fields(self, collection_name, field_map):
        col = self.__db[collection_name]
        cursor = col.find(field_map)
        return dumps(cursor)
