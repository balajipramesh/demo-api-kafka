# demo-api-kafka

Demonstration of a RESTful API to publish messages on Kafka broker

# Deployment

The project is a micro-web-service built and deployed based on the below tech stacks:

* npm
* NodeJS
* kafka

## Installation

Once you have `nodejs` and `npm` installed. Download or clone the project. On preferred terminal of your choice go to the folder where the project was downloaded / cloned.

Note: The project also contains Apache Kafka, which can also be downloaded from https://kafka.apache.org/downloads 

## Building

This project uses Gulp. If Gulp is already installed globally, you are ready to go. If not, it can be installed globally by running: `npm install -g gulp`

Now run the below command:

`npm install`

The above command shall install all the libraries that are required for this project in-order to compile and launch.

### Gulp tasks

Gulp is the task runner used by this project. The following Gulp tasks are available:

* clean
* copy
* tslint
* typescript
* build
* webserver

#### clean

The `clean` task will remove the `dist` directory.

To execute this, run: `gulp clean`

###### Dependency tasks

none

#### copy

The `copy` task will copy yaml file into `dist` directory.

To execute this, run: `gulp copy`

###### Dependency tasks

none

#### tslint

The `tslink` task checks TypeScript code for readability, maintainability, and functionality errors.

To execute this, run: `gulp tslint`

###### Dependency tasks

none

#### typescript

The `typescript` task compiles TypeScript (.ts) files and copies to `dist` directory.

To execute this, run: `gulp typescript`

###### Dependency tasks

none

#### build

The `build` task will create the `dist` folder and copy all relevant files into it.

To execute this, run: `gulp build`

###### Dependency tasks

- `clean`
- `copy`
- `tslint`
- `typescript`

#### webserver

The `webserver` task will launch the micro-service on specified port.

Before we execute the below task, [define server configuration](#define-server-configuration).

To execute this, run: `gulp webserver`

###### Dependency tasks

- `build`

### Define server configuration

Copy the sample `default.sampl.json` and rename it to `default.json`

Override the below configuration keys with appropriate values:

- `ip_address_kafka_server` - IP Address on which zookeeper and kafka is running. If running locally, in most cases can define the value to be `localhost`
- `client_port` - Port at which the clients will connect zookeeper. If running with default zookeper properties or the one attached in this project, set port to `2181`.
