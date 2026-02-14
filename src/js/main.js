import "../scss/main.scss";
import { createHeader } from "./components/header.js";
import { createFooter } from "./components/footer.js";

document.querySelector("#header").appendChild(createHeader());
document.querySelector("#footer").appendChild(createFooter());
