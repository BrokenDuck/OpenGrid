import express from "express";
import ViteExpress from "vite-express";
import { Op } from 'sequelize';

import sequelize from './config/database';
import { retrieveCountryData } from "./models/country";
import { findTimeFrameStart } from "./utils/scripts";

// Creates the express app. Do not change
const app = express();

// Retrieve data for a specific country from within a specific time period
app.get("/api/:country_code/:time_period", async (req: any, res: any) => {
    const { country_code, time_period } = req.params;
    
    try {
      const CountryDataModel = retrieveCountryData(country_code);

      const today = new Date("December 1, 2023 23:00:00");
      const timeFrameStart = findTimeFrameStart(today, time_period);
    
      const data = await CountryDataModel.findAll({
        where: { datetime: { [Op.gte]: timeFrameStart } }
      });

      res.status(200).json(data);
    } 
    catch (error : any) { 
      res.status(500).send(error.message); 
    }
});


// Test DB Connection
sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.error('Unable to connect to the database: ', err));

// Do not change below this line
ViteExpress.listen(app, 5173, () =>
    console.log("Server is listening on http://localhost:5173"),
);