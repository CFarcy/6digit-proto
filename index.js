document.addEventListener('DOMContentLoaded', () => {
  const otpElement = document.getElementById('otp');
  const inputs = Array.from(otpElement.children)

  inputs[0].focus();
  inputs[0].addEventListener('input', e => {
    const value = e.target.value;
    if (value.length > 1) {
      value.split("").forEach((digit, index) => {
        inputs[index].value = digit;
      });
      inputs[value.length - 1].focus();
    }
  });

  inputs.forEach((input, index) => {
    input.addEventListener('input', (e) => {
      const value = e.target.value;

      if (!/^\d$/.test(value)) {
        // console.log('not a digit', value, typeof value);
        e.target.value = '';
        return;
      }

      if (index < inputs.length - 1) {
        inputs[index + 1].focus();
        return;
      }

      inputs[index].select();
      return;
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


function autofocus(event) {
  const value = e.target.value;

  if (!/^\d$/.test(value)) {
    console.log('not a digit', value, typeof value);
    // e.target.value = '';
    return;
  }

  if (index < inputs.length - 1) {
    inputs[index + 1].focus();
    return;
  }

  inputs[index].select();
  return;
}
