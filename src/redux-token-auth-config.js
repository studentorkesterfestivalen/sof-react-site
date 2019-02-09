import { generateAuthActions } from 'redux-token-auth'
import { authUrl } from './constants'

const config = {
  authUrl,
  userAttributes: {
    firstName: 'first_name',
    lastName: 'last_name',
    imageUrl: 'image',
    email : "email",
    password: "password",
    passwordConfirmation: "password_confirmation",
    confirmSuccessUrl: "confirm_success_url",
    displayName: "display_name",
    adminPermissions: "admin_permissions",
    name: "name",
    image: "image",
    rebateBalance : "rebate_balance",
    rebateGiven : "rebate_given"
  },
  userRegistrationAttributes: {
    email: 'email',
    displayName: 'display_name',
    password: 'password',
    passwordConfirmation: 'password_confirmation',
    confirmSuccessUrl: `confirm_success_url`
  },
}


const {
  registerUser,
  signInUser,
  signOutUser,
  verifyCredentials,
} = generateAuthActions(config)

export {
  registerUser,
  signInUser,
  signOutUser,
  verifyCredentials,
};
