import { render } from 'react-dom';
import App from './App';
import { Octokit } from "@octokit/rest";

// function doNotify() {
//   Notification.requestPermission().then(function (result) {
//     const notification = new Notification('SaRcaSmOnIZEr', {
//       'body': 'Paste your text anywere, we put it on your clipboard',
//       'icon': 'whatever'
//     })
//   });
// }

const octokit = new Octokit();
octokit.rest.repos.getLatestRelease({
  owner: "RobinHeij89",
  repo: "sarcasmonizer",
}).then((result) => {
  console.log(result);
}, () => { });

render(<App />, document.getElementById('root'));
