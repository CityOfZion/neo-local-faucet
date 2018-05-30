const Html = ({ body, styles, title, preloadedState }) => `
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
      <script>
        window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
      </script>
      <script src="/assets/bundle.js"></script>
    </body>
  </html>
`;

export default Html;
