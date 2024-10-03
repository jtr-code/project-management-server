import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { title } from "process";

const prisma = new PrismaClient();

export const getSearchResult = async (req: Request, res: Response): Promise<void> => {
  try {
    const { query } = req.query;

    const taskResult = await prisma.task.findMany({
      where: {
        OR: [
          { title: { contains: query as string } },
          { description: { contains: query as string } },
        ],
      },
    });
    const projectResult = await prisma.project.findMany({
      where: {
        OR: [
          { name: { contains: query as string } },
          { description: { contains: query as string } },
        ],
      },
    });

    const userResult = await prisma.user.findMany({
      where: {
        OR: [{ username: { contains: query as string } }],
      },
    });

    res.json({
      taskResult,
      projectResult,
      userResult,
    });
  } catch (error: any) {
    res.status(500).send({ message: `Error retrieving search results ${error.message}` });
  }
};
