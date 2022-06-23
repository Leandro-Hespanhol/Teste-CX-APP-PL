import Core from "./Core.js";

const client = ZAFClient.init();
let settings;

client.metadata().then((metadata) => {
  settings = metadata.settings;
});

const Main = async () => {
  const App = document.getElementById("app");

  const appBody = document.createElement("div");
  const divList = document.createElement("div")
  appBody.id = 'main-content';
  divList.id = 'recent-tickets-list'
  App.appendChild(appBody);
  App.appendChild(divList);
  
  Core.appendInputButton();
  Core.updateEvent();
  Core.ticketsList();
  Core.listTicketsEvent();
  // init();
};

export default Main;
