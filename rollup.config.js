import typescript from '@rollup/plugin-typescript'
import clear from 'rollup-plugin-clear'

export default [
    {
        input: 'src/index.ts',
        output: [
            {
                file: 'dist/index.js',
                format: 'es',
            },
        ],
        plugins: [
            typescript({ declaration: true }),
            clear({ targets: ['dist'] }),
        ],
    },
    {
        input: 'src/index.ts',
        output: [
            {
                file: 'dist/index.cjs',
                format: 'cjs',
            },
        ],
        plugins: [
            typescript({ declaration: false }),
            clear({ targets: ['dist'] }),
        ],
    },
]
