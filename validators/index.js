/*
 *  Note : You still have to change the password Regex to containe following contrainte:
 *              -   must have at least 5 length
 *              -   must have at least a char and number.
 */
module.exports = {
  properties: {
    signUpProperties: [
      "email",
      "userName",
      "firstName",
      "lastName",
      "password",
      "birthDate",
    ],
    mailValidation: ["mailToken"],
    signIn: ["userName", "password"],
    forgetPassword: ["userName", "email"],
    resetPassword: ["password", "retryPassword", "passwordToken"],
    logOut: ["userName"],
    updateUser: [
      "email",
      "firstName",
      "lastName",
      "password",
      "retryPassword",
      "gender",
      "orientation",
      "bio",
      "tags",
      "birthDate",
    ],
    createLike: ["liker", "liked"],
    createConsultation: ["consulter", "consulted"],
    createLocation: ["latitude", "longitude", "altitude"],
    deleteImage: ["imageName"],
    createBlock: ["blocker", "blocked"],
    createMatch: ["matcher", "matched"],
    suggestions: ["tri", "filter"],
  },
  regex: {
    email: /(?<recipient>^[a-zA-Z0-9][\w\.\-!#$%&'*+_\/=?^`{}|]{0,64})@(?<domainName>(?:\w{1,63}\.){1,8})(?<topLevelDomain>[a-zA-Z]{2,63})$/g,
    userName: /^[a-zA-Z0-9](?:\w\.?){3,98}[a-zA-Z0-9]$/,
    firstName: /^[a-zA-Z0-9](?:\w\.?){3,98}[a-zA-Z0-9]$/,
    lastName: /^[a-zA-Z0-9](?:\w\.?){3,98}[a-zA-Z0-9]$/,
    birthDate: /^\d{4}-[0-1]{1}[0-9]{1}-[0-3]{1}[0-9]{1}$/,
    password: /.{5,100}/,
    retryPassword: /.{5,100}/,
    mailToken: /[a-zA-Z0-9]{256}/,
    passwordToken: /[a-zA-Z0-9]{256}/,
    bio: /.*/,
    tags: /^[a-zA-Z0-9-!$%&'*+_]{2,15}$/,
    imageName: /^[0-9]{10,13}_[\w\s]+.[\w]{3,4}/,
    triValues: /\b(DESC|ASC)\b/,
    triKeys: /\b(distance|communTags|experience|age)\b/,
    filterKeys: /\b(distance|communTags|experience|age)\b/,
    offset: /^\d{1,10}$/,
  },
  isFloat: (number) =>
    Number(number) === 0 || (Number(number) === number && number % 1 !== 0),
};
