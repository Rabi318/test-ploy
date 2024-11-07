const http = require("http");
const { configs } = require("../config/index");

const ListenerPlugin = {
  listen(app) {
    const server = http.createServer(app);
    server.listen(configs.PORT, () => {
      console.log(`\nServer is running on port ${configs.PORT} 💀💀💀\n`);
    });
  },
};

module.exports = { ListenerPlugin };
