import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const verifyUser = async (req, res, next) => {
  if (!req.session.userId)
    return res.status(401).json({
      message: 'You are not logged in',
    });
  const userId = req.session.userId;
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user)
    return res.status(404).json({
      message: 'User not found',
    });
  req.userId = user.id;
  req.role = user.role;
  next();
};

export const adminOnly = async (req, res, next) => {
  const userId = req.session.userId;
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user)
    return res.status(404).json({
      message: 'User not found',
    });
  if (user.role !== 'admin')
    return res.status(403).json({
      message: 'You are not admin',
    });
  next();
};
