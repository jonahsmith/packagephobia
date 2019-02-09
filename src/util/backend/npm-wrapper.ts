const npm = require('npm');

export function npmInstall(where: string, name: string, version: string) {
    return new Promise((resolve, reject) => {
        npm.load((err?: Error) => {
            if (err) {
                reject(err);
                return;
            }
            npm.config.set('audit', false);
            npm.config.set('package-lock', false);
            npm.config.set('progress', false);
            npm.config.set('silent', true);
            if (process.env.NPM_REGISTRY_URL) {
                npm.config.set('registry', process.env.NPM_REGISTRY_URL);
            }
            const args = [`${name}@${version}`];
            npm.commands.install(where, args, (err?: Error) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            });
        });
    });
}
