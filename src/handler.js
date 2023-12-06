const { nanoid } = require("nanoid");
const books = require("./description");

const addDescHandler = (request, h) => {
  const {
    name,
    about,
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

  const id = nanoid();

  const newDesc = {
    id,
    name,
    about,
    soilMoisture,
    recomFertilize1,
    recomFertilize2,
    recomFertilize3,
    FertilizationRecommendations,
    difficulty,
    size,
    type,
    watering,
  };

  description.push(newDesc);

  return h
    .response({
      status: "success",
      message: "The plant has been successfully added!",
      data: {
        DescId: id,
      },
    })
    .code(201);
};

const getAllDescHandler = () => {};

const getDescByIdHandler = (request, h) => {};

const updateDescHandler = (request, h) => {};

const deleteDescHandler = (request, h) => {};

module.exports = {
  addDescHandler,
  getAllDescHandler,
  getDescByIdHandler,
  updateDescHandler,
  deleteDescHandler,
};
