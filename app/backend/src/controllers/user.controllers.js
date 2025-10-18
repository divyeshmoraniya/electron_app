import {User} from "../models/user.models.js"


export const createuser = async (req, res) => {
   
    console.log(req.body)
    const {clerkId, userName, Email, profileImg} = req.body

    try {
        const existedUser = await User.findOne({ clerkId });
        if (existedUser) {
            return res.status(400).json({ msg: "User already exists" });
        }

        const user = await User.create({
            clerkId,
            userName,
            Email,
            profileImg,
        });

        if (!user) {
            return res.status(500).json({ msg: "User not created due to server error" });
        }

        res.status(201).json({ msg: "User created successfully", user });
    } catch (error) {
        console.error("❌ Error creating user:", error);
        res.status(500).json({ msg: "Internal server error", error: error.message });
    }
};

export const getuser = async (req, res) => {
  try {
    const { Email } = req.params;
    const user = await User.findOne({ Email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
