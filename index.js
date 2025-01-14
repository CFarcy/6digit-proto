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
            inputs[index].value = digit;
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

  // Mobile Web Browser autofill fix
  inputs[0].addEventListener('input', () => {
    const optCode = e.target.value;
    if (optCode.length > 1) {
      optCode.split("").forEach((digit, index) => {
        inputs[index].value = digit;
      });
      inputs[inputs.length - 1].focus();
    }
  });
  inputs[0].focus();
});
