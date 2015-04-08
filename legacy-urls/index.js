var aws = require('aws-sdk');
var fs = require('fs');
var path = require('path');
var util = require('util');
var split = require('split');

var argv = require('minimist')(process.argv.slice(2));

if (argv.help) {
  printUsage();
  process.exit(0);
}

var bucket = argv.bucket || process.env.AWS_BUCKET;
var accessKey = argv['access-key'] || process.env.AWS_ACCESS_KEY_ID;
var secretKey = argv['secret-key'] || process.env.AWS_SECRET_ACCESS_KEY;

if (!bucket) {
  process.stdout.write('bucket is required\n');
  printUsage();
  process.exit(1);
}

if (!accessKey) {
  process.stdout.write('access-key is required\n');
  printUsage();
  process.exit(1);
}

if (!secretKey) {
  process.stdout.write('secret-key is required\n');
  printUsage();
  process.exit(1);
}

var s3 = new aws.S3({
  accessKeyId: accessKey,
  secretAccessKey: secretKey,
  region: 'us-east-1'
});

fs.createReadStream(path.join(__dirname, 'urlmappings.txt'))
  .pipe(split())
  .on('data', function(line) {
    if (line.length === 0) {
      return;
    }

    // Skip lines starting with #
    if (line[0] === '#') {
      return;
    }

    var s = line.split('|', 2);
    var original = s[0].trim();
    var mapping = s[1].trim();

    var params = {
      Bucket: bucket,
      Key: original,
      ACL: 'public-read',
      Body: 'moved to ' + mapping,
      ContentType: 'text/html',
      WebsiteRedirectLocation: mapping
    };

    s3.putObject(params, function(err, data) {
      if (err) {
        process.stderr.write(util.format('Error occured while adding file for %s\n', original));
        process.stderr.write(util.format('%s\n', util.inspect(err)));
      } else {
        process.stdout.write(util.format('Added redirect file for %s to %s\n', original, mapping));
      }
    });
  });

function printUsage() {
  var cmd = path.basename(process.argv[1]);
  process.stdout.write('USAGE: \n\t' + cmd + ' --bucket [bucket] --access-key [access-key] --secret-key [secret-key]\n');
}
