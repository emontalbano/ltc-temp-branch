import { DetailService } from ".";
import { Injectable } from "@angular/core";

@Injectable()
export class ClaimService extends DetailService {
  public type = '';
  public additionalFields = ['associated_policy__r.insured__r.name', 'associated_policy__r.insured__r.type'];

  forceInit() {
    if (this.type === '') {
      this.setType('claim__c');
    }
  }

  buildWhere() {
    return '';
  }
}