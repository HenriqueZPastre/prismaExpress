import axios, { AxiosError } from "axios";



//const x = axios.get("https://api-beta-staging.agronota.com.br/financeiro/contas/2313")

/* const x = axios.get('https://api-beta-staging.agronota.com.br/financeiro/contas/2313')
	.then((response) => { })
	.catch((error) => {
		if (error instanceof AxiosError) {
			console.log(error.message);
		}
	}) */

const t = axios.post('https://api-beta-staging.agronota.com.br/auth/login', {
		"email": "rabbit@uorak.com",
		"password": "a123456"
	}
).then((response) => { console.log(response.data) }).catch((error) => {
	if (error instanceof AxiosError) {
		console.log(error)
	}
})