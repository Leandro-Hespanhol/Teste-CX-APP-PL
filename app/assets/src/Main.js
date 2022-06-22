import Core from "./Core.js";

const client = ZAFClient.init();
let settings;

client.metadata().then((metadata) => {
  settings = metadata.settings;
});

function init() {
  getCurrentUser().then((currentUser) => {
    renderText('Olá ' + currentUser.name + ', favor alterar o ticket conforme entender necessário.');

    client.on('*.changed', function(event) {
      let text = currentUser.name + ' alterou ' +
        event.propertyName + ' para ' + event.newValue + '.';

      renderText(text);
    });
  });
}

const Main = async () => {
  const App = document.getElementById("app");

  let appBody = document.createElement("div")
  appBody.id = 'main-content';
  App.appendChild(appBody);
  // `<div id="main-content"></div>`;
  // Write App
  Core.textInputButton();
  Core.updateEvent();
  init();
};

export default Main;
