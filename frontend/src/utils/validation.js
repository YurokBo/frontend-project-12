import { object, string } from "yup";

export const channelNameSchema =  (channels) => object().shape({
  name: string()
    .required()
    .trim()
    .min(3, 'Name is too short')
    .max(20, 'Name is too long')
    .notOneOf(channels, 'Name should be uniq')
});

export const signUpSchema = () => object().shape({
  username: string()
    .trim()
    .required()
    .min(3, 'Name is too short')
    .max(20, 'Name is too long'),
  password: string()
    .trim()
    .required()
    .min(6, 'Password is too short'),
  confirmPassword: string()
    .test(
      'confirmPassword',
      'Passwords are not confirm',
      (value, context) => {
        console.log(value === context.parent.password)
        return value === context.parent.password
      },
    ),
});
