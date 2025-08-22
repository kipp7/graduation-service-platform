'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, ArrowRight, CheckCircle, Clock, GraduationCap, Rocket, Shield, Star } from 'lucide-react';
import Link from 'next/link';

// 表单验证 Schema
const orderSchema = z.object({
  // 基本信息
  projectTitle: z.string().min(5, '项目标题至少5个字符').max(100, '项目标题不能超过100个字符'),
  projectType: z.enum(['hardware', 'software', 'paper', 'full']),
  description: z.string().min(10, '需求描述至少10个字符').max(1000, '需求描述不能超过1000个字符').optional().or(z.literal('')),
  
  // 技术要求
  techRequirements: z.array(z.string()).min(1, '请至少选择一项技术要求'),
  difficulty: z.enum(['basic', 'intermediate', 'advanced']),
  
  // 时间要求
  deadline: z.string().min(1, '请选择截止日期'),
  urgency: z.enum(['normal', 'urgent', 'emergency']),
  
  // 套餐选择
  package: z.enum(['S', 'M', 'L']),
  
  // 联系信息
  name: z.string().min(2, '姓名至少2个字符').max(20, '姓名不能超过20个字符'),
  phone: z.string().regex(/^1[3-9]\d{9}$/, '请输入正确的手机号码'),
  email: z.string().email('请输入正确的邮箱地址'),
  school: z.string().min(2, '学校名称至少2个字符').max(50, '学校名称不能超过50个字符'),
  major: z.string().min(2, '专业名称至少2个字符').max(50, '专业名称不能超过50个字符'),
  
  // 特殊要求
  specialRequirements: z.string().max(500, '特殊要求不能超过500个字符').optional(),
  budget: z.string().optional(),
});

type OrderFormData = z.infer<typeof orderSchema>;

const projectTypes = [
  { id: 'hardware', label: '硬件设计', desc: '嵌入式系统、电路设计、PCB制作', icon: '🔧' },
  { id: 'software', label: '软件开发', desc: 'Web应用、移动APP、桌面软件', icon: '💻' },
  { id: 'paper', label: '论文写作', desc: '毕业论文、学术报告、文献综述', icon: '📝' },
  { id: 'full', label: '完整方案', desc: '硬件+软件+论文一站式服务', icon: '🎯' },
];

const techOptions = [
  '单片机开发', 'PCB设计', '传感器集成', '物联网', 'AI/机器学习',
  'Web开发', '移动APP', '数据库设计', '系统架构', '算法优化',
  '文献调研', '数据分析', '学术写作', '格式规范', '查重优化'
];

const packages = [
  { 
    id: 'S', 
    name: '指导版', 
    price: '¥999', 
    originalPrice: '¥1,999',
    features: ['个性化选题指导', '论文大纲+样章', '核心代码框架', '硬件方案设计'],
    suitable: '有基础，需要专业指导'
  },
  { 
    id: 'M', 
    name: '实战版', 
    price: '¥2,999', 
    originalPrice: '¥4,999',
    features: ['完整硬件设计', '全套源代码', '实验数据分析', '论文初稿'],
    suitable: '希望获得完整解决方案',
    popular: true
  },
  { 
    id: 'L', 
    name: '至尊版', 
    price: '¥6,999', 
    originalPrice: '¥12,999',
    features: ['专属教授导师', '样机制作', '论文终稿', '答辞培训'],
    suitable: '追求卓越品质和导师级指导'
  },
];

export default function OrderPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const totalSteps = 4;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    mode: 'onChange',
  });

  const watchedValues = watch();

  const onSubmit = async (data: OrderFormData) => {
    try {
      console.log('🚀 开始提交订单...');
      console.log('📝 表单数据:', data);
      
      // 显示提交状态
      alert('正在提交订单，请稍候...');
      
      // 格式化数据为API格式
      const orderData = {
        customerInfo: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          school: data.school,
          major: data.major
        },
        projectInfo: {
          title: data.projectTitle,
          type: data.package === 'S' ? 'guidance' : 
                data.package === 'M' ? 'practical' : 'vip',
          requirements: data.description,
          deadline: data.deadline
        },
        pricing: {
          basePrice: data.package === 'S' ? 1599 : 
                    data.package === 'M' ? 2999 : 4999,
          totalAmount: data.package === 'S' ? 1599 : 
                      data.package === 'M' ? 2999 : 4999,
          additionalServices: data.urgency === 'urgent' ? ['加急服务'] : 
                            data.urgency === 'emergency' ? ['紧急加急服务'] : []
        }
      };

      // 调用创建订单API
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      const result = await response.json();

      if (result.success) {
        // 订单创建成功
        console.log('✅ 订单创建成功:', result.data);
        alert(`订单创建成功！订单号：${result.data.orderNumber}`);
        
        // 设置提交成功状态并显示订单号
        setIsSubmitted(true);
        
        // 3秒后跳转到支付页面
        setTimeout(() => {
          router.push(`/payment?orderNumber=${result.data.orderNumber}&orderId=${result.data.orderId}`);
        }, 3000);
      } else {
        // 处理错误
        console.error('❌ 订单创建失败:', result.error);
        alert(`订单创建失败：${result.error.message || '未知错误，请重试'}`);
      }
    } catch (error) {
      console.error('❌ 订单提交失败:', error);
      alert(`网络错误：${error.message}，请检查网络连接后重试`);
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
                <ArrowLeft className="h-5 w-5" />
                <span>返回首页</span>
              </Link>
            </div>
            <div className="flex items-center space-x-3">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold">毕设助手</span>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">步骤</div>
              <div className="text-lg font-semibold">{currentStep} / {totalSteps}</div>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step <= currentStep 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step < currentStep ? <CheckCircle className="h-5 w-5" /> : step}
                </div>
                {step < 4 && (
                  <div className={`flex-1 h-1 mx-4 ${
                    step < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>项目信息</span>
            <span>技术要求</span>
            <span>套餐选择</span>
            <span>联系方式</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 提交成功后的支付选项 */}
        {isSubmitted ? (
          <div className="text-center space-y-8">
            <Card className="border-0 shadow-xl bg-gradient-to-r from-green-50 to-blue-50">
              <CardHeader className="text-center pb-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <CardTitle className="text-3xl font-bold text-gray-900 mb-4">
                  🎉 需求提交成功！
                </CardTitle>
                <CardDescription className="text-lg text-gray-600">
                  我们已收到您的项目需求，专业团队将在24小时内与您联系确认详细方案
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-6 bg-white rounded-lg border">
                  <h3 className="text-xl font-semibold mb-4">下一步操作</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">💰 立即支付定金</h4>
                      <p className="text-sm text-gray-600 mb-4">
                        支付定金可立即启动项目，确保优先处理您的需求
                      </p>
                      <Button 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => router.push('/payment')}
                      >
                        立即支付定金 →
                      </Button>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">📞 等待客服联系</h4>
                      <p className="text-sm text-gray-600 mb-4">
                        客服会在24小时内联系您确认需求详情和报价
                      </p>
                      <Button 
                        variant="outline" 
                        className="w-full border-gray-300"
                        onClick={() => router.push('/')}
                      >
                        返回首页
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <h4 className="font-medium text-amber-800 mb-2">📋 接下来会发生什么？</h4>
                  <ul className="text-sm text-amber-700 space-y-1">
                    <li>• 24小时内客服联系确认项目详情</li>
                    <li>• 提供详细的技术方案和时间安排</li>
                    <li>• 确认最终报价和付款方式</li>
                    <li>• 签署服务协议并开始项目执行</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* 步骤1：项目基本信息 */}
          {currentStep === 1 && (
            <Card className="border-0 shadow-xl">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-3xl font-bold text-gray-900 mb-4">
                  🎯 告诉我们您的项目需求
                </CardTitle>
                <CardDescription className="text-lg text-gray-600">
                  详细描述您的毕业设计项目，我们的专家团队将为您量身定制解决方案
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* 项目标题 */}
                <div>
                  <Label htmlFor="projectTitle" className="text-lg font-semibold mb-2 block">
                    项目标题 <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="projectTitle"
                    placeholder="例如：基于物联网的智能家居控制系统设计"
                    className="text-lg p-4"
                    {...register('projectTitle')}
                  />
                  {errors.projectTitle && (
                    <p className="text-red-500 text-sm mt-1">{errors.projectTitle.message}</p>
                  )}
                </div>

                {/* 项目类型 */}
                <div>
                  <Label className="text-lg font-semibold mb-4 block">
                    项目类型 <span className="text-red-500">*</span>
                  </Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {projectTypes.map((type) => (
                      <label
                        key={type.id}
                        className={`cursor-pointer p-6 rounded-xl border-2 transition-all hover:shadow-lg ${
                          watchedValues.projectType === type.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        <input
                          type="radio"
                          value={type.id}
                          className="sr-only"
                          {...register('projectType')}
                        />
                        <div className="flex items-start space-x-4">
                          <span className="text-3xl">{type.icon}</span>
                          <div>
                            <h3 className="font-bold text-lg">{type.label}</h3>
                            <p className="text-gray-600 text-sm mt-1">{type.desc}</p>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                  {errors.projectType && (
                    <p className="text-red-500 text-sm mt-2">{errors.projectType.message}</p>
                  )}
                </div>

                {/* 需求描述 */}
                <div>
                  <Label htmlFor="description" className="text-lg font-semibold mb-2 block">
                    详细需求描述 <span className="text-gray-500">(可选)</span>
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="请详细描述您的项目需求，包括功能要求、技术栈、预期效果等。描述越详细，我们越能为您提供精准的方案。"
                    className="min-h-32 text-base p-4"
                    {...register('description')}
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>{errors.description?.message || '详细描述有助于我们提供更精准的方案'}</span>
                    <span>{watchedValues.description?.length || 0}/1000</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* 步骤2：技术要求 */}
          {currentStep === 2 && (
            <Card className="border-0 shadow-xl">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-3xl font-bold text-gray-900 mb-4">
                  🔧 技术要求和项目难度
                </CardTitle>
                <CardDescription className="text-lg text-gray-600">
                  选择您需要的技术栈和项目难度，帮助我们匹配合适的专家团队
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* 技术要求 */}
                <div>
                  <Label className="text-lg font-semibold mb-4 block">
                    技术要求 <span className="text-red-500">*</span>
                  </Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {techOptions.map((tech) => (
                      <label
                        key={tech}
                        className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-blue-50 transition-colors"
                      >
                        <Checkbox
                          value={tech}
                          checked={watchedValues.techRequirements?.includes(tech) || false}
                          onCheckedChange={(checked) => {
                            const current = watchedValues.techRequirements || [];
                            if (checked) {
                              setValue('techRequirements', [...current, tech]);
                            } else {
                              setValue('techRequirements', current.filter(t => t !== tech));
                            }
                          }}
                        />
                        <span className="text-sm">{tech}</span>
                      </label>
                    ))}
                  </div>
                  {errors.techRequirements && (
                    <p className="text-red-500 text-sm mt-2">{errors.techRequirements.message}</p>
                  )}
                </div>

                {/* 项目难度 */}
                <div>
                  <Label className="text-lg font-semibold mb-4 block">
                    项目难度 <span className="text-red-500">*</span>
                  </Label>
                  <RadioGroup
                    value={watchedValues.difficulty}
                    onValueChange={(value: 'basic' | 'intermediate' | 'advanced') => setValue('difficulty', value)}
                  >
                    <div className="space-y-3">
                      <label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-blue-50">
                        <RadioGroupItem value="basic" />
                        <div>
                          <div className="font-medium">基础级</div>
                          <div className="text-sm text-gray-600">适合课程设计、简单功能实现</div>
                        </div>
                      </label>
                      <label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-blue-50">
                        <RadioGroupItem value="intermediate" />
                        <div>
                          <div className="font-medium">中等级</div>
                          <div className="text-sm text-gray-600">本科毕业设计、有一定技术复杂度</div>
                        </div>
                      </label>
                      <label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-blue-50">
                        <RadioGroupItem value="advanced" />
                        <div>
                          <div className="font-medium">高级</div>
                          <div className="text-sm text-gray-600">研究生项目、前沿技术、高创新性</div>
                        </div>
                      </label>
                    </div>
                  </RadioGroup>
                  {errors.difficulty && (
                    <p className="text-red-500 text-sm mt-2">{errors.difficulty.message}</p>
                  )}
                </div>

                {/* 时间要求 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="deadline" className="text-lg font-semibold mb-2 block">
                      截止日期 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="deadline"
                      type="date"
                      className="text-base p-3"
                      min={new Date().toISOString().split('T')[0]}
                      {...register('deadline')}
                    />
                    {errors.deadline && (
                      <p className="text-red-500 text-sm mt-1">{errors.deadline.message}</p>
                    )}
                  </div>

                  <div>
                    <Label className="text-lg font-semibold mb-2 block">
                      紧急程度 <span className="text-red-500">*</span>
                    </Label>
                    <RadioGroup
                      value={watchedValues.urgency}
                      onValueChange={(value: 'normal' | 'urgent' | 'emergency') => setValue('urgency', value)}
                    >
                      <div className="space-y-2">
                        <label className="flex items-center space-x-2">
                          <RadioGroupItem value="normal" />
                          <span>普通（正常排期）</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <RadioGroupItem value="urgent" />
                          <span>紧急（加价20%）</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <RadioGroupItem value="emergency" />
                          <span>特急（加价50%）</span>
                        </label>
                      </div>
                    </RadioGroup>
                    {errors.urgency && (
                      <p className="text-red-500 text-sm mt-2">{errors.urgency.message}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* 步骤3：套餐选择 */}
          {currentStep === 3 && (
            <Card className="border-0 shadow-xl">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-3xl font-bold text-gray-900 mb-4">
                  💎 选择适合您的服务套餐
                </CardTitle>
                <CardDescription className="text-lg text-gray-600">
                  根据您的需求和预算，选择最适合的服务方案
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {packages.map((pkg) => (
                    <label
                      key={pkg.id}
                      className={`cursor-pointer group ${
                        watchedValues.package === pkg.id
                          ? 'ring-2 ring-blue-500'
                          : ''
                      }`}
                    >
                      <input
                        type="radio"
                        value={pkg.id}
                        className="sr-only"
                        {...register('package')}
                      />
                      <Card className={`relative transition-all group-hover:shadow-lg ${
                        pkg.popular ? 'border-blue-500 border-2' : ''
                      } ${
                        watchedValues.package === pkg.id
                          ? 'bg-blue-50 border-blue-500'
                          : ''
                      }`}>
                        {pkg.popular && (
                          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                            <Badge className="bg-blue-600 text-white px-4 py-1">
                              🔥 最受欢迎
                            </Badge>
                          </div>
                        )}
                        <CardHeader className="text-center">
                          <CardTitle className="text-xl">{pkg.name}</CardTitle>
                          <div className="space-y-1">
                            <div className="text-sm text-gray-500 line-through">{pkg.originalPrice}</div>
                            <div className="text-3xl font-bold text-blue-600">{pkg.price}</div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2 mb-4">
                            {pkg.features.map((feature, index) => (
                              <li key={index} className="flex items-center text-sm">
                                <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                          <div className="text-xs text-gray-600 bg-gray-50 p-3 rounded-lg">
                            <strong>适合：</strong>{pkg.suitable}
                          </div>
                        </CardContent>
                      </Card>
                    </label>
                  ))}
                </div>
                {errors.package && (
                  <p className="text-red-500 text-sm mt-4 text-center">{errors.package.message}</p>
                )}
              </CardContent>
            </Card>
          )}

          {/* 步骤4：联系信息 */}
          {currentStep === 4 && (
            <Card className="border-0 shadow-xl">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-3xl font-bold text-gray-900 mb-4">
                  📞 最后一步：联系方式
                </CardTitle>
                <CardDescription className="text-lg text-gray-600">
                  填写您的联系信息，我们将在24小时内与您取得联系
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="font-semibold mb-2 block">
                      姓名 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      placeholder="请输入您的真实姓名"
                      {...register('name')}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="phone" className="font-semibold mb-2 block">
                      手机号 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="phone"
                      placeholder="请输入手机号码"
                      {...register('phone')}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email" className="font-semibold mb-2 block">
                      邮箱 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="请输入邮箱地址"
                      {...register('email')}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="school" className="font-semibold mb-2 block">
                      学校 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="school"
                      placeholder="请输入学校名称"
                      {...register('school')}
                    />
                    {errors.school && (
                      <p className="text-red-500 text-sm mt-1">{errors.school.message}</p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="major" className="font-semibold mb-2 block">
                      专业 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="major"
                      placeholder="请输入专业名称"
                      {...register('major')}
                    />
                    {errors.major && (
                      <p className="text-red-500 text-sm mt-1">{errors.major.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="specialRequirements" className="font-semibold mb-2 block">
                    特殊要求或备注
                  </Label>
                  <Textarea
                    id="specialRequirements"
                    placeholder="如有其他特殊要求或想要说明的信息，请在此填写"
                    className="min-h-20"
                    {...register('specialRequirements')}
                  />
                  <div className="text-sm text-gray-500 mt-1">
                    {watchedValues.specialRequirements?.length || 0}/500 (可选)
                  </div>
                </div>

                {/* 确认信息展示 */}
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="font-bold text-lg mb-4">📋 订单确认</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">项目类型：</span>
                      {projectTypes.find(t => t.id === watchedValues.projectType)?.label || '未选择'}
                    </div>
                    <div>
                      <span className="font-medium">服务套餐：</span>
                      {packages.find(p => p.id === watchedValues.package)?.name || '未选择'}
                    </div>
                    <div>
                      <span className="font-medium">截止日期：</span>
                      {watchedValues.deadline || '未设置'}
                    </div>
                    <div>
                      <span className="font-medium">紧急程度：</span>
                      {watchedValues.urgency === 'normal' ? '普通' : 
                       watchedValues.urgency === 'urgent' ? '紧急' : '特急'}
                    </div>
                  </div>
                </div>

                {/* 服务承诺 */}
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="font-bold text-lg mb-4 flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-green-600" />
                    服务承诺
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      100%原创保证
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-green-600 mr-2" />
                      按时交付承诺
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-green-600 mr-2" />
                      7天无忧退款
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* 导航按钮 */}
          <div className="flex justify-between items-center pt-8">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-6 py-3"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              上一步
            </Button>

            {currentStep < totalSteps ? (
              <Button
                type="button"
                onClick={nextStep}
                className="px-6 py-3"
              >
                下一步
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    提交中...
                  </>
                ) : (
                  <>
                    <Rocket className="h-5 w-5 mr-2" />
                    提交需求
                  </>
                )}
              </Button>
            )}
          </div>
        </form>
        )}
      </div>
    </div>
  );
}