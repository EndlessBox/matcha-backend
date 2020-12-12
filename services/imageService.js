var ImageModel = require("../models/image");
var fs = require("fs").promises;
var promisify = require("util").promisify;
var path = require("path");
var config = require("../config/config");

module.exports = class imageService {
  constructor() {}

  async manageImages(images, userId) {
    let imageModel = new ImageModel();
    let imageCount = await imageModel.getImagesCountByAttribute(
      "userId",
      userId
    );
    let profilImage = await imageModel.getImagesCountByAttributeAndUserId(
      "isProfilePicture",
      1,
      userId
    );

    images.map(async (image) => {
      if (imageCount < config.imagesMaxCount) {
        imageCount += 1;
        if (profilImage !== 0)
          await imageModel.createImage({
            userId: userId,
            image: image.filename,
          });
        else {
          profilImage += 1;
          await imageModel.createImage({
            userId: userId,
            image: image.filename,
            isProfilePicture: 1,
          });
        }
      }
    });
  }

  deleteImage(payload, user) {
    return new Promise(async (resolve, reject) => {
      try {
        let imageModel = new ImageModel();
        let image = await imageModel.getImageByAttribute(
          "image",
          payload.imageName
        );
        if (image) {
          if (image.isProfilePicture) {
            let alternProfilPic = await imageModel.getImageNotProfilePicture(
              user.id
            );
            if (alternProfilPic)
              await imageModel.updateImageByAttribute(
                "isProfilePicture",
                1,
                alternProfilPic.id
              );
          }
          await fs.unlink(
            path.join(__dirname, config.imagesUploadLocation, payload.imageName)
          );
          await imageModel.deleteImageByAttribute("image", payload.imageName);
        } else reject({ message: "Image not found.", status: 400 });
        resolve("image deleted succefully");
      } catch (error) {
        reject(error);
      }
    });
  }

  async getImageBase64(imageName) {
    return (await fs.readFile(path.join(__dirname, config.imagesUploadLocation, imageName),{encoding:"base64"}))
  }

  getUserImages(userId) {
    return new Promise(async (resolve, reject) => {
      try {
        let imageModel = new ImageModel();
        let images = await imageModel.getImagesByUserId(userId);

        var response = [];

        response = images.map(async (image) => {
          return {
            imageName: image.image,
            isProfilePicture: image.isProfilePicture,
            imageBase64: await this.getImageBase64(image.image)
          };
        });

        resolve(await Promise.all(response));
      } catch (error) {
        resolve(error);
      }
    });
  }

  getUserProfilePicture (userId){
    return new Promise(async (resolve, reject) => {
      try{

        let imageModele = new ImageModel();
        let profileImage = await imageModele.getUserPictureByAttribute('isProfilePicture', 1, userId);
        if (profileImage)
          resolve({
            imageName: profileImage.image,
            imageBase64: await this.getImageBase64(profileImage.image)
         })
         else
          resolve(profileImage)
      }catch(err) {
        reject(err);
      }
    })
  }
};
