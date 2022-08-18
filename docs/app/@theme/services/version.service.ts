

import { Injectable } from '@angular/core';

@Injectable()
export class NgxVersionService {

  getNgxVersion() {
    return require('../../../../package.json').version;
  }
}
