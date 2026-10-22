import { existsSync, readdirSync, readFileSync } from 'fs';
import { join } from 'path';

const srcDir = join(__dirname, '../../src');
const blockRe = /\/\*\*[\s\S]*?\*\//g;
const operationRe = /@see \S*[#/]operation\/([\w.-]+)/;
const tagRe = /^\s*\* @requiredScope\b(.*)$/gm;
const valueRe = /^([a-z][a-z0-9.-]*:(read|write)|none)$/;

describe('@requiredScope', () => {
    it('Every JSDoc block with an operation link carries exactly one tag with a valid value', () => {
        const problems: string[] = [];
        const files = readdirSync(srcDir)
            .map((name) => join(srcDir, name, 'index.ts'))
            .filter((file) => existsSync(file));
        for (const file of files) {
            const source = readFileSync(file, 'utf8');
            for (const block of source.matchAll(blockRe)) {
                const operationId = block[0].match(operationRe)?.[1];
                if (!operationId) {
                    continue;
                }
                const values = [...block[0].matchAll(tagRe)].map((tag) => tag[1].trim());
                if (values.length !== 1 || !valueRe.test(values[0])) {
                    const line = source.slice(0, block.index).split('\n').length;
                    problems.push(`${file}:${line} ${operationId} -> ${JSON.stringify(values)}`);
                }
            }
        }
        expect(problems).toEqual([]);
    });
});
