import axios from 'axios';

export default async (url, method = 'GET', payload = {}, headers = {}) => {
  switch (method) {
    case 'POST': {
      const response = await axios.post(url, payload, {
        headers,
      });
      return response.data;
    }
    case 'PUT': {
      const response = await axios.put(url, payload, {
        headers,
      });
      return response.data;
    }
    case 'DELETE': {
      const response = await axios.delete(url, {
        headers,
      });
      return response.data;
    }
    default: {
      const response = await axios.get(url, {
        headers,
      });
      return response.data;
    }
  }
};
