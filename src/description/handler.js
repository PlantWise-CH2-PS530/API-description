const admin = require("firebase-admin");
const { Storage } = require("@google-cloud/storage");

const serviceAccount = require("../../config/plantwise-ch2-ps530-firebase-adminsdk-cug29-4e09cfeda1.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const storage = new Storage({
  keyFilename: "../config/plantwise-ch2-ps530-5ff2ffa0d81f.json",
  projectId: "plantwise-ch2-ps530",
});

const addDescHandler = async (request, h) => {
  try {
    const {
      name,
      about,
      nitrogen,
      fosfor,
      kalium,
      ph,
      soilMoisture,
      recomFertilize1,
      recomFertilize2,
      recomFertilize3,
      FertilizationRecommendations,
      difficulty,
      size,
      type,
      watering,
    } = request.payload;

    if (!name) {
      return h
        .response({
          status: "fail",
          message: "Failed to add plant. Please provide the plant name",
        })
        .code(400);
    }

    const id = db.collection("plants").doc().id;

    await db.collection("plants").doc(id).set({
      id,
      name,
      about,
      nitrogen,
      fosfor,
      kalium,
      ph,
      soilMoisture,
      recomFertilize1,
      recomFertilize2,
      recomFertilize3,
      FertilizationRecommendations,
      difficulty,
      size,
      type,
      watering,
      imageUrl: "",
    });

    return h
      .response({
        status: "success",
        message: "The plant has been successfully added!",
        data: {
          DescId: id,
        },
      })
      .code(201);
  } catch (error) {
    console.error("Error:", error);
    return h
      .response({
        status: "error",
        message: "Internal server error",
      })
      .code(500);
  }
};

const getAllDescHandler = async (request, h) => {
  try {
    const snapshot = await db.collection("plants").get();
    const plants = [];
    snapshot.forEach((doc) => {
      plants.push(doc.data());
    });

    return {
      status: "success",
      data: plants,
    };
  } catch (error) {
    console.error("Error:", error);
    return h
      .response({
        status: "error",
        message: "Internal server error",
      })
      .code(500);
  }
};

const getDescByIdHandler = async (request, h) => {
  try {
    const { DescId } = request.params;
    const doc = await db.collection("plants").doc(DescId).get();

    if (!doc.exists) {
      return h
        .response({
          status: "fail",
          message: "The plant could not be found!",
        })
        .code(404);
    }

    const plantData = doc.data();

    return {
      status: "success",
      data: plantData,
    };
  } catch (error) {
    console.error("Error:", error);
    return h
      .response({
        status: "error",
        message: "Internal server error",
      })
      .code(500);
  }
};

const updateDescHandler = async (request, h) => {
  try {
    const { DescId } = request.params;
    const dataToUpdate = request.payload;

    if (!Object.keys(dataToUpdate).length) {
      return h
        .response({
          status: "fail",
          message:
            "Failed to update the plant. Please provide the updated plant data",
        })
        .code(400);
    }

    if (
      "name" in dataToUpdate &&
      (!dataToUpdate.name || !dataToUpdate.name.trim())
    ) {
      return h
        .response({
          status: "fail",
          message:
            "Failed to update the plant. Please provide a non-empty plant name",
        })
        .code(400);
    }

    if ("imageUrl" in dataToUpdate) {
      const imageUrlKeys = Object.keys(dataToUpdate);
      if (imageUrlKeys.length !== 1 || imageUrlKeys[0] !== "imageUrl") {
        return h
          .response({
            status: "fail",
            message:
              "Failed to update the plant. Please provide only 'imageUrl' data to update",
          })
          .code(400);
      }

      await db.collection("plants").doc(DescId).update({
        imageUrl: dataToUpdate.imageUrl,
      });

      return {
        status: "success",
        message: "The plant's imageUrl has been successfully updated",
      };
    }

    if ("name" in dataToUpdate) {
      const { name, ...rest } = dataToUpdate;
      dataToUpdate.name = name.trim();
      delete rest.name;
      Object.assign(dataToUpdate, rest);
    }

    await db.collection("plants").doc(DescId).update(dataToUpdate);

    return {
      status: "success",
      message: "The plant has been successfully updated",
    };
  } catch (error) {
    console.error("Error:", error);
    return h
      .response({
        status: "error",
        message: "Internal server error",
      })
      .code(500);
  }
};

const deleteDescHandler = async (request, h) => {
  try {
    const { DescId } = request.params;

    await db.collection("plants").doc(DescId).delete();

    return {
      status: "success",
      message: "The plant has been successfully deleted",
    };
  } catch (error) {
    console.error("Error:", error);
    return h
      .response({
        status: "error",
        message: "Internal server error",
      })
      .code(500);
  }
};

module.exports = {
  addDescHandler,
  getAllDescHandler,
  getDescByIdHandler,
  updateDescHandler,
  deleteDescHandler,
};
