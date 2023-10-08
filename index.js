import { registerUser } from "./js/start/register.js";
import { loginUser } from "./js/start/login.js";

const login = document.getElementById("log-in");
const register = document.getElementById("register");

register.addEventListener("submit", () => {
  event.preventDefault();
  const [userName, email, password] = event.target.elements;
  registerUser(userName, email, password);
  register.reset();
});

login.addEventListener("submit", () => {
  event.preventDefault();
  const [email, password] = event.target.elements;
  loginUser(email, password);
  login.reset();
});