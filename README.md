# Node.js Notifier

A small Express application that serves a web page and triggers
notifications — sending emails and playing local sound/desktop alerts.
A hands-on study of Node.js back-end fundamentals (routing, middleware,
and third-party integrations).

## Tech Stack

Node.js · Express 5 · Nodemailer · node-notifier · sound-play · body-parser

## Features

- Express HTTP server (`server.js`) serving static assets from `public/`
- Email sending via Nodemailer
- Desktop notifications (node-notifier) and audio alerts (sound-play)

## Getting Started

```bash
npm install
npm start
```

The server starts from `server.js`.

> Note: email and notification features may require local configuration
> (e.g. SMTP credentials) before they work end to end.

## Project Structure

```
.
├── server.js        # Express entry point
├── public/          # static assets
└── package.json
```

## Author

Rafael Felipe Cordeiro — [GitHub](https://github.com/mozca33)
