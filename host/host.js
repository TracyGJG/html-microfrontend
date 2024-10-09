import config from './bootstrap.json' with { type: "json" };

export default function setup() {
  document.querySelector('header h1').textContent = config.host.applicationName;
  if (config.host.logo) {
    document.querySelector('header img').src = config.host.logo;
    document.querySelector('link[rel="icon"]').href=config.host.logo;
    document.querySelector("footer").textContent = config.host.defaultPm;
  }
  else {
    document.querySelector('header').classList.add('no-logo');
  }

  document.querySelector('.appMenu').innerHTML = config.remotes.map(remote => `<div data-tgt="${remote.url}">${remote.name}</div>`).join('');
  document.querySelector('.appMenu').addEventListener('click', (evt) => {
    if (evt.target.tagName === 'DIV') {
      document.querySelector("iframe").src = evt.target.dataset.tgt;
      document.querySelector("h2").textContent = evt.target.textContent;
    }
  });
  return config;
}
