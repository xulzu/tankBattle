const data = require("./maps.json");
const fs = require("fs");
const html = fs.readFileSync("./render/index.html", "utf-8");
console.log();
fs.writeFileSync(
  "./game.html",
  html.replace("$mockData$", JSON.stringify(data))
);
// console.log(data[0]);
