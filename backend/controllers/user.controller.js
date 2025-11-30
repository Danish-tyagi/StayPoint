import User from "../model/user.model.js"

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;         

    if (!userId) {
      return res.status(401).json({ message: "No user id from token" });
    }

    const user = await User.findById(userId).select("-password").populate("listing","title image1 image2 image3 description rent category city landmark isBooked host ratings")
    .populate("booking","title image1 image2 image3 description rent category city landmark isBooked host ratings")

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }


    return res.status(200).json(user);
  } catch (err) {
    console.error("getCurrentUser error:", err);
    return res
      .status(500)
      .json({ message: "Server error in getCurrentUser", error: err.message });
  }
};