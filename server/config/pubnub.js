'use strict';
var PubNub = require('pubnub');
var pubnub = new PubNub({
    subscribeKey: "sub-c-aac2cd20-9d00-11e7-8215-f6f5a6cf9223",
    publishKey: "pub-c-c1ced04a-f97e-4ae9-a94d-5d87f89a155e",
    secretKey: "sec-c-MzNkMDU0MGUtNzcwNS00ZWYxLThjY2EtNWU1YzQ0YjZkMjI0",
    ssl: true
});
module.exports.pubnub = pubnub;