import database from './config';

console.log(database);

//Retrieving a given user’s stories
export function getStories(uid){
  var ref = database.ref("stories");
  ref.orderByChild("uid").equalTo(uid).on("child_added", function(data){
    console.log(data.val().string);
  })
}

//Retrieve a given story’s entities in order
export function getStoryEntities(sid){
  var ref = database.ref("entityInStory");
  ref.orderByChild("sid").equalTo(sid).on("child_added", function(data){
    console.log(data.val().estring);
  })
}

//loop up the number of stories that a user has
export function getStoryNumber(uid){
  var ref = database.ref("users");
  ref.orderByChild("uid").equalTo(uid).on("child_added", function(data){
    console.log(data.val().numStories);
  })
}

//Rank users by their number of stories
//return the top x users ordered by number of stories they have
export function topUsers(x){
  var ref = database.ref("users");
  ref.orderByChild("numStories").limitToFirst(x).on("child_added", function(data){
    console.log(data.val().username);
  })
}

/*
For an entity return the top three images that correspond positive, negative, and neutral sentiments
*/
//top three positive images
//top three negative images
//top three neutral images

  /*
   * initApp handles setting up UI event listeners and registering Firebase auth listeners:
   *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
   *    out, and that is where we update the UI.
   */
function writeUserData(uid, username, numStories) {
    database.ref('users/' + uid).set({
      uid:uid,
      username: username,
      numStories: numStories
    });
  }

function writeStoryData(uid, sid, timestamp, string) {
   database.ref('stories/' + sid).set({
     uid: uid,
     sid: sid,
     timestamp: timestamp,
     string: string,
  });
   //NOSref.set({nos: NOSkey + 1})
  }

function writeEntityInStoryData(sid, estring, order, sentiment) {
  database.ref('entityInStory/' + estring).set({
    sid: sid,
    order: order,
    sentiment: sentiment //0=negative 1=neutral 2=positive
  });
  }

function writeEntityData(name) {
     database.ref('entity/' + name).set({
         name: name
     });
  }

function writeImageData(iid, name, sentiment, url, numVotes) {
  database.ref('image/' + iid).set({
   iid: iid,
   name: name,
   sentiment: sentiment,
   url: url,
   numVotes: numVotes
  });
  }

export function initApp() {
  var i = 1;
      for (; i <= 20; i++){
          writeUserData(i,'test'+i+'@test.com', 1);
          if(i <= 10){
              writeStoryData(i, 's'+i, Date.now(), 'I ate McDonald\'s this morning!');
              writeEntityInStoryData('s'+i, 'McDonald\'s', 1, 0);
              writeEntityData('McDonald\'s');
              writeImageData('i'+i, 'McDonald\'s', 1, ['https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/McDonald%27s_Golden_Arches.svg/1200px-McDonald%27s_Golden_Arches.svg.png'], 0);
          }
          else{
              writeStoryData(i, 's'+i, Date.now(), 'I drank Coca Cola this evening!');
              writeEntityInStoryData('s'+i, 'Coca Cola', 1, 0);
              writeEntityData('Coca Cola');
              writeImageData('i'+i, 'Coca Cola', 1, ['https://tse2.mm.bing.net/th?id=OIP.0_ezIcFekTq93JbSIhNVNQErDQ&pid=15.1'], 0);
          }
      }
    }
