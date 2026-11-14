(() => {
  // Configure only a direct HLS URL whose broadcaster has authorized this site to embed it.
  // Directory listings, scraped URLs, and unofficial IPTV feeds are not authorization.
  const STREAM_URL = '';
  const HLS_JS = 'https://cdn.jsdelivr.net/npm/hls.js@1.5.18/dist/hls.min.js';
  const copy = {
    en: { waitingTitle:'Ready for an authorized stream', waitingBody:'The player is built, but a broadcaster-approved HLS address is needed before video can start.', restriction:'This custom player will play only a stream the broadcaster authorizes for embedding. We do not use scraped HLS links or unofficial IPTV lists.', channelLabel:'SOURCE STATUS', channelTitle:'Al Jazeera English', channelStatus:'Its official live page is available, but we do not have a broadcaster-approved direct HLS URL for this custom player.', officialLink:'Open Al Jazeera’s official live page ↗', howTitle:'What works', howBody:'Custom responsive player UI, play/pause, volume, fullscreen and native HLS or hls.js playback once an authorized stream is configured.', nextTitle:'What’s needed for live TV', nextBody:'The broadcaster must supply or approve a direct HLS stream URL for this website, including the countries and embed conditions. An official page or directory entry alone is not that permission.', footer:'Temporary player test, not the deleted directory site or a rebroadcast service.', waiting:'AWAITING SOURCE', live:'LIVE', loading:'Loading player…', failed:'The stream could not be played here. Try the broadcaster’s official page.', missing:'A broadcaster-authorized HLS source is not configured yet.' },
    fr: { waitingTitle:'Prêt pour un flux autorisé', waitingBody:'Le lecteur est prêt, mais il faut une adresse HLS autorisée par le diffuseur avant de lancer la vidéo.', restriction:'Ce lecteur ne lira qu’un flux que le diffuseur autorise pour l’intégration. Aucun lien HLS récupéré ni IPTV non officiel n’est utilisé.', channelLabel:'ÉTAT DE LA SOURCE', channelTitle:'Al Jazeera English', channelStatus:'Sa page officielle en direct est accessible, mais nous n’avons pas d’adresse HLS directe autorisée par le diffuseur pour ce lecteur.', officialLink:'Ouvrir la page officielle d’Al Jazeera ↗', howTitle:'Fonctions prêtes', howBody:'Interface responsive, lecture/pause, volume, plein écran, HLS natif ou hls.js dès qu’un flux autorisé est configuré.', nextTitle:'Pour lancer la TV en direct', nextBody:'Le diffuseur doit fournir ou autoriser l’URL directe HLS pour ce site, avec ses pays et conditions d’intégration. Une page officielle ou un annuaire ne constitue pas cette autorisation.', footer:'Test temporaire du lecteur, ni l’ancien annuaire supprimé ni un service de rediffusion.', waiting:'SOURCE EN ATTENTE', live:'DIRECT', loading:'Chargement du lecteur…', failed:'Le flux ne peut pas être lu ici. Essayez la page officielle du diffuseur.', missing:'Aucune source HLS autorisée par le diffuseur n’est encore configurée.' },
    ar: { waitingTitle:'واجد لبث مسموح به', waitingBody:'المشغّل واجد، ولكن خاصنا رابط HLS تسمح به القناة قبل ما يبدا الفيديو.', restriction:'هاد المشغّل غادي يشغّل غير رابط بث كتسمح به القناة للتضمين. ما كنستعملوش روابط HLS مسحوبة ولا قوائم IPTV غير رسمية.', channelLabel:'حالة المصدر', channelTitle:'الجزيرة الإنجليزية', channelStatus:'صفحتها الرسمية المباشرة موجودة، ولكن ما عندناش رابط HLS مباشر مرخّص لهاذ المشغّل.', officialLink:'فتح صفحة الجزيرة الرسمية المباشرة ↗', howTitle:'شنو واجد يخدم', howBody:'واجهة متجاوبة، تشغيل وإيقاف، الصوت وملء الشاشة، ودعم HLS الأصلي أو hls.js ملي يتوفر رابط مرخّص.', nextTitle:'شنو خاص باش تخدم القناة', nextBody:'خاص القناة تعطينا أو ترخّص رابط HLS مباشر لهاد الموقع، مع تحديد البلدان وشروط التضمين. صفحة رسمية أو دليل روابط ما كيعنيش هاد الإذن.', footer:'اختبار مؤقت للمشغّل؛ ماشي الدليل القديم المحذوف ولا خدمة لإعادة البث.', waiting:'كنستناو المصدر', live:'مباشر', loading:'كنحمّلو المشغّل…', failed:'ما قدرناش نشغلو البث هنا. جرّب الصفحة الرسمية ديال القناة.', missing:'ما زال ما تركب حتى مصدر HLS مرخّص من القناة.' }
  };
  const lang = document.documentElement.lang || 'en';
  const t = copy[lang] || copy.en;
  document.querySelectorAll('[data-i18n]').forEach(el => { if (t[el.dataset.i18n]) el.textContent = t[el.dataset.i18n]; });
  const video = document.querySelector('#video');
  const shell = document.querySelector('#player-shell');
  const empty = document.querySelector('#empty-state');
  const error = document.querySelector('#error-state');
  const liveState = document.querySelector('#live-state');
  const play = document.querySelector('#play-toggle');
  const mute = document.querySelector('#mute-toggle');
  const volume = document.querySelector('#volume');
  const seek = document.querySelector('#seek');
  const time = document.querySelector('#time-display');
  let hls = null;
  let dragging = false;

  const showError = message => { error.textContent = message; error.hidden = false; liveState.textContent = t.waiting; };
  const loadHlsLibrary = () => new Promise((resolve, reject) => {
    if (window.Hls) return resolve(window.Hls);
    const script = document.createElement('script');
    script.src = HLS_JS; script.async = true;
    script.onload = () => window.Hls ? resolve(window.Hls) : reject(new Error('HLS library did not load'));
    script.onerror = () => reject(new Error('HLS library could not load'));
    document.head.appendChild(script);
  });
  const format = seconds => {
    if (!Number.isFinite(seconds) || seconds < 0) return 'LIVE';
    const n = Math.floor(seconds), h = Math.floor(n / 3600), m = Math.floor(n % 3600 / 60), s = n % 60;
    return h ? `${h}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}` : `${m}:${String(s).padStart(2,'0')}`;
  };
  const updateTimeline = () => {
    if (dragging) return;
    const ranges = video.seekable;
    if (ranges.length && Number.isFinite(ranges.end(ranges.length - 1))) {
      const start = ranges.start(0), end = ranges.end(ranges.length - 1);
      seek.disabled = false;
      seek.value = end > start ? Math.round((video.currentTime - start) / (end - start) * 1000) : 1000;
      time.textContent = video.paused ? format(video.currentTime - start) : t.live;
    } else {
      seek.disabled = true; time.textContent = video.paused ? '—' : t.live;
    }
  };
  const start = async () => {
    if (!STREAM_URL) { showError(t.missing); return; }
    if (!/^https:\/\//i.test(STREAM_URL) || !/\.m3u8(?:$|[?#])/i.test(STREAM_URL)) { showError(t.failed); return; }
    play.disabled = true; liveState.textContent = t.loading; error.hidden = true;
    try {
      if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = STREAM_URL;
      } else {
        const Hls = await loadHlsLibrary();
        if (!Hls.isSupported()) throw new Error('HLS not supported');
        hls = new Hls({ enableWorker: true, lowLatencyMode: true });
        hls.loadSource(STREAM_URL); hls.attachMedia(video);
        hls.on(Hls.Events.ERROR, (_event, data) => { if (data.fatal) showError(t.failed); });
      }
      empty.hidden = true;
      await video.play();
      liveState.textContent = t.live;
    } catch (_e) {
      play.disabled = false; showError(t.failed);
    }
  };
  if (STREAM_URL) { play.disabled = false; empty.querySelector('p').textContent = ''; }
  play.addEventListener('click', () => video.paused ? start() : video.pause());
  video.addEventListener('play', () => { play.textContent = 'Ⅱ'; play.setAttribute('aria-label', 'Pause'); liveState.textContent = t.live; });
  video.addEventListener('pause', () => { play.textContent = '▶'; play.setAttribute('aria-label', 'Play'); updateTimeline(); });
  video.addEventListener('playing', () => { empty.hidden = true; error.hidden = true; liveState.textContent = t.live; });
  video.addEventListener('waiting', () => { liveState.textContent = t.loading; });
  video.addEventListener('canplay', () => { play.disabled = false; liveState.textContent = t.live; });
  video.addEventListener('timeupdate', updateTimeline);
  video.addEventListener('progress', updateTimeline);
  mute.addEventListener('click', () => { video.muted = !video.muted; mute.textContent = video.muted ? '×' : '◖'; mute.setAttribute('aria-label', video.muted ? 'Unmute' : 'Mute'); });
  volume.addEventListener('input', () => { video.volume = Number(volume.value); video.muted = video.volume === 0; });
  seek.addEventListener('input', () => { dragging = true; });
  seek.addEventListener('change', () => {
    const ranges = video.seekable;
    if (ranges.length) { const start = ranges.start(0), end = ranges.end(ranges.length - 1); video.currentTime = start + (end - start) * Number(seek.value) / 1000; }
    dragging = false; updateTimeline();
  });
  document.querySelector('#fullscreen').addEventListener('click', () => {
    const target = shell;
    if (document.fullscreenElement) document.exitFullscreen?.();
    else target.requestFullscreen?.();
  });
})();
