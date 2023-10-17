const {
    auth
  } = require('./model');

  // add user in Auth
function addUser(userData) {
  return auth.createUser(userData);
}

// permissions

async function addPermissions(uid, objectRole) {
  return await auth.setCustomUserClaims(uid, objectRole);
}

// Token generate
async function customToken(uid) {
  return await auth.createCustomToken(uid);
}
  

  
  module.exports = {
    add: addUser,
    role: addPermissions,
    customToken: customToken,
  }