import database from './config';
console.log(database)
const userRef = database.collection("users")
export function test(){
     database.collection("stories").orderBy("popularity").limit(3)
     .onSnapshot(dataSnapshot => {
            console.log(dataSnapshot.docs);
     });
}

//==========================User-Related Query===============================================
export function getUserStories(uid){
    var ref = userRef.doc(uid.toString()).collection("stories")

    return ref.get().then(function(refSnapshot){
        let res = []
        refSnapshot.forEach(function(doc){
            doc && doc.exists ? res.push(doc.data().string) : null
        })
        return Promise.resolve(res)
    })
}

export function getUsername(uid){
    var ref = userRef.doc(uid.toString())
    return ref.get().then(function(refSnapshot){
        let res = []
        refSnapshot.forEach(function(doc){
            doc && doc.exists ? res.push(doc.data().username) : null
        })
        return Promise.resolve(res)
    })
}

export function getStoryNumber(uid){
  var ref = userRef.doc(uid.toString())

  return ref.get().then(function(doc) {
      if (doc && doc.exists) {
          return Promise.resolve(doc.data().numStories)
      }
      else {
          return Promise.resolve("doc not found")
      }
  })
}

export function topUsers(x){
  var ref = database.collection("users");
  var query = ref.orderBy("numStories").limit(x);

  return query.get().then(function(querySnapshot){
      let res = []
      querySnapshot.forEach(function(doc){
          doc && doc.exists ? res.push(doc.data().username) : null
      })
      return Promise.resolve(res)
  })

  }

export function numStoriesIncrement(uid){
    var ref = database.collection("users").doc(uid.toString());
      getStoryNumber(uid).then(function(result){
          return ref.update({
              numStories: result + 1
          })
          .then(function() {
              console.log("NumStories successfully incremented!");
          })
          .catch(function(error) {
              // The document probably doesn't exist.
              console.error("Error updating document: ", error);
          });
      })
  }


//==========================Story-Related Query===============================================

export function getEntitiesInStory(uid, sid){
    var ref = userRef.doc(uid.toString()).collection("stories").doc(sid.toString()).collection("entities");
    var query = ref.orderBy("order");

    return query.get().then(function(querySnapshot){
        let res = []
        querySnapshot.forEach(function(doc){
            doc && doc.exists ? res.push(doc.data().estring) : null
        })
        return Promise.resolve(res)
    })
}

export function setPublic(uid,sid){
    var ref = userRef.doc(uid.toString()).collection("stories");
    return ref.doc(sid.toString()).update({
        privacy: false
    })
    .then(function() {
        console.log("Privacy for user " + uid + "'s "+ sid + " is off!");
    })
    .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
}

export function setPrivate(uid,sid){
    var ref = userRef.doc(uid.toString()).collection("stories");
    return ref.doc(sid.toString()).update({
        privacy: true
    })
    .then(function() {
        console.log("Privacy for user " + uid + "'s "+ sid + " is on!");
    })
    .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
}

export function getPop(sid){
    var ref = database.collection("stories").doc(sid.toString());

        return ref.get().then(function(doc) {
            if (doc && doc.exists) {
                return Promise.resolve(doc.data().popularity)
            }
            else {
                return Promise.resolve("doc not found")
            }
        })
}

export function upvoteStory(uid, sid){
    var ref = database.collection("stories").doc(sid.toString());
    var UserStoryRef = userRef.doc(uid.toString()).collection("myStories").doc(sid.toString());

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

    getPop("s1").then(function(result){
        return UserStoryRef.update({
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
}

export function topStories(x){
  var ref = database.collection("stories");
  var query = ref.orderBy("popularity").limit(x);

  return query.get().then(function(querySnapshot){
      let res = []
      querySnapshot.forEach(function(doc){
          doc && doc.exists ? res.push(doc.data().string) : null
      })
      return Promise.resolve(res)
  })
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
    database.collection("users").doc(uid.toString()).collection("myStories").doc(sid.toString()).set({
        sid: sid,
        timestamp: timestamp,
        string: string,
        popularity: pop,
        privacy: privacy
    });

    database.collection("stories").doc(sid.toString()).set({
        sid: sid,
        uid: uid,
        timestamp: timestamp,
        string: string,
        popularity: pop,
        privacy: privacy
    });

    numStoriesIncrement(uid)
}

export function writeEntityInStoryData(uid, sid, estring, order, sentiment) {
    database.collection("users").doc(uid.toString()).collection("myStories").doc(sid.toString()).collection("entities").doc(estring).set({
        estring: estring,
        order: order,
        sentiment: sentiment //0=negative 1=neutral 2=positive
    });
    database.collection("stories").doc(sid.toString()).collection("entities").doc(estring).set({
        estring: estring,
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
        database.collection("image").doc(iid.toString()).set({
            iid: iid,
            name: name,
            sentiment: sentiment,
            url: url,
            numVotes: numVotes
        });
}

export function initApp() {
    var i = 1;
    var d = new Date();
    for(i = 1; i <= 20; i++){
        writeUserData(i,'test'+i+'@test.com', 1);
        if(i <= 10){
            writeStoryData(i, 1000+i, d, 'I ate McDonald\'s this morning!', 0, false);
            writeEntityInStoryData(i, 1000+i, 'McDonald\'s', 1, 0);
            writeEntityData('McDonald\'s');
            writeImageData(1000000+i, 'McDonald\'s', 1, ['https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/McDonald%27s_Golden_Arches.svg/1200px-McDonald%27s_Golden_Arches.svg.png'], 0);
        }
        else{
            writeStoryData(i, 1000+i, d, 'I drank Coca Cola this evening!', 0, false);
            writeEntityInStoryData(i, 1000+i, 'Coca Cola', 1, 0);
            writeEntityData('Coca Cola');
            writeImageData(1000000+i, 'Coca Cola', 1, ['https://tse2.mm.bing.net/th?id=OIP.0_ezIcFekTq93JbSIhNVNQErDQ&pid=15.1'], 0);
        }
    }
}
