/**
 * Html
 * This Html.js file acts as a template that we insert all our generated
 * application strings into before sending it to the client.
 */
const Html = ({ body, styles, title }) => `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <title>${title}</title>
      ${styles}
      <link rel="stylesheet" type="text/css" href="https://unpkg.com/antd/dist/antd.min.css">
      <link rel="shortcut icon" href="/assets/favicon.ico">
    </head>
    <body style="margin:0; background-color:#fff;">
      <div id="app">${body}</div>
    </body>
  </html>
`;

export default Html;
