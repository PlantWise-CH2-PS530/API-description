const Hapi = require("@hapi/hapi");
const descriptionRoutes = require("./description/routes");
const newsRoutes = require("./news/routes");

const init = async () => {
  const server = Hapi.server({
    port: 9000,
    host: "localhost",
  });

  server.route(descriptionRoutes);
  server.route(newsRoutes);

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

process.on("unhandledRejection", (err) => {
  console.error(err);
  process.exit(1);
});

init();
