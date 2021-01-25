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
                resolve({insertedId: results.insertedId, date:consultation.dateOfConsult});
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


    getUsersConsultation(consulterId, consultedId) {
        return new Promise(async (resolve, reject) => {
            try{
                
                let [results, _] = await dbConnection.query({
                    sql: `SELECT c.* FROM consults c WHERE c.consulter=? AND c.consulted=? AND c.dateOfConsult=(SELECT MAX(c1.dateOfConsult) from consults c1)`
                }, [consulterId, consultedId])
                
                resolve(results[0]);

            }catch(err) {
                reject(err);
            }
        })
    }
}