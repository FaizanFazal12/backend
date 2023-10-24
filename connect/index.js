const mongoose = require('mongoose');

const ConnectToMongodb = (url) => {
  return mongoose.connect(url);
}


module.exports={
    ConnectToMongodb
}