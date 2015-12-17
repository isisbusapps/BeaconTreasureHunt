from riddle import Riddle

riddle1 = Riddle(Riddle.riddleCount + 1,"abcdef", "Meme?","Meme")
riddle2 = Riddle(Riddle.riddleCount + 1,"bcdefg", "Meme meme?","Meme meme")
print(riddle1.displayInfo())
print(riddle2.displayInfo())
