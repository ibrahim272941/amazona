import Product from '../models/productModel.js';
import data from '../data.js';
import User from '../models/userModel.js';

export const insertion = async (req, res, next) => {
  try {
    await Product.deleteMany();
    await User.deleteMany();
    const insertedProducts = await Product.insertMany(data.products);
    const insertedUsers = await User.insertMany(data.users);
    res.send({
      message: 'Successfully inserted data',
      insertedProducts,
      insertedUsers,
    });
  } catch (err) {
    next(err);
  }
};
