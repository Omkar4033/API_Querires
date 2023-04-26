const express = require("express");
const { personModel } = require("../Model/personModel");

const personRouter = express.Router();

personRouter.get("/first", async (req, res) => {
  try {
    let data = await personModel.find({
      income: { $lt: 5 },
      car: { $in: ["BMW", "Mercedes"] },
    });

    res.send(data);
  } catch (error) {
    res.send({
      message: `${error}`,
    });
  }
});
personRouter.get("/second", async (req, res) => {
  try {
    let data = await personModel.find({
      gender: "male",
      phone_price: { $gt: "10000" },
    });
    console.log(data);
    res.send(data);
  } catch (error) {
    res.send({
      message: `${error}`,
    });
  }
});
personRouter.get("/third", async (req, res) => {
  try {
    let data = await personModel.find({
      last_name: { $regex: "^M" },
      $expr: { $gt: [{ $strLenCP: "$quote" }, 15] },
      email: {
        $regex: { $concat: [".*", { $substr: ["$last_name", 0, -1] }, ".*"] },
      },
    });
    console.log(data);
    res.send(data);
  } catch (error) {
    res.send({
      message: `${error}`,
    });
  }
});
personRouter.get("/fourth", async (req, res) => {
  try {
    let data = await personModel.find({
      car: { $in: ["BMW", "Mercedes", "Audi"] },
      email: { $not: { $regex: "[0-9]" } },
    });
    console.log(data);
    res.send(data);
  } catch (error) {
    res.send({
      message: `${error}`,
    });
  }
});
personRouter.get("/fifth", async (req, res) => {
  try {
    let data = await personModel.find([
      // Group users by city and calculate the number of users and average income for each city
      {
        $group: {
          _id: "$city",
          count: { $sum: 1 },
          avgIncome: { $avg: "$income" },
        },
      },
      // Sort the result in descending order of the number of users
      { $sort: { count: -1 } },
      // Limit the result to the top 10 cities
      { $limit: 10 },
    ]);
    console.log(data);
    res.send(data);
  } catch (error) {
    res.send({
      message: `${error}`,
    });
  }
});

personRouter.post("/details", (req, res) => {
  try {
    let data = new personModel(req.body);
    data.save();
    res.send({
      message: "data inserted successfully",
    });
  } catch (error) {
    res.send({
      message: `${error}`,
    });
  }
});

module.exports = { personRouter };
