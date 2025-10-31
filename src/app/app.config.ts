// Copyright Alexandre Perard 2025
// Licensed under the EUPL-1.2 or later

import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true })]
};
