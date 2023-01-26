import { render } from 'react-dom';
import App from './App';
import { Octokit } from "@octokit/rest";

var ipcRenderer = require('electron').ipcRenderer;
let appVersion: string;
// Async message handler
ipcRenderer.on('asynchronous-reply', (event, arg) => {
  console.log('asynchronous-reply index', arg)
  appVersion = arg
})

// Async message sender
ipcRenderer.send('asynchronous-message')

const makeVersion = (version: string): number[] => {
  return version?.split('.').map(a => parseInt(a.replace(/\D/g, ''), 10));
}

const octokit = new Octokit();
octokit.rest.repos.getLatestRelease({
  owner: "RobinHeij89",
  repo: "sarcasmonizer",
}).then((result) => {
  const version: string = result.data.name ?? '0.0.0'
  console.log(makeVersion(version))
  console.log(makeVersion(appVersion))
}, () => { });

render(<App />, document.getElementById('root'));
