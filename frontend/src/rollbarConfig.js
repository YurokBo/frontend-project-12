const rollbarConfig = {
  // accessToken: process.env.post_client_item /* '23bd92fae990454b8789ad3be0601895' */,
  accessToken: process.env.REACT_APP_POST_CLIENT_ITEM_ACCESS_TOKEN,
  environment: 'production',
  captureUncaught: true,
  captureUnhandledRejections: true,
};

console.log('process.env', process.env.REACT_APP_POST_CLIENT_ITEM_ACCESS_TOKEN);

export default rollbarConfig;
