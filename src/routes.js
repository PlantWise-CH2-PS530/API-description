const descHandlers = require("./handlers");

const routes = [
  {
    method: "POST",
    path: "/desc",
    handler: descHandlers.addDescHandler,
  },
  {
    method: "GET",
    path: "/desc",
    handler: descHandlers.getAllDescHandler,
  },
  {
    method: "GET",
    path: "/desc/{bookId}",
    handler: descHandlers.getDescByIdHandler,
  },
  {
    method: "PUT",
    path: "/desc/{bookId}",
    handler: descHandlers.updateDescHandler,
  },
  {
    method: "DELETE",
    path: "/desc/{bookId}",
    handler: descHandlers.deleteDescHandler,
  },
];

module.exports = routes;
