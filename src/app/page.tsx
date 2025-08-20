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
          <Badge className="mb-6 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 hover:bg-blue-100 border border-blue-200">
            ⭐ 已服务3000+毕业生 · 98%成功通过答辩
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
            毕业设计没思路？时间不够用？<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              专业团队助您高分毕业
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-4xl mx-auto leading-relaxed">
            🎯 从选题规划到答辞指导，提供<strong>硬件设计+软件开发+论文写作</strong>的全流程专业辅导<br/>
            🚀 985/211名校导师团队，平均7-15天交付，<strong>承诺100%原创</strong>，助您自信答辞
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button size="lg" className="px-10 py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300">
              🎯 免费评估我的项目 <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="px-10 py-4 text-lg font-semibold border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition-all duration-300">
              📚 查看成功案例
            </Button>
          </div>
          
          <div className="mt-8 flex flex-wrap justify-center items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Shield className="h-4 w-4 text-green-500" />
              100%原创保证
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-blue-500" />
              按时交付
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4 text-purple-500" />
              7天无忧退款
            </span>
          </div>
          
          {/* 统计数据 */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-lg bg-white/50 backdrop-blur-sm border border-blue-100 hover:shadow-lg transition-all duration-300">
              <div className="text-4xl font-bold text-blue-600 mb-2">3000+</div>
              <div className="text-gray-600 font-medium">毕业生选择我们</div>
              <div className="text-sm text-gray-500 mt-1">覆盖985/211院校</div>
            </div>
            <div className="text-center p-6 rounded-lg bg-white/50 backdrop-blur-sm border border-green-100 hover:shadow-lg transition-all duration-300">
              <div className="text-4xl font-bold text-green-600 mb-2">98%</div>
              <div className="text-gray-600 font-medium">答辞通过率</div>
              <div className="text-sm text-gray-500 mt-1">平均成绩B+以上</div>
            </div>
            <div className="text-center p-6 rounded-lg bg-white/50 backdrop-blur-sm border border-purple-100 hover:shadow-lg transition-all duration-300">
              <div className="text-4xl font-bold text-purple-600 mb-2">7-15</div>
              <div className="text-gray-600 font-medium">天完成交付</div>
              <div className="text-sm text-gray-500 mt-1">最快3天交付</div>
            </div>
            <div className="text-center p-6 rounded-lg bg-white/50 backdrop-blur-sm border border-orange-100 hover:shadow-lg transition-all duration-300">
              <div className="text-4xl font-bold text-orange-600 mb-2">24h</div>
              <div className="text-gray-600 font-medium">在线客服</div>
              <div className="text-sm text-gray-500 mt-1">随时解答疑问</div>
            </div>
          </div>
        </div>
      </section>

      {/* 痛点问题 */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              毕业设计让你焦虑不安？
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              我们深知每个毕业生面临的挑战，3000+成功案例告诉我们，这些都不是问题
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {[
              { 
                icon: "😰", 
                title: "选题迷茫，不知道做什么", 
                desc: "题目太简单怕老师不满意，太复杂怕做不出来，工程量评估困难",
                solution: "👨‍🏫 985/211导师1对1选题指导，确保创新性与可行性平衡"
              },
              { 
                icon: "⏰", 
                title: "时间紧迫，deadline在即", 
                desc: "其他课程作业多，实习占用时间，突然发现离答辞只剩几周",
                solution: "⚡ 最快3天出方案，7-15天完整交付，加急通道24h响应"
              },
              { 
                icon: "🤔", 
                title: "技术壁垒，无从下手", 
                desc: "硬件设计不会画原理图，软件开发bug一堆，没有实际工程经验",
                solution: "💻 专业工程师团队，提供完整代码+硬件设计+测试报告"
              },
              { 
                icon: "📝", 
                title: "论文写作，头疼不已", 
                desc: "不知道怎么组织结构，格式要求严格，查重率要求高",
                solution: "📖 一对一论文指导，从大纲到终稿，承诺100%原创"
              }
            ].map((item, index) => (
              <Card key={index} className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="text-5xl flex-shrink-0">{item.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-bold text-xl mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">{item.desc}</p>
                      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                        <p className="text-blue-700 font-medium text-sm">{item.solution}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-8 inline-block">
              <h3 className="text-2xl font-bold mb-4">还有其他困难？</h3>
              <p className="text-blue-100 mb-6">立即联系我们，获得专业建议</p>
              <Button variant="secondary" size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-semibold">
                免费咨询专家 →
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 服务套餐 */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-100 text-green-800">
              🔥 限时优惠：新用户首单立减500元
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              三种套餐，总有一款适合你
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              从基础指导到完整解决方案，我们为不同需求的同学提供最佳选择<br/>
              <strong className="text-blue-600">所有套餐均包含：100%原创保证 · 免费答辞辅导 · 7天无忧退款</strong>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* S档套餐 */}
            <Card className="relative border-2 border-green-200 hover:border-green-300 transition-colors">
              <CardHeader className="text-center">
                <Badge className="w-fit mb-2 bg-green-100 text-green-800 mx-auto">🌟 入门推荐</Badge>
                <CardTitle className="text-2xl font-bold">指导版</CardTitle>
                <CardDescription className="text-gray-600">适合有一定基础，需要专业指导的同学</CardDescription>
                <div className="mt-4">
                  <div className="text-sm text-gray-500 line-through">原价 ¥1,999</div>
                  <div className="text-4xl font-bold text-gray-900">
                    ¥999
                    <span className="text-lg font-normal text-gray-600">/项目</span>
                  </div>
                  <div className="text-green-600 font-semibold text-sm">新用户立减500元</div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-6">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">📋 核心服务</h4>
                    <ul className="space-y-2 text-sm">
                      {[
                        "📍 个性化选题指导（3-5个方案供选择）",
                        "📖 详细论文大纲+2-3章样章",
                        "💻 核心代码框架+注释说明",
                        "⚡ 硬件方案设计+元器件清单"
                      ].map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>⏱️ 交付时间：7-10天</span>
                    <span>🔄 免费修改：2次</span>
                  </div>
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700 font-semibold">
                  立即选择 🚀
                </Button>
                <p className="text-xs text-gray-500 text-center mt-2">适合：已有基础思路，需要专业指导</p>
              </CardContent>
            </Card>

            {/* M档套餐 */}
            <Card className="relative border-blue-500 border-3 shadow-2xl scale-105 bg-gradient-to-br from-blue-50 to-indigo-50">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 text-sm font-bold shadow-lg">
                  🔥 最受欢迎 · 性价比之王
                </Badge>
              </div>
              <CardHeader className="text-center pt-8">
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  实战版
                </CardTitle>
                <CardDescription className="text-gray-700 font-medium">
                  半定制化解决方案，90%学生的最佳选择
                </CardDescription>
                <div className="mt-6">
                  <div className="text-sm text-gray-500 line-through">原价 ¥4,999</div>
                  <div className="text-5xl font-bold text-gray-900">
                    ¥2,999
                    <span className="text-lg font-normal text-gray-600">/项目</span>
                  </div>
                  <div className="text-blue-600 font-semibold">新用户仅需 ¥2,499</div>
                  <div className="text-red-500 text-sm font-medium">🔥 限时特价，节省2000元</div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-6">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h4 className="font-bold text-blue-800 mb-3">🎯 完整解决方案</h4>
                    <ul className="space-y-2 text-sm">
                      {[
                        "🔧 完整硬件设计（原理图+PCB+BOM清单）",
                        "💻 全套源代码+详细注释+调试指南",
                        "📊 实验数据采集+图表分析+结果解读",
                        "📖 论文初稿（70-80%完成度）+格式规范",
                        "🎥 功能演示视频+测试报告",
                        "👨‍🏫 一对一技术答疑（微信群）"
                      ].map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                    <div className="flex justify-between text-sm">
                      <span className="text-amber-700">⚡ 加急交付：10-15天</span>
                      <span className="text-amber-700">🛠️ 免费修改：3次</span>
                    </div>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg font-bold py-3 shadow-lg">
                  🎯 立即抢购（省2000元）
                </Button>
                <p className="text-xs text-center mt-3 text-gray-600">
                  <strong>适合：</strong>希望获得完整解决方案的同学 · 90%用户选择
                </p>
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
