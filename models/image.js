var dbConnection = require("./dbConnection")().getDb();




module.exports = class imageModel {

    constructor(){}


    createImage(image) {
        return new Promise(async (resolve, reject) => {
            try { 
                image["id"] = null;
                image["isProfilePicture"] = image.isProfilePicture ? image.isProfilePicture : 0;
                
                let [results, _] = await dbConnection.query({
                    
                    sql: "INSERT INTO `images` SET ?",
                    timeout: 40000
                },
                image);

                resolve(results.insertId);
            } catch (err) {
                console.error(err);
                reject({message: "Internal Server Error."});
            }
        })
    }

    getImageByAttribute(attribute, value) {
        return new Promise(async (resolve, reject) => {
            try {

            let [results, _] = await dbConnection.query({
                sql: `SELECT * FROM \`images\` where ${attribute}=?`
            }, value);
                if (!results.length) resolve(0);
                resolve(results[0]);
            } catch (error) {
                console.error(error);
                reject({message: "Internal Server Error."});
            }
        })
    }


    getImagesCountByAttribute(attribute, value) {
        return new Promise(async(resolve, reject) => {

            try {
                let [results, _] = await dbConnection.query({
                    sql: `SELECT COUNT(id) as count FROM \`images\` WHERE ${attribute}=?`
                },
                value);

                if (!results.length) resolve(0);
                resolve(results[0].count);
            } catch(err) { 
                console.error(err);
                reject({message: "Internal Server Error."});
            }

        })
    }
}