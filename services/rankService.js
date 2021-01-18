var RankModel = require('../models/rank');
var xpConfig = require('../config/config').Experience;

module.exports = class rankService {
    constructor(){}


    calculateUserExperience (move, affected, affecter, boundry) {
        return new Promise(async (resolve, reject) => {
            try{
                
                let rankModel = new RankModel();

                let limitXp = await rankModel.getLimitValues(boundry);
                let affecterRank = await rankModel.getUserRank(affecter.id);
                let newUserExperience = affected.experience + xpConfig.calculate(move, affecterRank.rankValue);

                if (boundry === 'MAX' && newUserExperience > limitXp)
                    newUserExperience = limitXp;
                else if (boundry === 'MIN' && newUserExperience < limitXp)
                    newUserExperience = limitXp;
                resolve(newUserExperience);
            } catch(err) {
                reject(err);
            }
        })
    }
}