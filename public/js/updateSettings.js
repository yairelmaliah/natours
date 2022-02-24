import axios from 'axios';
import { showAlert } from './alerts';

// type is either 'password' or 'data'
export const updateSettings = async (data, type) => {
  try {
    const baseURL = 'http://localhost:3000/api/v1/users/';
    const res = await axios({
      method: 'PATCH',
      url:
        type === 'password'
          ? `${baseURL}updateMyPassword`
          : `${baseURL}updateMe`,
      data,
    });
    console.log(res);

    if (res.data.status === 'success') {
      showAlert('success', `${type.toUpperCase()} updated succesfully`);
    }
  } catch (error) {
    console.dir(error);
    showAlert('error', error.response.data.message);
  }
};
