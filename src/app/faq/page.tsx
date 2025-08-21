import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, Shield, Clock, DollarSign, RefreshCw, AlertTriangle, CheckCircle, Phone, Mail, MessageCircle } from 'lucide-react';

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700">
              <ArrowLeft className="w-5 h-5 mr-2" />
              返回首页
            </Link>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              📋 常见问题 & 服务说明
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              专业的毕业设计辅导服务，透明的服务流程，让您安心选择
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* 左侧目录 */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  快速导航
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <a href="#service-process" className="block p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  🔄 服务流程
                </a>
                <a href="#pricing" className="block p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  💰 价格说明
                </a>
                <a href="#delivery" className="block p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  ⏰ 交付时间
                </a>
                <a href="#modification" className="block p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  ✏️ 修改售后
                </a>
                <a href="#compliance" className="block p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  ⚖️ 合规声明
                </a>
                <a href="#common-qa" className="block p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  ❓ 常见问题
                </a>
                <a href="#contact" className="block p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  📞 联系我们
                </a>
              </CardContent>
            </Card>
          </div>

          {/* 右侧内容 */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* 服务流程 */}
            <section id="service-process">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <RefreshCw className="w-6 h-6 text-blue-600" />
                    服务流程说明
                  </CardTitle>
                  <CardDescription>
                    透明化的服务流程，让您清楚了解每个环节
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Badge className="mt-1">1</Badge>
                        <div>
                          <h4 className="font-semibold">需求提交</h4>
                          <p className="text-gray-600 text-sm">填写详细需求表单，包括项目类型、技术要求、时间等</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Badge className="mt-1">2</Badge>
                        <div>
                          <h4 className="font-semibold">方案确认</h4>
                          <p className="text-gray-600 text-sm">24小时内联系确认具体方案和报价</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Badge className="mt-1">3</Badge>
                        <div>
                          <h4 className="font-semibold">预付定金</h4>
                          <p className="text-gray-600 text-sm">确认合作后支付30-50%定金启动项目</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Badge className="mt-1">4</Badge>
                        <div>
                          <h4 className="font-semibold">进度跟踪</h4>
                          <p className="text-gray-600 text-sm">提供阶段性进度汇报和中期成果展示</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Badge className="mt-1">5</Badge>
                        <div>
                          <h4 className="font-semibold">成果交付</h4>
                          <p className="text-gray-600 text-sm">按时交付完整成果，包括源码、文档、演示</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Badge className="mt-1">6</Badge>
                        <div>
                          <h4 className="font-semibold">结算尾款</h4>
                          <p className="text-gray-600 text-sm">验收满意后支付尾款，享受30天售后</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* 价格说明 */}
            <section id="pricing">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-6 h-6 text-green-600" />
                    价格与付款说明
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">S档套餐</h4>
                      <p className="text-2xl font-bold text-blue-600 mb-1">¥899-1299</p>
                      <p className="text-sm text-blue-700">基础毕业设计<br/>适合简单需求</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-green-900 mb-2">M档套餐</h4>
                      <p className="text-2xl font-bold text-green-600 mb-1">¥1499-2299</p>
                      <p className="text-sm text-green-700">标准毕业设计<br/>含完整文档</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <h4 className="font-semibold text-purple-900 mb-2">L档套餐</h4>
                      <p className="text-2xl font-bold text-purple-600 mb-1">¥2999-4999</p>
                      <p className="text-sm text-purple-700">高端定制服务<br/>全程VIP指导</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold">付款方式</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 border rounded-lg">
                        <h5 className="font-medium mb-2">✅ 支持的付款方式</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• 支付宝转账</li>
                          <li>• 微信转账</li>
                          <li>• 银行转账</li>
                          <li>• 分期付款（定金+尾款）</li>
                        </ul>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h5 className="font-medium mb-2">📋 付款节点</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• 确认合作：30-50%定金</li>
                          <li>• 中期检查：可选择中期付款</li>
                          <li>• 项目完成：支付尾款</li>
                          <li>• 特殊项目：可协商分期方案</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* 交付时间 */}
            <section id="delivery">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-6 h-6 text-orange-600" />
                    交付时间说明
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">⏱️ 标准交付时间</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>基础设计（S档）</span>
                          <Badge variant="outline">7-14天</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>标准设计（M档）</span>
                          <Badge variant="outline">14-21天</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>高端定制（L档）</span>
                          <Badge variant="outline">21-30天</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>纯论文服务</span>
                          <Badge variant="outline">5-10天</Badge>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">🚀 加急服务</h4>
                      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-yellow-600" />
                            <span className="font-medium">紧急项目处理</span>
                          </div>
                          <p className="text-sm text-gray-600">
                            如需加急处理，在标准价格基础上加收20-50%加急费用
                          </p>
                          <p className="text-xs text-yellow-700">
                            * 具体加急时间和费用需根据项目复杂度评估
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* 修改售后 */}
            <section id="modification">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    修改与售后服务
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold">✏️ 修改服务</h4>
                      <div className="space-y-3">
                        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                          <div className="font-medium text-green-800 mb-1">免费修改</div>
                          <p className="text-sm text-green-700">
                            交付后30天内，针对原始需求的合理修改完全免费
                          </p>
                        </div>
                        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <div className="font-medium text-blue-800 mb-1">付费修改</div>
                          <p className="text-sm text-blue-700">
                            超出原始需求范围的功能增加，按工作量合理收费
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-semibold">🛡️ 质量保证</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span>保证代码可运行</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span>保证文档完整性</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span>保证原创不抄袭</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span>提供技术支持</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* 合规声明 */}
            <section id="compliance">
              <Card className="border-amber-200 bg-amber-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-amber-800">
                    <Shield className="w-6 h-6" />
                    服务合规声明
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-white border border-amber-200 rounded-lg">
                    <h4 className="font-semibold text-amber-800 mb-3">⚖️ 重要声明</h4>
                    <div className="space-y-3 text-sm">
                      <p>
                        <strong>1. 学习辅导性质：</strong>
                        我们提供的是毕业设计<span className="font-semibold text-amber-700">学习辅导和参考服务</span>，
                        旨在帮助学生理解项目开发流程、技术实现方案和文档编写规范。
                      </p>
                      <p>
                        <strong>2. 诚信使用要求：</strong>
                        学生应基于我们提供的参考材料，结合自己的理解进行学习和改进，
                        <span className="font-semibold text-amber-700">不得直接提交我们的成果作为自己的作业</span>。
                      </p>
                      <p>
                        <strong>3. 知识产权：</strong>
                        所有交付的代码和文档仅供学习参考使用，
                        学生需要在理解的基础上进行个性化修改和完善。
                      </p>
                      <p>
                        <strong>4. 免责条款：</strong>
                        因学生不当使用服务内容而产生的学术诚信问题，
                        本平台不承担相关责任。
                      </p>
                    </div>
                  </div>
                  <div className="p-3 bg-amber-100 border border-amber-300 rounded-lg">
                    <p className="text-sm text-amber-800">
                      <strong>📋 使用建议：</strong>
                      建议将我们的成果作为学习资料，在导师指导下进行学习理解，
                      并基于个人理解完成最终的毕业设计作品。
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* 常见问题 */}
            <section id="common-qa">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    💭 常见问题解答
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <details className="p-4 border rounded-lg">
                      <summary className="font-medium cursor-pointer">Q: 如何保证项目质量？</summary>
                      <div className="mt-3 text-sm text-gray-600">
                        <p>我们有严格的质量控制流程：所有项目都经过资深工程师review，
                        保证代码可运行、文档完整、符合学术规范。交付前会进行全面测试。</p>
                      </div>
                    </details>
                    
                    <details className="p-4 border rounded-lg">
                      <summary className="font-medium cursor-pointer">Q: 可以中途取消项目吗？</summary>
                      <div className="mt-3 text-sm text-gray-600">
                        <p>项目启动前可以无条件退款。启动后如需取消，
                        会根据已完成的工作量退还相应费用。我们会提供明细说明。</p>
                      </div>
                    </details>
                    
                    <details className="p-4 border rounded-lg">
                      <summary className="font-medium cursor-pointer">Q: 是否提供技术答辩指导？</summary>
                      <div className="mt-3 text-sm text-gray-600">
                        <p>M档和L档套餐包含答辩指导服务。我们会准备常见问题和回答要点，
                        帮助学生理解项目核心技术，为答辩做好准备。</p>
                      </div>
                    </details>
                    
                    <details className="p-4 border rounded-lg">
                      <summary className="font-medium cursor-pointer">Q: 如何保证信息安全？</summary>
                      <div className="mt-3 text-sm text-gray-600">
                        <p>我们严格保护客户隐私，所有项目信息都会保密处理。
                        项目完成后会删除相关聊天记录，确保信息安全。</p>
                      </div>
                    </details>
                    
                    <details className="p-4 border rounded-lg">
                      <summary className="font-medium cursor-pointer">Q: 支持哪些技术栈？</summary>
                      <div className="mt-3 text-sm text-gray-600">
                        <p>我们支持主流技术栈：Java、Python、JavaScript、C++、PHP等后端；
                        React、Vue、Angular等前端；MySQL、PostgreSQL等数据库；以及各种框架和工具。</p>
                      </div>
                    </details>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* 联系方式 */}
            <section id="contact">
              <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-800">
                    <Phone className="w-6 h-6" />
                    联系我们
                  </CardTitle>
                  <CardDescription>
                    有任何疑问？随时联系我们的客服团队
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-blue-800">📞 客服方式</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <Mail className="w-4 h-4 text-blue-600" />
                          <span className="text-sm">邮箱：13377035712@163.com</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone className="w-4 h-4 text-blue-600" />
                          <span className="text-sm">微信：Kipp-7</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <MessageCircle className="w-4 h-4 text-blue-600" />
                          <span className="text-sm">QQ：3080479527</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-semibold text-blue-800">⏰ 服务时间</h4>
                      <div className="space-y-1 text-sm">
                        <p>周一至周日：9:00 - 22:00</p>
                        <p>紧急项目：24小时响应</p>
                        <p>平均响应时间：&lt; 2小时</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center pt-4">
                    <Link href="/order">
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                        立即咨询项目 →
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}