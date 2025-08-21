import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, MessageCircle, Phone, Mail, Clock, MapPin, Users, Headphones } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回首页
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">联系我们</h1>
          <p className="text-gray-600 mt-2">专业毕业设计辅导服务，随时为您提供帮助</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-8">
          
          {/* 在线客服卡片 */}
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="flex items-center text-green-800">
                <Headphones className="w-5 h-5 mr-2" />
                🔥 24小时在线客服
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <MessageCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-green-800 mb-2">微信客服</h3>
                  <p className="text-lg font-mono text-green-700">Kipp-7</p>
                  <p className="text-sm text-green-600 mt-1">推荐方式，响应最快</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-blue-800 mb-2">QQ客服</h3>
                  <p className="text-lg font-mono text-blue-700">3080479527</p>
                  <p className="text-sm text-blue-600 mt-1">在线咨询，文件传输</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Mail className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-purple-800 mb-2">邮箱支持</h3>
                  <p className="text-lg font-mono text-purple-700">13377035712@163.com</p>
                  <p className="text-sm text-purple-600 mt-1">详细咨询，正式沟通</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 服务时间和响应 */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-blue-800">
                  <Clock className="w-5 h-5 mr-2" />
                  服务时间
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">在线客服</span>
                    <span className="font-semibold text-blue-600">24小时</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">技术支持</span>
                    <span className="font-semibold">9:00 - 22:00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">项目咨询</span>
                    <span className="font-semibold">9:00 - 21:00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">紧急项目</span>
                    <span className="font-semibold text-red-600">随时响应</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700">
                    <strong>平均响应时间：</strong> &lt; 2小时
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-green-800">
                  <MapPin className="w-5 h-5 mr-2" />
                  服务范围
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">服务地区</span>
                    <span className="font-semibold text-green-600">全国高校</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">包含地区</span>
                    <span className="font-semibold">港澳台</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">语言支持</span>
                    <span className="font-semibold">中文</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">时区</span>
                    <span className="font-semibold">北京时间</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-700">
                    <strong>特别支持：</strong> 海外留学生项目
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 联系方式选择指南 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">如何选择联系方式？</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-blue-200">
                <CardHeader>
                  <CardTitle className="text-blue-800">快速咨询</CardTitle>
                  <CardDescription>简单问题，立即解答</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">微信：价格咨询、服务说明</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-500" />
                      <span className="text-sm">QQ：技术讨论、文件预览</span>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-700">
                      <strong>推荐：</strong>微信优先，响应最快
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-purple-200">
                <CardHeader>
                  <CardTitle className="text-purple-800">正式沟通</CardTitle>
                  <CardDescription>详细需求，正式合作</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-purple-500" />
                      <span className="text-sm">邮箱：详细需求描述</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-orange-500" />
                      <span className="text-sm">预约：复杂项目讨论</span>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-purple-50 rounded-lg">
                    <p className="text-sm text-purple-700">
                      <strong>适合：</strong>大型项目、合同签署
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* 常见问题快速通道 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">常见问题快速通道</h2>
            
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/faq">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer border-green-200">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-green-600 font-bold">FAQ</span>
                      </div>
                      <h3 className="font-semibold text-green-800 mb-2">常见问题</h3>
                      <p className="text-sm text-gray-600">查看详细FAQ解答</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/order">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer border-blue-200">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-blue-600 font-bold">订单</span>
                      </div>
                      <h3 className="font-semibold text-blue-800 mb-2">立即下单</h3>
                      <p className="text-sm text-gray-600">快速提交项目需求</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/refund">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer border-orange-200">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-orange-600 font-bold">退款</span>
                      </div>
                      <h3 className="font-semibold text-orange-800 mb-2">退款政策</h3>
                      <p className="text-sm text-gray-600">了解退款流程</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </section>

          {/* 专业团队介绍 */}
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-800">专业团队为您服务</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="font-bold text-2xl text-blue-600">3000+</div>
                  <div className="text-sm text-gray-600">服务学生</div>
                </div>
                <div>
                  <div className="font-bold text-2xl text-green-600">98%</div>
                  <div className="text-sm text-gray-600">答辞通过率</div>
                </div>
                <div>
                  <div className="font-bold text-2xl text-purple-600">24h</div>
                  <div className="text-sm text-gray-600">在线服务</div>
                </div>
                <div>
                  <div className="font-bold text-2xl text-orange-600">5年</div>
                  <div className="text-sm text-gray-600">专业经验</div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-white rounded-lg">
                <p className="text-sm text-gray-700 text-center">
                  我们拥有985/211高校背景的专业导师团队，涵盖电子信息、计算机科学、
                  自动化、机械工程等多个专业领域，为您提供最专业的毕业设计辅导服务。
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 联系建议 */}
          <Card className="bg-yellow-50 border-yellow-200">
            <CardHeader>
              <CardTitle className="text-yellow-800">💡 联系小贴士</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-yellow-600">•</span>
                  <span>首次咨询请说明您的专业、院校和大致需求</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-yellow-600">•</span>
                  <span>有具体要求文档可通过QQ或邮箱发送</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-yellow-600">•</span>
                  <span>急件请在联系时说明，我们会优先处理</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-yellow-600">•</span>
                  <span>工作时间外的消息会在第二天优先回复</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}