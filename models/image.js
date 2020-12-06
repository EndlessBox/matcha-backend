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
                sql: `SELECT * FROM \`images\` WHERE ${attribute}=?`
            }, value);
                if (!results.length) resolve(0);
                console.log(results)
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

    deleteImageByAttribute(attribute, value) {
        return new Promise(async(resolve, reject) => {
            try {
                let [results, _] = await dbConnection.query({
                    sql: `DELETE FROM \`images\` WHERE ${attribute}=?`,
                    timeout: 40000
                },
                value);
                
                resolve(results);
            } catch (error) {
                reject(error);
            }
        })
    }

    getImageNotProfilePicture() {
        return new Promise(async (resolve, reject) => {
            try {
                let [results, _] = await dbConnection.query({
                    sql: "SELECT * FROM `images` WHERE isProfilePicture=0 ORDER BY id LIMIT 1",
                    timeout: 40000
                })

                resolve(results[0]);
            } catch (error) {
                reject(error);
            }
        })
    }


    updateImageByAttribute(attribute, newValue, imageId) {
        return new Promise(async (resolve, reject) => {
            try {
                let [results, _] = await dbConnection.query({
                    sql: `UPDATE \`images\` SET ${attribute}=? WHERE id=?`,
                    timeout: 40000
                }, [newValue, imageId])

                resolve(results);

            } catch (error) {
                reject(error);
            }
        })
    }

    getImagesByUserId(userId) {
        return new Promise(async(resolve, reject) => {
            let [results, _] = await dbConnection.query({
                sql: "SELECT i.* from `images` i INNER JOIN `user` u ON i.userId=u.id WHERE u.id=?",
                timeout: 40000
            }, userId)

            resolve(results);
        })
    }
}