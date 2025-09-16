import {getToken} from '../reducers/userReducer';

export const requestConfig = async () => {
  const credentials = await getToken();

  if (!credentials?.token) {
    throw new Error('No token found');
  }
  return {
    withCredentials: true,
    headers: {
      Cookie: `token=${credentials.token}`,
    },
  };
};
