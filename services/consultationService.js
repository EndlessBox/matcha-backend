var ConsultationModel = require('../models/consultation');
var UserModel = require('../models/user');



module.exports = class consultationService {
    constructor(){}

    createConsultation (payload, user) {
        return new Promise(async (resolve, reject) => {
            try {
                let consultationModel = new ConsultationModel();
                let userModel = new UserModel();

                /*
                 *  Consult is initiated from the consulter side ! 
                 */
                if (user.userName !== payload.consulter)
                    return reject({message: "Consult from outer source.", status: 403});
                
                let consulter = await userModel.getUserByAttribute('userName', payload.consulter);
                let consulted = await userModel.getUserByAttribute('userName', payload.consulted);
                
                if (!consulter || !consulted)
                    return reject({message: "Invalide user.", status: 403});
                let consultId = await consultationModel.createConsultation({consulter: consulter.id, consulted: consulted.id});
                resolve(consultId);

            } catch(err) {
                if (err.code === 'ER_DUP_ENTRY' && err.errno == 1062)
                {
                    console.error(new Date().toLocaleDateString(),
                    err.sqlMessage,
                    "-- UserName: " + user.userName);
                    return resolve({message: "Nothing changed"});
                }
                reject(err);
            }
        })
    }

    getUserConsultedHistory(user) {
        return new Promise(async (resolve, reject) => {
            try {
                let consultationModel = new ConsultationModel();
                let results = await consultationModel.getConsultedHistoryByUserId(user.id);
                if (!results.length)
                    return resolve({message: "No consultation found.", status:200});
                resolve(results);
            } catch (error) {
                reject(error);
            }
        })
    }

}