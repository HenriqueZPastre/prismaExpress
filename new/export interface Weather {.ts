export interface Weather {
	OFX: OFX;
  }
  export interface OFX {
	SIGNONMSGSRSV1: SIGNONMSGSRSV1;
	BANKMSGSRSV1: BANKMSGSRSV1;
  }
  export interface SIGNONMSGSRSV1 {
	SONRS: SONRS;
  }
  export interface SONRS {
	STATUS: STATUS;
	DTSERVER: _text;
	LANGUAGE: _text;
	FI: FI;
  }
  export interface STATUS {
	CODE: _text;
	SEVERITY: _text;
  }
  export interface _text {
	_text: string;
  }
  export interface FI {
	ORG: _text;
	FID: _text;
  }
  export interface BANKMSGSRSV1 {
	STMTTRNRS: STMTTRNRS;
  }
  export interface STMTTRNRS {
	TRNUID: _text;
	STATUS: STATUS;
	STMTRS: STMTRS;
  }
  export interface STMTRS {
	CURDEF: _text;
	BANKACCTFROM: BANKACCTFROM;
	BANKTRANLIST: BANKTRANLIST;
	LEDGERBAL: LEDGERBAL;
  }
  export interface BANKACCTFROM {
	BANKID: _text;
	ACCTID: _text;
	ACCTTYPE: _text;
  }
  export interface BANKTRANLIST {
	DTSTART: _text;
	DTEND: _text;
	STMTTRN: STMTTRN;
  }
  export interface STMTTRN {
	TRNTYPE: _text;
	DTPOSTED: _text;
	TRNAMT: _text;
	FITID: _text;
	REFNUM: REFNUM;
	MEMO: _text;
  }
  export interface REFNUM {
  }
  export interface LEDGERBAL {
	BALAMT: _text;
	DTASOF: _text;
  }
  