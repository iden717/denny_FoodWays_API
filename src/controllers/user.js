const Joi = require("joi");
const { users } = require("../../models");

exports.getUsers = async (req, res) => {
  try {
    const user = await users.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "error",
      message: "Server Error",
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    await users.destroy({
      where: {
        id,
      },
    });
    res.send({
      status: "success",
      data: {
        id,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "error",
      message: "Server Error",
    });
  }
};

exports.addUser = async (req, res) => {
  try {
    const { body } = req;

    const { email, password, fullname, gender, phone, role } = body;

    const schema = Joi.object({
      email: Joi.string().email().min(12).max(30).required(),
      password: Joi.string().min(6).max(50).required(),
      fullname: Joi.string().min(3).max(50).required(),
      gender: Joi.string().min(4).max(25).required(),
      phone: Joi.string().min(10).max(13).required(),
      role: Joi.string().min(3).max(20).required(),
    });

    const { error } = schema.validate({
      email,
      password,
      fullname,
      gender,
      phone,
      role,
    });

    if (error)
      return res.status(400).send({
        status: "Validate Failed",
        message: error.details[0].message,
      });

    const input = {
      email,
      password,
      fullname,
      gender,
      phone,
      role,
    };

    const user = await users.create(body);

    res.send({
      status: "success",
      data: {
        fullname,
        role,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "error",
      message: "Server Error",
    });
  }
};
//template
exports.functionName = async (req, res) => {
  try {
    res.send({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "error",
      message: "Server Error",
    });
  }
};
