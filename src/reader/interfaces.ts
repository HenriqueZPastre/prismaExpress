
export interface Transacao {
	tipoDeTransacao: TransactionType | null
	dataDeTransacao: string | null
	valor: number | null
	fitid: string | null
	refnum: string | null
	memo: string | null
	tipoOperacao: 0 | 1  // 0 = credito, 1 = debito
}

export interface DadosDoBanco {
	id: string | null
	nome: string | null
	numeroConta: string | null
	dataInicial: string | null
	dataFinal: string | null
	tipoDaContaBancaria: ACCTTYPE | null
	moedaCorrente: string | null
	balanco: number | null
}

export enum TransactionType {
	CREDIT = 'CREDIT',//'Credito generico',
	DEBIT = 'DEBIT', //'Debito generico',
	INT = 'INT',//'Juros ganhos ou pagos',
	DIV = 'DIV',//'Dividendo',
	FEE = 'FEE',//'Taxa da instituição financeira',
	SRVCHG = 'SRVCHG', //'Taxa de serviço',
	DEP = 'DEP',//'Deposito',
	ATM = 'ATM',//'Debito ou credito em caixa automatico (ATM)',
	POS = 'POS',//'Debito ou credito em ponto de venda',
	XFER = 'XFER',//'Transferencia',
	CHECK = 'CHECK',//'Cheque',
	PAYMENT = 'PAYMENT',//'Pagamento eletronico',
	CASH = 'CASH', //'Retirada em dinheiro',
	DIRECTDEP = 'DIRECTDEP', //'Deposito direto',
	DIRECTDEBIT = 'DIRECTDEBIT',//'Debito iniciado pelo comerciante',
	REPEATPMT = 'REPEATPMT',//'Pagamento repetido/ordem permanente',
	HOLD = 'HOLD',//'Apenas valido em <STMTTRNP> indica que o valor esta sob retencao',
	OTHER = 'OTHER' //'Outro',
}

export enum ACCTTYPE {
	CHECKING = 'CHECKING',// "Conta Corrente",
	SAVINGS = 'SAVINGS',//"Poupança",
	MONEYMRKT = 'MONEYMRKT',//"Mercado Monetário",
	CREDITLINE = 'CREDITLINE',// "Linha de Crédito",
	CD = 'CD',//"Certificado de Depósito",
}