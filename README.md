# Onyva application

Onyva application: Ionic 2 application. 

## Installation Instructions

Follow these instructions to install the app and run it with the mock (in-memory) data services:

1. **Make sure you have the latest version of Cordova and Ionic and Node:**
    ```
    npm install -g cordova
    npm install -g ionic
    nvm install node
    ```

1. Clone the repository:
    ```
    git clone https://github.com/rockeek/onyvaApp.git
    ```

1. Navigate to the `onyvaApp` directory :
    ```
    cd onyvaApp
    ```

1. Install the dependencies
    ```
    npm install
    ```
  
1. Run the app in the browser
    ```
    npm start
    ```
    or
    ```
    ionic run ionic:serve
    ```

Note: under windows, if c:\src is a link, please go to the real directory to make it work.

## Using REST Services

Follow these instructions to run it with the REST data services:

1. Replace all references to `property-service-mock` and `broker-service-mock` with `property-service` and `broker-service`
 
1. Install the Node.js implementation of the REST services (see [this repository](https://github.com/dreamhouseapp/dreamhouse-rest-services) for instructions), and run the Node server.
 
1. Adjust the `SERVER_URL` in `providers/config.ts`. The default is http://localhost:5000.

1. Run the app in the browser
    ```
    npm start
    ```

## CORS issues

To avoid CORS issues, we implemented a proxy in ionic.config.json
This way we can reach the REST services from another web server without having Cross Origin Resource Sharing issue.


## Browser version

To build for production
    ```
    ionic build browser --prod --release
    ```


Copy the output of www