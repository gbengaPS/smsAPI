# SMS API

[![Build Status](https://travis-ci.org/gbengaPS/smsAPI.svg?branch=develop)](https://travis-ci.org/gbengaPS/smsAPI)
[![Maintainability](https://api.codeclimate.com/v1/badges/7d1c278ccf0164e93ed7/maintainability)](https://codeclimate.com/github/gbengaPS/smsAPI/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/7d1c278ccf0164e93ed7/test_coverage)](https://codeclimate.com/github/gbengaPS/smsAPI/test_coverage)
SMS API provides a basic SMS functionality. Users can send and receive messages
based on defined criteria.

## Getting Started

Clone the repository

```
$ git clone git@github.com:gbengaPS/smsAPI.git
```

Change directory into the project

```
$ cd smsAPI
```

Then install packages

```
$ yarn install
```

Change `.env.sample` to `.env` and add the needed values

Start application

```
$ yarn start:dev
```

### Endpoints

| Endpoint                     | HTTP Method | Description                                |
| ---------------------------- | ----------- | ------------------------------------------ |
| /users/:id/messages/sent     | GET         | Returns messages a user sent               |
| /users/:id/messages/received | GET         | Returns messages a user has received       |
| /users                       | POST        | Creates a new user                         |
| /users/:senderId/message     | POST        | Helps send a message to a defined receiver |
| /users/:id                   | DELETE      | Delete user with the provided id           |
| /messages/:id                | DELETE      | Delete a specific message                  |

### Documentation

Visit [API DOC](https://documenter.getpostman.com/view/2057950/RzZ7ofvF#a8caceda-bf2c-80b3-2bf6-c10de9072d74) for API documentation

### Prerequisites

This application was built with Node js so you'll need the following to get it up and running

- [Node Js](https://nodejs.org/en/download/)
- [Postgres](https://www.postgresql.org/download/)

## Running the tests

Jest is the test framework used for this project
To run tests

```
$ yarn test
```

To see test coverage

```
$ yarn test:cover
```

## Product Limitation

- There is currently no authentication
- No protected routes
- You cannot bulk delete messages or user
- This is just the API no frontend consuming it yet

## Want to Contribute?

- Fork the repository
- Make your contributions
- Ensure your codes follow the [AirBnB Javascript Styles Guide](https://www.gitbook.com/book/duk/airbnb-javascript-guidelines/details)
- Create Pull request against the develop branch.

## Author

- [Gbenga Oyetade](https://github.com/gbengaPS)

## Acknowledgments

- Andela Fellowship (https://andela.com/)

## License

[MIT License](./LICENSE)
