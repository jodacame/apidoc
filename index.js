'use strict';

const app       = require("./controllers/app.js")

const PORT      = process.env.PORT || 8080;


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
