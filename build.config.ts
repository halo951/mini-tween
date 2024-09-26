import * as np from 'node:path'

import { defineBuildConfig } from 'unbuild'
import { sync as glob } from 'fast-glob'

const easing = glob(['src/easing/**/*.ts']).map((input: string) => {
    return { name: 'easing/' + np.basename(input, '.ts'), input: input.replace(/\.ts$/, '') }
})

const interpolation = glob(['src/interpolation/**/*.ts']).map((input: string) => {
    return { name: 'interpolation/' + np.basename(input, '.ts'), input: input.replace(/\.ts$/, '') }
})

export default defineBuildConfig({
    entries: [
        { name: 'index', input: 'src/index' },
        { name: 'mini', input: 'src/tween-mini' },
        ...easing,
        ...interpolation
    ],
    clean: true,
    declaration: true,
    rollup: {
        emitCJS: true,
        esbuild: { minify: true }
    }
})
