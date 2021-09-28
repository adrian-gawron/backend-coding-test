# backend-coding-test

The API to:
- create 'Rides'
- get all 'Rides'
- get one 'Ride'

## Requirements
- Nvm for Node.js installation
- Node.js version `(>8.6 and <= 10)`
- Npm
- Sqlite

## Setup
### Nvm
To install nvm visit [nvm repo](https://github.com/nvm-sh/nvm/blob/master/README.md).
### Node.js
Use nvm to install Node.js
```bash
nvm install 10.24.1
```
or visit the official Node.js website and download the proper version. After installation make sure you are using node version (>8.6 and <= 10). If the version is not correct change the version using nvm
```bash
nvm use 10.24.1
```

### Sqlite
To download and setup visit [Sqlite download page](https://www.sqlite.org/download.html)

## Running API
1. Run `npm install` to install all packages
2. Run `npm test` to run tests
3. Run `npm start` to run the server

## Endpoints
### Health endpoint [GET] - http://localhost:8010/health

- Response:
```
- Status: 200
- Body: Healthy
```
### Create Rides endpoint [POST] - http://localhost:8010/rides
- Request body:
```
{
        "start_lat": Number,
        "start_long": Number,
        "end_lat": Number,
        "end_long": Number,
        "rider_name": String,
        "driver_name": String,
        "driver_vehicle": String
}
```
- Response:
```
- Status: 200
- Body:
[
    {
        "rideID": 1,
        "startLat": 1,
        "startLong": 1,
        "endLat": 1,
        "endLong": 1,
        "riderName": "Rider name",
        "driverName": "Driver name",
        "driverVehicle": "Driver vehicle",
        "created": "2021-09-28 12:55:18"
    }
]
```
### Get all Rides endpoint [GET] - http://localhost:8010/rides
- Response:
```
- Status: 200
- Body:
[
    {
        "rideID": 1,
        "startLat": 1,
        "startLong": 1,
        "endLat": 1,
        "endLong": 1,
        "riderName": "Rider name",
        "driverName": "Driver name",
        "driverVehicle": "Driver vehicle",
        "created": "2021-09-28 12:54:15"
    },
{
        "rideID": 2,
        "startLat": 1,
        "startLong": 1,
        "endLat": 1,
        "endLong": 1,
        "riderName": "Rider name",
        "driverName": "Driver name",
        "driverVehicle": "Driver vehicle",
        "created": "2021-09-28 12:55:15"
    }
]
```
### Get one Rides by rideId endpoint [GET] - http://localhost:8010/rides/:rideId
- Request:
```
http://localhost:8010/rides/:1
```
- Response:
```
- Status: 200
- Body:
[
    {
        "rideID": 1,
        "startLat": 1,
        "startLong": 1,
        "endLat": 1,
        "endLong": 1,
        "riderName": "Rider name",
        "driverName": "Driver name",
        "driverVehicle": "Driver vehicle",
        "created": "2021-09-28 12:54:15"
    }
]
```
