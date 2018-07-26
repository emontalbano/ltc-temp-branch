/**
 * F2B Schema
 *
 * This file is automatically generated. DO NOT MAKE CHANGES HERE. Use the schema builder:
 *   cd ltc-provider-app/tools
 *   python3 schemaBuilder.py
 */
export const schema = {
  "account":{
    "properties":{
      "id":{
        "type":"string",
        "read-only":true
      },
      "lastmodifieddate":{
        "type":"datetime",
        "read-only":true
      },
      "createddate":{
        "type":"datetime",
        "read-only":true
      },
      "isdeleted":{
        "type":"boolean",
        "read-only":true
      },
      "pending_create":{
        "type":"boolean",
        "local-only":true,
        "default":false
      },
      "pending_update":{
        "type":"boolean",
        "local-only":true,
        "default":false
      },
      "pending_delete":{
        "type":"boolean",
        "local-only":true,
        "default":false
      },
      "cache_age":{
        "type":"integer",
        "local-only":true
      },
      "keep_fresh":{
        "type":"integer",
        "local-only":true,
        "default":1800
      },
      "prune":{
        "type":"integer",
        "local-only":true,
        "default":172800
      },
      "name":{
        "type":"string",
        "searchable":true
      },
      "lastname":{
        "type":"string",
        "searchable":true
      },
      "firstname":{
        "type":"string",
        "searchable":true
      },
      "type":{
        "type":"string",
        "searchable":true
      }
    },
    "permissions":{
      "create":"member",
      "update":"member",
      "delete":"member",
      "read":"guest"
    },
    "config":{
      "abstract":false
    },
    "skipList":[

    ],
    "ignoreList":[
      5,
      6,
      7,
      8,
      9,
      10
    ]
  },
  "claim__c":{
    "properties":{
      "id":{
        "type":"string",
        "read-only":true
      },
      "lastmodifieddate":{
        "type":"datetime",
        "read-only":true
      },
      "createddate":{
        "type":"datetime",
        "read-only":true
      },
      "isdeleted":{
        "type":"boolean",
        "read-only":true
      },
      "pending_create":{
        "type":"boolean",
        "local-only":true,
        "default":false
      },
      "pending_update":{
        "type":"boolean",
        "local-only":true,
        "default":false
      },
      "pending_delete":{
        "type":"boolean",
        "local-only":true,
        "default":false
      },
      "cache_age":{
        "type":"integer",
        "local-only":true
      },
      "keep_fresh":{
        "type":"integer",
        "local-only":true,
        "default":1800
      },
      "prune":{
        "type":"integer",
        "local-only":true,
        "default":172800
      },
      "associated_policy__c":{
        "type":"string",
        "required":true,
        "searchable":true,
        "read-only":true
      },
      "claim_status__c":{
        "type":"string",
        "searchable":true
      }
    },
    "permissions":{
      "create":"member",
      "update":"member",
      "delete":"member",
      "read":"guest"
    },
    "config":{
      "abstract":false
    },
    "skipList":[

    ],
    "ignoreList":[
      5,
      6,
      7,
      8,
      9,
      10
    ]
  },
  "ltc_claim_invoice_submission__c":{
    "properties":{
      "id":{
        "type":"string",
        "read-only":true
      },
      "lastmodifieddate":{
        "type":"datetime",
        "read-only":true
      },
      "createddate":{
        "type":"datetime",
        "read-only":true
      },
      "isdeleted":{
        "type":"boolean",
        "read-only":true
      },
      "ltc_submission_status__c":{
        "type":"string",
        "required":true,
        "searchable":true
      },
      "ltc_associated_claim__c":{
        "type":"string",
        "required":true,
        "searchable":true,
        "read-only":true
      }
    },
    "permissions":{
      "create":"member",
      "update":"member",
      "delete":"member",
      "read":"guest"
    },
    "config":{
      "abstract":false
    },
    "skipList":[

    ],
    "ignoreList":[

    ]
  },
  "ltc_claim_invoice__c":{
    "properties":{
      "id":{
        "type":"string",
        "read-only":true
      },
      "lastmodifieddate":{
        "type":"datetime",
        "read-only":true
      },
      "createddate":{
        "type":"datetime",
        "read-only":true
      },
      "isdeleted":{
        "type":"boolean",
        "read-only":true
      },
      "ltc_invoice_submission__c":{
        "type":"string",
        "required":true,
        "searchable":true
      },
      "ltc_hourly_rate__c":{
        "type":"string",
        "searchable":true
      },
      "ltc_service_date_from__c":{
        "type":"string",
        "required":true,
        "searchable":true
      },
      "ltc_service_date_to__c":{
        "type":"string",
        "required":true,
        "searchable":true
      },
      "ltc_service_dates__c":{
        "type":"string",
        "searchable":true,
        "read-only":true
      },
      "ltc_submission_date__c":{
        "type":"datetime",
        "searchable":true,
        "read-only":true
      },
      "ltc_total_charges__c":{
        "type":"string",
        "required":true,
        "searchable":true
      },
      "ltc_type__c":{
        "type":"string",
        "searchable":true
      },
      "ltc_invoice_submission__r.ltc_associated_claim__c":{
        "type":"string",
        "searchable":true
      },
      "ltc_cast_iron_pull_status__c":{
        "type":"string",
        "searchable":true
      }
    },
    "permissions":{
      "create":"member",
      "update":"member",
      "delete":"member",
      "read":"guest"
    },
    "config":{
      "abstract":false
    },
    "skipList":[

    ],
    "ignoreList":[

    ]
  },
  "policy__c":{
    "properties":{
      "id":{
        "type":"string",
        "read-only":true
      },
      "lastmodifieddate":{
        "type":"datetime",
        "read-only":true
      },
      "createddate":{
        "type":"datetime",
        "read-only":true
      },
      "isdeleted":{
        "type":"boolean",
        "read-only":true
      },
      "pending_create":{
        "type":"boolean",
        "local-only":true,
        "default":false
      },
      "pending_update":{
        "type":"boolean",
        "local-only":true,
        "default":false
      },
      "pending_delete":{
        "type":"boolean",
        "local-only":true,
        "default":false
      },
      "cache_age":{
        "type":"integer",
        "local-only":true
      },
      "keep_fresh":{
        "type":"integer",
        "local-only":true,
        "default":1800
      },
      "prune":{
        "type":"integer",
        "local-only":true,
        "default":172800
      },
      "insured__c":{
        "type":"string",
        "searchable":true
      }
    },
    "permissions":{
      "create":"member",
      "update":"member",
      "delete":"member",
      "read":"guest"
    },
    "config":{
      "abstract":false
    },
    "skipList":[

    ],
    "ignoreList":[
      5,
      6,
      7,
      8,
      9,
      10
    ]
  },
  "ltc_time_log__c":{
    "properties":{
      "id":{
        "type":"string",
        "read-only":true
      },
      "lastmodifieddate":{
        "type":"datetime",
        "read-only":true
      },
      "createddate":{
        "type":"datetime",
        "read-only":true
      },
      "isdeleted":{
        "type":"boolean",
        "read-only":true
      },
      "pending_create":{
        "type":"boolean",
        "local-only":true,
        "default":false
      },
      "pending_update":{
        "type":"boolean",
        "local-only":true,
        "default":false
      },
      "pending_delete":{
        "type":"boolean",
        "local-only":true,
        "default":false
      },
      "cache_age":{
        "type":"integer",
        "local-only":true
      },
      "keep_fresh":{
        "type":"integer",
        "local-only":true,
        "default":1800
      },
      "prune":{
        "type":"integer",
        "local-only":true,
        "default":172800
      },
      "ltc_related_claim__c":{
        "type":"string",
        "searchable":true
      },
      "ltc_check_in_datetime__c":{
        "type":"string"
      },
      "ltc_check_out_datetime__c":{
        "type":"string"
      },
      "ltc_type_of_care__c":{
        "type":"string"
      },
      "ltc_hourly_rate__c":{
        "type":"string"
      },
      "ltc_number_of_hours__c":{
        "type":"string"
      },
      "ltc_related_invoice__c":{
        "type":"string"
      },
      "ltc_check_in_type__c":{
        "type":"string"
      },
      "ltc_check_out_type__c":{
        "type":"string"
      },
      "ltc_check_in_geolocation__latitude__s":{
        "type":"string"
      },
      "ltc_check_in_geolocation__longitude__s":{
        "type":"string"
      },
      "ltc_check_in_geolocation__c":{
        "type":"string",
        "read-only":true
      },
      "ltc_check_out_geolocation__latitude__s":{
        "type":"string"
      },
      "ltc_check_out_geolocation__longitude__s":{
        "type":"string"
      },
      "ltc_check_out_geolocation__c":{
        "type":"string",
        "read-only":true
      },
      "ltc_activities_for_daily_living__c": {
        "type":"string"
      }
    },
    "permissions":{
      "create":"member",
      "update":"member",
      "delete":"member",
      "read":"guest"
    },
    "config":{
      "abstract":false
    },
    "skipList":[

    ],
    "ignoreList":[
      5,
      6,
      7,
      8,
      9,
      10
    ]
  }
};

export const schemaSQL = `
CREATE TABLE account (
	local_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, 
	id VARCHAR, 
	lastmodifieddate DATETIME, 
	createddate DATETIME, 
	isdeleted BOOLEAN, 
	pending_create BOOLEAN, 
	pending_update BOOLEAN, 
	pending_delete BOOLEAN, 
	cache_age INTEGER, 
	keep_fresh INTEGER, 
	prune INTEGER, 
	name VARCHAR, 
	lastname VARCHAR, 
	firstname VARCHAR, 
	type VARCHAR, 
	CHECK (isdeleted IN (0, 1)), 
	CHECK (pending_create IN (0, 1)), 
	CHECK (pending_update IN (0, 1)), 
	CHECK (pending_delete IN (0, 1))
)

;
CREATE TABLE claim__c (
	local_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, 
	id VARCHAR, 
	lastmodifieddate DATETIME, 
	createddate DATETIME, 
	isdeleted BOOLEAN, 
	pending_create BOOLEAN, 
	pending_update BOOLEAN, 
	pending_delete BOOLEAN, 
	cache_age INTEGER, 
	keep_fresh INTEGER, 
	prune INTEGER, 
	associated_policy__c VARCHAR NOT NULL, 
	claim_status__c VARCHAR, 
	CHECK (isdeleted IN (0, 1)), 
	CHECK (pending_create IN (0, 1)), 
	CHECK (pending_update IN (0, 1)), 
	CHECK (pending_delete IN (0, 1))
)

;
CREATE TABLE ltc_claim_invoice_submission__c (
	local_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, 
	id VARCHAR, 
	lastmodifieddate DATETIME, 
	createddate DATETIME, 
	isdeleted BOOLEAN, 
	ltc_submission_status__c VARCHAR NOT NULL, 
	ltc_associated_claim__c VARCHAR NOT NULL, 
	CHECK (isdeleted IN (0, 1))
)

;
CREATE TABLE ltc_claim_invoice__c (
	local_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, 
	id VARCHAR, 
	lastmodifieddate DATETIME, 
	createddate DATETIME, 
	isdeleted BOOLEAN, 
	ltc_invoice_submission__c VARCHAR NOT NULL, 
	ltc_hourly_rate__c VARCHAR, 
	ltc_service_date_from__c VARCHAR NOT NULL, 
	ltc_service_date_to__c VARCHAR NOT NULL, 
	ltc_service_dates__c VARCHAR, 
	ltc_submission_date__c DATETIME, 
	ltc_total_charges__c VARCHAR NOT NULL, 
	ltc_type__c VARCHAR, 
	CHECK (isdeleted IN (0, 1))
)

;
CREATE TABLE policy__c (
	local_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, 
	id VARCHAR, 
	lastmodifieddate DATETIME, 
	createddate DATETIME, 
	isdeleted BOOLEAN, 
	pending_create BOOLEAN, 
	pending_update BOOLEAN, 
	pending_delete BOOLEAN, 
	cache_age INTEGER, 
	keep_fresh INTEGER, 
	prune INTEGER, 
	insured__c VARCHAR, 
	CHECK (isdeleted IN (0, 1)), 
	CHECK (pending_create IN (0, 1)), 
	CHECK (pending_update IN (0, 1)), 
	CHECK (pending_delete IN (0, 1))
)

;
CREATE TABLE ltc_time_log__c (
	local_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, 
	id VARCHAR, 
	lastmodifieddate DATETIME, 
	createddate DATETIME, 
	isdeleted BOOLEAN, 
	pending_create BOOLEAN, 
	pending_update BOOLEAN, 
	pending_delete BOOLEAN, 
	cache_age INTEGER, 
	keep_fresh INTEGER, 
	prune INTEGER, 
	ltc_related_claim__c VARCHAR, 
	ltc_check_in_datetime__c VARCHAR, 
	ltc_check_out_datetime__c VARCHAR,
	ltc_type_of_care__c VARCHAR, 
	ltc_hourly_rate__c VARCHAR, 
	ltc_number_of_hours__c VARCHAR, 
	ltc_related_invoice__c VARCHAR, 
	ltc_check_in_type__c VARCHAR, 
	ltc_check_out_type__c VARCHAR, 
	ltc_check_in_geolocation__latitude__s VARCHAR, 
	ltc_check_in_geolocation__longitude__s VARCHAR, 
	ltc_check_in_geolocation__c VARCHAR, 
	ltc_check_out_geolocation__latitude__s VARCHAR, 
	ltc_check_out_geolocation__longitude__s VARCHAR, 
	ltc_check_out_geolocation__c VARCHAR, 
	CHECK (isdeleted IN (0, 1)), 
	CHECK (pending_create IN (0, 1)), 
	CHECK (pending_update IN (0, 1)), 
	CHECK (pending_delete IN (0, 1))
)

;`;

export const version = '5d04d4d3-d673-4066-aa56-cf9d330c3f91';
