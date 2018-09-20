Firebase + React - Real-time, Serverless Web Apps\6. Cloud Storage

https://github.com/stevekinney/spirit-animal-look-book


```
// database
{
  "rules": {
    ".read": "auth != null",
      "users":{
        "$user_id" :{
          ".write" : "$user_id === auth.uid"
        }
      }
  }
}


// storage
-------------------
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}

-------------------
service firebase.storage {
  match /b/{bucket}/o {
  allow read;
  	match /user-images/{userId}/{allPaths=**}{
    	allow write: if request.auth.uid == userId;
    }
  }
}

------------------

function isCorrectUser(userId){
	return request.auth.uid == userId;
}

function isLessThanNMegabytes(n){
	return request.resource.size < n *1024 * 1024
}


service firebase.storage {
  match /b/{bucket}/o {
  allow read;
  	match /user-images/{userId}/{allPaths=**}{
    	allow write: if isCorrectUser(userId) 
      								&& isLessThanNMegabytes(5);
    }
  }
}


```