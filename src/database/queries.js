import database from './config';
console.log(database)
const userRef = database.collection("users")
//export function test(){
//     database.collection("stories").orderBy("popularity").limit(3)
//     .onSnapshot(dataSnapshot => {
//            console.log(dataSnapshot.docs);
//     });
//}

//==========================JSON-related Query===============================================
export function processJSON(data, uid, string){
    getLatestSid().then(function(sidres){
        var sid = sidres[0];
        var json = JSON.parse(data);
        var time = new Date();

        writeStoryData(uid, sid, time, string, false);

        for(var i = 0; i < json.head.length; i++){
            var headRef = json.head
            writeEntityInStoryData(uid, sid, headRef[i].name, headRef[i].order, headRef[i].sentiment);
            writeStoryInEntityData(headRef[i].name, sid, time, string, false);

            for(var j = 0; j < json.head[i].image.length; i++){
                var imageRef = headRef[i].image
                writeImageData(uid, sid, imageRef[j].iid, headRef[i].name, headRef[i].sentiment, imageRef[j].url, headRef[i].order);
            }
        }

    })
}

//==========================User-Related Query===============================================
export function getUserStories(uid){
    var ref = userRef.doc(uid.toString()).collection("myStories")

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
    return ref.get().then(function(doc) {
        if (doc && doc.exists) {
            return Promise.resolve(doc.data().numStories)
        }
        else {
            return Promise.resolve("doc not found")
        }
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

export function getLatestSid(){
    var ref = database.collection("stories");
    var query = ref.orderBy("sid", "desc").limit(1);

    return query.get().then(function(querySnapshot){
        let res = []
        querySnapshot.forEach(function(doc){
          console.log(doc.data().sid)
            doc && doc.exists ? res.push(parseInt(doc.data().sid)) : null
        })
        return Promise.resolve(res)
    })
  }

//==========================Story-Related Query===============================================

export function getStoriesInEntity(name){
    var ref = database.collection("entity").doc(name).collection("StoriesInEntity")
    return ref.get().then(function(refSnapshot){
        let res = []
        refSnapshot.forEach(function(doc){
            doc && doc.exists ? res.push(doc.data().sid) : null
        })
        return Promise.resolve(res)
    })
}

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

export function getTopStories(x){
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

<<<<<<< HEAD
=======
export function getRecentStories(uid, x){
  var ref = database.collection("users").doc(uid.toString()).collection("myStories");
  var query = ref.orderBy("timestamp", "desc").limit(x);

  return query.get().then(function(querySnapshot){
      let res = []
      querySnapshot.forEach(function(doc){
          doc && doc.exists ? res.push(doc.data().sid) : null
      })
      return Promise.resolve(res)
  })
}



>>>>>>> 089fa5de16cfd11c9d7ed83204e9613fa220f540
//===================Firestore Database Write==================================================
export function writeUserData(uid, username, numStories){
    database.collection("users").doc(uid.toString()).set({
        uid:uid,
        username: username,
        numStories: numStories
    });
}

export function writeStoryData(uid, sid, timestamp, string, privacy) {
    database.collection("users").doc(uid.toString()).collection("myStories").doc(sid.toString()).set({
        sid: sid,
        timestamp: timestamp,
        string: string,
        popularity: 0,
        privacy: privacy
    });

    database.collection("stories").doc(sid.toString()).set({
        sid: sid,
        uid: uid,
        timestamp: timestamp,
        string: string,
        popularity: 0,
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

export function writeStoryInEntityData(entity, sid, timestamp, string, privacy){
  database.collection("entity").doc(entity).collection("StoriesInEntity").doc(sid.toString()).set({
    sid: sid,
    timestamp: timestamp,
    string: string,
    popularity: 0,
    privacy: privacy
});
}

export function writeImageData(uid, sid, iid, name, sentiment, url, order) {
        database.collection("image").doc(iid.toString()).set({
            uid: uid,
            sid: sid,
            iid: iid,
            name: name,
            sentiment: sentiment,
            url: url,
            numVotes: 0,
            order: order,
        })

        database.collection("users").doc(uid.toString()).collection("myStories").doc(sid.toString()).collection("myImages").doc(iid.toString()).set({
            uid: uid,
            sid: sid,
            iid: iid,
            name: name,
            sentiment: sentiment,
            url: url,
            numVotes: 0,
            order: order,
        });

        database.collection("stories").doc(sid.toString()).collection("myImages").doc(iid.toString()).set({
            uid: uid,
            sid: sid,
            iid: iid,
            name: name,
            sentiment: sentiment,
            url: url,
            numVotes: 0,
            order: order,
        });
}

export function initApp() {
    var i = 1;
    var d = new Date();
    for(i = 1; i <= 20; i++){
        writeUserData(i,'test'+i+'@test.com', 1);
        if(i <= 10){
            writeStoryData(i, 1000+i, d, 'I ate McDonald\'s this morning!', false);
            writeEntityInStoryData(i, 1000+i, 'McDonald\'s', 1, 0);
            writeEntityData('McDonald\'s');
            writeStoryInEntityData('McDonald\'s', 1000+i, d, 'I ate McDonald\'s this morning!', false);
            writeImageData(i, 1000+i, 1000000+i, 'McDonald\'s', 1, ['https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/McDonald%27s_Golden_Arches.svg/1200px-McDonald%27s_Golden_Arches.svg.png'], 1);
        }
        else{
            writeStoryData(i, 1000+i, d, 'I drank Coca Cola this evening!', false);
            writeEntityInStoryData(i, 1000+i, 'Coca Cola', 1, 0);
            writeEntityData('Coca Cola');
            writeStoryInEntityData('Coca Cola', 1000+i, d, 'I drank Coca Cola this evening!', false);
            writeImageData(i, 1000+i, 1000000+i, 'Coca Cola', 1, ['https://tse2.mm.bing.net/th?id=OIP.0_ezIcFekTq93JbSIhNVNQErDQ&pid=15.1'], 1);
        }
    }
}
