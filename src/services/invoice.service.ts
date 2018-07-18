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

  async getRecordType() {
    return new Promise<any>( (resolve, reject) => {
      if (localStorage.getItem('recordTypes') !== null) {
        resolve(localStorage.getItem('recordTypes').split(','));
      } else {
        this.sforce.query('SELECT Id, DeveloperName FROM RecordType WHERE DeveloperName = \'Independent_Care_Provider\' OR DeveloperName = \'LTC_ICP_Time_Log\' OR DeveloperName = \'LTC_Authenticated_Submission\'').then( (data:any) => {
          let recordTypes = ['','',''];
          for (var i=0; i<data.records.length; i++) {
            if (data.records[i].DeveloperName === 'Independent_Care_Provider') {
              recordTypes[0] = data.records[i]['Id']
            } else if (data.records[i].DeveloperName === 'LTC_ICP_Time_Log') {
              recordTypes[1] = data.records[i]['Id']
            } else if (data.records[i].DeveloperName === 'LTC_Authenticated_Submission') {
              recordTypes[2] = data.records[i]['Id']
            }
          }
          localStorage.setItem('recordTypes', recordTypes.join(','));
          resolve(recordTypes);
        });
      }
    });
  }

  async createInitialInvoice(obj) {
    
    return new Promise<any>( (resolve, reject) => {

      const userId = this.sforce.getUserId();
      const query = this.sforce.query('SELECT Id, Email, Account.Name, AccountId from User WHERE id = \''+userId+'\'');
      query.then( (userDataRec:any) => {
        const userData = userDataRec.records[0];

        this.sforce.query('SELECT Id, Claim__r.Policy_Number__c FROM Party_Role__c WHERE Party__c = \''+ userData['AccountId'] + '\' AND Claim__c = \'' + obj.ltc_related_claim__c + '\'').then ( (party: any) => {
          this.getRecordType().then(recordTypes => {
            this.type = 'ltc_claim_invoice_submission__c';
            this.create({
              ltc_associated_claim__c: obj.ltc_related_claim__c,
              ltc_submission_status__c: 'To Submit',
              LTC_Agree_With_Fraud_Disclaimer__c: false,
              RecordTypeId: recordTypes[2],
              LTC_Provider_Name__c: userData.Account['Name'],
              LTC_Provider_Email__c: userData['Email'],
              LTC_Policy_Number__c: party.records[0].Claim__r['Policy_Number__c']
            }).then( result => {
              this.type = 'ltc_claim_invoice__c';
              
              this.create({
                ltc_service_date_to__c: obj.ltc_check_in_datetime__c,
                ltc_service_date_from__c: obj.ltc_check_in_datetime__c,
                ltc_total_charges__c: 0,
                LTC_Cast_Iron_Pull_Status__c: 'New',
                LTC_Expected_File_Count__c: 0,
                ltc_hourly_rate__c: obj.ltc_hourly_rate__c,
                ltc_invoice_submission__c: result['id'],
                RecordTypeId: recordTypes[0],
                LTC_Provider__c: userData['AccountId'],
                LTC_Provider_Role__c: party.records[0]['Id'],
                LTC_Type__c : 'Independent Care Provider'
              }).then( res2 => {
                resolve(res2['id']);
              }).catch( err => reject(err) );

            }); //claim invoice submission
          }); //getrecorttype
        }); // party
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