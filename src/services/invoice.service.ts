import { DetailService } from ".";
import { Injectable } from "@angular/core";

@Injectable()
export class InvoiceService extends DetailService {
  public type = '';
  public additionalFields = ['ltc_related_claim__r.name'];

  forceInit() {
    if (this.type === '') {
      this.setType('ltc_time_log__c');
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

  getInitialInvoiceId(obj) {
    return new Promise<any>( (resolve, reject) => {
      this.sforce.query('SELECT ID FROM LTC_Claim_Invoice_Submission__c WHERE LTC_Submission_Status__c = \'To Submit\' LIMIT 1').then( (data:any) => {
        console.log(data);
        this.sforce.query('SELECT ID FROM LTC_Claim_Invoice__c WHERE ltc_invoice_submission__c = \''+data[0]['Id']+'\' LIMIT 1').then( (data2:any) => {
          console.log(data2);
          if (data2.length > 0) {
            resolve(data2[0]['Id']);
          } else {
            this.createInitialInvoice(obj).then( id => {
              resolve(id);
            }).catch( err => {
              reject(err);
            });
          }
        }).catch( err => {
          this.createInitialInvoice(obj).then( id => {
            resolve(id);
          }).catch( err => {
            reject(err);
          });
        });
      }).catch( err => {        
        this.createInitialInvoice(obj).then( id => {
          resolve(id);
        }).catch( err => {
          reject(err);
        });
      })
    });
  }

  createInitialInvoice(obj) {
    return new Promise<any>( (resolve, reject) => {
      this.type = 'ltc_claim_invoice_submission__c';
      this.create({
        ltc_associated_claim__c: obj.ltc_related_claim__c,
        ltc_submission_status__c: 'To Submit',
        LTC_Agree_With_Fraud_Disclaimer__c: false
      }).then( result => {
        this.type = 'ltc_claim_invoice__c';
        this.create({
          ltc_service_date_to__c: obj.ltc_check_in_datetime__c,
          ltc_service_date_from__c: obj.ltc_check_in_datetime__c,
          ltc_total_charges__c: 0,
          ltc_hourly_rate__c: obj.ltc_hourly_rate__c,
          ltc_invoice_submission__c: result['id'] 
        }).then( res2 => {
          resolve(res2['Id']);
        }).catch( err => reject(err) );
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