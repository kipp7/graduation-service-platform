import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, RefreshCw, AlertTriangle, CheckCircle, XCircle, Clock } from 'lucide-react';

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回首页
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">退款政策</h1>
          <p className="text-gray-600 mt-2">最后更新：2024年8月21日</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-8">
          
          {/* 退款原则 */}
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-800">
                <RefreshCw className="w-5 h-5 mr-2" />
                退款原则
              </CardTitle>
            </CardHeader>
            <CardContent className="text-blue-700">
              <p>
                我们致力于提供高质量的服务，如果服务未达到约定标准，
                我们将根据以下政策为您提供退款保障。所有退款申请将公平、及时处理。
              </p>
            </CardContent>
          </Card>

          {/* 退款条件 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. 退款适用条件</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* 可申请退款的情况 */}
              <Card className="border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-green-800">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    可申请退款
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <span>平台方未能按约定时间交付服务</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <span>交付内容严重不符合约定要求</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <span>平台方主动取消订单</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <span>服务开始前24小时内取消订单</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <span>因平台技术问题导致服务无法继续</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* 不可申请退款的情况 */}
              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-red-800">
                    <XCircle className="w-5 h-5 mr-2" />
                    不可申请退款
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                      <span>服务已按约定标准完成交付</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                      <span>用户提供信息不准确导致的问题</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                      <span>用户中途变更需求超出原定范围</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                      <span>外部不可控因素导致的延误</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                      <span>已使用免费修改次数后的额外要求</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* 按套餐退款政策 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. 分档退款政策</h2>
            
            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-600">S档 - 指导版</CardTitle>
                  <div className="text-sm text-gray-600">10-14天 / 1次修改</div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <div className="font-semibold text-sm mb-1">服务开始前：</div>
                    <div className="text-sm text-gray-600">100% 退款</div>
                  </div>
                  <div>
                    <div className="font-semibold text-sm mb-1">进行中（未交付）：</div>
                    <div className="text-sm text-gray-600">50% 退款</div>
                  </div>
                  <div>
                    <div className="font-semibold text-sm mb-1">已交付：</div>
                    <div className="text-sm text-gray-600">不符合标准可申请重做或退款</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-blue-600">M档 - 实战版</CardTitle>
                  <div className="text-sm text-gray-600">21-28天 / 1次修改</div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <div className="font-semibold text-sm mb-1">服务开始前：</div>
                    <div className="text-sm text-gray-600">100% 退款</div>
                  </div>
                  <div>
                    <div className="font-semibold text-sm mb-1">进行中（0-50%）：</div>
                    <div className="text-sm text-gray-600">70% 退款</div>
                  </div>
                  <div>
                    <div className="font-semibold text-sm mb-1">进行中（50-80%）：</div>
                    <div className="text-sm text-gray-600">30% 退款</div>
                  </div>
                  <div>
                    <div className="font-semibold text-sm mb-1">已交付：</div>
                    <div className="text-sm text-gray-600">根据具体情况协商</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-purple-600">L档 - 至尊版</CardTitle>
                  <div className="text-sm text-gray-600">45-60天 / 2次修改</div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <div className="font-semibold text-sm mb-1">服务开始前：</div>
                    <div className="text-sm text-gray-600">100% 退款</div>
                  </div>
                  <div>
                    <div className="font-semibold text-sm mb-1">进行中（0-30%）：</div>
                    <div className="text-sm text-gray-600">80% 退款</div>
                  </div>
                  <div>
                    <div className="font-semibold text-sm mb-1">进行中（30-70%）：</div>
                    <div className="text-sm text-gray-600">50% 退款</div>
                  </div>
                  <div>
                    <div className="font-semibold text-sm mb-1">进行中（70%以上）：</div>
                    <div className="text-sm text-gray-600">20% 退款</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* 退款流程 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. 退款申请流程</h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold text-sm">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">提交申请</h3>
                  <p className="text-gray-600 text-sm">
                    通过微信、QQ或邮箱联系客服，说明退款原因并提供订单信息
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold text-sm">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">审核评估</h3>
                  <p className="text-gray-600 text-sm">
                    我们将在2个工作日内审核您的申请，评估退款条件和金额
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold text-sm">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">沟通确认</h3>
                  <p className="text-gray-600 text-sm">
                    与您沟通审核结果，如需补充材料会及时通知
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold text-sm">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">退款处理</h3>
                  <p className="text-gray-600 text-sm">
                    确认退款后，我们将在5-7个工作日内将款项退回至原支付账户
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 特殊情况处理 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. 特殊情况处理</h2>
            
            <div className="space-y-4">
              <Card className="border-orange-200 bg-orange-50">
                <CardHeader>
                  <CardTitle className="flex items-center text-orange-800">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    争议处理
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-orange-700 space-y-2">
                  <p>
                    如对退款决定有争议，可申请第三方调解或按照服务条款约定的争议解决方式处理。
                  </p>
                  <p className="text-sm">
                    我们承诺以客观、公正的态度处理每一个退款申请。
                  </p>
                </CardContent>
              </Card>

              <Card className="border-purple-200 bg-purple-50">
                <CardHeader>
                  <CardTitle className="flex items-center text-purple-800">
                    <Clock className="w-5 h-5 mr-2" />
                    加急订单
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-purple-700 space-y-2">
                  <p>
                    加急订单的退款政策与常规订单相同，但需考虑已投入的额外资源成本。
                  </p>
                  <p className="text-sm">
                    建议在下单前充分沟通需求，避免不必要的变更。
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* 退款时间说明 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. 退款时间说明</h2>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">退款到账时间：</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• 微信支付：1-3个工作日</li>
                    <li>• 支付宝：1-3个工作日</li>
                    <li>• 银行转账：3-7个工作日</li>
                    <li>• 信用卡：5-15个工作日</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">注意事项：</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• 节假日可能延长到账时间</li>
                    <li>• 银行系统维护可能影响到账</li>
                    <li>• 如超期未到账请及时联系我们</li>
                    <li>• 退款将扣除支付手续费</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* 联系方式 */}
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-800">退款咨询联系</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p>如需申请退款或有相关疑问，请通过以下方式联系我们：</p>
                <div className="grid md:grid-cols-3 gap-4 mt-4">
                  <div className="text-center">
                    <div className="font-semibold">微信客服</div>
                    <div className="text-blue-600">Kipp-7</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold">QQ客服</div>
                    <div className="text-blue-600">3080479527</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold">邮箱支持</div>
                    <div className="text-blue-600">13377035712@163.com</div>
                  </div>
                </div>
                <p className="text-gray-600 pt-2 text-center">
                  客服工作时间：9:00-22:00，我们将尽快为您处理退款申请
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}