// 在浏览器控制台粘贴此代码进行诊断
console.clear();
console.log('🔍 开始诊断订单页面问题...');

// 检查React Hook Form状态
setTimeout(() => {
    // 检查表单验证错误
    const errorMessages = document.querySelectorAll('[class*="error"], .text-red-500, .text-destructive, [role="alert"]');
    if (errorMessages.length > 0) {
        console.log('❌ 发现表单验证错误:');
        errorMessages.forEach(el => console.log('- ', el.textContent));
        console.log('💡 解决方案: 检查并修正标红的字段');
    }

    // 检查必填字段
    const inputs = document.querySelectorAll('input, textarea, select');
    console.log('📝 表单字段状态:');
    inputs.forEach(input => {
        if (input.required || input.hasAttribute('aria-required')) {
            console.log(`${input.name || input.id}: "${input.value}" ${input.value ? '✅' : '❌空值'}`);
        }
    });

    // 监听提交按钮点击
    const submitBtn = document.querySelector('button[type="submit"], button:last-of-type');
    if (submitBtn) {
        console.log('🔍 监听提交按钮...');
        submitBtn.addEventListener('click', (e) => {
            console.log('🖱️ 按钮被点击!');
            console.log('按钮状态:', {disabled: submitBtn.disabled, text: submitBtn.textContent});
        });
    }

    console.log('📝 请现在尝试提交表单，观察控制台输出...');
}, 2000);