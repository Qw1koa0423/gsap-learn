/*
 * @Author: 刘浩奇 liuhaoqi@yaozai.net
 * @Date: 2023-10-16 13:21:11
 * @LastEditors: 刘浩奇 liuhaoqi@yaozai.net
 * @LastEditTime: 2023-10-20 14:22:00
 * @FilePath: \gsap\app\page.tsx
 * @Description:
 *
 * Copyright (c) 2023 by 遥在科技, All Rights Reserved.
 */
'use client'

import ListCard from '@/components/ListCard'

export default function Home() {
    const CardInfo: {
        index: number
        title: string
        subtitle?: string
        desc: string
        path: string
    }[] = [
        {
            index: 1,
            title: '基本写法实现',
            subtitle: 'gsap.com/resources/React',
            desc: 'gsap关于React的入门写法',
            path: '/react-learn',
        },
    ]
    return (
        <main>
            <div className="w-3/4 m-auto py-8">
                {CardInfo.map((item) => {
                    return (
                        <ListCard
                            key={item.index}
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
