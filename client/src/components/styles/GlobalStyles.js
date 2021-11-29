import { createGlobalStyle } from "styled-components";
import bg from "../HomePage/assets/images/bg-desktop.png";

const GlobalStyle = createGlobalStyle`

* {
	box-sizing: border-box;
}

body {
	  background-image: url(${bg});
  background-size: cover ;

  background-repeat: no-repeat;
	width: 100%;
	height: 100vh;
	margin: 0;
}

h1 {
  font-size: 2em;
  margin: 0.67em 0;
}

a {
  background-color: transparent;
  text-decoration: none;
}

img{
	max-width: 100%;
	border-style: none;
}




`;
export default GlobalStyle;
