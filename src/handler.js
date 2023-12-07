const { nanoid } = require("nanoid");
const description = require("./description");

const addDescHandler = (request, h) => {
  const {
    name,
    about,
    nitrogen,
    fosfor,
    kalium,
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
    nitrogen,
    fosfor,
    kalium,
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

const getAllDescHandler = () => {
  return {
    status: "success",
    data: {
      description: description.map((desc) => ({
        id: desc.id,
        name: desc.name,
        about: desc.about,
      })),
    },
  };
};

const getDescByIdHandler = (request, h) => {
  const { DescId } = request.params;
  const desc = description.find((b) => b.id === DescId);

  if (!desc) {
    return h
      .response({
        status: "fail",
        message: "The plant could not be found!",
      })
      .code(404);
  }

  return {
    status: "success",
    data: {
      desc,
    },
  };
};

const updateDescHandler = (request, h) => {
  const { DescId } = request.params;
  const {
    name,
    about,
    nitrogen,
    fosfor,
    kalium,
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
        message: "Failed to update the plant. Please provide the plant name",
      })
      .code(400);
  }

  const index = description.findIndex((b) => b.id === DescId);

  if (index === -1) {
    return h
      .response({
        status: "fail",
        message: "Failed to update the plant. ID not found",
      })
      .code(404);
  }

  description[index] = {
    ...description[index],
    name,
    about,
    nitrogen,
    fosfor,
    kalium,
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

  return h
    .response({
      status: "success",
      message: "The plant has been successfully updated",
    })
    .code(200);
};

const deleteDescHandler = (request, h) => {
  const { DescId } = request.params;
  const index = description.findIndex((b) => b.id === DescId);

  if (index === -1) {
    return h
      .response({
        status: "fail",
        message: "Failed to delete the plant. ID not found",
      })
      .code(404);
  }

  description.splice(index, 1);

  return h
    .response({
      status: "success",
      message: "The plant has been successfully deleted",
    })
    .code(200);
};

module.exports = {
  addDescHandler,
  getAllDescHandler,
  getDescByIdHandler,
  updateDescHandler,
  deleteDescHandler,
};
