// Mongo shell scripts are just js files...pretty cool hey
connection = new Mongo();
db = connection.getDB('beacontreasurehunt');

db.clue.insert(
  [
    { _id: 1, clue: 'clue-number-one', code: 'code-1'},
    { _id: 2, clue: 'clue-number-two', code: 'code-2'}
  ]
)

db.riddle.insert(
  [
    { _id: 1, riddle: 'riddle me this, if I am the first riddle what number riddle am I', answer: '1...of course!' },
    { _id: 2, riddle: 'riddle me this, if I am the second riddle what number riddle am I', answer: '2...of course!' }
  ]
)

db.beacon.insert(
  [
    { _id: 1, url:'beacon-1-url', clue_id: 1, order: 1, riddle_id: 1 },
    { _id: 2, url: 'beacon-2-url', clue_id: 2, order: 2, riddle_id: 2 }
  ]
)
