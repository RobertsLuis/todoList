import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component'
//import { HeaderComponent } from './components/header/header.component';

bootstrapApplication(AppComponent).catch((err) => console.error(err));
//bootstrapApplication(HeaderComponent).catch((err) => console.error(err));