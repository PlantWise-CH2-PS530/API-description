const admin = require("firebase-admin");
const { Storage } = require("@google-cloud/storage");

const serviceAccount = require("../../config/plantwise-ch2-ps530-firebase-adminsdk-cug29-4e09cfeda1.json");
admin.initializeApp(
  {
    credential: admin.credential.cert(serviceAccount),
  },
  "news-api"
);

const db = admin.firestore();

const storage = new Storage({
  keyFilename: "../config/plantwise-ch2-ps530-5ff2ffa0d81f.json",
  projectId: "plantwise-ch2-ps530",
});

const addNewsHandler = async (request, h) => {
  try {
    const { tittle, content, tag } = request.payload;

    if (!tittle) {
      return h
        .response({
          status: "fail",
          message: "Failed to add news. Please provide the news title",
        })
        .code(400);
    }

    const id = db.collection("news").doc().id;

    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    await db.collection("news").doc(id).set({
      id,
      tittle,
      content,
      imageUrl: "",
      tag,
      insertedAt,
      updatedAt,
    });

    return h
      .response({
        status: "success",
        message: "The news has been successfully added!",
        data: {
          NewsId: id,
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

const getAllNewsHandler = async (_, h) => {
  try {
    const snapshot = await db.collection("news").get();
    const newsList = [];
    snapshot.forEach((doc) => {
      newsList.push(doc.data());
    });

    return {
      status: "success",
      data: newsList,
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

const getNewsByIdHandler = async (request, h) => {
  try {
    const { NewsId } = request.params;
    const newsRef = db.collection("news").doc(NewsId);

    const doc = await newsRef.get();

    if (!doc.exists) {
      return h
        .response({
          status: "fail",
          message: "The news could not be found!",
        })
        .code(404);
    }

    const newsData = doc.data();

    // Panggil fungsi incrementViews untuk menambah jumlah views pada berita yang diakses
    await incrementViews(NewsId);

    return {
      status: "success",
      data: newsData,
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

const incrementViews = async (newsId) => {
  const newsRef = db.collection("news").doc(newsId);

  await db.runTransaction(async (transaction) => {
    const doc = await transaction.get(newsRef);

    if (!doc.exists) {
      throw new Error("Berita tidak ditemukan!");
    }

    const currentViews = doc.data().views || 0; // Mengambil jumlah views saat ini atau default 0
    transaction.update(newsRef, { views: currentViews + 1 });
  });
};

const getLatestNewsHandler = async (_, h) => {
  try {
    const snapshot = await db
      .collection("news")
      .orderBy("insertedAt", "desc")
      .limit(10)
      .get();
    const latestNewsList = [];
    snapshot.forEach((doc) => {
      latestNewsList.push(doc.data());
    });

    return {
      status: "success",
      data: latestNewsList,
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

const getHottestNewsHandler = async (_, h) => {
  try {
    const snapshot = await db
      .collection("news")
      .orderBy("views", "desc")
      .limit(10)
      .get(); // Di sini diasumsikan adanya field 'views' sebagai contoh jumlah tampilan
    const hottestNewsList = [];
    snapshot.forEach((doc) => {
      hottestNewsList.push(doc.data());
    });

    return {
      status: "success",
      data: hottestNewsList,
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

const updateNewsHandler = async (request, h) => {
  try {
    const { NewsId } = request.params;
    const dataToUpdate = request.payload;

    if (!Object.keys(dataToUpdate).length) {
      return h
        .response({
          status: "fail",
          message:
            "Failed to update the news. Please provide the updated news data",
        })
        .code(400);
    }

    if (
      "tittle" in dataToUpdate &&
      (!dataToUpdate.tittle || !dataToUpdate.tittle.trim())
    ) {
      return h
        .response({
          status: "fail",
          message:
            "Failed to update the news. Please provide a non-empty news title",
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
              "Failed to update the news. Please provide only 'imageUrl' data to update",
          })
          .code(400);
      }

      await db.collection("news").doc(NewsId).update({
        imageUrl: dataToUpdate.imageUrl,
      });

      return {
        status: "success",
        message: "The news's imageUrl has been successfully updated",
      };
    }

    if ("tittle" in dataToUpdate) {
      const { tittle, ...rest } = dataToUpdate;
      dataToUpdate.tittle = tittle.trim();
      delete rest.tittle;
      Object.assign(dataToUpdate, rest);
    }

    await db.collection("news").doc(NewsId).update(dataToUpdate);

    return {
      status: "success",
      message: "The news has been successfully updated",
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

const deleteNewsHandler = async (request, h) => {
  try {
    const { NewsId } = request.params;

    await db.collection("news").doc(NewsId).delete();

    return {
      status: "success",
      message: "The news has been successfully deleted",
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
  addNewsHandler,
  getAllNewsHandler,
  getNewsByIdHandler,
  incrementViews,
  getLatestNewsHandler,
  getHottestNewsHandler,
  updateNewsHandler,
  deleteNewsHandler,
};
