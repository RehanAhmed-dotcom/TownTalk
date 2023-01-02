import Axios from 'axios';
const axios = Axios.create({
  baseURL: 'https://towntalkapp.com/app/api',
  headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
});
const authorizedHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  Authorization: '',
};

const login = (payload: object) => {
  const request = `/login`;
  console.log('payload', payload);
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
const trending_town = () => {
  const request = `/trending_town`;
  return axios
    .get(request)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch trending_town', e);
      throw e;
    });
};
const getfcm = (payload: object) => {
  const request = `/get_fcm`;
  return axios
    .post(request, payload)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch get_fcm', e);
      throw e;
    });
};
const register = (payload: object) => {
  console.log('payload', payload);
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
  // console.log('in api', payload);
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
  // console.log('in api', payload);
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
  // console.log('data', payload);
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

const city_posts = payload => {
  const request = `/city_posts`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .post(request, payload, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in city_posts', e);
      throw e;
    });
};
const updateLocation = payload => {
  const request = `/update_lat_long`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .post(request, payload, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in updateLocation', e);
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
const addPost = (payload, data) => {
  console.log('data of payload', JSON.stringify(data));
  const request = `/create-post`;
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
      console.log('in add post', e);
      throw e;
    });
};
const addgroup = (payload, data) => {
  // console.log('data of payload', JSON.stringify(data));
  const request = `/create-group`;
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
      console.log('in group create', e);
      throw e;
    });
};
const viewAllPost = payload => {
  console.log('data of payload for View all post', payload);
  const request = `/view-post?page=${payload.page}`;
  return axios
    .post(request, payload, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${payload.Auth}`,
      },
    })
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in add post', e);
      throw e;
    });
};
const joingroup = payload => {
  // console.log('data of payload', payload);
  const request = `/join-group`;
  return axios
    .post(request, payload, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${payload.Auth}`,
      },
    })
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in join group', e);
      throw e;
    });
};
const creategroup = payload => {
  // console.log('data of payload', payload);
  const request = `/create-group`;
  return axios
    .post(request, payload, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${payload.Auth}`,
      },
    })
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in create group', e);
      throw e;
    });
};
const hashTag = payload => {
  // console.log('data of payload', JSON.stringify(payload));
  const request = `/hashtag-list`;
  return axios
    .post(request, payload, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${payload.Auth}`,
      },
    })
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in hash tag', e);
    });
};
const reportUser = payload => {
  // console.log('data of payload', JSON.stringify(payload));
  const request = `/report_post`;
  return axios
    .post(request, payload, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${payload.Auth}`,
      },
    })
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in hash tag', e);
    });
};

const deletePostApi = payload => {
  // console.log('data of payload', JSON.stringify(payload));
  const request = `/delete_post`;
  return axios
    .post(request, payload, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${payload.Auth}`,
      },
    })
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in hash tag', e);
    });
};
const likeDislike = payload => {
  // console.log('data of payload', JSON.stringify(data));
  const request = `/like-dislike`;
  return axios
    .post(request, payload, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${payload.Auth}`,
      },
    })
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in likedislike', e);
    });
};
const blockUserList = payload => {
  // console.log('data of payload', JSON.stringify(data));
  const request = `/blockUserList`;
  return axios
    .get(request, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${payload.Auth}`,
      },
    })
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in blockUserList', e);
    });
};
const hotspots = payload => {
  // console.log('data of payload', JSON.stringify(data));
  const request = `/hotspots`;
  return axios
    .get(request, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${payload.Auth}`,
      },
    })
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in hotspots', e);
    });
};

const getCountiesList = payload => {
  // console.log('data of payload', JSON.stringify(data));
  const request = `/counties`;
  return axios
    .get(request, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${payload.Auth}`,
      },
    })
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in counties list', e);
    });
};
const likeDislikeProfile = payload => {
  // console.log('data of payload', JSON.stringify(data));
  const request = `/like-dislike-profile`;
  return axios
    .post(request, payload, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${payload.Auth}`,
      },
    })
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in likedislike', e);
    });
};
const createComment = payload => {
  // console.log('data of payload', JSON.stringify(data));
  const request = `/create-comment`;
  return axios
    .post(request, payload, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${payload.Auth}`,
      },
    })
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in create comment', e);
    });
};
const blockUser = payload => {
  console.log('data of payload', payload);
  const request = `/blockUser`;
  return axios
    .post(request, payload, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${payload.Auth}`,
      },
    })
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in block User', e);
    });
};
const unBlockUser = payload => {
  // console.log('data of payload', JSON.stringify(data));
  const request = `/unBlockUser`;
  return axios
    .post(request, payload, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${payload.Auth}`,
      },
    })
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in unBlockUser', e);
    });
};
const deleteAccount = payload => {
  // console.log('data of payload', JSON.stringify(data));
  const request = `/deleteAccount`;
  return axios
    .get(request, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${payload.Auth}`,
      },
    })
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in delete Account', e);
      throw e;
    });
};
const updateToken = payload => {
  // console.log('data of payload', JSON.stringify(data));
  const request = `/update-fcm`;
  return axios
    .post(request, payload, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${payload.Auth}`,
      },
    })
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in update token', e);
    });
};
const viewComment = payload => {
  // console.log('data of payload', JSON.stringify(data));
  const request = `/view-post-comments/${payload.id}`;
  return axios
    .get(request, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${payload.Auth}`,
      },
    })
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in viewComment', e);
    });
};
const singleGroup = payload => {
  // console.log('data of payload', JSON.stringify(data));
  const request = `/view-group/${payload.id}`;
  return axios
    .get(request, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${payload.Auth}`,
      },
    })
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in singleGroup', e);
    });
};
const viewGroup = payload => {
  // console.log('data of payload', JSON.stringify(data));
  const request = `/view-group-list`;
  return axios
    .get(request, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${payload.Auth}`,
      },
    })
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in viewComment', e);
    });
};
const getNotification = payload => {
  // console.log('data of payload', JSON.stringify(data));
  const request = `/notification-list`;
  return axios
    .get(request, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${payload.Auth}`,
      },
    })
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in viewComment', e);
    });
};
const profile = payload => {
  // console.log('data of payload', JSON.stringify(data));
  const request = `/profile/${payload.id}`;
  return axios
    .get(request, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${payload.Auth}`,
      },
    })
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in profile', e);
    });
};
const postDetail = payload => {
  // console.log('data of payload', JSON.stringify(data));
  const request = `/view-post/${payload.id}`;
  return axios
    .get(request, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${payload.Auth}`,
      },
    })
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in post detail', e);
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
  getNotification,
  otp,
  resetPassword,
  deleteAccount,
  hashTag,
  blockUserList,
  addPost,
  viewAllPost,
  likeDislike,
  createComment,
  viewComment,
  viewGroup,
  profile,
  creategroup,
  addgroup,
  blockUser,
  joingroup,
  singleGroup,
  deletePostApi,
  getfcm,
  postDetail,
  updateLocation,
  likeDislikeProfile,
  updateToken,
  reportUser,
  getCountiesList,
  unBlockUser,
  city_posts,
  hotspots,
  trending_town,
};
