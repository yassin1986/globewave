(() => {
  const translations = {
    en: {load:'Load official live player',loading:'Loading the official player…',notice:'The stream is hosted by YouTube and remains subject to its availability, regional restrictions, and the broadcaster’s embed settings.',watch:'Open on Al Jazeera',currently:'LIVE CHANNEL',about:'Only an official player is embedded. No copied stream URLs or third-party IPTV feeds.',future:'More channels can be added only when their broadcasters provide an embeddable official player or written streaming permission.',consent:'Load player',consentNote:'This contacts YouTube. The player is loaded only after you choose to watch.',title:'Al Jazeera English',lang:'ENGLISH · GLOBAL NEWS',brand:'WORLDWIDE LIVE',caption:'Official live broadcast · Al Jazeera English'},
    fr: {load:'Charger le lecteur officiel',loading:'Chargement du lecteur officiel…',notice:'Le flux est hébergé par YouTube et dépend de sa disponibilité, des restrictions régionales et des paramètres d’intégration du diffuseur.',watch:'Ouvrir sur Al Jazeera',currently:'CHAÎNE EN DIRECT',about:'Seul un lecteur officiel est intégré. Aucun flux copié ni flux IPTV tiers.',future:'D’autres chaînes seront ajoutées uniquement si leur diffuseur fournit un lecteur officiel intégrable ou une autorisation écrite de diffusion.',consent:'Charger le lecteur',consentNote:'Cela contacte YouTube. Le lecteur ne se charge qu’après votre choix.',title:'Al Jazeera English',lang:'ANGLAIS · ACTUALITÉ MONDIALE',brand:'DIRECT MONDIAL',caption:'Diffusion officielle en direct · Al Jazeera English'},
    ar: {load:'شغّل المشغّل الرسمي',loading:'كنحمّلو المشغّل الرسمي…',notice:'البث مستضاف عند YouTube، والتشغيل تابع للتوفر والقيود الجغرافية وإعدادات التضمين ديال القناة.',watch:'فتح موقع الجزيرة',currently:'قناة مباشرة',about:'هنا غير مشغّل رسمي؛ ما كاين لا رابط بث منسوخ لا IPTV من طرف ثالث.',future:'نزيدو قنوات أخرى غير إلا وفّرات القناة مشغّلاً رسمياً قابل للتضمين أو ترخيصاً مكتوباً للبث.',consent:'حمّل المشغّل',consentNote:'هاد الخطوة كتتاصل بـYouTube؛ المشغّل ما كيتحمّلش حتى تختار تشوف.',title:'الجزيرة الإنجليزية',lang:'الإنجليزية · أخبار العالم',brand:'بث عالمي مباشر',caption:'بث رسمي مباشر · الجزيرة الإنجليزية'}
  };
  const lang = document.documentElement.lang || 'en';
  const t = translations[lang] || translations.en;
  document.querySelectorAll('[data-i18n]').forEach(el => { const value=t[el.dataset.i18n]; if(value) el.textContent=value; });
  const button=document.querySelector('#load-player');
  const frameBox=document.querySelector('#player-frame');
  button?.addEventListener('click', () => {
    if(frameBox.dataset.loaded==='true') return;
    button.disabled=true; button.textContent=t.loading;
    const frame=document.createElement('iframe');
    frame.title='Al Jazeera English official live stream on YouTube';
    frame.src='https://www.youtube-nocookie.com/embed/gCNeDWCI0vo?autoplay=0&rel=0&playsinline=1';
    frame.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    frame.allowFullscreen=true;
    frame.referrerPolicy='strict-origin-when-cross-origin';
    frameBox.replaceChildren(frame);
    frameBox.dataset.loaded='true';
    button.hidden=true;
    document.querySelector('#player-consent')?.remove();
  });
})();
