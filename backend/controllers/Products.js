import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getProducts = async (req, res) => {
  try {
    let response;
    if (req.role === 'admin') {
      response = await prisma.product.findMany({
        select: {
          id: true,
          name: true,
          price: true,
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      });
    } else {
      response = await prisma.product.findMany({
        select: {
          id: true,
          name: true,
          price: true,
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
        where: {
          userId: req.userId,
        },
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getProductbyId = async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: req.params.id,
      },
    });
    if (!product)
      return res.status(404).json({
        message: 'Product not found',
      });
    let response;
    if (req.role === 'admin') {
      response = await prisma.product.findUnique({
        select: {
          id: true,
          name: true,
          price: true,
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
        where: {
          id: product.id,
        },
      });
    } else {
      response = await prisma.product.findUnique({
        select: {
          id: true,
          name: true,
          price: true,
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
        where: {
          id: product.id,
          userId: req.userId,
        },
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const createProduct = async (req, res) => {
  const { name, price } = req.body;
  try {
    await prisma.product.create({
      data: {
        name: name,
        price: price,
        userId: req.userId,
      },
    });
    res.status(201).json({
      message: 'Product created successfully',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: req.params.id,
      },
    });
    if (!product)
      return res.status(404).json({
        message: 'Product not found',
      });
    const { name, price } = req.body;
    if (req.role === 'admin') {
      await prisma.product.update({
        data: {
          name: name,
          price: price,
        },
        where: {
          id: product.id,
        },
      });
    } else {
      if (req.userId !== product.userId)
        return res.status(403).json({
          message: 'Forbidden Access',
        });
      await prisma.product.update({
        data: {
          name: name,
          price: price,
        },
        where: {
          id: product.id,
          userId: req.userId,
        },
      });
    }
    res.status(200).json({
      message: 'Product updated successfully',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: req.params.id,
      },
    });
    if (!product)
      return res.status(404).json({
        message: 'Product not found',
      });
    if (req.role === 'admin') {
      await prisma.product.delete({
        where: {
          id: product.id,
        },
      });
    } else {
      if (req.userId !== product.userId)
        return res.status(403).json({
          message: 'Forbidden Access',
        });
      await prisma.product.delete({
        where: {
          id: product.id,
          userId: req.userId,
        },
      });
    }
    res.status(200).json({
      message: 'Product deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
