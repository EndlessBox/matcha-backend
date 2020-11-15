module.exports = {
    properties: {
        signUpProperties: ["email", "userName", "firstName", "lastName", "password"]
    },
    regex: {
        email: "/(?<recipient>^[a-zA-Z0-9][\w\.\-!#$%&'*+-\/=?^`{}|]{0,64})@(?<domainName>(?:\w{1,63}\.){1,8})(?<topLevelDomain>[a-zA-Z]{2,63})$/g"
    }
}