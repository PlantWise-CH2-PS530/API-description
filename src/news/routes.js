const newsHandlers = require("./handler");

const routes = [
  {
    method: "POST",
    path: "/news",
    handler: newsHandlers.addNewsHandler,
  },
  {
    method: "GET",
    path: "/news",
    handler: newsHandlers.getAllNewsHandler,
  },
  {
    method: "GET",
    path: "/news/{NewsId}",
    handler: newsHandlers.getNewsByIdHandler,
  },
  {
    method: "GET",
    path: "/latest-news",
    handler: newsHandlers.getLatestNewsHandler,
  },
  {
    method: "GET",
    path: "/hottest-news",
    handler: newsHandlers.getHottestNewsHandler,
  },
  {
    method: "PUT",
    path: "/news/{NewsId}",
    handler: newsHandlers.updateNewsHandler,
  },
  {
    method: "DELETE",
    path: "/news/{NewsId}",
    handler: newsHandlers.deleteNewsHandler,
  },
];

module.exports = routes;
