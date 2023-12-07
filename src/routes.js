const descHandlers = require("./handler");

const routes = [
  {
    method: "POST",
    path: "/description",
    handler: descHandlers.addDescHandler,
  },
  {
    method: "GET",
    path: "/description",
    handler: descHandlers.getAllDescHandler,
  },
  {
    method: "GET",
    path: "/description/{descId}",
    handler: descHandlers.getDescByIdHandler,
  },
  {
    method: "PUT",
    path: "/description/{descId}",
    handler: descHandlers.updateDescHandler,
  },
  {
    method: "DELETE",
    path: "/description/{descId}",
    handler: descHandlers.deleteDescHandler,
  },
];

module.exports = routes;
