import database from './config';
console.log(database)


//==========================Query===============================================
export function getStoryNumber(uid){
  var ref = database.collection("users");
  var query = ref.where("uid", "==", uid);
    query.get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            console.log(doc.data().numStories);
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
}

export function topUsers(x){
  var ref = database.collection("users");
  var query = ref.orderBy("numStories").limit(x);
  query.get()
  .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          console.log(doc.data().username);
      });
  })
  .catch(function(error) {
      console.log("Error getting documents: ", error);
  });

  }

//===================Firestore==================================================
export function writeUserData(uid, username, numStories){
database.collection("users").doc(uid.toString()).set({
    uid:uid,
    username: username,
    numStories: numStories
});
}

export function writeStoryData(uid, sid, timestamp, string) {
database.collection("stories").doc(sid).set({
  uid: uid,
  sid: sid,
  timestamp: timestamp,
  string: string,
});
//NOSref.set({nos: NOSkey + 1})
}

export function writeEntityInStoryData(sid, estring, order, sentiment) {
database.collection("entityInStory").doc(sid+ " " + estring).set({
 estring: estring,
 sid: sid,
 order: order,
 sentiment: sentiment //0=negative 1=neutral 2=positive
});
}

export function writeEntityData(name) {
database.collection("entity").doc(name).set({
      name: name
  });
}

export function writeImageData(iid, name, sentiment, url, numVotes) {
database.collection("image").doc(iid).set({
iid: iid,
name: name,
sentiment: sentiment,
url: url,
numVotes: numVotes
});
}

export function initApp() {
    var i = 1;
    for(i = 1; i <= 20; i++){
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
