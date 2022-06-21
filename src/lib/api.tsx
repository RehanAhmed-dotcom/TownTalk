import Axios from 'axios';
const axios = Axios.create({
  baseURL: 'https://intechsol-developer.co/towntalk/api',
  headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
});
const authorizedHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  Authorization: '',
};
const login = (payload: object) => {
  const request = `/login`;
  return axios
    .post(request, payload)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch login', e);
      throw e;
    });
};
const register = (payload: object) => {
  const request = `/register`;
  return axios
    .post(request, payload, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in register', e);
      throw e;
    });
};
const submitEmail = (payload: object) => {
  const request = `/forgot`;
  return axios
    .post(request, payload)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in Submit email', e);
      throw e;
    });
};
const otp = (payload: object) => {
  console.log('in api', payload);
  const request = `/confirm-code`;
  return axios
    .post(request, payload)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in otp', e);
      throw e;
    });
};
const verifyEmail = (payload: object) => {
  console.log('in api', payload);
  const request = `/verify`;
  return axios
    .post(request, payload)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in verfiy', e);
      throw e;
    });
};
const resetPassword = (payload: object) => {
  const request = `/reset`;
  return axios
    .post(request, payload)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in change password', e);
    });
};
const editProfile = (payload, data) => {
  // console.log('res check', JSON.stringify(data1));
  console.log('data', payload);
  const request = `/edit`;
  return axios
    .post(request, data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.Auth}`,
      },
    })
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in edit profile ', e);
      throw e;
    });
};
const changePassword = payload => {
  const request = `/change-password`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .post(request, payload, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in change password', e);
      throw e;
    });
};
const verify = (payload: object) => {
  const request = `/verify-phone`;
  return axios
    .post(request, payload)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch verify', e);
    });
};
export {
  login,
  register,
  submitEmail,
  changePassword,
  verifyEmail,
  editProfile,
  verify,
  otp,
  resetPassword,
};
