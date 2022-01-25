# Cat API
An API to return the top cat breeds!

# Instructions to run
This assumes that you have a (semi-)recent version of node (12+) and npm
1. Change and desired configuration in .env file (mainly local port)
2. Install dependencies
```shell
npm install
```
3. Start
```shell
npm start
```
4. Request a list of cats from the API (using the configured port)
```shell
curl --location --request GET 'localhost:3001/breeds/topbreeds'
```

# Testing
To test the application you can run:
```shell
npm run lint
npm run test
```
These tests also run automatically on GitHub (see https://github.com/MattHorat/catapi/actions)!