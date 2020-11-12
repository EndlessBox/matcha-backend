const server = require('./server')();
const configuration = require('./config/config');


const dbConnection = require('./models/dbConnection')().getDb();
const userModel = require('./models/user');


var user = new userModel();

// console.log(user.createUser());


// user.createUser({ mail: "hefasdsdf@il.com", username: "d", firstName: "Younes", lastName: "Bouladhane", password: "test" })
server.create(configuration);
server.start();
