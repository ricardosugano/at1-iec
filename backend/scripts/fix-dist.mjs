// Marca a pasta dist como CommonJS, já que o tsconfig compila com "module": "commonjs"
import { writeFileSync } from 'node:fs';

writeFileSync('dist/package.json', JSON.stringify({ type: 'commonjs' }));