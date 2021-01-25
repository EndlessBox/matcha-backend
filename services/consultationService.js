var ConsultationModel = require('../models/consultation');
var UserModel = require('../models/user');



module.exports = class consultationService {
    constructor(){}

    createConsultation (payload, user) {
        return new Promise(async (resolve, reject) => {
            try {
                let consultationModel = new ConsultationModel();

                /*
                 *  Consult is initiated from the consulter side ! 
                 */
                if (user.id !== payload.consulter)
                    return reject({message: "Consult from outer source.", status: 403});
            
                let consultation = {consulter: payload.consulter, consulted: payload.consulted, dateOfConsult: new Date().toISOString}
                let {consultId, date} = await consultationModel.createConsultation(consultation);

                resolve({consultationId: consultId, date:date});

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