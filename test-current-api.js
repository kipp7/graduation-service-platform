// 测试当前API是否正常工作
const http = require('http')

// 测试首页是否可访问
function testHomePage() {
  return new Promise((resolve, reject) => {
    const req = http.get('http://localhost:3000', (res) => {
      console.log(`✅ 首页状态码: ${res.statusCode}`)
      resolve(res.statusCode === 200)
    })
    
    req.on('error', (err) => {
      console.log(`❌ 首页访问失败: ${err.message}`)
      reject(err)
    })
    
    req.setTimeout(5000, () => {
      console.log('❌ 首页访问超时')
      req.destroy()
      reject(new Error('Timeout'))
    })
  })
}

// 测试API健康检查
function testAPI() {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      customerInfo: {
        name: "测试用户",
        email: "test@test.com",
        phone: "13800138000",
        school: "测试大学",
        major: "计算机"
      },
      projectInfo: {
        title: "测试项目",
        type: "practical",
        requirements: "测试需求",
        deadline: "2025-12-31"
      },
      pricing: {
        basePrice: 2999,
        totalAmount: 2999,
        additionalServices: []
      }
    })

    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/api/orders',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    }

    const req = http.request(options, (res) => {
      let data = ''
      
      res.on('data', (chunk) => {
        data += chunk
      })
      
      res.on('end', () => {
        console.log(`✅ API状态码: ${res.statusCode}`)
        try {
          const result = JSON.parse(data)
          if (result.success) {
            console.log(`✅ API测试成功: 订单号 ${result.data.orderNumber}`)
            resolve(true)
          } else {
            console.log(`❌ API返回错误: ${result.error}`)
            resolve(false)
          }
        } catch (e) {
          console.log(`❌ API响应解析失败: ${e.message}`)
          console.log(`响应内容: ${data}`)
          resolve(false)
        }
      })
    })

    req.on('error', (err) => {
      console.log(`❌ API请求失败: ${err.message}`)
      reject(err)
    })

    req.setTimeout(10000, () => {
      console.log('❌ API请求超时')
      req.destroy()
      reject(new Error('API Timeout'))
    })

    req.write(postData)
    req.end()
  })
}

async function runTests() {
  console.log('🔍 诊断服务器和API状态...')
  console.log('=' * 50)
  
  try {
    console.log('\n1. 测试首页访问...')
    await testHomePage()
    
    console.log('\n2. 测试API创建订单...')
    await testAPI()
    
    console.log('\n✅ 服务器和API都正常工作!')
    console.log('\n🔧 如果前端页面仍然卡住，请检查:')
    console.log('1. 浏览器控制台（F12）是否有JavaScript错误')
    console.log('2. 网络请求是否被阻止')
    console.log('3. 表单验证是否通过')
    console.log('4. 尝试刷新页面或清除浏览器缓存')
    
  } catch (error) {
    console.log('❌ 测试失败:', error.message)
    console.log('\n🔧 建议修复步骤:')
    console.log('1. 重启开发服务器: npm run dev')
    console.log('2. 检查是否有其他应用占用端口3000')
    console.log('3. 检查防火墙设置')
  }
}

runTests()