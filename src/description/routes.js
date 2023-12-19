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
    path: "/description/{DescId}",
    handler: descHandlers.getDescByIdHandler,
  },
  {
    method: "PUT",
    path: "/description/{DescId}",
    handler: descHandlers.updateDescHandler,
  },
  {
    method: "DELETE",
    path: "/description/{DescId}",
    handler: descHandlers.deleteDescHandler,
  },
];

module.exports = routes;
