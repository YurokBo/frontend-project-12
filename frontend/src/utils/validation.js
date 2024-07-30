import { object, string } from 'yup';

export const channelNameSchema = (channels) => object().shape({
  name: string()
    .required()
    .trim()
    .min(3, 'errors.tooShortName')
    .max(20, 'errors.tooLongName')
    .notOneOf(channels, 'errors.shouldBeUniq'),
});

export const signUpSchema = () => object().shape({
  username: string()
    .trim()
    .required()
    .min(3, 'errors.invalidUserName')
    .max(20, 'errors.invalidUserName'),
  password: string()
    .trim()
    .required()
    .min(6, 'errors.tooShortPassword'),
  confirmPassword: string()
    .test(
      'confirmPassword',
      'errors.confirmPassword',
      (value, context) => value === context.parent.password,
    ),
});
