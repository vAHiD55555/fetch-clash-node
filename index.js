const fs = require("fs");
const path = require("path");
function zore(t) {
  return t > 10 ? `${t}` : `0${t}`;
}
function wf(name, data) {
  fs.writeFileSync(path.join(__dirname, "node", `${name}.yaml`), data);
}
//2023/02/20230224.yaml

let nodes = [
  {
    name: "NodeFree",
    hostUrl: "https://nodefree.org/dy/",
  },
  {
    name: "ClashNode",
    hostUrl: "https://clashnode.com/wp-content/uploads/",
  },
];

let d = new Date();
let y = zore(d.getFullYear());
let m = zore(d.getMonth() + 1);
let day = zore(d.getDate());
let timeStr = [y, m, `${y}${m}${day}.yaml`].join("/");
console.log("hour:" + d.getHours());
(async () => {
  try {
    for (let node of nodes) {
      let res = await fetch(node.hostUrl + timeStr).then((res) => res.text());
      console.log(`[ ${node.hostUrl + timeStr} ] is ok`);
      wf(node.name, res);
    }
  } catch (error) {
    console.log("error :" + error);
  }
})();
