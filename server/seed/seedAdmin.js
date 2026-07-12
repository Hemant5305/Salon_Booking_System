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

  const services = [
    {
      name: "Haircut",
      description: "Professional haircut styling tailored to your look",
      price: 399,
      duration: 30,
      category: "Hair",
      image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=600&fit=crop",
    },
    {
      name: "Hair Coloring",
      description: "Full hair coloring service with premium products",
      price: 1499,
      duration: 90,
      category: "Hair",
      image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&h=600&fit=crop",
    },
    {
      name: "Manicure",
      description: "Classic manicure treatment for soft, tidy hands",
      price: 349,
      duration: 40,
      category: "Nails",
      image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&h=600&fit=crop",
    },
    {
      name: "Pedicure",
      description: "Relaxing pedicure treatment for happy feet",
      price: 449,
      duration: 45,
      category: "Nails",
      image: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=800&h=600&fit=crop",
    },
    {
      name: "Facial",
      description: "Deep cleansing facial for glowing, refreshed skin",
      price: 799,
      duration: 50,
      category: "Skin",
      image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&h=600&fit=crop",
    },
  ];

  for (const service of services) {
    await Service.findOneAndUpdate({ name: service.name }, service, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    });
  }
  console.log("Services seeded/updated");

  await mongoose.disconnect();
  process.exit(0);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
