'use client';

import { useState } from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Shield, ArrowRight, GraduationCap, Menu, X } from "lucide-react";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
            
            {/* 桌面端导航 */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#pricing" className="text-gray-600 hover:text-blue-600">服务套餐</a>
              <a href="#cases" className="text-gray-600 hover:text-blue-600">成功案例</a>
              <Link href="/faq" className="text-gray-600 hover:text-blue-600">常见问题</Link>
              <Link href="/contact">
                <Button variant="outline">咨询客服</Button>
              </Link>
              <Link href="/order">
                <Button>立即下单</Button>
              </Link>
            </div>

            {/* 移动端汉堡菜单按钮 */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-md transition-colors"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* 移动端菜单 */}
          {mobileMenuOpen && (
            <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b shadow-lg z-50">
              <div className="px-4 py-6 space-y-4">
                <a 
                  href="#pricing" 
                  className="block py-2 text-gray-600 hover:text-blue-600 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  服务套餐
                </a>
                <a 
                  href="#cases" 
                  className="block py-2 text-gray-600 hover:text-blue-600 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  成功案例
                </a>
                <Link 
                  href="/faq" 
                  className="block py-2 text-gray-600 hover:text-blue-600 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  常见问题
                </Link>
                <div className="pt-4 space-y-3">
                  <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full">咨询客服</Button>
                  </Link>
                  <Link href="/order" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full">立即下单</Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
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
            <Link href="/order">
              <Button size="lg" className="px-10 py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300">
                🎯 免费评估我的项目 <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
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
              <Link href="/order">
                <Button variant="secondary" size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-semibold">
                  免费咨询专家 →
                </Button>
              </Link>
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
                  <div className="text-sm text-gray-500 line-through">原价 ¥1,499</div>
                  <div className="text-4xl font-bold text-gray-900">
                    ¥999
                    <span className="text-lg font-normal text-gray-600">/项目</span>
                  </div>
                  <div className="text-green-600 font-semibold text-sm">新用户立减300元</div>
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
                    <span>⏱️ 交付时间：10-14天</span>
                    <span>🔄 免费修改：1次</span>
                  </div>
                </div>
                <Link href="/order">
                  <Button className="w-full bg-green-600 hover:bg-green-700 font-semibold">
                    立即选择 🚀
                  </Button>
                </Link>
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
                  <div className="text-sm text-gray-500 line-through">原价 ¥2,599</div>
                  <div className="text-5xl font-bold text-gray-900">
                    ¥1,299
                    <span className="text-lg font-normal text-gray-600">/项目</span>
                  </div>
                  <div className="text-blue-600 font-semibold">新用户仅需 ¥1,199</div>
                  <div className="text-red-500 text-sm font-medium">🔥 限时特价，节省700元</div>
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
                      <span className="text-amber-700">⚡ 交付周期：21-28天</span>
                      <span className="text-amber-700">🛠️ 免费修改：1次</span>
                    </div>
                  </div>
                </div>
                <Link href="/order">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg font-bold py-3 shadow-lg">
                    🎯 立即抢购（省700元）
                  </Button>
                </Link>
                <p className="text-xs text-center mt-3 text-gray-600">
                  <strong>适合：</strong>希望获得完整解决方案的同学 · 90%用户选择
                </p>
              </CardContent>
            </Card>

            {/* L档套餐 */}
            <Card className="relative border-2 border-purple-300 bg-gradient-to-br from-purple-50 to-pink-50">
              <CardHeader className="text-center">
                <Badge className="w-fit mb-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white mx-auto">
                  👑 VIP定制 · 导师级服务
                </Badge>
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  至尊版
                </CardTitle>
                <CardDescription className="text-gray-700">
                  顶级定制服务，一对一专属导师全程陪伴
                </CardDescription>
                <div className="mt-4">
                  <div className="text-sm text-gray-500 line-through">原价 ¥3,199</div>
                  <div className="text-4xl font-bold text-gray-900">
                    ¥1,699
                    <span className="text-lg font-normal text-gray-600">/项目</span>
                  </div>
                  <div className="text-purple-600 font-semibold">新用户专享价 ¥1,599</div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-6">
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <h4 className="font-bold text-purple-800 mb-3">👑 VIP专属服务</h4>
                    <ul className="space-y-2 text-sm">
                      {[
                        "🎯 个人专属导师（985/211教授级别）",
                        "🏭 完整产品设计+样机制作+测试验证",
                        "💎 高质量论文终稿（可直接提交答辞）",
                        "🎤 答辞PPT定制+现场演练指导",
                        "🔍 查重优化+格式审核+导师预审",
                        "🏆 专利申请指导（可选）"
                      ].map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-3 rounded-lg border border-purple-200">
                    <div className="text-center text-sm space-y-1">
                      <div className="text-purple-700 font-semibold">⚡ VIP通道：45-60天交付</div>
                      <div className="text-purple-700">🛠️ 免费修改2次 · 📞 24小时专属客服</div>
                      <div className="text-purple-700">🎁 赠送：简历优化+面试辅导</div>
                    </div>
                  </div>
                </div>
                <Link href="/order">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg font-bold py-3 shadow-lg">
                    👑 VIP定制服务
                  </Button>
                </Link>
                <p className="text-xs text-center mt-3 text-gray-600">
                  <strong>适合：</strong>追求卓越品质，希望获得导师级指导的同学
                </p>
              </CardContent>
            </Card>
          </div>

          {/* 增值服务 */}
          <div className="mt-12">
            <h3 className="text-xl font-semibold text-center mb-6">增值服务</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { name: "48小时加急", price: "加价20%" },
                { name: "答辩培训", price: "¥399-699" },
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

      {/* 客户评价 */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              听听他们怎么说
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              3000+成功案例，98%的学生都给了我们5星好评
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "李同学",
                school: "华中科技大学 · 电子信息工程",
                comment: "选择实战版真的是最明智的决定！从选题到最终答辞，老师全程指导，硬件设计很专业，论文质量也很高。答辞时老师都夸我的作品完成度高，最终拿了优秀毕业设计！",
                rating: 5,
                avatar: "👨‍🎓",
                grade: "优秀毕业设计"
              },
              {
                name: "王同学", 
                school: "西安电子科技大学 · 计算机科学",
                comment: "时间很紧张，只剩一个月就要答辞了。选择了VIP服务，专属导师真的很负责，每天都会跟进进度。最后顺利通过答辞，成绩还不错。服务确实值这个价格！",
                rating: 5,
                avatar: "👩‍🎓",
                grade: "答辞成绩:良"
              },
              {
                name: "张同学",
                school: "北京理工大学 · 自动化",
                comment: "指导版很适合我这种有一定基础的。老师给的建议很中肯，代码框架也很规范。虽然自己也要投入不少精力，但学到了很多东西，推荐给有基础的同学！",
                rating: 5,
                avatar: "👨‍🎓", 
                grade: "自主完成度高"
              }
            ].map((review, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <div className="text-3xl mr-4">{review.avatar}</div>
                    <div>
                      <h4 className="font-bold text-lg">{review.name}</h4>
                      <p className="text-sm text-gray-600">{review.school}</p>
                      <div className="flex items-center mt-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <span key={i} className="text-yellow-400">⭐</span>
                        ))}
                        <Badge className="ml-2 bg-green-100 text-green-800 text-xs">
                          {review.grade}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-sm italic">
                    &ldquo;{review.comment}&rdquo;
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="px-8 py-3">
              查看更多真实评价 📝
            </Button>
          </div>
        </div>
      </section>

      {/* CTA区域 */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-6xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <Badge className="mb-6 bg-white/20 text-white border-white/30">
            ⏰ 限时特惠 · 今日下单立减500元
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            毕业季倒计时<br />
            <span className="text-yellow-300">现在行动，还来得及！</span>
          </h2>
          <p className="text-xl md:text-2xl mb-4 text-blue-100">
            🎓 距离答辞还有几个月？别让毕业设计成为你的绊脚石！
          </p>
          <p className="text-lg mb-10 text-blue-200 max-w-4xl mx-auto">
            专业导师团队已待命，3天出初步方案，7-15天完整交付<br/>
            <strong className="text-yellow-300">现在咨询，免费获得选题建议+可行性分析</strong>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
            <Link href="/order">
              <Button size="lg" variant="secondary" className="px-10 py-4 text-xl font-bold bg-yellow-400 text-gray-900 hover:bg-yellow-300 shadow-2xl border-0">
                🎯 立即免费咨询（价值299元）
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="px-10 py-4 text-xl font-bold text-white border-2 border-white hover:bg-white hover:text-blue-600 shadow-xl">
              📞 微信：Kipp-7
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center justify-center gap-2 text-blue-100">
              <Shield className="h-4 w-4" />
              7天无条件退款
            </div>
            <div className="flex items-center justify-center gap-2 text-blue-100">
              <CheckCircle className="h-4 w-4" />
              100%原创保证
            </div>
            <div className="flex items-center justify-center gap-2 text-blue-100">
              <Clock className="h-4 w-4" />
              24小时客服在线
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                  <GraduationCap className="h-8 w-8 text-white" />
                </div>
                <div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                    毕设助手
                  </span>
                  <div className="text-sm text-gray-400">Professional Graduation Design Assistant</div>
                </div>
              </div>
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                🎓 专业的毕业设计辅导平台，已服务3000+毕业生<br/>
                💎 985/211名校导师团队，提供硬件+软件+论文一站式解决方案<br/>
                🏆 98%答辞通过率，承诺100%原创，助你高分毕业
              </p>
              <div className="flex flex-wrap gap-4">
                <Badge className="bg-blue-100 text-blue-800">3000+成功案例</Badge>
                <Badge className="bg-green-100 text-green-800">98%通过率</Badge>
                <Badge className="bg-purple-100 text-purple-800">7天退款保障</Badge>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-6 text-blue-400">🎯 核心服务</h4>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  嵌入式硬件设计
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  软件系统开发
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  学术论文写作
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  答辞演练指导
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  专利申请辅导
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-6 text-blue-400">📞 联系我们</h4>
              <div className="space-y-4">
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <div className="font-semibold text-yellow-400 mb-2">🔥 24小时在线客服</div>
                  <div className="text-sm">
                    <div className="mb-1">微信：<span className="font-mono text-blue-400">Kipp-7</span></div>
                    <div className="mb-1">QQ：<span className="font-mono text-blue-400">3080479527</span></div>
                    <div>邮箱：<span className="font-mono text-blue-400">13377035712@163.com</span></div>
                  </div>
                </div>
                <div className="text-sm text-gray-400">
                  ⏰ 服务时间：全年无休，24小时响应<br/>
                  📍 服务区域：全国高校（含港澳台）
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-gray-400 text-sm">
                <p>&copy; 2024 毕设助手. 保留所有权利.</p>
                <p className="mt-1">
                  ⚠️ <strong className="text-yellow-400">重要声明</strong>：本平台仅提供学习辅导服务，所有交付内容仅供参考学习，请遵守学术诚信原则
                </p>
              </div>
              <div className="flex gap-4 text-sm text-gray-400">
                <Link href="/terms" className="hover:text-blue-400 transition-colors">服务条款</Link>
                <Link href="/privacy" className="hover:text-blue-400 transition-colors">隐私政策</Link>
                <Link href="/refund" className="hover:text-blue-400 transition-colors">退款政策</Link>
                <Link href="/contact" className="hover:text-blue-400 transition-colors">联系我们</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
