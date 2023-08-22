import { PrismaClient } from '@prisma/client';
import argon2 from 'argon2';

const prisma = new PrismaClient();

export const Login = async (req, res) => {
  const userLoginEmail = req.body.email;
  const userLoginPassword = req.body.password;

  const user = await prisma.user.findUnique({
    where: {
      email: userLoginEmail,
    },
  });
  if (!user)
    return res.status(404).json({
      message: 'User not found',
    });

  const userPassword = user.password;
  const matchPassword = await argon2.verify(userPassword, userLoginPassword);
  if (!matchPassword)
    return res.status(400).json({
      message: 'Wrong Password',
    });
  req.session.userId = user.id;
  const userId = user.id;
  const userName = user.name;
  const userEmail = user.email;
  const userRole = user.role;
  res.status(200).json({
    userId,
    userName,
    userEmail,
    userRole,
    message: "You're Login",
  });
};

export const Me = async (req, res) => {
  if (!req.session.userId)
    return res.status(401).json({
      message: 'You are not logged in',
    });
  const userId = req.session.userId;
  const user = await prisma.user.findUnique({
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
  if (!user)
    return res.status(404).json({
      message: 'User not found',
    });
  res.status(200).json(user);
};

export const logOut = (req, res) => {
  req.session.destroy((err) => {
    if (err)
      return res.status(400).json({
        message: "Can't logout",
      });
    res.status(200).json({
      message: 'Logout successfully',
    });
  });
};
