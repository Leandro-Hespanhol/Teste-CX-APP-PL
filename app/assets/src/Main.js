import Core from "./Core.js";

const client = ZAFClient.init();
let settings;

client.metadata().then((metadata) => {
  settings = metadata.settings;
});

const Main = async () => {
  const App = document.getElementById("app");

  let appBody = document.createElement("div");
  appBody.id = 'main-content';
  App.appendChild(appBody);
  // `<div id="main-content"></div>`;
  // Write App
  Core.textInputButton();
  Core.updateEvent();
  init();
};

export default Main;
