import asyncHandler from "express-async-handler";

const signup = asyncHandler(async (req, res) => {
  res.json({
    data: "you hit the signup endpoint",
  });
});

// exports.signup = (req, res) => {
//   res.json({
//     data: "you hit the signup endpoint",
//   });
// };

export { signup };
