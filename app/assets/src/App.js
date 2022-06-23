// Start client and resize app
import Main from "./Main.js";
let client = ZAFClient.init();

client.on("app.registered", (_e) => {
  client.invoke("resize", { width: "100%", height: "130px" });
});

// Create screen context
// client.set("/api/v2/tickets/{ticket_id}")
Main();
