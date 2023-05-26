import express from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

export const createSwaggerSpec = (app: express.Application): void => {
  const options: swaggerJsdoc.Options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "agenda-kenzie",
        version: "1.0.0",
        description: "API de agenda",
      },
    },
    apis: ["./src/router/*.ts"],
  };

  const swaggerSpec = swaggerJsdoc(options);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};