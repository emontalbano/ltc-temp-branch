import { DetailService } from ".";
import { Injectable } from "@angular/core";

@Injectable()
export class InvoiceService extends DetailService {
  public type = '';
  public additionalFields = ['ltc_related_claim__r.name'];

  forceInit() {
    if (this.type === '') {
      this.setType('time_log__c');
    }
  }

  createInvoice(obj) {
    return new Promise<any>( (resolve, reject) => {
      this.type = 'ltc_claim_invoice_submission__c';
      this.create({
        ltc_associated_claim__c: obj.ltc_associated_claim__c,
        ltc_submission_status__c: 'Submitted',
        LTC_Agree_With_Fraud_Disclaimer__c: true
      }).then( result => {
        this.type = 'ltc_claim_invoice__c';
        this.create({
          ltc_service_date_to__c: obj.latestDate,
          ltc_service_date_from__c: obj.earliestDate,
          ltc_total_charges__c: obj.totalCharges,
          ltc_hourly_rate__c: obj.hourlyRate,
          ltc_invoice_submission__c: result['id'] 
        }).then( res2 => {
          resolve(res2);
        }).catch( err => reject(err) );
      }).catch( err => {
        reject(err);
      });
    });
  }

  buildWhere() {
    console.log(this.parentId);
    if (this.parentId) {
      return 'WHERE ' + this.parentField + ' = \'' + this.parentId + '\'';
    }
    return '';
  }
}