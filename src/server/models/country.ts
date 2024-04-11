import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

/**
 * Dynamically creates a Sequelize model for a country-specific database.
 * @param countryCode The ISO country code to create a model for.
 * @returns A Sequelize model for the specified country.
 */
export function retrieveCountryData(countryCode: string) {
  
    class CountryData extends Model {}
  
    CountryData.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      load: {
        type: DataTypes.INTEGER
      },
      load_forecast: {
        type: DataTypes.INTEGER
      },
      datetime: {
        type: DataTypes.DATE
      },
      biomass: {
        type: DataTypes.INTEGER
      },
      coal: {
        type: DataTypes.INTEGER
      },
      gas: {
        type: DataTypes.INTEGER
      },
      geothermal: {
        type: DataTypes.INTEGER
      },
      hydro: {
        type: DataTypes.INTEGER
      },
      nuclear: {
        type: DataTypes.INTEGER
      },
      oil: {
        type: DataTypes.INTEGER
      },
      solar: {
        type: DataTypes.INTEGER
      },
      wind: {
        type: DataTypes.INTEGER
      },
      other: {
        type: DataTypes.INTEGER
      },
      prod_forecast: {
        type: DataTypes.INTEGER
      }
    }, 
    {
      sequelize,
      modelName: `${countryCode.toUpperCase()}CountryData`,
      tableName: `${countryCode.toLowerCase()}_data`
    });
  
    return CountryData;
} 