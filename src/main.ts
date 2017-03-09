import { Observable } from 'rxjs/Rx';
import './polyfills.ts';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app/app.module';

import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchmap';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/filter';

import * as _ from 'lodash';

const debuggerOn = true;

//======= debug operator definition =====================
Observable.prototype.debug = function(message : string) {
      return this.do(
                  //next cb
                  nextValue => debuggerOn ? console.log(message, nextValue) : null,
                  //error cb
                  error => debuggerOn ? console.error(message, error) : null,
                  //complete cb
                  () => debuggerOn ? console.info("Observable completed - " , message) : null,

      );
}

// type declaration for debug operator
declare module 'rxjs/Observable' {
  interface Observable<T> {
    debug: (...any) => Observable<T>
  }
}

//===========================

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
