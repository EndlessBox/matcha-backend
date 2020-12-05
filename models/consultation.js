var dbConnection = require('./dbConnection')().getDb();




module.exports = class consultationModel {

    constructor(){}

    createConsultation (consultation) {
        return new Promise(async (resolve, reject) => {
            try {
                consultation['id'] = null;
                consultation['dateOfConsult'] = new Date();
                let [results, _] = await dbConnection.query({
                    sql: "INSERT INTO `consults` SET ?",
                    timeout: 40000
                },
                consultation)
                resolve(results.insertedId);
            } catch (error) {
                reject(error);
            }
        })
    }



    getConsultedHistoryByUserId(userId) {
        return new Promise(async (resolve, reject) => {
            try {
                
                let [results, _] = await dbConnection.query({
                    sql: "select u.userName, u.firstName, u.lastName, c.dateOfConsult from user u inner JOIN consults c on u.id=c.consulter where c.consulted=?"
                }, userId);
                resolve(results);
            } catch (error) {
                reject(error);
            }
        })
    }
}