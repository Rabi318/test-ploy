const { readdir } = require("fs");
const path = require("path");
const { configs } = require("../config/index");

const RouterPlugin = {
  setup(app) {
    readdir(path.join(__dirname, "../routes"), (err, files) => {
      if (err) {
        console.error("Error reading routes directory:", err);
        return;
      }

      files.forEach(async (filename, index) => {
        const route = filename.split(".")[0];
        try {
          const router = await require(path.join(
            __dirname,
            `../routes/${filename}`
          ));
          app.use(`/${configs.API_VERSION}/${route}`, router.default || router);
          console.log(
            `${configs.HOST}:${configs.PORT}/${configs.API_VERSION}/${route}\n`
          );
        } catch (error) {
          console.error(`Error loading route ${filename}:`, error);
        }

        if (files.length - 1 === index) {
          app.use((_req, res) => {
            res.status(404).json({ msg: "Route not found" });
          });
        }
      });
    });
  },
};

module.exports = { RouterPlugin };
