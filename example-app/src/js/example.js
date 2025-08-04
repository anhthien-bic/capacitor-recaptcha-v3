import { CapacitorRecaptchaV3 } from 'capacitor-recaptcha-v3';

window.testEcho = () => {
    const inputValue = document.getElementById("echoInput").value;
    CapacitorRecaptchaV3.echo({ value: inputValue })
}
