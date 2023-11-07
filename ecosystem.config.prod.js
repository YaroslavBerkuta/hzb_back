module.exports = {
	apps: [
		{
			name: 'api',
			script: './dist/main.js',
			node_args: '-r dotenv/config',
			watch: false,
			ignore_watch: ['hzb', 'node_modules', '.git', '.husky', 'nginx'],
		},
	],
}
