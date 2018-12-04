# Case Manager App

## Installation
To build and work on this project, you need cordova and ionic 3. Simply run
`npm i -g cordova ionic`. Additionally, a `npm install` is required in the
root of the project directory.

## Test/Debug
Ionic provides a web application that allows you to see the different
versions of the phone app for Android, iOS and Windows. To run this web
environment, run `ionic serve --lab` and navigate to `https://localhost:8100/ionic-lab`

### Livereload on device
You can also live test your changes to a mobile device. Simply link it to your computer
using adb for Android or xcode for iOS. Checkout the `adb_connect_device.sh` script in
[helper scripts](https://github.com/tobidae/devscripts) for how to connect a device wirelessly.

## Build for platforms
Building for Android or iOS platforms is super easy. First add the android
and ios platform to the project like so: `ionic cordova platfrom add android`
and `ionic cordova platform add ios`.

To build for the platform, a simple `ionic cordova build <platform>` will suffice.
I also provide some [helper scripts](https://github.com/tobidae/devscripts) 
that make doing dev things easier. 
 
 

