import typescript from '@rollup/plugin-typescript'
import clear from 'rollup-plugin-clear'

export default [
    {
        input: 'src/index.ts',
        output: [
            {
                file: 'dist/index.mjs',
                format: 'es',
                compact: true,
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
                file: 'dist/index.js',
                format: 'cjs',
                compact: true,
            },
        ],
        plugins: [typescript({ declaration: false })],
    },
]
