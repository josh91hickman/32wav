"use strict"

import config from './slingshot_config.js';


Slingshot.fileRestrictions("uploadToAmazonS3", {
  allowedFileTypes: ["audio/mp3", "audio/x-m4a"],
  maxSize: 10 * 1024 * 1024,
});

Slingshot.createDirective("uploadToAmazonS3", Slingshot.S3Storage, {
  AWSAccessKeyId: config.s3AccessId,
  AWSSecretAccessKey: config.s3AccessKey,
  bucket: "jahosh-meteor-files",
  acl: "public-read",
  region: "us-west-2",

  authorize: function () {
    if (!this.userId) {
      let message = "Please login before posting images";
      throw new Meteor.Error("Login Required", message);
    }
    return true;
  },
  key: function (file) {
    let currentUserId = this.userId;
    return currentUserId + "/" + file.name;
  }
});