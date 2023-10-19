const getTokenOnSessionStorage = window.sessionStorage.getItem('firebase:authUser:AIzaSyDPgalqYfnXzAW6kQNyW4Kp9MRLxif39W4:[DEFAULT]')


const getToken = JSON.parse(getTokenOnSessionStorage);

const token = getToken.stsTokenManager.accessToken;

export const getOnlyUser = async (uid) => {
    const dataList = await fetch(`https://med-consult-app.onrender.com/api/users/${uid}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const dataResult = dataList.json();
    return dataResult;
  }