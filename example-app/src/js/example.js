import { CapacitorRecaptchaV3, RecaptchaAction } from 'capacitor-recaptcha-v3';

const ClientKeys = {
    ios: {
        development: 'site_key',
        staging: 'site_key',
        release: 'site_key',
        production: 'site_key',
    },
    android: {
        development: 'site_key',
        staging: 'site_key',
        release: 'site_key',
        production: 'site_key',
    },
    webview: {
        development: 'site_key',
        staging: 'site_key',
        release: 'site_key',
        production: 'site_key',
    },
};

const actions = {
    SIGN_UP: 'signup',
    SOCIAL_SIGN_UP: 'social_signup',
    SOCIAL_LOGIN: 'social_login',
    LOGIN: 'login',
    EKYC: 'ekyc',
}

const clientKey = ClientKeys['ios']['staging'];

const init = async () => {
    let success = false;
    let error = '';
    if (clientKey) {
        try {
            await CapacitorRecaptchaV3.initClient({ siteKey: clientKey, timeout: 10000 });
            success = true;
        } catch (e) {
            error = e.toString();
        }
    } else {
        error = 'Missing Key';
    }
    return { success, error };
};

const executeRecaptcha = async (action) => {
    let token;
    let error;
    try {
        token = await CapacitorRecaptchaV3.execute({ action, timeout: 10000 });
    } catch (e) {
        error = e.toString();
    }
    return { token, error };
};

// Hàm cập nhật input text với kết quả
const updateInputWithResult = (result) => {
    const input = document.getElementById('echoInput');
    if (input) {
        if (result.token) {
            input.value = result.token.token;
        } else if (typeof result === 'string') {
            input.value = result;
        } else if (result.error) {
            input.value = `Error: ${result.error}`;
        } else {
            input.value = JSON.stringify(result, null, 2);
        }
    }
};

// Hàm hiển thị kết quả ra màn hình
const displayResult = (title, data) => {
    const resultContainer = document.getElementById('resultContainer');
    if (!resultContainer) return;

    const resultDiv = document.createElement('div');
    resultDiv.className = 'result-item';

    // Thêm class dựa trên loại dữ liệu
    if (data.status === 'processing') {
        resultDiv.classList.add('loading');
    } else if (data.error || (data.success === false)) {
        resultDiv.classList.add('error');
    } else if (data.success === true || data.token || typeof data === 'string') {
        resultDiv.classList.add('success');
    }

    resultDiv.innerHTML = `
        <h3>${title}</h3>
        <pre>${JSON.stringify(data, null, 2)}</pre>
    `;
    resultContainer.appendChild(resultDiv);

    // Cập nhật input text với kết quả cuối cùng
    if (data.token || data.error || (data.success !== undefined) || typeof data === 'string') {
        updateInputWithResult(data);
    }
};

// Hàm xóa kết quả cũ
const clearResults = () => {
    const resultContainer = document.getElementById('resultContainer');
    if (resultContainer) {
        resultContainer.innerHTML = '';
    }
};

// Hàm cập nhật trạng thái button
const updateButtonState = (isLoading) => {
    const button = document.getElementById('testButton');
    if (button) {
        button.disabled = isLoading;
        button.textContent = isLoading ? 'Đang xử lý...' : 'Test reCAPTCHA v3';
    }
};

window.testEcho = async () => {
    // Cập nhật trạng thái button
    updateButtonState(true);

    // Xóa kết quả cũ
    clearResults();

    // Hiển thị thông tin đang xử lý
    displayResult('Đang khởi tạo...', { status: 'processing' });

    try {
        // Khởi tạo plugin
        const initResult = await init();
        displayResult('Kết quả khởi tạo', initResult);

        if (initResult.success) {
            // Thực thi reCAPTCHA
            displayResult('Đang thực thi reCAPTCHA...', { status: 'processing' });
            const executeResult = await executeRecaptcha(actions.SIGN_UP);
            displayResult('Kết quả thực thi reCAPTCHA', executeResult);
        } else {
            displayResult('Lỗi khởi tạo', { error: 'Không thể khởi tạo plugin, bỏ qua bước thực thi' });
        }
    } catch (error) {
        displayResult('Lỗi không mong muốn', { error: error.toString() });
    } finally {
        // Khôi phục trạng thái button
        updateButtonState(false);
    }
}
