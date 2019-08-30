import { useState, useEffect } from 'react';

export const useGetUserIP = () => {
  const [userIP, setUserIP] = useState(null);
  const [isError, setIsError] = useState(false);
  useEffect(()=>{
    fetch('http://www.geoplugin.net/json.gp', { method: 'GET' })
    .then(req => {
      return req.json();
    })
    .then(result => {
      setUserIP(result)
    }).catch(err => {
      setIsError(true)
    });
  }, []);
  return[userIP, isError];
};

