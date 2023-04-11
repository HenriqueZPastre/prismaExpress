export const ErrorGenerico = (mensagem: string) => {
	const erro = new Error(mensagem)
	return erro.message
}