// const express = require("express");
// const app = express();
// const port = 3000;
// const fs = require("fs");

import express, { Application, Request, Response } from "express";

const app: Application = express();
const PORT = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
