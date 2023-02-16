const axios = require("axios");

exports.getInfo = async (req, res) => {
  try {
    await axios
      .get("https://api.wazirx.com/api/v2/tickers")
      .then((resp) => {
        console.log(resp.data);
      })
      .catch((error) => {});
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
