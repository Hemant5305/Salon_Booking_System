require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/User");
const Service = require("../models/Service");

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const adminEmail = "admin@salon.com";
  const existingAdmin = await User.findOne({ email: adminEmail });
  if (!existingAdmin) {
    await User.create({
      name: "Salon Admin",
      email: adminEmail,
      password: "admin123",
      role: "admin",
    });
    console.log("Admin created: admin@salon.com / admin123");
  } else {
    console.log("Admin already exists");
  }

  const serviceCount = await Service.countDocuments();
  if (serviceCount === 0) {
    await Service.insertMany([
      { name: "Haircut", description: "Professional haircut styling", price: 25, duration: 30, category: "Hair" },
      { name: "Hair Coloring", description: "Full hair coloring service", price: 60, duration: 90, category: "Hair" },
      { name: "Manicure", description: "Classic manicure treatment", price: 20, duration: 40, category: "Nails" },
      { name: "Pedicure", description: "Relaxing pedicure treatment", price: 25, duration: 45, category: "Nails" },
      { name: "Facial", description: "Deep cleansing facial", price: 35, duration: 50, category: "Skin" },
    ]);
    console.log("Sample services created");
  } else {
    console.log("Services already exist");
  }

  await mongoose.disconnect();
  process.exit(0);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
