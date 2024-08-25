const rollbarConfig = {
  // accessToken: process.env.REACT_APP_NOT_SECRET_CODE /* '23bd92fae990454b8789ad3be0601895' */,
  accessToken: process.env.REACT_APP_NOT_SECRET_CODE,
  environment: 'production',
  captureUncaught: true,
  captureUnhandledRejections: true,
};

console.log('REACT_APP_POST_CLIENT_ITEM_ACCESS_TOKEN', process.env.REACT_APP_POST_CLIENT_ITEM_ACCESS_TOKEN);
console.log('REACT_APP_NOT_SECRET_CODE', process.env.REACT_APP_NOT_SECRET_CODE);
console.log('rollbarConfig', rollbarConfig);

export default rollbarConfig;
