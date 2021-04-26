const production = {
  url: {
    API: '',
  },
  amplitude: {
    API_KEY: '4636e43d6e401278e445621977bc037f',
  },
};

const development = {
  url: {
    API: 'http://localhost:1337',
  },
  amplitude: {
    API_KEY: 'd0927061bf32cb456c2bc12085b17a04',
  },
};

export default process.env.NODE_ENV === 'development' ? development : production;
