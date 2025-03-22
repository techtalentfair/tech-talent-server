const mongoose = require("mongoose");

const SubscriberScheme = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required!"],
  },
});

const Subscriber = mongoose.model("Subscriber", SubscriberScheme);

module.exports = Subscriber;
