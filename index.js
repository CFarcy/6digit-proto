document.addEventListener('DOMContentLoaded', () => {
  // DEBUG
  const debug = document.getElementById('debug');

  const otpElement = document.getElementById('otp');
  const inputs = Array.from(otpElement.children)
  inputs[0].focus();

  otpElement.addEventListener('input', (e) => {
    const value = e.target.value;
    value.split("").forEach((digit, index) => {
      inputs[index].value = digit;
    });
    inputs[inputs.length - 1].focus();
  });

  inputs.forEach((input, index) => {
    input.addEventListener('input', (e) => {
      const value = e.target.value;

      // DEBUG
      debug.innerText = value;

      // Mobile Web Browser autofill fix
      if (value && value.length > 1) {
        // DEBUG
        debug.innerText = `value: ${[...value]}`;

        [...value].forEach((digit, index) => {
          inputs[index].value = digit;
        });
        inputs[inputs.length - 1].focus();
        return;
      }

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
});
