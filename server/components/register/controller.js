const store = require('./store');

function addUser(userData) {
  return new Promise((resolve, reject) => {
    if (Object.entries(userData).length === 0) {
      console.log("[UsersController]: User doesn't have content, the user is empty");
      reject('There is no data user');
    }

    store.add(userData)
      .then((userRecord) => {
        console.log(userRecord.uid)
        store.customToken(userRecord.uid)
          .then((tokenGenerated) => console.log(tokenGenerated))
        store.role(userRecord.uid, {
            role: userData.role
          })
          .then((userRole) => console.log(userRole))
      })
      .catch((error) => console.log('[UserController]: Error creating new user: ' + error));
    resolve(userData);
  });
};

module.exports = {
  addUser
}