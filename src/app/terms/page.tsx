import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Shield, AlertTriangle, CheckCircle } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回首页
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">服务条款</h1>
          <p className="text-gray-600 mt-2">最后更新：2025年8月21日</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-8">
          
          {/* 重要声明 */}
          <Card className="border-orange-200 bg-orange-50">
            <CardHeader>
              <CardTitle className="flex items-center text-orange-800">
                <AlertTriangle className="w-5 h-5 mr-2" />
                重要声明
              </CardTitle>
            </CardHeader>
            <CardContent className="text-orange-700">
              <p>
                本平台仅提供毕业设计学习辅导服务，所有交付内容均为学习参考资料，
                不得直接用于学术提交。请严格遵守学术诚信原则，合理使用我们的辅导服务。
              </p>
            </CardContent>
          </Card>

          {/* 服务定义 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. 服务定义</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                毕设助手提供的服务包括但不限于：毕业设计选题指导、技术方案设计、
                代码开发指导、硬件设计辅导、实验数据分析、论文结构优化、答辩演练等学术辅导服务。
              </p>
              <p>
                所有服务均属于教育辅导性质，旨在帮助学生提升学术能力和技术水平。
              </p>
            </div>
          </section>

          {/* 服务套餐 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. 服务套餐说明</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-600">S档 - 指导版</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <ul className="space-y-2">
                    <li>• 交付周期：10-14天</li>
                    <li>• 免费修改：1次</li>
                    <li>• 包含：选题指导、大纲设计、参考代码</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-blue-600">M档 - 实战版</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <ul className="space-y-2">
                    <li>• 交付周期：21-28天</li>
                    <li>• 免费修改：1次</li>
                    <li>• 包含：完整方案、代码实现、实验指导</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-purple-600">L档 - 至尊版</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <ul className="space-y-2">
                    <li>• 交付周期：45-60天</li>
                    <li>• 免费修改：2次</li>
                    <li>• 包含：定制开发、全程指导、答辩培训</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* 用户责任 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. 用户责任</h2>
            <div className="space-y-4 text-gray-700">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <strong>学术诚信：</strong>用户需严格遵守所在院校的学术诚信规定，
                  合理使用我们提供的参考资料，不得直接抄袭或提交。
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <strong>及时沟通：</strong>用户需及时提供准确的需求信息，
                  并在规定时间内对交付内容进行确认和反馈。
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <strong>保密义务：</strong>用户需保护双方的商业机密和技术资料，
                  不得恶意传播或用于其他商业用途。
                </div>
              </div>
            </div>
          </section>

          {/* 平台责任 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. 平台责任</h2>
            <div className="space-y-4 text-gray-700">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <strong>质量保证：</strong>我们承诺提供专业、高质量的辅导服务，
                  确保交付内容符合约定标准。
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <strong>按时交付：</strong>我们承诺在约定时间内完成服务交付，
                  如有延误会提前通知并协商解决方案。
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <strong>售后支持：</strong>在规定的修改次数内，
                  我们提供免费的内容调整和技术答疑服务。
                </div>
              </div>
            </div>
          </section>

          {/* 免责声明 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. 免责声明</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                平台不对以下情况承担责任：
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>用户违反学术诚信规定导致的后果</li>
                <li>第三方软件或平台的技术限制</li>
                <li>不可控制的外部因素导致的延误</li>
                <li>用户提供信息不准确导致的问题</li>
                <li>超出服务范围的额外需求</li>
              </ul>
            </div>
          </section>

          {/* 条款修改 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. 条款修改</h2>
            <div className="text-gray-700">
              <p>
                我们保留随时修改本服务条款的权利。重要变更将通过网站公告或邮件形式通知用户。
                继续使用我们的服务即视为接受修改后的条款。
              </p>
            </div>
          </section>

          {/* 联系方式 */}
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-800">联系我们</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p>如有任何疑问，请通过以下方式联系我们：</p>
                <p>微信：Kipp-7</p>
                <p>QQ：3080479527</p>
                <p>邮箱：13377035712@163.com</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}