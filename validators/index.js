/*
 *  Note : You still have to change the password Regex to containe following contrainte: 
 *              -   must have at least 5 length
 *              -   must have at least a char and number.
 */
module.exports = {
    properties: {
        signUpProperties: ["email", "userName", "firstName", "lastName", "password"]
    },
    regex: {
        email: /(?<recipient>^[a-zA-Z0-9][\w\.\-!#$%&'*+-\/=?^`{}|]{0,64})@(?<domainName>(?:\w{1,63}\.){1,8})(?<topLevelDomain>[a-zA-Z]{2,63})$/g,
        userName: /^[a-zA-Z0-9](?:\w\.?){3,98}[a-zA-Z0-9]$/,
        firstName: /^[a-zA-Z0-9](?:\w\.?){3,98}[a-zA-Z0-9]$/,
        lastName: /^[a-zA-Z0-9](?:\w\.?){3,98}[a-zA-Z0-9]$/,
        password: /.{5,100}/
    }
}