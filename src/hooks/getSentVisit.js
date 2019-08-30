import { isMobile } from '../Utilities/detect-device';
export const useSentVisit = (userIP, callback) => {
  if (userIP) {
    let device = 'Desktop';
    if (isMobile.any()) {
      device = isMobile.any()[0];
    }

    const saveVisit = {
      query: `mutation { createVisit(ip: "${userIP.geoplugin_request}", device:"${device}"){
        _id
        ipAddress
        device
        createdAt
        updatedAt
      }}`
    };
    fetch('http://localhost:3003/api', {
      method: 'POST',
      body: JSON.stringify(saveVisit),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed');
        }
        return res.json();
      })
      .then(resData => {
        return resData;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
