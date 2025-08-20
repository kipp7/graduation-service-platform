import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Shield, ArrowRight, GraduationCap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* 导航栏 */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">毕设助手</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#pricing" className="text-gray-600 hover:text-blue-600">服务套餐</a>
              <a href="#cases" className="text-gray-600 hover:text-blue-600">成功案例</a>
              <a href="#faq" className="text-gray-600 hover:text-blue-600">常见问题</a>
              <Button variant="outline">咨询客服</Button>
              <Button>立即下单</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero 区域 */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100">
            ✨ 专业毕业设计辅导平台
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            毕业设计太难？<br />
            <span className="text-blue-600">我们来帮你</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            从选题到答辩，提供硬件设计+论文写作的一站式辅导服务。
            专业工程师团队，7天快速交付，助你顺利毕业。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8 py-3 text-lg">
              免费咨询 <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-3 text-lg">
              查看案例
            </Button>
          </div>
          
          {/* 统计数据 */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">1000+</div>
              <div className="text-gray-600">成功案例</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">99%</div>
              <div className="text-gray-600">通过率</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">7天</div>
              <div className="text-gray-600">平均交付</div>
            </div>
          </div>
        </div>
      </section>

      {/* 痛点问题 */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              毕业设计遇到这些问题？
            </h2>
            <p className="text-lg text-gray-600">你不是一个人在战斗</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "😰", title: "选题困难", desc: "不知道选什么题目，担心太难或太简单" },
              { icon: "⏰", title: "时间紧迫", desc: "临近deadline，时间不够用" },
              { icon: "🤔", title: "技术困难", desc: "缺少工程经验，硬件/软件不会做" },
              { icon: "📝", title: "论文无从下手", desc: "不知道怎么写，格式要求复杂" }
            ].map((item, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 服务套餐 */}
      <section id="pricing" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              选择适合你的套餐
            </h2>
            <p className="text-lg text-gray-600">专业辅导，分阶段交付</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* S档套餐 */}
            <Card className="relative">
              <CardHeader>
                <Badge className="w-fit mb-2 bg-green-100 text-green-800">入门推荐</Badge>
                <CardTitle className="text-2xl">标准版</CardTitle>
                <CardDescription>适合有一定基础的同学</CardDescription>
                <div className="text-3xl font-bold text-gray-900">
                  ¥1,499
                  <span className="text-base font-normal text-gray-600">/起</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    "选题建议与可行性分析",
                    "论文大纲+样章模板",
                    "参考代码/电路设计",
                    "10-14天交付",
                    "1次免费修改"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full mt-6">立即选择</Button>
              </CardContent>
            </Card>

            {/* M档套餐 */}
            <Card className="relative border-blue-500 border-2 shadow-lg">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-600 text-white px-4 py-1">最受欢迎</Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">专业版</CardTitle>
                <CardDescription>半定制化解决方案</CardDescription>
                <div className="text-3xl font-bold text-gray-900">
                  ¥3,999
                  <span className="text-base font-normal text-gray-600">/起</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    "原理图+BOM+固件样例",
                    "实验数据框架",
                    "论文初稿(60-70%完成度)",
                    "21-28天交付",
                    "1次免费修改",
                    "技术答疑支持"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-blue-500 mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700">立即选择</Button>
              </CardContent>
            </Card>

            {/* L档套餐 */}
            <Card className="relative">
              <CardHeader>
                <Badge className="w-fit mb-2 bg-purple-100 text-purple-800">全定制</Badge>
                <CardTitle className="text-2xl">旗舰版</CardTitle>
                <CardDescription>完整解决方案</CardDescription>
                <div className="text-3xl font-bold text-gray-900">
                  ¥8,999
                  <span className="text-base font-normal text-gray-600">+</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    "定制硬件+完整代码",
                    "实验全流程+数据分析",
                    "论文终稿(可直接提交)",
                    "答辩PPT+演练指导",
                    "45-60天交付",
                    "2次免费修改",
                    "一对一技术支持",
                    "售后维护服务"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-purple-500 mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full mt-6 bg-purple-600 hover:bg-purple-700">立即选择</Button>
              </CardContent>
            </Card>
          </div>

          {/* 增值服务 */}
          <div className="mt-12">
            <h3 className="text-xl font-semibold text-center mb-6">增值服务</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { name: "48小时加急", price: "加价20%" },
                { name: "答辩培训", price: "¥499-999" },
                { name: "查重优化", price: "¥199-399" },
                { name: "二次打样", price: "按成本计费" }
              ].map((service, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="pt-4">
                    <h4 className="font-medium">{service.name}</h4>
                    <p className="text-blue-600 font-semibold">{service.price}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA区域 */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">
            还在犹豫？免费咨询一下吧
          </h2>
          <p className="text-xl mb-8 opacity-90">
            专业顾问1对1分析你的需求，制定最优方案
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="px-8 py-3">
              <Shield className="mr-2 h-5 w-5" />
              免费咨询
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-3 text-white border-white hover:bg-white hover:text-blue-600">
              <Clock className="mr-2 h-5 w-5" />
              查看更多案例
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <GraduationCap className="h-6 w-6" />
                <span className="text-lg font-semibold">毕设助手</span>
              </div>
              <p className="text-gray-400 text-sm">
                专业的毕业设计辅导平台，帮助学生顺利完成学业。
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">服务</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>硬件设计</li>
                <li>软件开发</li>
                <li>论文写作</li>
                <li>答辞指导</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">支持</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>常见问题</li>
                <li>服务条款</li>
                <li>隐私政策</li>
                <li>联系我们</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">联系方式</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>客服微信：BiSheHelper</li>
                <li>QQ群：123456789</li>
                <li>邮箱：help@bishe.com</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 毕设助手. 仅供学习辅导使用，请遵守学术诚信原则。</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
