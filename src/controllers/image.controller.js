const image = async (req, res) => {
  try {
    return res
      .status(200)
      .json({ message: "image router", success: true, data: {} });
  } catch (error) {
    return res
      .status(400)
      .json({ message: err.message, success: false, data: {} });
  }
};

module.exports = {image};
