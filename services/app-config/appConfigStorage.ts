import { type Config } from './appConfig';

const modeName = 'app-mode';
const localeName = 'app-locale';

function getMode(): Config['mode'] {
 return (localStorage.getItem(modeName) as Config['mode']) || 'light';
}

function setMode(newMode: Config['mode']): void {
 localStorage.setItem(modeName, newMode);
}

function getLocale(): Config['locale'] {
 return (localStorage.getItem(localeName) as Config['locale']) || 'fa';
}

function setLocale(newLocale: Config['locale']): void {
 localStorage.setItem(localeName, newLocale);
}

export { getMode, setMode, getLocale, setLocale };
