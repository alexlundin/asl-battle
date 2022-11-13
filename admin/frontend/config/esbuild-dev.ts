import ESBuild from 'esbuild';
import config from './esbuild-config';


ESBuild.build({
    ...config,
    watch: {
        onRebuild(err) {
            if(err) {
                console.log(err)
            } else {
                console.log('build...')
            }
        }
    }
}).then((result) => {
    console.log(result)
}).catch(err => {
    console.log(err);
})
