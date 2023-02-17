const axios = require("axios");
const infoModel = require("../models/infoModel");

exports.getInfo = async (req, res) => {
  try {
    await axios
      .get("https://api.wazirx.com/api/v2/tickers")
      .then(async (resp) => {
        const slicedInfo = Object.values(resp.data).slice(0, 10);
        await infoModel.deleteMany({});
        for (var i = 0; i < slicedInfo.length; i++) {
          await infoModel.create({
            name: slicedInfo[i]["name"],
            last: slicedInfo[i]["last"],
            buy: slicedInfo[i]["buy"],
            sell: slicedInfo[i]["sell"],
            volume: slicedInfo[i]["volume"],
            base_unit: slicedInfo[i]["base_unit"],
          });
        }
        const allInfo = await infoModel.find();
        res.status(200).json({
          success: true,
          allInfo,
        });
      })
      .catch((error) => {
        res.status(400).json({
          success: false,
          message: error.message,
        });
      });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
