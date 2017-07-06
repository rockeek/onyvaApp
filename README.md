# Onyva application

Onyva application: Ionic 2 application. 

## Installation Instructions

Follow these instructions to install the app and run it with the mock (in-memory) data services:

1. **Make sure you have the latest version of Cordova and Ionic:**
    ```
    npm install -g cordova
    npm install -g ionic
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

## Using REST Services

Follow these instructions to run it with the REST data services:

1. Replace all references to `property-service-mock` and `broker-service-mock` with `property-service` and `broker-service`
 
1. Install the Node.js implementation of the REST services (see [this repository](https://github.com/dreamhouseapp/dreamhouse-rest-services) for instructions), and run the Node server.
 
1. Adjust the `SERVER_URL` in `providers/config.ts`. The default is http://localhost:5000.

1. Run the app in the browser
    ```
    npm start
    ```