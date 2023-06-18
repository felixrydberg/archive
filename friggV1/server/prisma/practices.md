
1. Rename each photo as per user IDs.
2. Do not store images in database, rather than save them in filesystem and store the image name in database.
3. Create separate directories for small, medium and large pics. (You need to copy the same pic and upload them to their respective directories. This will load up your page faster because small pics will have small size.)

Before you decide on a scheme on how to store the images, you have to ask yourself how will you manage when you have 10s of thousands of users (typical for social networks).

If you are not concerned with scale or just want to ignore it for now, you could do what you have proposed, but just make sure that you don't end up with file name clashes. Basically on uploading the profile picture, rename it to something that is unique for that user. E.g. uid_001.jpg

Where uid is the unique user Id that uploaded the pic. The number at the end is a unique number for every new pic that user uploads.

On the other hand if you are concerned with scale and your audience is expected to be global, then go for a CDN or static file storage service that caches such media content closest to the viewers.

CDNs normally do all the dirty work and will present you a single URL that you can use to display the profile pic.

If you haven't checked it out yet, have a look at Google cloud storage or Amazon S3. You can store a large amount of data including media for ridiculously low prices. Be sure to check out the reliability of the scheme you choose and understand what it may mean for your social network. For e.g. some types of storage may experience periodic downtime during which your profile pic may not be available.

HTH

