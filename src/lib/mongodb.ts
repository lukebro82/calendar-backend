import { Schema, model, connect } from "mongoose";

const db: any = process.env.DB_CNN;

export const dbConnection = async () => {
  try {
    await connect(db);

    console.log("DB Online");
  } catch (error) {
    console.log(error);
    throw new Error("Error connecting to the database");
  }
};
