# demo-api-kafka

Demonstration of a RESTful API to publish messages on Kafka broker

# Deployment

The project is a micro-web-service built and deployed based on the below tech stacks:

* kafka
* NodeJS
* npm

## Launch Kafka and Zookeeper

Kafka uses ZooKeeper so you need to first start a ZooKeeper server. Download [Kafka Scala 2.12](https://kafka.apache.org/downloads)

Once downloaded unzip. (For the reminder of the document, this path location would be referred as `<kafka_installation_path>`)

Move the below list of `bat` files from the project location to `<kafka_installation_path>`

* zookeeper-run.bat - To run zookeeper
* kafka_run.bat
* kafka_create_topic.bat
* kafka_start_producer.bat
* kafka_start_consumer.bat

### Order of execution

* Start zookeeper. Run: `zookeeper-run.bat`
* Start kafka. Run: `kafka_run.bat`
* Create a new kafka topic `demo-consumer` on which demo-api-kafka project would hook its listener into. Run: `kafka_create_topic.bat`
* Start [demo-api-kafka micro-service](#build-and-launch-micro-service)
* Start a consumer on which to listen the messages posted by the micro-service. Run: `kafka_start_consumer.bat`

## Installation

Once you have `nodejs` and `npm` installed. Download or clone the project. On preferred terminal of your choice go to the folder where the project was downloaded / cloned.

Note: The project also contains Apache Kafka, which can also be downloaded from https://kafka.apache.org/downloads 

## Build and Launch micro-service

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

To execute this, run: `gulp webserver`. Can also run: `gulp` which essentially run's webserver

###### Dependency tasks

- `build`

### Define server configuration

* Copy the sample `default.sampl.json` and rename it to `default.json`
* Override the below configuration keys with appropriate values:
  * `kafka_ip_address` - IP Address on which zookeeper and kafka is running. In most cases can define the value to be `localhost`, if running locally.
  * `client_port` - Port at which the clients will connect zookeeper. If running with default zookeper properties or the one attached in this project, set port to `2181`.

# Help

## POST message using API endpoints

Open a browser and navigate to http://localhost:3129/docs/

* Click the `message` section
* Click `Try it out`
* Edit example payload value
```javascript
{
  "to": "balajipr",
  "subject": "About demo",
  "content": "We loved your demo and would like to meet with you!"
}
```
* Click Execute
 * Notice on `kafka_start_consumer` console the message posted via API would be relayed back there.

## Send message on kafka topic

* On the `kafka_start_producer` console, enter the message
```
> Hello World!!!
```
* Notice the message gets logged in `demo-api-kafka` server logs
