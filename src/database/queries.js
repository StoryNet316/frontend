import database from './config';
console.log(database)


//==========================User-Related Query===============================================
export function getUserStory(uid){
    var ref = database.collection("stories");
    var query = ref.where("uid", "==", uid);

    query.get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            console.log(doc.data().sid);
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
}

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

//==========================Story-Related Query===============================================

export function getEntitiesInStory(sid){
    var ref = database.collection("stories").doc(sid).collection("entities");
    var query = ref.orderBy("order");

    query.get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            console.log(doc.data().estring);
    });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
        });
}

export function setPublic(sid){
    var ref = database.collection("stories");
    return ref.doc(sid).update({
        privacy: false
    })
    .then(function() {
        console.log("Publicity for "+ sid +" successfully set!");
    })
    .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
}

export function setPrivate(sid){
    var ref = database.collection("stories");
    return ref.doc(sid).update({
        privacy: true
    })
    .then(function() {
        console.log("Privacy for " + sid + " successfully updated!");
    })
    .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
}

export function getPop(sid){
    var ref = database.collection("stories").doc(sid);

        return ref.get().then(function(doc) {
            if (doc && doc.exists) {
                return Promise.resolve(doc.data().popularity)
            }
            else {
                return Promise.resolve("doc not found")
            }
        })
}

export function upvoteStory(sid){
    var ref = database.collection("stories").doc(sid);
    getPop("s1").then(function(result){
        return ref.update({
            popularity: result + 1
        })
        .then(function() {
            console.log("Popularity successfully upvoted!");
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
    })
    //getPop(sid).then(function(result){
    //    console.log(result)
    //})

}


//===================Firestore Database Write==================================================
export function writeUserData(uid, username, numStories){
    database.collection("users").doc(uid.toString()).set({
        uid:uid,
        username: username,
        numStories: numStories
    });
}

export function writeStoryData(uid, sid, timestamp, string, pop, privacy) {
    database.collection("stories").doc(sid).set({
        uid: uid,
        sid: sid,
        timestamp: timestamp,
        string: string,
        popularity: pop,
        privacy: privacy
    });
}

export function writeEntityInStoryData(sid, estring, order, sentiment) {
    database.collection("stories").doc(sid).collection("entities").doc(estring).set({
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
    writeEntityInStoryData("s1", "test", 2, 0);
    writeEntityInStoryData("s1", "test1", 11, 0);
    writeEntityInStoryData("s1", "test1", 111, 0);

    var i = 1;
    for(i = 1; i <= 20; i++){
        writeUserData(i,'test'+i+'@test.com', 1);
        if(i <= 10){
            var d = new Date();
            writeStoryData(i, 's'+i, d, 'I ate McDonald\'s this morning!', 0, false);
            writeEntityInStoryData('s'+i, 'McDonald\'s', 1, 0);
            writeEntityData('McDonald\'s');
            writeImageData('i'+i, 'McDonald\'s', 1, ['https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/McDonald%27s_Golden_Arches.svg/1200px-McDonald%27s_Golden_Arches.svg.png'], 0);
        }
        else{
            var d = new Date();
            writeStoryData(i, 's'+i, d, 'I drank Coca Cola this evening!', 0, false);
            writeEntityInStoryData('s'+i, 'Coca Cola', 1, 0);
            writeEntityData('Coca Cola');
            writeImageData('i'+i, 'Coca Cola', 1, ['https://tse2.mm.bing.net/th?id=OIP.0_ezIcFekTq93JbSIhNVNQErDQ&pid=15.1'], 0);
        }
    }
}
