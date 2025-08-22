// 修复订单页面潜在问题的补丁
// 在浏览器控制台运行此代码来诊断问题

console.log('🔍 开始诊断订单页面问题...');

// 1. 检查表单是否存在
const form = document.querySelector('form');
if (!form) {
    console.error('❌ 未找到表单元素');
} else {
    console.log('✅ 表单元素正常');
}

// 2. 检查所有必填字段
const requiredFields = [
    'name', 'email', 'phone', 'school', 'major',
    'projectTitle', 'description', 'deadline', 'package'
];

console.log('🔍 检查必填字段...');
requiredFields.forEach(field => {
    const element = document.querySelector(`[name="${field}"], #${field}`);
    if (element) {
        console.log(`✅ ${field}: ${element.value || '(空)'}`);
    } else {
        console.error(`❌ 未找到字段: ${field}`);
    }
});

// 3. 检查提交按钮
const submitButtons = document.querySelectorAll('button[type="submit"], button:contains("提交")');
console.log(`🔍 找到 ${submitButtons.length} 个提交按钮`);

submitButtons.forEach((btn, index) => {
    console.log(`按钮 ${index + 1}:`, {
        text: btn.textContent,
        disabled: btn.disabled,
        type: btn.type
    });
});

// 4. 监听表单提交事件
if (form) {
    console.log('🔍 监听表单提交事件...');
    
    form.addEventListener('submit', function(e) {
        console.log('🚀 表单提交触发!');
        console.log('事件对象:', e);
        console.log('默认行为是否被阻止:', e.defaultPrevented);
    }, true);
    
    // 监听按钮点击
    submitButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            console.log('🖱️ 提交按钮被点击!');
            console.log('按钮状态:', {
                disabled: this.disabled,
                type: this.type
            });
        }, true);
    });
}

// 5. 检查React Hook Form错误
setTimeout(() => {
    console.log('🔍 检查React Hook Form状态...');
    
    // 查找可能的错误信息
    const errorElements = document.querySelectorAll('[class*="error"], .text-red-500, .text-destructive');
    if (errorElements.length > 0) {
        console.log('⚠️ 发现表单错误:');
        errorElements.forEach(el => {
            console.log('- ', el.textContent);
        });
    } else {
        console.log('✅ 未发现表单验证错误');
    }
    
    // 检查是否有loading状态
    const loadingElements = document.querySelectorAll('[class*="loading"], [class*="spinner"]');
    if (loadingElements.length > 0) {
        console.log('⏳ 发现loading状态，页面可能正在处理请求');
    }
}, 1000);

console.log('📝 请手动尝试提交表单，然后查看控制台输出');
console.log('💡 如果没有看到"表单提交触发!"消息，说明表单验证阻止了提交');