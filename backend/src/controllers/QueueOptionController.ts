import { Request, Response } from "express";

import CreateService from "../services/QueueOptionService/CreateService";
import ListService from "../services/QueueOptionService/ListService";
import UpdateService from "../services/QueueOptionService/UpdateService";
import ShowService from "../services/QueueOptionService/ShowService";
import DeleteService from "../services/QueueOptionService/DeleteService";

import { head } from "lodash";
import fs from "fs";
import path from "path";
import AppError from "../errors/AppError";
import QueueOption from "../models/QueueOption";
import { log } from "console";
import multer from "multer";
import uploadConfig from "../config/upload";


type FilterList = {
  queueId: string | number;
  queueOptionId: string | number;
  parentId: string | number | boolean;
};

export const index = async (req: Request, res: Response): Promise<Response> => {
  const { queueId, queueOptionId, parentId } = req.query as FilterList;

  const queueOptions = await ListService({ queueId, queueOptionId, parentId });

  return res.json(queueOptions);
};

export const store = async (req: Request, res: Response): Promise<Response> => {
  const queueOptionData = req.body;

  const queueOption = await CreateService(queueOptionData);

  return res.status(200).json(queueOption);
};

export const show = async (req: Request, res: Response): Promise<Response> => {
  const { queueOptionId } = req.params;

  const queueOption = await ShowService(queueOptionId);

  return res.status(200).json(queueOption);
};

export const update = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { queueOptionId } = req.params
  const queueOptionData = req.body;

  const queueOption = await UpdateService(queueOptionId, queueOptionData);

  return res.status(200).json(queueOption);
};

export const uploadFile = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { queueOptionId } = req.params
  const queueOptionData = req.body;
  const file = req.file as Express.Multer.File;
  const queueOption = await QueueOption.findByPk(queueOptionId);
  if (!queueOption) {
    throw new Error("QueueOption not found");
  }
  const oldFile = queueOption.message;
  if (fs.existsSync(oldFile)) {
    fs.unlinkSync(oldFile);
  }
  queueOption.message = file.filename;
  await queueOption.save();
  return res.status(200).json({ message: "Option Updated" });
};

export const remove = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { queueOptionId } = req.params
  const queueOption = await QueueOption.findByPk(queueOptionId);
  if (!queueOption) {
    throw new Error("QueueOption not found");
  }
  const oldFile = queueOption.message;
  if (fs.existsSync(oldFile)) {
    fs.unlinkSync(oldFile);
  }

  await DeleteService(queueOptionId);

  return res.status(200).json({ message: "Option Delected" });
};

export const mediaUpload = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { queueOptionId } = req.params;
  const files = req.files as Express.Multer.File[];
  const file = head(files);

  try {
    const queue = await QueueOption.findByPk(queueOptionId);

    queue.update({
      mediaPath: file.filename,
      mediaName: file.originalname
    });

    return res.send({ mensagem: "Arquivo Salvo" });
  } catch (err: any) {
    throw new AppError(err.message);
  }
};

export const deleteMedia = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { queueOptionId } = req.params;

  try {
    const queue = await QueueOption.findByPk(queueOptionId, {
      include: ["queue"]
    });

    const filePath = path.resolve("public", `company${queue.queue.companyId}`, queue.mediaPath);
    const fileExists = fs.existsSync(filePath);
    if (fileExists) {
      fs.unlinkSync(filePath);
    }

    queue.mediaPath = null;
    queue.mediaName = null;
    await queue.save();
    return res.send({ mensagem: "Arquivo excluído" });
  } catch (err: any) {
    throw new AppError(err.message);
  }
};
