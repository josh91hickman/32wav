"use strict"
import config from './slingshot_config.js';

/* Track Uploads to S3 */
Slingshot.fileRestrictions("uploadToAmazonS3", {
  allowedFileTypes: ["audio/mp3", "audio/mpeg", "audio/x-m4a", "audio/wav"],
  maxSize: 15 * 1024 * 1024,
});

Slingshot.createDirective("uploadToAmazonS3", Slingshot.S3Storage, {
  AWSAccessKeyId: Meteor.settings.private.s3AccessId,
  AWSSecretAccessKey: Meteor.settings.private.s3AccessKey,
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
    return file.name;
  }
});

/* Avatar Uploads to S3 */
Slingshot.fileRestrictions("avatarToAmazonS3", {
  allowedFileTypes: ["image/png", "image/jpeg", "image/jpg"],
  maxSize: 10 * 1024 * 1024,
});

Slingshot.createDirective("avatarToAmazonS3", Slingshot.S3Storage, {
  AWSAccessKeyId: Meteor.settings.private.s3AccessId,
  AWSSecretAccessKey: Meteor.settings.private.s3AccessKey,
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
    return  "images" + "/" + currentUserId + file.name;
  }
});

/* Track Avatar Uploads to S3 */
Slingshot.fileRestrictions("trackAvatarToAmazonS3", {
  allowedFileTypes: ["image/png", "image/jpeg", "image/jpg"],
  maxSize: 2 * 1024 * 1024,
});

Slingshot.createDirective("trackAvatarToAmazonS3", Slingshot.S3Storage, {
  AWSAccessKeyId: Meteor.settings.private.s3AccessId,
  AWSSecretAccessKey: Meteor.settings.private.s3AccessKey,
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
    return "images" + "/" + currentUserId + file.name;
  }
});