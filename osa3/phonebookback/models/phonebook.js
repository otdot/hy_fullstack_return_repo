const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

mongoose
  .connect(url)
  .then(() => {
    console.log("connected to mongoDb");
  })
  .catch((err) => {
    console.log("error: ", err);
  });

const phoneSchema = new mongoose.Schema({
  firstname: { type: String, minlength: 3, required: true },
  phone: {
    type: String,
    validate: {
      validator: (v) => {
        return /\d{2,3}-\d{7}/g.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number`,
    },
    required: [true, "user phone number required"],
  },
});

phoneSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", phoneSchema);
