const Hapi = require("@hapi/hapi");
const descriptionRoutes = require("./description/routes");
const newsRoutes = require("./news/routes");

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 8080, // Menggunakan port dari environment variable jika ada, jika tidak, gunakan port 8080
    host: "0.0.0.0", // Host yang digunakan di GCP
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
