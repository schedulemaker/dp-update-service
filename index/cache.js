'use strict'

if(typeof(AWS) === 'undefined') {
    var AWS = require('aws-sdk');
}

if(typeof(bannerLambda) === 'undefined') {
    var bannerLambda = new AWS.Lambda();
}

if(typeof(subjectLambda) === 'undefined') {
    var subjectLambda = new AWS.Lambda();
}

module.exports = {
    AWS: AWS,
    bannerLambda: bannerLambda,
    subjectLambda: subjectLambda,
};
