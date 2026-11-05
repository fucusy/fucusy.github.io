// Progressive enhancement shared by the original site and the static Pages export.
(() => {
  const copy = {
    en: {
      title: 'Try Diary Companion on your iPhone',
      intro: 'Join the TestFlight waiting list. Fill in your details and send them directly to the Diary Companion team.',
      name: 'Your name (optional)', email: 'Email for your TestFlight invitation',
      requirements: 'This on-device beta requires an iPhone with at least 8 GB of memory (RAM). That memory is shared with the GPU; it is not your phone’s storage capacity. Tested on iPhone 16 Pro; performance on other eligible models is still being evaluated.',
      device: 'Your iPhone model (required)', deviceHint: 'Find it in Settings → General → About → Model Name.',
      chooseDevice: 'Select your iPhone model',
      newerDevice: 'Newer iPhone (18 series, Duo, or another model)',
      newerModel: 'Exact iPhone model (required)',
      newerHint: 'Enter the Model Name shown in Settings → General → About.',
      newer: 'You can join the waiting list. We’ll check that your model meets the 8 GB RAM requirement before sending a beta invitation; compatibility is not yet confirmed.',
      unsupportedDevice: 'iPhone 15 / 15 Plus, or an older iPhone',
      unknownDevice: 'Another device / I’m not sure',
      eligible: 'This model is eligible for the beta waiting list.',
      unsupported: 'This model does not meet the 8 GB memory requirement and cannot join this on-device beta.',
      unknown: 'Please confirm your iPhone model before signing up. If it is not listed, contact qiang@hula.ai so we can check eligibility. This beta is for iPhone only.',
      message: 'Anything you’d like us to know? (optional)',
      submit: 'Send signup', sending: 'Sending…', sent: 'Your signup was sent. Thank you!',
      failed: 'We could not send your signup. Please try again or use the email draft below.',
      privacy: 'Your signup details are sent to the hula.ai server and emailed to qiang@hula.ai for beta invitations and follow-up. Please do not include journal entries.',
      emailReady: 'Your signup has not been sent. Copy the draft below and email it to qiang@hula.ai, or try again.',
      draftLabel: 'Signup email — select and copy if needed',
      subject: 'Diary Companion iPhone TestFlight signup',
      emailIntro: 'Please add me to the Diary Companion iPhone TestFlight waiting list.',
      emailName: 'Name', emailAddress: 'Invitation email', emailDevice: 'iPhone model', emailMessage: 'Comments',
      contact: 'Questions? Contact qiang@hula.ai',
      link: 'Join the iPhone beta',
    },
    zh: {
      title: '在你的 iPhone 上体验日记伙伴',
      intro: '加入 TestFlight 测试等候名单。填写信息后，直接发送给日记伙伴团队。',
      name: '你的姓名（选填）', email: '接收 TestFlight 邀请的邮箱',
      requirements: '本次设备端测试要求 iPhone 至少配备 8 GB 运行内存（RAM）。这部分内存与 GPU 共享，并非手机的存储容量。已在 iPhone 16 Pro 上测试；其他符合条件的机型仍在评估性能。',
      device: '你的 iPhone 型号（必选）', deviceHint: '可在「设置 → 通用 → 关于本机 → 机型名称」中查看。',
      chooseDevice: '请选择你的 iPhone 型号',
      newerDevice: '更新的 iPhone（18 系列、Duo 或其他新机型）',
      newerModel: '具体 iPhone 型号（必填）',
      newerHint: '请填写「设置 → 通用 → 关于本机」中显示的机型名称。',
      newer: '你可以加入等候名单。发送测试邀请前，我们会确认此机型是否满足 8 GB 运行内存要求；目前尚未确认兼容性。',
      unsupportedDevice: 'iPhone 15 / 15 Plus 或更早的 iPhone',
      unknownDevice: '其他设备 / 不确定型号',
      eligible: '此机型可以加入测试等候名单。',
      unsupported: '此机型不满足 8 GB 运行内存要求，暂时无法参加本次设备端测试。',
      unknown: '请确认 iPhone 型号后再报名。若列表中没有你的机型，请联系 qiang@hula.ai 核实是否符合条件。本次测试仅面向 iPhone。',
      message: '还有什么想告诉我们？（选填）',
      submit: '发送报名信息', sending: '正在发送…', sent: '报名信息已发送，谢谢！',
      failed: '发送失败，请重试，或使用下方的邮件草稿。',
      privacy: '报名信息将发送至 hula.ai 服务器，再通过邮件发送给 qiang@hula.ai，用于测试邀请及后续联系。请勿填写日记内容。',
      emailReady: '报名信息尚未发送。请重试，或复制下方草稿并通过邮件发送至 qiang@hula.ai。',
      draftLabel: '报名邮件（可选中并复制）',
      subject: '日记伙伴 iPhone TestFlight 测试报名',
      emailIntro: '请将我加入日记伙伴 iPhone TestFlight 测试等候名单。',
      emailName: '姓名', emailAddress: '接收邀请的邮箱', emailDevice: 'iPhone 型号', emailMessage: '备注',
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

  function composeSignupEmail(form, language) {
    const t = copy[language];
    const data = new FormData(form);
    const value = name => String(data.get(name) || '').trim();
    const model = value('device') === 'newer' ? value('device_model') : value('device');
    const body = [t.emailIntro, '', `${t.emailName}: ${value('name')}`, `${t.emailAddress}: ${value('email')}`,
      `${t.emailDevice}: ${model}`, '', `${t.emailMessage}:`, value('message')].join('\r\n');
    return {
      href: `mailto:qiang@hula.ai?subject=${encodeURIComponent(t.subject)}&body=${encodeURIComponent(body)}`,
      draft: `To: qiang@hula.ai\r\nSubject: ${t.subject}\r\n\r\n${body}`,
    };
  }

  function updateEligibility(section) {
    const t = copy[section.dataset.language || 'en'];
    const device = section.querySelector('[name="device"]');
    const eligible = eligibleModels.includes(device.value);
    const newer = device.value === 'newer';
    const model = section.querySelector('[name="device_model"]');
    section.querySelector('.diary-newer-model').hidden = !newer;
    model.disabled = !newer;
    model.required = newer;
    const message = !device.value ? '' : newer ? t.newer : eligible ? t.eligible : device.value === 'unsupported' ? t.unsupported : t.unknown;
    const status = section.querySelector('#diary-beta-eligibility');
    if (status.textContent !== message) status.textContent = message;
    const blocked = Boolean(device.value) && !eligible && !newer;
    device.setCustomValidity(blocked ? message : '');
    section.querySelector('button[type="submit"]').disabled = blocked || section.dataset.sending === 'true';
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
        <form>
          <label for="diary-beta-name" data-copy="name"></label>
          <input id="diary-beta-name" name="name" type="text" autocomplete="name" maxlength="150">
          <label for="diary-beta-email" data-copy="email"></label>
          <input id="diary-beta-email" name="email" type="email" required autocomplete="email" inputmode="email" autocapitalize="off" spellcheck="false" placeholder="you@example.com" maxlength="254">
          <label for="diary-beta-device" data-copy="device"></label>
          <select id="diary-beta-device" name="device" required aria-describedby="diary-beta-device-hint diary-beta-eligibility">
            <option value="" data-copy="chooseDevice"></option>
            <option value="newer" data-copy="newerDevice"></option>
            ${eligibleModels.map(model => `<option value="${model}">${model}</option>`).join('')}
            <option value="unsupported" data-copy="unsupportedDevice"></option>
            <option value="unknown" data-copy="unknownDevice"></option>
          </select>
          <small id="diary-beta-device-hint" data-copy="deviceHint"></small>
          <div class="diary-newer-model" hidden>
            <label for="diary-beta-newer-model" data-copy="newerModel"></label>
            <input id="diary-beta-newer-model" name="device_model" type="text" maxlength="150" pattern=".*\\S.*" disabled aria-describedby="diary-beta-newer-hint">
            <small id="diary-beta-newer-hint" data-copy="newerHint"></small>
          </div>
          <p id="diary-beta-eligibility" class="diary-signup-note" role="status" aria-live="polite"></p>
          <label for="diary-beta-message" data-copy="message"></label>
          <textarea id="diary-beta-message" name="message" rows="3" maxlength="2000"></textarea>
          <p id="diary-beta-privacy" class="diary-signup-note" data-copy="privacy"></p>
          <button class="primary-button" type="submit" aria-describedby="diary-beta-privacy" data-copy="submit"></button>
          <p id="diary-submit-status" role="status" aria-live="polite"></p>
        </form>
        <div class="diary-email-fallback" hidden>
          <p role="status" data-copy="emailReady"></p>
          <label for="diary-email-draft" data-copy="draftLabel"></label>
          <textarea id="diary-email-draft" rows="9" readonly></textarea>
        </div>
        <a class="diary-signup-contact" href="mailto:qiang@hula.ai?subject=Diary%20Companion%20TestFlight" data-copy="contact"></a>`;
      closing.append(section);
      section.querySelector('[name="device"]').addEventListener('change', () => updateEligibility(section));
      section.querySelector('form').addEventListener('submit', async event => {
        event.preventDefault();
        updateEligibility(section);
        if (!event.currentTarget.reportValidity()) return;
        const form = event.currentTarget;
        const lang = section.dataset.language;
        const t = copy[lang];
        const data = new FormData(form);
        const device = data.get('device') === 'newer' ? data.get('device_model') : data.get('device');
        const button = form.querySelector('button[type="submit"]');
        const status = section.querySelector('#diary-submit-status');
        section.dataset.sending = 'true';
        button.disabled = true;
        status.textContent = t.sending;
        try {
          const response = await fetch('https://www.hula.ai/diary/testflight-signup', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: data.get('name'), email: data.get('email'), device, message: data.get('message'), language: lang }),
            signal: AbortSignal.timeout(45000),
          });
          const result = await response.json();
          if (!response.ok || !result.ok) throw new Error('Signup failed');
          status.textContent = t.sent;
          form.reset();
          section.querySelector('.diary-email-fallback').hidden = true;
        } catch (_) {
          status.textContent = t.failed;
          const email = composeSignupEmail(form, lang);
          section.querySelector('#diary-email-draft').value = email.draft;
          section.querySelector('.diary-email-fallback').hidden = false;
        } finally {
          section.dataset.sending = 'false';
          updateEligibility(section);
        }
      });
    }
    if (section.dataset.language !== language) {
      section.dataset.language = language;
      section.querySelectorAll('[data-copy]').forEach(node => { node.textContent = t[node.dataset.copy]; });
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
