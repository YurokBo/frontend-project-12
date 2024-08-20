const rollbarConfig = {
  accessToken: process.env.POST_CLIENT_ITEM /* '23bd92fae990454b8789ad3be0601895' */,
  environment: 'production',
  captureUncaught: true,
  captureUnhandledRejections: true,
};

export default rollbarConfig;
