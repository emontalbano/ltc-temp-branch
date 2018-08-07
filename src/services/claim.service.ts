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
    return 'WHERE Claim_Status__c = \'Active\' OR (Claim_Status__c = \'Terminated\'  AND (Claim_Sub_Status__c = \'Death\' OR Claim_Sub_Status__c = \'End of Services-No recovery\' OR Claim_Sub_Status__c = \'Inactivity/No Qualified Services\' OR Claim_Sub_Status__c = \'No Longer Benefit Eligible\' OR Claim_Sub_Status__c = \'Partial Benefit Exhausted\' OR Claim_Sub_Status__c = \'Recovery-Services Ended\' OR Claim_Sub_Status__c = \'Policy Lapse or Canceled Coverage\'))';
  }
}