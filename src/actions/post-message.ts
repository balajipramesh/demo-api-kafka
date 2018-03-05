import * as Promise from 'bluebird';
import * as express from 'express';
import * as producer from '../lib/producer';
import { LogUtil } from '../util/log-util';
import { BadRequestError } from '../error/bad-request-error';
import { ServiceUnavailableError } from '../error/service-unavailable-error';

/**
 * REST endpoint to publish demo message
 * @param req HTTP client request, that contains the payload
 * @param res HTTP server response
 * @param next The NextFunction object
 */
export function postDemoMessage(req: express.Request, res: express.Response, next: express.NextFunction): void {
  let to: string = req.body.to;
  let subject: string = req.body.subject;
  let content: string = req.body.content;

  if (to) {
    producer.publishDemoMessage(to, subject, content)
    .then(() => {
      res.status(200).send();
    })
    .catch((err) => {
      LogUtil.error(err, 'An error occurred publishing a message');
      res.status(503).send(new ServiceUnavailableError('Could not publish message, messaging service in temporarily unavailable. Contact your system administrator.'));
    });
  } else {
    res.status(400).send(new BadRequestError('\'To\' field can not be empty'));
  }
}
