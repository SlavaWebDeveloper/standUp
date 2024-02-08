# The project "Stand Up"

## Link to the project:
The front end part of the site is deployed on the Net life service. The backend part of the site is deployed on the Glitch service.  
The website can be viewed here: https://65c4dabece26140dbcb78b4d--wonderful-pegasus-03380e.netlify.app/

## About the project

### I have used the following plugins:  
Normalize -- plugin for normalizing styles  
tom-select -- a plugin for customizing select  
JustValidate -- form validation plugin  
Inputmask -- input mask plugin  
qrcode -- QR code/2d barcode generator.  


## Functionality

### Basic methods:

#### getComedians()

Description: Executes an HTTP request to get a list of comedians from the server.
Return value: Promise, containing data about comedians in JSON format.
Error handling: When an error occurs, outputs a message to the console and displays a notification to the user.

#### getClient(ticket)

Description: Executes an HTTP request to get information about the customer on his ticket.
Parameters:
ticket - the customer's ticket.
Return value: Promise, which contains data about the client in JSON format.
Error handling: When an error occurs, outputs a message to the console and displays a notification to the user.

#### sendData(method, data, id)

Description: Executes an HTTP request to send data to the server.
Parameters:
method - HTTP method.
data - data to be sent to the server in JSON format.
id - (optional) the client's ID if an existing record needs to be updated.
Return value: Promise, which returns true if the request is successful.
Error handling: When an error occurs, outputs a message to the console and displays a notification to the user.


## Installation

git clone https://github.com/SlavaWebDeveloper/standUp.git

npm install 

### For local development, use:
npm run dev 

### To build a project, use:
npm run build

## Stack
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![css3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![vite](https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)

## File Tree:  
standup  
├── dist  
│   ├── assets  
│   │   └── ...  
│   │   └── ...  
│   └── index.html  
│   └── qr.html  
├── fonts  
│   ├──...  
│   └── ...  
├── images  
│   ├──...  
│   └── ...  
├── scripts  
│   └── api.js  
│   └── changeSelection.js  
│   └── comedians.js  
│   └── display.js  
│   └── form.js  
│   └── Notification.js  
│   └── qrPage.js  
│   └── showQrController.js  
├── scss  
│   └── base.scss  
│   └── booking.scss  
│   └── event.scss  
│   └── media.scss  
│   └── modal.scss  
│   └── notification.scss  
│   └── style.scss  
│   └── themes.scss  
│   └── tomselect.scss  
│   └── variables.scss  
└── style.css  
└── index.html  
└── qr.html  
└── main.js  
└── package-lock.json  
└── package.json  
└── vite.config.js  
└── README.txt  
