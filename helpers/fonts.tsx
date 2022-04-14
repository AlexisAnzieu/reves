import { Global } from "@emotion/react";

const Fonts = () => (
    <Global
        styles={`
      /* latin */
      @font-face {
        font-family: "Bauhaus93";
         src: url("/fonts/BAUHS93.ttf") format("truetype") }
         /* latin */
      @font-face {
        font-family: "Eurostyle";
        src: url("/fonts/Eurostyle.ttf") format("truetype") }
      `}
    />
);

export default Fonts;
