const {
  addNewsHandler,
  getAllNewsHandler,
  getNewsByIdHandler,
  getLatestNewsHandler,
  getHottestNewsHandler,
  updateNewsHandler,
  deleteNewsHandler,
} = require("./handler");

const routes = [
  {
    method: "POST",
    path: "/news",
    handler: addNewsHandler,
  },
  {
    method: "GET",
    path: "/news",
    handler: getAllNewsHandler,
  },
  {
    method: "GET",
    path: "/news/{NewsId}",
    handler: getNewsByIdHandler,
  },
  {
    method: "GET",
    path: "/latest-news",
    handler: getLatestNewsHandler,
  },
  {
    method: "GET",
    path: "/hottest-news",
    handler: getHottestNewsHandler,
  },
  {
    method: "PUT",
    path: "/news/{NewsId}",
    handler: updateNewsHandler,
  },
  {
    method: "DELETE",
    path: "/news/{NewsId}",
    handler: deleteNewsHandler,
  },
];

module.exports = routes;
