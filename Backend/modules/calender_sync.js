/*requires*/
const ical = require('ical');
const fs = require('fs');
const axios = require('axios');

/*functions*/
const pullCalender = async (url) => {
    // Check if the URL provided is an iCal URL
    if (!url.endsWith('.ics')) {
        console.error('The URL provided is not an iCal URL.');
        return;
    }
    // Check if the URL provided is a webcal URL
    if (url.startsWith("webcal")) {
        url = url.replace("webcal", "https");
    }
    // Check if the URL provided is a valid URL
    if (!url.startsWith('http') && !url.startsWith('https')) {
        console.error('The URL provided is not a valid URL.');
        return;
    }

    // Fetch the data from the URL provided and log it to the console
    try {
        const response = await axios.get(url);

        if (response.status === 200) {
            const data = response.data;
            return data;
        } else {
            console.error('Failed to fetch data from the URL provided.');
        }
    } catch (err) {
        console.error(err);
    }

    return null;
}

const parseCalender = (data) => {
    // Check if there is any data to parse
    if (data === null) {
        console.error('No data to parse.');
        return;
    }
    // Check if the data is a string
    if (typeof data !== 'string') {
        data = data.toString();
    }

    // Parse the data and log it to the console
    const events = ical.parseICS(data);
    const response = {};

    // iterate through all events and add them to the response object
    for (let key in events) {
        if (events.hasOwnProperty(key)) {
            const event = events[key];

            response[event.uid] = {};
            response[event.uid]['summary'] = event.summary;
            response[event.uid]['description'] = event.description;
            response[event.uid]['start'] = event.start;
            response[event.uid]['end'] = event.end;
            response[event.uid]['location'] = event.location;
        }
    }

    return response;
}

const uploadCalendar = (url, clubName) => {
    // TODO: upload using prisma to database
}

/*exports*/
module.exports = {
    pullCalender,
    parseCalender,
    uploadCalendar
}
