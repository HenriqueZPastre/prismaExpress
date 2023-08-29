export interface OFX {
	[x: string]: any
	SIGNONMSGSRSV1: SIGNONMSGSRSV1
	BANKMSGSRSV1: BANKMSGSRSV1
}

export interface SIGNONMSGSRSV1 {
	SONRS: SONRS
}

export interface SONRS {
	STATUS: STATUS
	DTSERVER: string | Date
	LANGUAGE: string
	FI: FI
}

export interface FI {
	ORG: string
	FID: string
}

export interface STATUS {
	CODE: string
	SEVERITY: string
}

export interface BANKMSGSRSV1{
	STMTTRNRS: STMTTRNRS
}

export interface STMTTRNRS{
	TRNUID: string
	STATUS: STATUS
	STMTRS: STMTRS
}
export interface STMTRS{
	CURDEF: string
	BANKACCTFROM: BANKACCTFROM
	BANKTRANLIST: BANKTRANLIST
	LEDGERBAL: LEDGERBAL
}

export interface BANKACCTFROM{
	BANKID: string
	ACCTID: string
	ACCTTYPE: string
}

export interface BANKTRANLIST{
	DTSTART: string | Date
	DTEND: string | Date
	STMTTRN: STMTTRN[]
}
export interface STMTTRN{
	TRNTYPE: string
	DTPOSTED: string | Date
	TRNAMT: string
	FITID: string
	REFNUM: string
	MEMO: string
}

export interface LEDGERBAL{
	BALAMT: string
	DTASOF: string | Date
}