#!/usr/bin/env node

const yargs = require('yargs');
const ora = require('ora');
const request = require('request');
const moment = require('moment');
const path = require('path');
const fs = require('fs');
const { error, baseUrl } = require('./constants');
const { apiKey } = require('./secrets');

/**
 * To test over local data instead of API call
 */
// const body = require('./sampledata');
const { randomText, showMessage, displayCalendar } = require('./functions');

/**
 * Creates the default object to call GET Request to CricAPI
 */
const RequestCricApi = request.defaults({
  baseUrl,
  headers: {
    apikey: apiKey,
  },
});

//  to check whether CLI is working or not
//  console.log('Hellow World');
/**
 *  Command Line Interface for the application
 */
const argv = yargs
  .usage('$0 <command> [args]')
  .command('calendar', 'Get Calendar for upcoming matches', (yargCalendar) => {
    /**
     *   Get all options for `calendar` command
     */
    const calendar = yargCalendar
      .usage('Usage: $0 calendar [options]')
      .alias('d', 'days')
      .describe('d', 'Number of days from today')
      .number('d')
      .example('$0 calendar -d 15').argv;

    const spinner = ora('Fetching Data').start();

    /**
     * days Number of days for which the calendar is to be generated for
     */
    const days = calendar.d || 5;

    if (days < 0) {
      spinner.stop();
      showMessage(error.DAYS_INP_ERR);
      return;
    }
    // spinner.stop();
    // displayCalendar(days, body);

    /**
     * Fetches Data from the API
     */
    RequestCricApi('matchCalendar', (err, res, body) => {
      spinner.stop();

      if (err) {
        showMessage(error.REQ_ERR);
      } else {
        displayCalendar(days, body);
      }
    });
  })
  .command('configure', 'Set API for cricAPI', (yargAPI) => {
    const apikey = yargAPI
      .usage('Usage: $0 configure [options]')
      .alias('api', 'apikey')
      .describe('api', 'API key as provided by cricApi')
      .string('api')
      .example('$0 configure -api xxxxxxxxxxxxxx').argv;

    const newApi = apikey.api || '';

    if (newApi === '') {
      showMessage(error.MSG, "You Haven't changed the API");
      return;
    }
    const tempObj = { apiKey: newApi };
    fs.writeFileSync(
      path.resolve(__dirname, 'secrets.json'),
      JSON.stringify(tempObj, null, 2),
      'utf8'
    );
    showMessage(error.MSG, `API Key successfully updated to ${newApi}`);
  })
  .help('h')
  .alias('h', 'help').argv;
