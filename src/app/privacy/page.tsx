import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Lock, Eye, Shield, Database } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回首页
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">隐私政策</h1>
          <p className="text-gray-600 mt-2">最后更新：2024年8月21日</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-8">
          
          {/* 隐私保护承诺 */}
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="flex items-center text-green-800">
                <Shield className="w-5 h-5 mr-2" />
                隐私保护承诺
              </CardTitle>
            </CardHeader>
            <CardContent className="text-green-700">
              <p>
                毕设助手严格保护用户隐私，采用行业标准的安全措施保护您的个人信息。
                我们承诺不会未经您同意向任何第三方披露您的个人信息。
              </p>
            </CardContent>
          </Card>

          {/* 信息收集 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <Database className="w-6 h-6 mr-2 text-blue-600" />
              1. 信息收集
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">收集的信息类型：</h3>
                <div className="space-y-3 text-gray-700">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <strong>联系信息：</strong>姓名、邮箱、电话、微信号、QQ号等
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <strong>项目信息：</strong>院校、专业、项目需求、技术要求等
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <strong>交易信息：</strong>订单详情、支付记录、服务历史等
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <strong>技术信息：</strong>IP地址、浏览器类型、访问时间等
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">收集方式：</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>用户主动提供（注册、下单、咨询时）</li>
                  <li>服务过程中产生（项目文件、沟通记录）</li>
                  <li>网站自动收集（访问日志、Cookie）</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 信息使用 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <Eye className="w-6 h-6 mr-2 text-green-600" />
              2. 信息使用
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>我们收集的信息仅用于以下目的：</p>
              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="pt-4">
                    <h4 className="font-semibold text-gray-800 mb-2">服务提供</h4>
                    <ul className="text-sm space-y-1">
                      <li>• 处理订单和交付服务</li>
                      <li>• 项目沟通和进度跟踪</li>
                      <li>• 技术支持和售后服务</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4">
                    <h4 className="font-semibold text-gray-800 mb-2">服务改进</h4>
                    <ul className="text-sm space-y-1">
                      <li>• 分析用户需求和偏好</li>
                      <li>• 优化网站功能和体验</li>
                      <li>• 开发新的服务产品</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4">
                    <h4 className="font-semibold text-gray-800 mb-2">安全保护</h4>
                    <ul className="text-sm space-y-1">
                      <li>• 防范欺诈和滥用</li>
                      <li>• 保护系统安全</li>
                      <li>• 遵守法律法规</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4">
                    <h4 className="font-semibold text-gray-800 mb-2">合规要求</h4>
                    <ul className="text-sm space-y-1">
                      <li>• 税务和财务记录</li>
                      <li>• 法律义务履行</li>
                      <li>• 监管要求配合</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* 信息保护 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <Lock className="w-6 h-6 mr-2 text-purple-600" />
              3. 信息保护措施
            </h2>
            <div className="space-y-4 text-gray-700">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">技术保护</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      SSL/TLS 加密传输
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      数据库加密存储
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      访问权限控制
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      定期安全检测
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">管理保护</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      员工隐私培训
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      保密协议签署
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      最小权限原则
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      操作日志记录
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* 信息共享 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. 信息共享限制</h2>
            <div className="space-y-4 text-gray-700">
              <p>我们承诺不会向第三方出售、交易或转让您的个人信息，除非：</p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">•</span>
                    <span>获得您的明确同意</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">•</span>
                    <span>法律法规要求或司法机关要求</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">•</span>
                    <span>保护我们或他人的合法权益</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">•</span>
                    <span>经过匿名化处理的统计信息</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* 用户权利 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. 您的权利</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="border-blue-200">
                <CardContent className="pt-4">
                  <h4 className="font-semibold text-blue-800 mb-2">访问权</h4>
                  <p className="text-sm text-gray-600">
                    您有权了解我们收集、使用您个人信息的情况
                  </p>
                </CardContent>
              </Card>
              <Card className="border-green-200">
                <CardContent className="pt-4">
                  <h4 className="font-semibold text-green-800 mb-2">更正权</h4>
                  <p className="text-sm text-gray-600">
                    您有权要求我们更正或补充错误或不完整的信息
                  </p>
                </CardContent>
              </Card>
              <Card className="border-orange-200">
                <CardContent className="pt-4">
                  <h4 className="font-semibold text-orange-800 mb-2">删除权</h4>
                  <p className="text-sm text-gray-600">
                    在特定情况下，您有权要求我们删除您的个人信息
                  </p>
                </CardContent>
              </Card>
              <Card className="border-purple-200">
                <CardContent className="pt-4">
                  <h4 className="font-semibold text-purple-800 mb-2">撤回权</h4>
                  <p className="text-sm text-gray-600">
                    您有权撤回对个人信息处理的同意
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Cookie说明 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Cookie 使用</h2>
            <div className="space-y-4 text-gray-700">
              <p>我们使用 Cookie 来改善您的浏览体验：</p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <strong>必要Cookie：</strong>维持网站基本功能，如登录状态
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <strong>功能Cookie：</strong>记住您的偏好设置，提供个性化体验
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <strong>分析Cookie：</strong>统计网站使用情况，帮助改进服务
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                您可以通过浏览器设置管理或禁用Cookie，但这可能影响网站功能。
              </p>
            </div>
          </section>

          {/* 联系方式 */}
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-800">隐私问题联系</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p>如您对隐私政策有任何疑问或要求，请联系我们：</p>
                <p>微信：Kipp-7</p>
                <p>QQ：3080479527</p>
                <p>邮箱：13377035712@163.com</p>
                <p className="text-gray-600 pt-2">
                  我们将在收到您的请求后7个工作日内回复。
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}