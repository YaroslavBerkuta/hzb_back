module.exports = {
	apps: [
		{
			name: 'api',
			script: './dist/main.js',
			node_args: '-r dotenv/config',
			env_file: '.env',
			watch: false,
			ignore_watch: ['hzb', 'node_modules', '.git', '.husky', 'nginx'],
			env_production: {
				NODE_ENV: 'production',
			}
		},
	],
}
