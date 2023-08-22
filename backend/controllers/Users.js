import { PrismaClient } from '@prisma/client';
import argon2 from 'argon2';
const prisma = new PrismaClient();

export const getUsers = async (req, res) => {
  try {
    const getUsers = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });
    res.status(200).json(getUsers);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getUserbyId = async (req, res) => {
  const userId = req.params.id;
  const getUserbyId = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
    },
  });
  if (!getUserbyId) {
    res.status(404).json({
      message: 'User not found',
    });
  } else {
    res.status(200).json(getUserbyId);
  }
};

export const createUser = async (req, res) => {
  const { name, email, password, confPassword, role } = req.body;
  // password validation
  if (password !== confPassword)
    return res.status(400).json({
      message: 'Passwords do not match',
    });
  const hashedPassword = await argon2.hash(password);
  try {
    const createUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
        role: role,
      },
    });
    res.status(201).json(createUser);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  const userId = req.params.id;
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user)
    return res.status(404).json({
      message: 'User not found',
    });
  const { name, email, password, confPassword, role } = req.body;
  const userPassword = user.password;
  let hashedPassword;
  if (password === '' || password === null) {
    hashedPassword = userPassword;
  } else {
    hashedPassword = await argon2.hash(password);
  }
  if (password !== confPassword)
    return res.status(400).json({
      message: 'Passwords do not match',
    });
  try {
    await prisma.user.update({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
        role: role,
      },
      where: {
        id: user.id,
      },
    });
    res.status(200).json({
      message: 'User Updated',
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  const userId = req.params.id;
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user)
    return res.status(404).json({
      message: 'User not found',
    });
  try {
    await prisma.user.delete({
      where: {
        id: user.id,
      },
    });
    res.status(200).json({
      message: 'User Deleted',
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
