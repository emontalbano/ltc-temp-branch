import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { BaseService, SObjectService, SalesforceService, CacheService, DetailService } from './';
import { HttpModule, Http, BaseRequestOptions, XHRBackend, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../reducers';
import { NgZone } from '@angular/core';
import { SJCLWrapper } from '../common/utils';

/// <reference path="../assets/vendor/sjcl.d.ts" />

describe('BaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        StoreModule.forRoot(reducers)
      ],
      providers: [
        BaseService,
        SJCLWrapper,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  });
  
  it('should initialize', inject([BaseService], baseSvc  => {    
    baseSvc.init({'type': 'contact'});
  }));

  it('should throw an error if the type doesn\'t exist', inject([BaseService], baseSvc  => {
    try {
      baseSvc.init({'type': 'fake_object_name'});
      expect(false);
    } catch (e) { }
  }));

  it('should send RESTful create statements', async(inject([BaseService, XHRBackend], (baseSvc, mockBackend)  => {
    baseSvc.init({'type': 'contact'});
    baseSvc.user = { id: 4, name: 'username' };
    const mockResponse = {
      data: {
        id: 1,
        firstname: 'test',
        lastname: 'user'
      }
    };

    mockBackend.connections.subscribe( connection => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(mockResponse)
      })));
    });
    baseSvc.create({
      'firstname': 'test',
      'lastname': 'user'
    }, payload => {
      expect(payload.data.id).toEqual(1);
    });

    //Function block to await the thrown error
    const noIdsInCreate = async function() {
      try {
        await baseSvc.create({
          'id': 2,
          'firstname': 'test',
          'lastname': 'user'
        }, payload => {
          expect(false);        
        });
        expect(false);
      } catch(e) {}    
    }

    noIdsInCreate();    
  })));

  it('should send RESTful read statements', async(inject([BaseService, XHRBackend], (baseSvc, mockBackend)  => {
    baseSvc.init({'type': 'contact'});
    const mockResponse = {
      data: [{
        id: 1,
        firstname: 'test',
        lastname: 'user'
      }]
    };

    mockBackend.connections.subscribe( connection => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(mockResponse)
      })));
    });
    baseSvc.getAll({
      callback: payload => {
      expect(payload.data[0].id).toEqual(1);
    }});    
  })));


  it('should send RESTful get:id statements', async(inject([BaseService, XHRBackend], (baseSvc, mockBackend)  => {
    baseSvc.init({'type': 'contact'});
    const mockResponse = {
      data: {
        id: 1,
        firstname: 'test',
        lastname: 'user'
      }
    };

    mockBackend.connections.subscribe( connection => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(mockResponse)
      })));
    });
    baseSvc.get(1, payload => {
      expect(payload.data.id).toEqual(1);
    });    
  })));

  it('should send RESTful update statements', async(inject([BaseService, XHRBackend], (baseSvc, mockBackend)  => {
    baseSvc.init({'type': 'contact'});
    baseSvc.user = { id: 4, name: 'username' };
    const mockResponse = {
      data: {
        id: 1,
        firstname: 'test 2',
        lastname: 'user'
      }
    };

    mockBackend.connections.subscribe( connection => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(mockResponse)
      })));
    });
    baseSvc.update({
      'id': 1,
      'firstname': 'test 2',
      'lastname': 'user'
    }, payload => {
      expect(payload.id).toEqual(1);
    });

    //Function block to await the thrown error
    const noIdInUpdate = async function() {
      try {
        await baseSvc.update({
          'firstname': 'test',
          'lastname': 'user'
        }, payload => {
          expect(false);        
        });
        expect(false);
      } catch(e) {}    
    }

    noIdInUpdate();    
  })));

  it('should send RESTful delete statements', async(inject([BaseService, XHRBackend], (baseSvc, mockBackend)  => {
    baseSvc.init({'type': 'contact'});
    baseSvc.user = { id: 4, name: 'username' };
    const mockResponse = {
      data: {
        id: 1,
        firstname: 'test 2',
        lastname: 'user'
      }
    };

    mockBackend.connections.subscribe( connection => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(mockResponse)
      })));
    });
    baseSvc.delete({
      'id': 1,
      'firstname': 'test 2',
      'lastname': 'user'
    }, payload => {
      expect(payload.data.id).toEqual(1);
    });

    //Function block to await the thrown error
    const noIdInDelete = async function() {
      try {
        await baseSvc.delete({
          'firstname': 'test',
          'lastname': 'user'
        }, payload => {
          expect(false);        
        });
        expect(false);
      } catch(e) {}    
    }

    noIdInDelete();    
  })));

  it('should be fully interactive with data', async(inject([BaseService], (baseSvc)  => {
    baseSvc.init({'type': 'contact'});
    const data = [
      {id: 1, firstname: 'John', lastname: 'John'},
      {id: 2, firstname: 'John', lastname: 'Doe'},
      {id: 3, firstname: 'Jane', lastname: 'Smith'},
    ];

    const createObjsAndTest = async function() {
      for (const i in data) {
        baseSvc.handlePayloadData('set', { contact: data[i] });
      }
      let j = 0;
      baseSvc.filteredItems.subscribe( items => {
        switch(j) {
          case 0:
            expect(items.length).toEqual(3);
            break;
          case 1:
            expect(items.length).toEqual(2);
            break;
          case 2:
            expect(items.length).toEqual(3);
            break;
          case 2:
            expect(items.length).toEqual(1);
            expect(items[0].lastname).toEqual('John');
            break;
        }
        j++;
      });
      baseSvc.search('john');
      baseSvc.search('');

      baseSvc.filter('lastname', 'John');
    };

    createObjsAndTest();
  })));
});


describe('SObjectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        StoreModule.forRoot(reducers)
      ],
      providers: [
        SObjectService,
        SalesforceService,
        CacheService,
        SJCLWrapper,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  });

  it('should initialize when the type is set', inject([SObjectService], (sobjSvc) => {
    sobjSvc.setType('contact');
    try {
      sobjSvc.setType('does_not_exist');
      expect(false);
    } catch (e) {}
  }));

  it('should send RESTful create requests', async(inject([SObjectService, XHRBackend], (sobjSvc, mockBackend) => {
    const mockResponse = {
      data: {
        id: 1,
        firstname: 'test',
        lastname: 'user'
      }
    };

    mockBackend.connections.subscribe( connection => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(mockResponse),
        status: 200
      })));
    });

    sobjSvc.setType('contact');
    sobjSvc.sforce.init({
      oauth: { access_token: 'test', instance_url: 'test' }
    });
        
    sobjSvc.create({
      firstname: 'test',
      lastname: 'user'
    }).then( payload => {
      expect(payload.data.id).toEqual(1);
    });

    
  })));

  it('should send RESTful update requests', async(inject([SObjectService, XHRBackend], (sobjSvc, mockBackend) => {
    const mockResponse = {
      data: {
        id: 1,
        firstname: 'test',
        lastname: 'user'
      }
    };

    mockBackend.connections.subscribe( connection => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(mockResponse),
        status: 200
      })));
    });

    sobjSvc.setType('contact');
    sobjSvc.sforce.init({
      oauth: { access_token: 'test', instance_url: 'test' }
    });

    sobjSvc.handlePayloadData('set', {
      id: 1,
      firstname: 'john',
      lastname: 'doe'
    });
    
    sobjSvc.handlePayloadData('set', {
      id: 2,
      firstname: 'jane',
      lastname: 'doe'
    });
    
    
    sobjSvc.update({
      id: 1,
      firstname: 'test',
      lastname: 'user'
    }).then( () => {
      sobjSvc.items.subscribe( (items: any[]) => {
        for (let i=0; i<items.length; i++) {
          if (items[i].id === 1) {
            expect(items[i].firstname).toEqual('test');
          }
        }
      })
    });

  })));

  it('should build a field list using the skip list', inject([SObjectService], (sobjSvc) => {
    sobjSvc.setType('contact');
    sobjSvc.schema['properties'] = {
      'test': '1',
      'test2': '2',
      'test3': '3',
    };
    sobjSvc.schema['ignoreList'] = [2];
    expect(sobjSvc.getFieldList()).toEqual(['test', 'test3']);
    expect(sobjSvc.buildFieldList()).toEqual('test, test3');
  }));

  it('should send RESTful get requests', async(inject([SObjectService, XHRBackend], (sobjSvc, mockBackend) => {
    const mockResponse = {'records': [{
        id: 1,
        firstname: 'test',
        lastname: 'user'
    },{
      id: 2,
      firstname: 'test 2',
      lastname: 'user 2'
    }]};

    mockBackend.connections.subscribe( connection => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(mockResponse),
        status: 200
      })));
    });

    sobjSvc.setType('contact');
    sobjSvc.sforce.init({
      oauth: { access_token: 'test', instance_url: 'test' }
    });

    sobjSvc.getAll().then( () => {
      sobjSvc.items.subscribe( (items: any[]) => {
        for (let i=0; i<items.length; i++) {
          if (items[i].id === 1) {
            expect(items[i].firstname).toEqual('test');
          } else if (items[i].id === 2) {
            expect(items[i].firstname).toEqual('test 2');
          }
        }
      })
    });

  })));
});

describe('DetailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        StoreModule.forRoot(reducers)
      ],
      providers: [
        DetailService,
        SalesforceService,
        CacheService,
        SJCLWrapper,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  });

  it('should set parent id', inject([DetailService], (detailSvc) => {
    detailSvc.setType('contact');
    detailSvc.setParentId('1', 'account_id');
    expect(detailSvc.parentId).toEqual('1');
    expect(detailSvc.parentField).toEqual('account_id');
    expect(detailSvc.buildWhere()).toEqual('WHERE account_id = \'1\'');
  }))
});


describe('SalesforceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        StoreModule.forRoot(reducers)
      ],
      providers: [
        SalesforceService,
        CacheService,
        SJCLWrapper,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  });

  it('should save oauth callback as access token ', inject([SalesforceService, XHRBackend], (sfSvc, mockBackend) => {
    sfSvc.deferredLogin = { resolve: (nil) => {}};
    const url = 'oauthcallback.html#access_token=00D15000000Geuv%21AR8AQFd7Lz2i3NTd_EZTGN8EnVi1nYGcUftya3ULcXvV.YSn_y25ZxKAYlxYYjs_7izQ.QYirVhWd9n12VsDfrXzMbMO3A7A&instance_url=https%3A%2F%2Femontalbano-dev-ed.my.salesforce.com&id=https%3A%2F%2Flogin.salesforce.com%2Fid%2F00D15000000GeuvEAC%2F00515000006ARdLAAW&issued_at=1520154311899&signature=VX1UtOT8cyXVs03Z%2FSQ29zVWhfhQOtHnv5tKJ23AH4Y%3D&scope=full&token_type=Bearer';
    sfSvc.oauthCallback(url);
    expect(sfSvc.oauth.access_token).toEqual('00D15000000Geuv!AR8AQFd7Lz2i3NTd_EZTGN8EnVi1nYGcUftya3ULcXvV.YSn_y25ZxKAYlxYYjs_7izQ.QYirVhWd9n12VsDfrXzMbMO3A7A');

    sfSvc.deferredLogin = { reject: (err) => expect(err).toEqual({error: 'test'}) };
    sfSvc.oauthCallback('oauthcallback.html?error=test');

    sfSvc.deferredLogin = { reject: (err) => expect(err).toEqual({status: 'access_denied'}) };
    sfSvc.oauthCallback('oauthcallback.html?unknown=queryparam');
  }));

  it('should refresh token on status 401 ', inject([SalesforceService, XHRBackend], (sfSvc, mockBackend) => {
    const mockResponse = {'records': [{
      id: 1,
      firstname: 'test',
      lastname: 'user'
    },{
      id: 2,
      firstname: 'test 2',
      lastname: 'user 2'
    }]};
    let i=0;
    mockBackend.connections.subscribe( connection => {
      if (i === 0 || i === 2) {
        connection.mockRespond(new Response(new ResponseOptions({
          body: 'Error: 401',
          status: 401
        })));
      } else {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse),
          status: 200
        })));
      }
      i++;      
    });
    sfSvc.oauth = { refresh_token: 'test', access_token: 'test' };

    sfSvc.create('contact', {'firstname': 'test', 'lastname': 'user'});
    sfSvc.query('SELECT Id, firstname FROM contact LIMIT 1');
    
  }));
});

export class MockSjcl {
  public sha256 = val => val;
  public hash = val => val;
}

describe('CacheService', () => {
  
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        StoreModule.forRoot(reducers)
      ],
      providers: [
        CacheService,
        { provide: XHRBackend, useClass: MockBackend },
        { provide: SJCLWrapper, useClass: MockSjcl }
      ]
    });    
  });

  beforeEach( (done) => { return inject([CacheService], (cacheSvc) => {
    cacheSvc.unlockDatabase('testcode').then( result => {
      done();
    });
  })});

  it('should create databases and lock / unload', async(inject([CacheService], (cacheSvc) => {
    
    const check = async function() {
      await cacheSvc.unlockDatabase('testcode');
      localStorage.setItem('sqlite-code', 'testcode');
      await cacheSvc.unlockDatabase();
      localStorage.setItem('sqlite-code', 'incorrect');
      const failedUnlock = cacheSvc.unlockDatabase();
      failedUnlock.then( result => expect(false) )
      failedUnlock.catch( result => expect(!result) );
      expect(await cacheSvc.checkDb());
    };
    check();
  })));

  it('should execute queries successfully', async(inject([CacheService], (cacheSvc) => {
    cacheSvc.unlockDatabase('testcode').then( result => expect(result) );
    cacheSvc.execute('SELECT * FROM contact LIMIT 10', []);
  })));


});