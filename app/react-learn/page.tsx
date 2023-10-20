/*
 * @Author: 刘浩奇 liuhaoqi@yaozai.net
 * @Date: 2023-10-16 13:21:11
 * @LastEditors: 刘浩奇 liuhaoqi@yaozai.net
 * @LastEditTime: 2023-10-20 14:48:32
 * @FilePath: \gsap\app\react-learn\page.tsx
 * @Description:
 *
 * Copyright (c) 2023 by 遥在科技, All Rights Reserved.
 */
'use client'

import ListCard from '@/components/ListCard'

export default function ReactLearn() {
    const CardInfo: {
        title: string
        subtitle?: string
        desc: string
        path: string
    }[] = [
        {
            title: '在交互上制作动画',
            desc: '简单的交互动画实现,鼠标移入缩放变色',
            subtitle: 'gsap.com/resources/React#animating-on-interaction',
            path: '/react-learn/animating-on-interaction',
        },
        {
            title: '钩子函数应用',
            desc: 'useEffect和useLayoutEffect变体确保元素已呈现并准备好进行动画处理和useRef定位DOM节点',
            subtitle:
                'gsap.com/resources/React#triggering-animation-on-mount---uselayouteffect',
            path: '/react-learn/triggering-and-ref',
        },
        {
            title: '作用域选择动画清理',
            desc: '利用gsap.context()限定动画作用域范围,gsap.context 使清理变得漂亮而简单，在函数中创建的所有 GSAP 动画和滚动触发器都被收集起来，以便您可以轻松地 revert() 一次完成所有清理。',
            subtitle:
                'gsap.com/resources/React#gsapcontext-is-your-best-friend',
            path: '/react-learn/gsap-context',
        },
        {
            title: '重用组件',
            desc: '在基于组件的系统中，您可能需要对目标元素进行更精细的控制。您可以将 props 向下传递给子级，以调整类名或数据标识符并定位特定元素。',
            subtitle: 'gsap.com/resources/React#reusing-components',
            path: '/react-learn/reusing-components',
        },
        {
            title: '创建和控制时间线',
            desc: '我们只是使用 ref 来存储对 DOM 元素的引用，但它们不仅适用于元素。引用存在于渲染循环之外,因此它们可用于存储您希望在组件生命周期内保留的任何值。',
            subtitle:
                'gsap.com/resources/React#creating-and-controlling-timelines',
            path: '/react-learn/create-timelines',
        },
        {
            title: '控制 React何时创建动画',
            desc: '如果我们不将依赖数组传递给 useLayoutEffect() ，则会在第一次渲染后和每次更新后调用它。因此，每次组件的状态更改时，都会导致重新渲染，这将再次运行我们的效果。通常，这是浪费，并可能产生冲突。',
            subtitle:
                'gsap.com/resources/React#controlling-when-react-creates-our-animation',
            path: '/react-learn/when-create-animation',
        },
        {
            title: '对状态变化做出反应',
            desc: '我们知道了如何控制效果何时触发，我们可以使用此模式来响应组件中的更改。这在传递道具时特别有用。',
            subtitle: 'gsap.com/resources/React#reacting-to-changes-in-state',
            path: '/react-learn/changes-state',
        },
        {
            title: '传递时间线',
            desc: '组件通信,父组件传递时间轴给子组件',
            subtitle:
                'gsap.com/resources/react-advanced#passing-down-a-timeline-prop',
            path: '/react-learn/passing-timeline',
        },
        {
            title: '传递回调函数',
            desc: '组件通信,父组件传递回调函数给子组件',
            subtitle:
                'gsap.com/resources/react-advanced#passing-down-a-callback-to-build-a-timeline',
            path: '/react-learn/passing-callback',
        },
        {
            title: 'React 上下文',
            desc: 'gsap和React的useContext应用',
            subtitle: 'gsap.com/resources/react-advanced#react-context',
            path: '/react-learn/gsap-context',
        },
        {
            title: '命令式通信',
            desc: '使用 useImperativeHandle 钩子优化性能,鼠标跟随示例',
            subtitle: 'gsap.com/resources/react-advanced#react-context',
            path: '/react-learn/imperative-communication',
        },
        {
            title: '创建可重用的动画',
            desc: '调用函数或创建组件处理动画',
            subtitle:
                'gsap.com/resources/react-advanced#creating-reusable-animations',
            path: '/react-learn/creating-reusable-animations',
        },
        {
            title: '注册效应',
            desc: '利用registerEffect()创建可重用动画',
            subtitle: 'gsap.com/resources/react-advanced#registereffect',
            path: '/react-learn/register-effect',
        },
        {
            title: '退出动画',
            desc: 'DOM移出动画实现',
            subtitle: 'gsap.com/resources/react-advanced#exit-animations',
            path: '/react-learn/exit-animations',
        },
        {
            title: '自定义Hooks',
            desc: '自定义钩子函数registerEffect、useGsapContext、useStateRef、useIsomorphicLayoutEffect',
            subtitle: 'gsap.com/resources/react-advanced#custom-hooks',
            path: '/react-learn/custom-hooks',
        },
    ]
    return (
        <main>
            <div className="w-3/4 m-auto py-8 grid grid-cols-3">
                {CardInfo.map((item) => {
                    return (
                        <ListCard
                            key={item.title}
                            title={item.title}
                            subtitle={item.subtitle}
                            desc={item.desc}
                            path={item.path}
                        />
                    )
                })}
            </div>
        </main>
    )
}
