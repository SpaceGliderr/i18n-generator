// Objective: To translate any locales that are not translated
import * as fs from 'fs';
import * as path from 'path';
import rc from 'rc';
import { parse } from 'json2csv';

const conf = rc('i18gen', {});

const { localePath } = conf;

const TEST_PATH = path.resolve(localePath, 'cn', 'screen.json');

if (fs.existsSync(TEST_PATH)) {
  const data = fs.readFileSync(TEST_PATH, 'utf8');
  console.log('🚀 ~ file: translate.ts ~ line 15 ~ data', typeof data);
  console.log(parse(JSON.parse(data), { fields: ['alertModal'] }));
}
