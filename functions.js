'use strict';

const chalk = require('chalk');
const moment = require('moment');
const { error } = require('./constants');

const randomText = (word) => {
  console.log(chalk.blue('Hello') + chalk.red('World') + chalk.yellow(word));
};

const showMessage = (TYPE, message) => {
  message = message || '';
  switch (TYPE) {
    case error.MSG:
      console.log(chalk.bold.green(message));
      break;
    case error.REQ_ERR:
      console.log(
        chalk.red.bold(
          'Error occured while fetching data. If persists please report'
        )
      );
      break;
    case error.DAYS_INP_ERR:
      console.log(chalk.red.bold('Days cannot have negative value.'));
      break;
    default:
      console.log(chalk.red('Error Occured.'));
  }
};

const matchDesc = chalk.bold.red;
const matchTeams = chalk.bold.cyan;
const matchDate = chalk.bold.magenta;
const matchPlace = chalk.bold.green;

const displayMatch = (matchTitle, date) => {
  let tokens = matchTitle.split(/v|at|,/g);
  tokens.forEach((curr, ind, arr) => {
    tokens[ind] = tokens[ind].trim();
  });
  return `${matchDesc(tokens[3])} : ${matchTeams(tokens[0])} V ${matchTeams(
    tokens[1]
  )} at ${matchPlace(tokens[2])} ${matchDate(date)}`;
};

const displayCalendar = (days, body) => {
  let data = JSON.parse(body).data;
  //   let data = body.data;
  let startDate = moment();
  if (data.length === 0) {
    showMessage(error.MSG, 'Sorry, No Matches Available at the Moment');
    return;
  }
  for (let matches of data) {
    let matchName = matches.name;
    let date = matches.date;
    let endDate = moment(date, 'DD MMMM YYYY');
    let diffDate = endDate.diff(startDate, 'days');
    if (diffDate > days) {
      return;
    }
    console.log(displayMatch(matchName, date));
  }
};

module.exports = {
  randomText,
  showMessage,
  displayCalendar,
};
