/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

import type { ValidationResult } from "@navikt/oasis";

declare namespace App {
  interface Locals {
    token: string;
    validation: ValidationResult;
  }
}
