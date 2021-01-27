import axios from 'axios';

export default async (url, method = 'GET', payload = {}) => {
  switch (method) {
    case 'POST': {
      const response = await axios.post(url, payload);
      return response.data;
    }
    default: {
      const response = await axios.get(url);
      return response.data;
    }
  }
};
