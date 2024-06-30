import { object, string } from "yup";

export const channelNameSchema =  (channels) => object().shape({
  name: string()
    .required()
    .trim()
    .min(3, 'Name is too short')
    .max(20, 'Name is too long')
    .notOneOf(channels, 'Name should be uniq')
})
