import database from './config';

console.log(database)

export function getStories(sid){
  var ref = database.ref("stories");
  ref.orderByChild("sid").equalTo(sid).on("child_added", function(data){
    console.log(data.val().string);
  })
}
