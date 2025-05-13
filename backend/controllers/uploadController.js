const User = require("../models/User");

exports.uploadAvatar = async (req, res) => {
  try {
    const imagePath = `uploads/${req.file.filename}`;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { avatar: imagePath },
      { new: true }
    ).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({message : `Image upload failed : ${error}`});
  }
};
