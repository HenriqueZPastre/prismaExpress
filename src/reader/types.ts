export interface OFX {
	SIGNONMSGSRSV1: [SIGNONMSGSRSV1]
	BANKMSGSRSV1: BANKMSGSRSV1[]
}

export interface SIGNONMSGSRSV1 {
	SONRS: SONRS[]
}

export interface SONRS {
	STATUS: STATUS[]
	DTSERVER: string[] | Date[]
	LANGUAGE: string[]
	FI: FI[]
}

export interface FI {
	ORG: string[]
	FID: string[]
}

export interface STATUS {
	CODE: string[]
	SEVERITY: string[]
}

export interface BANKMSGSRSV1 {
	STMTTRNRS: STMTTRNRS[]
}

export interface STMTTRNRS {
	TRNUID: string[]
	STATUS: STATUS[]
	STMTRS: STMTRS[]
}
export interface STMTRS {
	CURDEF: string[]
	BANKACCTFROM: BANKACCTFROM[]
	BANKTRANLIST: BANKTRANLIST[]
	LEDGERBAL: LEDGERBAL[]
}

export interface BANKACCTFROM {
	BANKID: string[]
	ACCTID: string[]
	ACCTTYPE: string[]
}

export interface BANKTRANLIST {
	DTSTART: string[]
	DTEND: string[]
	STMTTRN: STMTTRN[]
}
export interface STMTTRN {
	TRNTYPE: string[]
	DTPOSTED: any
	TRNAMT: string[]
	FITID: string[]
	REFNUM: string[]
	MEMO: string[]
}

export interface STMTTRNObject {
	TRNTYPE: string
	DTPOSTED: string | Date | undefined
	TRNAMT: string
	FITID: string
	REFNUM: string
	MEMO: string
}

export interface TRANSACOES {
	TRNTYPE: string
	DTPOSTED: string | Date
	TRNAMT: string
	FITID: string
	REFNUM: string
	MEMO: string
}

export interface LEDGERBAL {
	BALAMT: string[]
	DTASOF: string[] | Date[]
}

export interface DADOS_GERAIS {
	idBanco: string
	nomeBanco: string
	numeroConta: string
	dataInicial: string | undefined
	dataFinal: string | undefined
}