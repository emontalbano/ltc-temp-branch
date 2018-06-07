import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Http, RequestOptions, Headers, ResponseContentType} from '@angular/http';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/map';
const BASE_URL = '/api/';
const LOCALIZED_LOGIN = false;
@Injectable(
  
)
export class SalesforceService {
  private loginURL: string = 'https://portaldev6-jhltc.cs91.force.com/provider';//'https://test.salesforce.com';
  private communityUrl: string = 'https://portaldev6-jhltc.cs91.force.com/provider/';
  private scopeParameters: Array<string> = ['full'];
  private appId: string = '3MVG9d3kx8wbPieHBpF8GIw2hY.rWIkaI.5M71yZGZKXw0pTThTrymPHZNPinLkvJno7m4bhW6Gylu2vxUqF8';
  private apiVersion: string = 'v37.0';
  private oauth: any;
  private tokenStore: any = {};
  private context: string = window.location.pathname.substring(0, window.location.pathname.lastIndexOf("/"));
  private serverURL: string = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
  private baseURL: string = this.serverURL + this.context;
  private proxyURL: string = 'https://ltc-cors-proxy.herokuapp.com/';
  private oauthCallbackURL: string = this.baseURL + '/oauthcallback.html';
  private useProxy: boolean = (!((<any>window).cordova || (<any>window).SfdcApp));
  private onlyOne: boolean = true;
  private prefix: string = '/services/oauth2/';

  private deferredLogin: {
    resolve: any,
    reject: any
  };

  public data: any = {
    name: 'Guest',
    token: null
  }
  private headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
  constructor(private http: Http, private store: Store<any[]>, private zone: NgZone) {
    (<any>window).angularComponentRef = {
        zone: this.zone,
        componentFn: (value) => this.oauthCallback(value),
        component: this
    };
    this.deferredLogin = {
        resolve: undefined,
        reject: undefined
    };
  }

  public init(params: any) {
    if (params) {
      this.appId = params.appId || this.appId;
      this.apiVersion = params.apiVersion || this.apiVersion;
      this.loginURL = params.loginURL || this.loginURL;
      this.oauthCallbackURL = params.oauthCallbackURL || this.oauthCallbackURL;
      this.proxyURL = params.proxyURL || this.proxyURL;
      this.useProxy = params.useProxy === undefined ? this.useProxy : params.useProxy;

      if (params.oauth) {
        this.oauth = params.oauth;
      }

      if (params.accessToken) {
          if (!this.oauth) this.oauth = {};
          this.oauth.access_token = params.accessToken;
      }

      if (params.instanceURL) {
          if (!this.oauth) this.oauth = {};
          this.oauth.instance_url = params.instanceURL;
      }

      if (params.refreshToken) {
          if (!this.oauth) this.oauth = {};
          this.oauth.refresh_token = params.refreshToken;
      }
    }
  }

  public async jhLogin(username: string, password: string): Promise<any> {
    return new Promise( (resolve, reject) => {
      username = encodeURIComponent(username);
      password = encodeURIComponent(password);
      const url = 'https://test.usc.jhancock.com/pkmslogin.form?token=Unknown';

      //var headers = new Headers();
      //headers.append('Content-Type', 'application/x-www-form-urlencoded');
      //headers.append('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8');
      //headers.append('Accept-Language', 'en-US,en;q=0.9');

      //GET form to get the set-cookie

      /*const setup = new XMLHttpRequest();
      setup.addEventListener("load", function(data) {
        console.log(data);
        console.log(this);
      });
      setup.open("GET", url);
      setup.setRequestHeader('Access-Control-Expose-Headers', 'Set-Cookie');
      setup.send();

      var optionInput: any;

      const data = 'username='+username+'&password='+password+'&login-form-type=pwd';
      optionInput = {
        headers: headers,
        method: 'POST',
        data: data
      };


      let options = new RequestOptions(optionInput);
      this.http.post(url, data, options).subscribe( result => {
        console.log(result);
        //<!-- ERROR_TEXT = HPDIA0200W   Authentication failed. You have used an invalid user name, password or client certificate. -->

        //Search for error text, if exists add to page.
        debugger;
      });*/

      const windowInstance: any = window.open(url, '_blank', 'location=no,clearsessioncache=yes,clearcache=yes,toolbar=no,enableviewportscale=yes,hidden=yes');
      let firstAttempt = true;
      windowInstance.addEventListener('loadstop', e => {

        windowInstance.executeScript({
          code: `const doc = document;
          for (const node of doc.body.children) {
            node.style.setProperty('display', 'none');
          }
      
          doc.body.style.setProperty('background', 'linear-gradient(135deg, #006BA6 0%, #005990 50%, #092759 100%)');
          doc.body.style.setProperty('height', '100%');
          doc.getRootNode().children[0].style.setProperty('height', '100%');
          doc.body.style.setProperty('width', '100%');
          doc.body.style.setProperty('align-items', 'center');
          doc.body.style.setProperty('display', 'flex');
          
          const loginHtml = \`<form id='mobileLogin' name="register" method="POST" action="/pkmslogin.form?token=Unknown" style="padding: 0 48px; transform: none; width: 100%">
            <style>.footer { display:none!important } </style>
            <div>
              <div class="logo-wrapper" style="text-align: center;margin-bottom: 5rem;" >
                <img src="data:image/png;base64,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">
              </div>
              <h1 style="color: white; font-weight: 200; margin: 0 0 48px; font-size: 24px;">LTC Provider Login</h1>
              <div id="errorMessage"></div>
            <div style="position:relative; margin-bottom: 4rem;"><div class="mat-input-flex mat-form-field-flex">
              <div>
              <input id='mobileUsername'  name='username' style="font: inherit; background: 0 0; color: white; border: none; outline: 0; padding: 0; margin: 0; width: 100%; max-width: 100%; vertical-align: bottom; text-align: inherit; caret-color: rgba(255, 255, 255, 0.5);">
            <span class="mat-form-field-label-wrapper mat-input-placeholder-wrapper mat-form-field-placeholder-wrapper" style="top: -0.84375em; padding-top: 0.84375em; position: absolute; left: 0; box-sizing: content-box; width: 100%; height: 100%; overflow: hidden; pointer-events: none;">
            <label style="transform: translateY(-1.28125em) perspective(100px) translateZ(0.001px);color: rgba(255, 255, 255, 0.7);display: block;width: 100%;font-size: 1.3rem;">
            Username
            </label></span></div><!--bindings={
      "ng-reflect-ng-if": "0"
      }--></div><div class="mat-input-underline mat-form-field-underline" style="background-color: rgba(255, 255, 255, 0.7);position: absolute;height: 1px;width: 100%;"><span class="mat-input-ripple mat-form-field-ripple"></span></div><div class="mat-input-subscript-wrapper mat-form-field-subscript-wrapper" ng-reflect-ng-switch="hint"><!--bindings={
      "ng-reflect-ng-switch-case": "error"
      }--><!--bindings={
      "ng-reflect-ng-switch-case": "hint"
      }--><div class="mat-input-hint-wrapper mat-form-field-hint-wrapper ng-tns-c3-0 ng-trigger ng-trigger-transitionMessages ng-star-inserted" style="opacity: 1; transform: translateY(0%);"><!--bindings={
      "ng-reflect-ng-if": ""
      }--><div class="mat-input-hint-spacer mat-form-field-hint-spacer"></div></div></div></div>
      
          
      
            <div class="mat-input-wrapper mat-form-field-wrapper"  style="position:relative; margin-bottom: 4rem;"><div class="mat-input-flex mat-form-field-flex"><!--bindings={
      "ng-reflect-ng-if": "0"
      }--><div class="mat-input-infix mat-form-field-infix">
      
              
      
              <input id='mobilePassword' name='password' type="password" style="font: inherit; background: 0 0; color: white; border: none; outline: 0; padding: 0; margin: 0; width: 100%; max-width: 100%; vertical-align: bottom; text-align: inherit; caret-color: rgba(255, 255, 255, 0.5);">
              <input type="HIDDEN" name="login-form-type" value="pwd" />
            <span style="top: -0.84375em; padding-top: 0.84375em; position: absolute; left: 0; box-sizing: content-box; width: 100%; height: 100%; overflow: hidden; pointer-events: none;">
              <label style="transform: translateY(-1.28125em) perspective(100px) translateZ(0.001px);color: rgba(255, 255, 255, 0.7);display: block;width: 100%;font-size: 1.3rem;">
              Password
              </label>
            </span></div></div>
            <div class="mat-input-underline mat-form-field-underline" style="background-color: rgba(255, 255, 255, 0.7);position: absolute;height: 1px;width: 100%;"><span class="mat-input-ripple mat-form-field-ripple"></span></div><div class="mat-input-subscript-wrapper mat-form-field-subscript-wrapper" ng-reflect-ng-switch="hint"><!--bindings={
          "ng-reflect-ng-switch-case": "error"
          }--><!--bindings={
          "ng-reflect-ng-switch-case": "hint"
          }--><div class="mat-input-hint-wrapper mat-form-field-hint-wrapper ng-tns-c3-1 ng-trigger ng-trigger-transitionMessages ng-star-inserted" style="opacity: 1; transform: translateY(0%);"><!--bindings={
          "ng-reflect-ng-if": ""
          }--><div class="mat-input-hint-spacer mat-form-field-hint-spacer"></div></div></div></div>
          
              
          
                <div class="centered" style="margin-top:2rem; text-align:center">
          
                  <button style="margin-bottom: 3rem; background: white; color: #003e6b; box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12); cursor: pointer; outline: 0; border: none; -webkit-tap-highlight-color: transparent; display: inline-block; white-space: nowrap; text-decoration: none; vertical-align: baseline; text-align: center; margin: 0; min-width: 88px; line-height: 36px;padding: 0 16px;border-radius: 2px;"><span class="mat-button-wrapper">LOGIN</span></button>
          
                  <div style="margin-top:3rem"><a style="color:white; text-decoration: none">Forgot password?</a></div>
          
                </div>
          
              </div>
          </form>\`;
          loginNode = doc.createElement('div');
          loginNode.innerHTML = loginHtml;
          doc.body.insertBefore(loginNode, doc.body.childNodes[0]);`
        });

        if (firstAttempt) {
          firstAttempt = false;
          windowInstance.executeScript({'code': `
            
            doc.getElementById('mobileUsername').value = '`+username+`';
            doc.getElementById('mobilePassword').value = '`+password+`';
            doc.getElementById('mobileLogin').submit();
            `
            });
        } else {
          windowInstance.executeScript({'code': "doc.getElementById('GeneralErrorAlert').innerText.substring(1);"
          }, (error) => {
            if (error && error.length > 0 && error[0].length > 2) {
              reject(error[0]);
              
            }
          });

          windowInstance.executeScript({
            'code': `
              let errorText = '';
              for (var i=0; i<document.body.childNodes.length; i++) {
                if (document.body.childNodes[i].nodeType === 8 && document.body.childNodes[i].textContent.indexOf('ERROR_TEXT') !== -1) {
                  errorText = document.body.childNodes[i].textContent.substring(document.body.childNodes[i].textContent.indexOf('   '));
                }
              }
              errorText;`
          }, (errorText) => {
            if (errorText.length > 0 && errorText[0].length > 0) {
              reject(errorText[0]);
            }
          });

          windowInstance.executeScript({ 'code': 'doc.getElementById("helpPhAccLocked") !== null'}, (acctLocked) => {
            if (acctLocked[0]) {
              reject('Your account is suspended. You have exceeded the maximum number of failed login attempts.');
            }
          })
          //doc.getElementById('errorMessage').innerHTML = '<div style="background:rgba(255,255,255,0.2); margin-top:-2rem; margin-bottom:4rem; border-radius:4px;border:1px solid rgba(255,255,255,0.25);text-align:center;color: white;font-size: 14px;padding: 4px;">' + errorMessage + '</div>';
        }
      });
    });
  }

  private restyleJHLogin(doc) {
    // 100: #06A7E2
    // 200: #1495db
    // 300: #006BA6
    // 400: #005990
    // 500: #003e6b
    // 600: #092759
    // 700: #0a2e55
    
  }

  private extractErrorMessage(body: string) {
    const m = body.match(/ERROR_TEXT (.+)--/mgi);
    return m[0].substring(m[0].indexOf('  ') + 3, m[0].length-3);
  }

  public async login(): Promise<any> {
    if ((<any>window).cordova) {
      return await this.loginWithDevice();
    } else {
      return await this.loginWithBrowser();
    }
  }

  private async loginWithBrowser(): Promise<any> {
    return new Promise((resolve, reject) => {
      let loginWindowURL = this.loginURL + this.prefix + 'authorize?client_id=' // '/authorize?client...'
          + this.appId + '&redirect_uri=' + this.oauthCallbackURL
          + '&response_type=token&scope=' + this.scopeParameters.join('%20');

      window.open(loginWindowURL, '_blank', 'location=no');
      this.deferredLogin.resolve = resolve;
      this.deferredLogin.reject = reject;
    });
  }

  private async loginWithDevice(): Promise<any> {
    return new Promise((resolve, reject) => {
      let deviceOauthCallback = this.loginURL + '/success',
        loginWindowURL = this.loginURL + this.prefix + 'authorize?client_id=' + this.appId + '&redirect_uri=' + deviceOauthCallback + '&response_type=token',
        successOauth = 'success#access_token',
        userDeniedAuth = this.prefix + '/success?error=access_denied&error_description=end-user+denied+authorization',
        oauthTimeout = '/setup/secur/RemoteAccessErrorPage';

      if ((<any>window).cordova && (<any>window).cordova.InAppBrowser) {

        var ref = (<any>window).cordova.InAppBrowser.open(loginWindowURL, '_blank', 'location=no,zoom=no');
        ref.addEventListener('loadstop', (event) => {
          if (event.url.indexOf(successOauth) > -1) {
            this.oauthCallback(event.url);
            ref.close();

          } else if (event.url.indexOf(userDeniedAuth) > -1) {
            ref.close();
            reject('User denied authorization');

          } else if (event.url.indexOf(oauthTimeout) > -1) {
            ref.close();
            reject('Oauth timeout');
          }
        });
        this.deferredLogin.resolve = resolve;
        this.deferredLogin.reject = reject;
      } else {
        reject('Cordova InAppBrowser plugin required');
      }

    });
  }

  public oauthCallback(url): void {
    let queryString: string;

    if (url.indexOf("access_token=") > 0) { // was access_token
      queryString = url.substr(url.indexOf('#') + 1);
      this.oauth = this.parseQueryString(queryString);
      this.tokenStore['forceOAuth'] = JSON.stringify(this.oauth);
      this.deferredLogin.resolve(this.oauth);
    } else if (url.indexOf("error=") > 0) {
      queryString = decodeURIComponent(url.substring(url.indexOf('?') + 1));
      this.deferredLogin.reject(this.parseQueryString(queryString));
    } else {
      this.deferredLogin.reject({
        status: 'access_denied'
      });
    }
  }

  private parseQueryString(queryString) {
    var qs = decodeURIComponent(queryString),
        obj = {},
        params = qs.split('&');
    params.forEach(function (param) {
      var splitter = param.split('=');
      obj[splitter[0]] = splitter[1];
    });
    return obj;
  };
  
  public getUserId() {
    return this.oauth ? this.oauth.id.split('/').pop() : undefined;
  }

  public isAuthenticated() {
    return (this.oauth && this.oauth.access_token) ? true : false;
  }

  public getUser() {
    const userData = localStorage.getItem('userData');
    if (typeof userData !== 'undefined' && userData.length > 0) {
      return JSON.parse(userData);
    }
    return this.data;
  }

  private getRequestBaseURL() {
    var url;
    if (this.useProxy) {
      url = this.proxyURL;
    } else if (this.oauth.instance_url) {
      url = this.oauth.instance_url;
    } else {
      url = this.communityUrl;
      //url = this.serverURL;
    }
    if (url.slice(-1) === '/') {
      url = url.slice(0, -1);
    }
    return url;
  }

  private toQueryString(obj) {
    var parts = [],
        i;
    for (i in obj) {
      if (obj.hasOwnProperty(i)) {
        parts.push(encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]));
      }
    }
    return parts.join("&");
  }

  private refreshToken(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this.oauth.refresh_token) {
        reject('No refresh token found');
      } else {
        var params = {
          'grant_type': 'refresh_token',
          'refresh_token': this.oauth.refresh_token,
          'client_id': this.appId
        },
        url = this.useProxy ? this.proxyURL : this.loginURL;
        if (url.slice(-1) === '/') {
          url = url.slice(0, -1);
        }
        url = url + this.prefix + 'token?' + this.toQueryString(params);
        var headers = new Headers();
        if (this.useProxy) {
          headers.append('Target-URL', this.loginURL);
        }
        var method = 'POST';
        var options = new RequestOptions({headers: headers, method: method});

        this.http.get(url, options)
          .map(res => {
            if (res.status < 200 || res.status >= 300) {
              reject();
            } else {
              return res.json();
            }
          })
          .subscribe(
            (data) => {
              this.oauth.access_token = data.access_token;
              this.tokenStore.forceOAuth = JSON.stringify(this.oauth);
              resolve(data);
            },
            (error) => {
              reject(error);
          });
      }
    });
  }

  public async request(obj) {
    return new Promise((resolve, reject) => {

      if (!this.oauth || (!this.oauth.access_token && !this.oauth.refresh_token)) {
        reject('No access token. Login and try again.');
      } else {
        // Compose url
        var url = this.getRequestBaseURL();
        if (obj.path.charAt(0) !== '/') {
            obj.path = '/' + obj.path;
        }
        url = url + obj.path;

        //Compose headers
        var headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this.oauth.access_token);
        if (obj.contentType) {
          headers.append('Content-Type', obj.contentType);
        }
        if (this.useProxy) {
          headers.append('Target-URL', this.oauth.instance_url);
        }

        // Compose options
        var method = obj.method ? obj.method : 'GET';
        var optionInput: any;

        optionInput = {
          headers: headers,
          method: method,
          params: obj.params,
          data: obj.data
        };

        if (obj.responseType === 'arraybuffer') {
          optionInput.responseType = ResponseContentType.ArrayBuffer;
        }

        let options = new RequestOptions(optionInput);

        if (method === "POST") {
          this.http.post(url, obj.data, options)
            .map(res => {
              if (res.status < 200 || res.status >= 300) {
                if (res.status === 401) {
                  this.onlyOne = false;
                  if (this.oauth.refresh_token) {
                    return this.refreshToken().then(() => {
                      return this.request(obj);
                    })
                  } else {
                    return this.login().then(() => {
                      return this.request(obj);
                    });
                  }
                } else {
                  throw new Error('This request has failed ' + res.status);
                }
              } else {
                return res.json();
              }
            })
            .subscribe(
              (data) => {
                resolve(data);
              },
              (error) => {
                reject(error)
              }
            );
        } else { // FIX redirect URI
          this.http.get(url, options)
          .map(res => {
            if (res.status < 200 || res.status >= 300) {
              if (res.status === 401) {
                this.onlyOne = false;
                if (this.oauth.refresh_token) {
                  // Unauthorized, try to refresh token
                  return this.refreshToken().then(() => {
                    return this.request(obj);
                  });

                } else {
                  // Unauthorized, try to login again
                  return this.login().then(() => {
                    return this.request(obj);
                  });
                }
              } else {
                throw new Error('This request has failed ' + res.status);
              }
            }
            else {
              return res.json();
            }
          })
          .subscribe(
              (data) => {
                //@todo: remove
                setTimeout( () => {
                  resolve(data);
                }, 2000);                  
              },
              (error) => {
                  reject(error);
          });
        }
      }
    });
  }

  public async query(soql) {
    return await this.request({
      path: '/services/data/' + this.apiVersion + '/query',
      params: {
        q: soql
      }
    });
  }

  public async retrieve(objectName, id, fields) {
    return await this.request({
      path: '/services/data/' + this.apiVersion + '/sobjects/' + objectName + '/' + id,
      params: fields ? {
        fields: fields
      } : undefined
    });
  }

  public async create(objectName, data) {
    return this.request({
      method: 'POST',
      contentType: 'application/json',
      path: '/services/data/' + this.apiVersion + '/sobjects/' + objectName + '/',
      data: data
    });
  }

  public async update(objectName, data) {
    var id = data.id,
      fields = {...data};

    delete fields.attributes;
    delete fields.id;

    return await this.request({
      method: 'POST',
      contentType: 'application/json',
      path: '/services/data/' + this.apiVersion + '/sobjects/' + objectName + '/' + id,
      params: {
          '_HttpMethod': 'PATCH'
      },
      data: fields
    });
  }

  public async del(objectName, id) {
    return await this.request({
      method: 'DELETE',
      path: '/services/data/' + this.apiVersion + '/sobjects/' + objectName + '/' + id
    });
  }

  public async upsert(objectName, externalIdField, externalId, data) {
    return await this.request({
      method: 'PATCH',
      contentType: 'application/json',
      path: '/services/data/' + this.apiVersion + '/sobjects/' + objectName + '/' + externalIdField + '/' + externalId,
      data: data
    });
  }

  doLogin(username: string, password: string, callback: any) {

    if (LOCALIZED_LOGIN) {
      // const passwordSalt = sjcl.codec.hex.toBits( '314653651774a345466a3769267142325466' );
      // const derivedKey = sjcl.misc.pbkdf2( password, passwordSalt, 20000, 256 );
      // password = sjcl.codec.hex.fromBits( derivedKey );
      this.http.post(BASE_URL + 'login', 'username=' + username + '&password=' + password, {headers: this.headers})
        .map(res => res.json())
        .map(res => res)
        .subscribe( res => {
            console.log(res);
            localStorage.setItem('userData', JSON.stringify(res.user));
            this.data = res.user;
            callback(res);
      });
    } else {
      
    }
  }

  ngOnDestroy() {
    (<any>window).angularComponentRef = null;
  }
}
