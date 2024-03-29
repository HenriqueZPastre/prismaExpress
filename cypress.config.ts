import { defineConfig } from 'cypress'

export default defineConfig({
	reporter: 'mochawesome',
	reporterOptions: {
		reportDir: 'cypress/results',
		overwrite: false,
		html: false,
		json: true,
	},
	e2e: {
		baseUrl: 'https://prismaexpress.fly.dev',
		//chromeWebSecurity: false,
		excludeSpecPattern: [
			//'./cypress/e2e/mocks/**/*.ts',
			//'./cypress/e2e/mocks/*.ts',
			//'./cypress/e2e/things/*.ts',
			//'cypress/e2e/src/**',
			'cypress/e2e/modules/2.1_MDFE/**',
			'cypress/e2e/outros/**',
			//'cypress/e2e/src/cadastrosGerais/propriedades/**'
		],
	},
})
