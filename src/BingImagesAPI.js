import { bingKey } from './database/config'
import Home from './Home'

'use strict';

let https = require('https');

// **********************************************
// *** Update or verify the following values. ***
// **********************************************

// Replace the subscriptionKey string value with your valid subscription key.


let subscriptionKey = bingKey;

// Verify the endpoint URI.  At this writing, only one endpoint is used for Bing
// search APIs.  In the future, regional endpoints may be available.  If you
// encounter unexpected authorization errors, double-check this host against
// the endpoint for your Bing Search instance in your Azure dashboard.
let host = 'api.cognitive.microsoft.com';
let path = '/bing/v7.0/images/search';

// let term = 'puppies';

export var resultURL = "";

// let response_handler = function (response) {
//     let body = '';
//     response.on('data', function (d) {
//         body += d;
//     });
//     response.on('end', function () {
//         console.log('\nRelevant Headers:\n');
//         for (var header in response.headers){
//           // header keys are lower-cased by Node.js
//           if (header.startsWith("bingapis-") || header.startsWith("x-msedge-"))
//                console.log(header + ": " + response.headers[header]);
//         }
//
//         // var bodyString = JSON.stringify(JSON.parse(body), null, '  ');
//         // console.log('\nJSON Response:\n');
//         // console.log(bodyString);
//
//         body = JSON.parse(body);
//         // var r = Math.floor(Math.random() * 10);
//         resultURL = body.value[0].thumbnailUrl;
//         console.log(resultURL)
//
//     });
//     response.on('error', function (e) {
//         console.log('Error: ' + e.message);
//     });
//
//
// };

export function search(term) {

  if (subscriptionKey.length !== 32) {
    console.log('Invalid Bing Search API subscription key!');
    console.log('Please paste yours into the source code.');
    return;
  }

  console.log('Searching images for: ' + term);
  let request_params = {
        method : 'GET',
        hostname : host,
        path : path + '?q=' + encodeURIComponent(term),
        headers : {
            'Ocp-Apim-Subscription-Key' : subscriptionKey,
        }
    };

    // let req = https.request(request_params, response_handler).then(function(req))

    var body = "";

    const req = https.request(request_params, (res) => {
      console.log('statusCode:', res.statusCode);
      console.log('headers:', res.headers);

      res.on('data', (d) => {
        body += d;

      });

      res.on('end', () => {

        body = JSON.parse(body);
        // var r = Math.floor(Math.random() * 10);
        resultURL = body.value[0].thumbnailUrl
        console.log(resultURL)

        // return new Promise(function (resolve, reject) {
        //   resolve(resultURL);
        // })
      });

    });

    req.on('error', (e) => {
      console.error(e);
    });
    req.end();

}
