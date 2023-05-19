export class ErrorGenerico extends Error {
	static main(mensagem: string): string {
		const erro = new Error(mensagem)
		return erro.message
	}
}