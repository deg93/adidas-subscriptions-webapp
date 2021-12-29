# Adidas Tech Challenge / Web application

This repository contains the web application of the "newsletters subscription system". This web application is published [here](https://adidas-tech-challenge.davidenjuan.es/).

## Deployment

For deploying this web application to AWS environment, is enough with pushing changes to main branch. This is done by [deploy-to-aws.yml](.github/workflows/deploy-to-aws.yml) GitHub workflow (pipeline).

For deploying locally, run the following commands in the project root directory:

```
npm install
ng serve
```

To run the previous commands, it is necessary to have Node.js (+16) and Angular CLI (+13) installed.
