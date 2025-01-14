document.addEventListener('DOMContentLoaded', () => {
  console.log('Waiting for the sms to be received');
  const otpElement = document.getElementById('otp');
  const inputs = Array.from(otpElement.children)

  inputs.forEach((input, index) => {
    input.addEventListener('input', (e) => {
      const value = e.target.value;

      if (!/^\d$/.test(value)) {
        e.target.value = '';
        return;
      }

      if (value && index < inputs.length - 1) {
        inputs[index + 1].focus();
        return;
      }
    });

    input.addEventListener('paste', (e) => {
      const pasteData = e.clipboardData.getData('text');

      if (/^\d{6}$/.test(pasteData)) {
        [...pasteData].forEach((digit, index) => {
          if (inputs[index]) {
            inputs[index].value = pasteData[index];
          }

          if (index < inputs.length - 1) {
            inputs[index + 1].focus();
          }
        });
      }
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !e.target.value && index > 0) {
        inputs[index - 1].focus();
      }
    });

    // select the input value. Can be change by entering a new value directly
    input.addEventListener('focus', (e) => { e.target.select() });
  });

  async function getOTPCCredential(inputs) {
    const otp = await navigator.credentials.get({ otp: ["sms"] });

    // once we got the otp code, we populate the 6 digit-inputs form
    if (opt && otp.code) {
      opt.code.forEach((digit, index) => {
        inputs[index].value = digit;j
      });
      inputs[inputs.length - 1].focus(); // focus on the last input element
    }
  }
  getOTPCCredential(inputs);
});
