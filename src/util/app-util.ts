import { Application, Request, Response, NextFunction } from 'express';
import { LogUtil } from './log-util';

const SWAGGER_UX_PATH = '/docs';

function setupRootToDocRoute(app: Application, rootPath?: string): void {
  //Redirect the main page to the docs page
  app.get('/', function (req: Request, res: Response): void {
    res.redirect(getDocsURL(SWAGGER_UX_PATH, rootPath));
  });
}

function getDocsURL(defaultPath: string, rootPath?: string): string {
  if (rootPath != null) {
    return rootPath + defaultPath;
  } else {
    return defaultPath;
  }
}

export let AppUtil = {

  /**
   * Function to setup the swagger /docs path for this application
   */
  setupCommonStack: function (app: Application, rootPath?: string): void {
    setupRootToDocRoute(app, rootPath);
  }
};
