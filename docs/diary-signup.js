// Progressive enhancement shared by the original site and the static Pages export.
(() => {
  const copy = {
    en: {
      title: 'Try Diary Companion on your iPhone',
      intro: 'Join the TestFlight waiting list. Leave your email and we’ll send an invitation when a beta build is ready.',
      name: 'Your name (optional)', email: 'Email for your TestFlight invitation',
      requirements: 'This on-device beta requires an iPhone with at least 8 GB of memory (RAM). That memory is shared with the GPU; it is not your phone’s storage capacity. Tested on iPhone 16 Pro; performance on other eligible models is still being evaluated.',
      device: 'Your iPhone model (required)', deviceHint: 'Find it in Settings → General → About → Model Name.',
      chooseDevice: 'Select your iPhone model',
      unsupportedDevice: 'iPhone 15 / 15 Plus, or an older iPhone',
      unknownDevice: 'Another device / I’m not sure',
      eligible: 'This model is eligible for the beta waiting list.',
      unsupported: 'This model does not meet the 8 GB memory requirement and cannot join this on-device beta.',
      unknown: 'Please confirm your iPhone model before signing up. If it is not listed, contact qiang@hula.ai so we can check eligibility. This beta is for iPhone only.',
      message: 'Anything you’d like us to know? (optional)',
      submit: 'Join the iOS TestFlight waiting list',
      privacy: 'This signup sends your details through FormSubmit to the Diary Companion team for beta invitations and testing follow-up. Do not include journal entries. Your diary stays separate from this form.',
      contact: 'Questions? Contact qiang@hula.ai',
      link: 'Join the iPhone beta',
    },
    zh: {
      title: '在你的 iPhone 上体验日记伙伴',
      intro: '加入 TestFlight 测试等候名单。留下邮箱，测试版本准备好后，我们会发送邀请。',
      name: '你的姓名（选填）', email: '接收 TestFlight 邀请的邮箱',
      requirements: '本次设备端测试要求 iPhone 至少配备 8 GB 运行内存（RAM）。这部分内存与 GPU 共享，并非手机的存储容量。已在 iPhone 16 Pro 上测试；其他符合条件的机型仍在评估性能。',
      device: '你的 iPhone 型号（必选）', deviceHint: '可在「设置 → 通用 → 关于本机 → 机型名称」中查看。',
      chooseDevice: '请选择你的 iPhone 型号',
      unsupportedDevice: 'iPhone 15 / 15 Plus 或更早的 iPhone',
      unknownDevice: '其他设备 / 不确定型号',
      eligible: '此机型可以加入测试等候名单。',
      unsupported: '此机型不满足 8 GB 运行内存要求，暂时无法参加本次设备端测试。',
      unknown: '请确认 iPhone 型号后再报名。若列表中没有你的机型，请联系 qiang@hula.ai 核实是否符合条件。本次测试仅面向 iPhone。',
      message: '还有什么想告诉我们？（选填）',
      submit: '报名 iOS TestFlight 测试',
      privacy: '报名信息将通过 FormSubmit 发送给日记伙伴团队，用于测试邀请及测试跟进。请勿填写日记内容；此报名表与设备上的日记相互独立。',
      contact: '有疑问？联系 qiang@hula.ai',
      link: '报名 iPhone 测试',
    },
  };
  // Beta eligibility list; only iPhone 16 Pro has been measured in this project.
  const eligibleModels = [
    'iPhone 17 Pro Max', 'iPhone 17 Pro', 'iPhone Air', 'iPhone 17', 'iPhone 17e',
    'iPhone 16 Pro Max', 'iPhone 16 Pro', 'iPhone 16 Plus', 'iPhone 16', 'iPhone 16e',
    'iPhone 15 Pro Max', 'iPhone 15 Pro',
  ];

  function updateEligibility(section) {
    const t = copy[section.dataset.language || 'en'];
    const device = section.querySelector('[name="device"]');
    const eligible = eligibleModels.includes(device.value);
    const message = !device.value ? '' : eligible ? t.eligible : device.value === 'unsupported' ? t.unsupported : t.unknown;
    const status = section.querySelector('#diary-beta-eligibility');
    if (status.textContent !== message) status.textContent = message;
    const blocked = Boolean(device.value) && !eligible;
    device.setCustomValidity(blocked ? message : '');
    section.querySelector('button[type="submit"]').disabled = blocked;
  }

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
        <p class="diary-signup-requirements" data-copy="requirements"></p>
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
          <select id="diary-beta-device" name="device" required aria-describedby="diary-beta-device-hint diary-beta-eligibility">
            <option value="" data-copy="chooseDevice"></option>
            ${eligibleModels.map(model => `<option value="${model}">${model}</option>`).join('')}
            <option value="unsupported" data-copy="unsupportedDevice"></option>
            <option value="unknown" data-copy="unknownDevice"></option>
          </select>
          <small id="diary-beta-device-hint" data-copy="deviceHint"></small>
          <p id="diary-beta-eligibility" class="diary-signup-note" role="status" aria-live="polite"></p>
          <label for="diary-beta-message" data-copy="message"></label>
          <textarea id="diary-beta-message" name="message" rows="3" maxlength="2000"></textarea>
          <p id="diary-beta-privacy" class="diary-signup-note" data-copy="privacy"></p>
          <button class="primary-button" type="submit" aria-describedby="diary-beta-privacy" data-copy="submit"></button>
        </form>
        <a class="diary-signup-contact" href="mailto:qiang@hula.ai?subject=Diary%20Companion%20TestFlight" data-copy="contact"></a>`;
      closing.append(section);
      section.querySelector('[name="device"]').addEventListener('change', () => updateEligibility(section));
    }
    if (section.dataset.language !== language) {
      section.dataset.language = language;
      section.querySelectorAll('[data-copy]').forEach(node => { node.textContent = t[node.dataset.copy]; });
      section.querySelector('[name="language"]').value = language;
      updateEligibility(section);
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
