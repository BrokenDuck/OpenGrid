# OpenGrid: Power Mapping

[[_TOC_]]

## Team Members
1. Alexander Brady
2. Rasim Ibadov
3. Jonathan Maillefaud
4. Adam Suma

## Project Description 
*OpenGrid* is a platform that gives an intuitive and extensive visualization of the European Power Grid. The platform aims to help the users quickly see the current state of the grid and look at the current electricity prices for the next day.

### Users
- Households, to look at electricity prices for the next day
- Traders, to be quickly notified of outages in the grid
- Electricity producers, to keep an oversight of the grid

### Datasets
[The ENTSO-E transparency platform](https://transparency.entsoe.eu/)
[Electricity Maps](https://api-access.electricitymaps.com/free-tier)
[Rest Countries](https://restcountries.com)
[Flags API](https://flagsapi.com/)

### Tasks
- Visualize current production/consumption data
- Visualize current day-ahead prices
- Visualize past data
- Notify users when a current outage affects them

## Requirements
To run the project you need:
- A working version of [Node.js](https://nodejs.org/) on your system 

## How to Run
- clone the repository;
- open a terminal instance and using the command ```cd``` move to the folder where the project has been downloaded;
- then run: ```npm run dev```


### Local Development

Only change files inside the `src` directory.

**Client side**

All client side files are located in the `src/client` directory.

**Server side**

All server side files are located in the `src/server` directory.

### Local Testing

**run container for local testing**

```bash
docker build -t my-webapp .

docker run -it --rm -p 5173:5173 my-webapp
```
Open a browser and connect to http://localhost:5173

**run bash in interactive container**
```bash
docker build -t my-webapp src/.

docker run -it --rm -p 5173:5173 my-webapp bash
```


## Milestones
Document here the major milestones of your code and future planned steps.\
- [ ] Functioning Frontend with Map Overlay
  - [ ] Installed dependencies and choosing UI frameworks
  - [ ] Creation of Framework environment
  - [ ] Wrapping app with necessary providers
  - [ ] First map version using React leaflet.
  - [ ] Theme control (dark and light mode)
  - [ ] Country container version 1
  - [ ] Choosing electricity maps api for CO2 data, flags api for country flags, restcountries.com for full country names

- [ ] First API call
  - [ ] Choosing ENTSO-E api
  - [ ] Design Database Schema
  - [ ] Parsing incoming API data
  - [ ] Setup Endpoints for frontend retrieval

- [ ] Backend with Express and SQLite
  - [ ] Set up SQLite database with Sequelize
  - [ ] Set up querying from country tables 

## Weekly Summary 
Write here a short summary with weekly progress, including challanges and open questions.\
We will use this to understand what your struggles and where did the weekly effort go to.

### Week 1
Ideation: Brainstorming, settling on task idea and selecting data sources. Project pitch and task distribution.

### Week 2
Set up skeleton of Flask project, team member were given access to gitlab repo, first map overlay.

### Week 3
Began work on frontend with dummy data, added sidebar, graphs, dark mode.

### Week 4
Began work on flask backend, set up initial database schema, encountered various docker image and CI/CD issues.

### Week 5
Switch to express, migrating all frontend files to gitlab repo. Finished polishing and backend/API integration. Added CO2 data.