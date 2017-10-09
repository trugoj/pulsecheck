import pymongo

di = {'pulse': 3}

client = pymongo.MongoClient('mongodb://localhost:27017/')
coll = client['pc_back'].pulse

for el in coll.find():
    print(el)

coll.insert_one(di)
