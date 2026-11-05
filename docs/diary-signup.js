// Progressive enhancement shared by the original site and the static Pages export.
(() => {
  const copy = {
    en: {
      title: 'Try Diary Companion on iOS',
      intro: 'Join the TestFlight waiting list. Leave your email and we’ll send an invitation when a beta build is ready.',
      name: 'Your name (optional)', email: 'Email for your TestFlight invitation',
      device: 'Your iPhone or iPad model (optional)', deviceHint: 'e.g. iPhone 16 Pro',
      message: 'Anything you’d like us to know? (optional)',
      submit: 'Join the iOS TestFlight waiting list',
      privacy: 'This signup sends your details through FormSubmit to the Diary Companion team for beta invitations and testing follow-up. Do not include journal entries. Your diary stays separate from this form.',
      contact: 'Questions? Contact qiang@hula.ai',
      link: 'Join the iOS beta',
    },
    zh: {
      title: '抢先体验 iOS 日记伙伴',
      intro: '加入 TestFlight 测试等候名单。留下邮箱，测试版本准备好后，我们会发送邀请。',
      name: '你的姓名（选填）', email: '接收 TestFlight 邀请的邮箱',
      device: '你的 iPhone 或 iPad 型号（选填）', deviceHint: '例如 iPhone 16 Pro',
      message: '还有什么想告诉我们？（选填）',
      submit: '报名 iOS TestFlight 测试',
      privacy: '报名信息将通过 FormSubmit 发送给日记伙伴团队，用于测试邀请及测试跟进。请勿填写日记内容；此报名表与设备上的日记相互独立。',
      contact: '有疑问？联系 qiang@hula.ai',
      link: '报名 iOS 测试',
    },
  };

  function enhance() {
    const closing = document.querySelector('.closing');
    if (!closing) return;
    const language = document.documentElement.lang.startsWith('zh') ? 'zh' : 'en';
    const t = copy[language];
    let section = document.getElementById('testflight');
    if (!section) {
      section = document.createElement('section');
      section.id = 'testflight';
      section.className = 'diary-signup';
      section.setAttribute('aria-labelledby', 'testflight-title');
      section.innerHTML = `
        <h2 id="testflight-title" data-copy="title"></h2>
        <p data-copy="intro"></p>
        <form action="https://formsubmit.co/7cb1f8977682e3aa144a50957f96405a" method="POST">
          <input type="hidden" name="_subject" value="New Diary Companion iOS TestFlight tester">
          <input type="hidden" name="_template" value="table">
          <input type="hidden" name="_captcha" value="false">
          <input type="hidden" name="product" value="Diary Companion — iOS TestFlight">
          <input type="hidden" name="language" value="">
          <input type="text" name="_honey" style="display:none" tabindex="-1" autocomplete="off" aria-hidden="true">
          <label for="diary-beta-name" data-copy="name"></label>
          <input id="diary-beta-name" name="name" type="text" autocomplete="name" maxlength="150">
          <label for="diary-beta-email" data-copy="email"></label>
          <input id="diary-beta-email" name="email" type="email" required autocomplete="email" inputmode="email" autocapitalize="off" spellcheck="false" placeholder="you@example.com" maxlength="254">
          <label for="diary-beta-device" data-copy="device"></label>
          <input id="diary-beta-device" name="device" type="text" maxlength="150">
          <label for="diary-beta-message" data-copy="message"></label>
          <textarea id="diary-beta-message" name="message" rows="3" maxlength="2000"></textarea>
          <p id="diary-beta-privacy" class="diary-signup-note" data-copy="privacy"></p>
          <button class="primary-button" type="submit" aria-describedby="diary-beta-privacy" data-copy="submit"></button>
        </form>
        <a class="diary-signup-contact" href="mailto:qiang@hula.ai?subject=Diary%20Companion%20TestFlight" data-copy="contact"></a>`;
      closing.append(section);
    }
    if (section.dataset.language !== language) {
      section.dataset.language = language;
      section.querySelectorAll('[data-copy]').forEach(node => { node.textContent = t[node.dataset.copy]; });
      section.querySelector('[name="language"]').value = language;
      section.querySelector('[name="device"]').placeholder = t.deviceHint;
    }
    const closingLink = closing.querySelector(':scope > a.primary-button');
    if (closingLink && closingLink.getAttribute('href') !== '#testflight') closingLink.setAttribute('href', '#testflight');
    if (closingLink && closingLink.textContent !== t.link) closingLink.textContent = t.link;
    const hero = document.querySelector('.hero-actions');
    if (hero && !hero.querySelector('.diary-signup-link')) {
      const link = document.createElement('a');
      link.className = 'diary-signup-link';
      link.href = '#testflight';
      hero.append(link);
    }
    const heroLink = document.querySelector('.diary-signup-link');
    if (heroLink && heroLink.textContent !== t.link) heroLink.textContent = t.link;
  }
  function start() {
    enhance();
    // React replaces the pre-rendered content and may switch languages after mount.
    new MutationObserver(enhance).observe(document.body, { childList: true, subtree: true });
    new MutationObserver(enhance).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
