const Koa = require("koa");
const { koaBody } = require("koa-body");
const app = new Koa();
const fs = require("fs");
const readline = require("readline");

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
let moveType = "STOP";
let shoot = false;
const maps = [];
process.stdin.on("keypress", (str, key) => {
  if (key.ctrl && key.name === "c") {
    fs.writeFileSync(
      "./render/maps.js",
      "export default " + JSON.stringify(maps)
    );
    process.exit(0);
  }
  if (key.name === "up") {
    moveType = "TOP";
  } else if (key.name === "down") {
    moveType = "DOWN";
  } else if (key.name === "left") {
    moveType = "LEFT";
  } else if (key.name === "right") {
    moveType = "RIGHT";
  } else if (key.name === "s") {
    moveType = "STOP";
  } else if (key.name === "space") {
    shoot = true;
  }
});

app.use(koaBody());
let flag = true;
app.use(async (ctx) => {
  const res = ctx.request.body;
  if (flag) {
    flag = false;
  } else {
    res.map = [];
  }
  maps.push(res);
  ctx.body = {
    moveType: moveType,
    shoot: shoot,
  };
  shoot = false;
});

app.listen(3000);
