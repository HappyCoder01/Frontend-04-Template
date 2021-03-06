var Generator = require('yeoman-generator');

module.exports = class extends Generator {
    // The name `constructor` is important here
    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);
    }

    async initPackage() {
        const answers = await this.prompt([
            {
                type: "input",
                name: "name",
                message: "Your project name",
                default: this.appname // Default to current folder name
            }
        ]);
        const pkgJson = {
            "name": answers.name,
            "version": "1.0.0",
            "description": "",
            "scripts": {
                "test": "echo \"Error: no test specified\" && exit 1",
                "webpack": "webpack"
            },
            "keywords": [],
            "author": "",
            "license": "ISC",
            "devDependencies": {},
            "dependencies": {}
        };

        // Extend or create package.json file in destination path
        this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
        this.npmInstall(['vue'], {'save': true});
        this.npmInstall([
                'webpack', 'webpack-cli', 'copy-webpack-plugin',
                'vue-loader', 'vue-template-compiler',
                'vue-style-loader', 'css-loader'
            ],
            {'save-dev': true});

        this.fs.copyTpl(
            this.templatePath('HelloWorld.vue'),
            this.destinationPath('./src/HelloWorld.vue'),
            {}
        );
        this.fs.copyTpl(
            this.templatePath('webpack.config.js'),
            this.destinationPath('webpack.config.js'),
            {}
        );
        this.fs.copyTpl(
            this.templatePath('main.js'),
            this.destinationPath('./src/main.js')
        );
        this.fs.copyTpl(
            this.templatePath('index.html'),
            this.destinationPath('./src/index.html'),
            {title: answers.name}
        );
    }
};