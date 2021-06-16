// We need to centralize the zIndex definitions as they work

import { ZIndex } from "./zIndex.type";

// like global values in the browser.
const zIndex:ZIndex = {
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  };
  
  export default zIndex;