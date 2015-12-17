from beacon import Beacon

bea1 = Beacon("http://www.bbc.co.uk", "123456789", "behind the sofa", 1, 1)

bea2 = Beacon("http://www.bbc.co.uk", "234567891", "under the plant pot", 2, 2)

print("bea1 " + bea1.displayBeacon())
print("bea2 " + bea2.displayBeacon())
print ("bea2 url" + bea2.getUrl())
bea2.setUrl("www.google.co.uk")
print ("bea2 url" + bea2.getUrl())