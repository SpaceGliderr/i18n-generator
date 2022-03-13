/* eslint-disable global-require */
import * as fs from 'fs';
import * as path from 'path';
import rc from 'rc';

const conf = rc('i18gen', {});

const { localePath, defaultFiles } = conf;

// TODO: Change this variable into a command arg to specify language - use inquirer
// TODO: Check whether the language is supported
const languages = ['cn', 'en', 'bm'];

languages.forEach(lang => {
  const dirName = lang.toLowerCase();
  if (!fs.existsSync(path.resolve(localePath, dirName))) {
    fs.mkdirSync(path.resolve(localePath, dirName));
  }
});

defaultFiles.forEach(defaultFile => {
  const data = fs.readFileSync(path.resolve(defaultFile), 'utf8');

  // Skip file if default file is empty
  if (data === '') return;

  const defaultFileName = path.basename(defaultFile);

  fs.readdirSync(path.resolve(localePath)).forEach(locale => {
    if (languages.includes(locale)) {
      // TODO: Translate feature before writing into files

      const localeFilePath = path.resolve(localePath, locale, defaultFileName);

      if (!fs.existsSync(localeFilePath)) {
        fs.writeFileSync(localeFilePath, data, 'utf8');
        return;
      }

      if (fs.readFileSync(localeFilePath, 'utf8') === '') return;
      fs.writeFileSync(localeFilePath, data, 'utf8');
    }
  });
});
