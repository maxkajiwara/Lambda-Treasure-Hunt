// Update with your config settings.
const dbConnection = process.env.DATABASE_URL;

module.exports = {
	development: {
		client: 'mssql',
		connection: '??????',
		useNullAsDefault: true,
		migrations: {
			directory: './migrations',
			tableName: 'migrations'
		},
		seeds: { directory: './seeds' }
	},

	production: {
		client: 'mssql',
		connection: dbConnection,
		pool: {
			min: 2,
			max: 10
		},
		migrations: {
			directory: './migrations',
			tableName: 'migrations'
		},
		seeds: { directory: './seeds' }
	}
};
