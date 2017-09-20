import { Component } from '@angular/core';

import { FollowPage } from '../follow/follow';
import { RCPage } from '../rc/rc';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = RCPage;
  tab2Root = FollowPage;

  constructor() {

  }
}
