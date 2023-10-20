/*
 * @Author: 刘浩奇 liuhaoqi@yaozai.net
 * @Date: 2023-10-20 11:49:02
 * @LastEditors: 刘浩奇 liuhaoqi@yaozai.net
 * @LastEditTime: 2023-10-20 16:50:37
 * @FilePath: \gsap\app\react-learn\custom-hooks\page.tsx
 * @Description:如果您发现自己一遍又一遍地重用相同的逻辑，那么您很有可能可以将该逻辑提取到自定义钩子中。构建自己的 Hook 可以将组件逻辑提取到可重用的函数中。
 *
 * Copyright (c) 2023 by 遥在科技, All Rights Reserved.
 */
'use client'

import SectionScreen from '@/components/SectionScreen'
import {
    useGsapContext,
    useGsapEffect,
    useIsomorphicLayoutEffect,
    useStateRef,
} from '@/helpers'
import { Button } from '@nextui-org/react'
import { gsap } from 'gsap-trial'
import { CustomEase, CustomWiggle } from 'gsap-trial/all'
import { useRef, useState } from 'react'
import Box from './components/Box'
gsap.registerPlugin(CustomEase, CustomWiggle)
// @ts-ignore
gsap.config({ trialWarn: false })
CustomWiggle.create('myWiggle', {
    wiggles: 8,
    type: 'uniform',
})
gsap.registerEffect({
    name: 'pulse',
    effect(targets: GSAPTweenTarget) {
        return gsap.fromTo(
            targets,
            {
                scale: 1,
            },
            {
                scale: 1.5,
                repeat: 1,
                ease: 'bounce',
                yoyoEase: 'power3',
            }
        )
    },
})

gsap.registerEffect({
    name: 'spin',
    effect(targets: GSAPTweenTarget) {
        return gsap.to(targets, {
            rotation: (i, el) =>
                gsap.utils.snap(
                    360,
                    Number(gsap.getProperty(el, 'rotation')) + 360
                ),
        })
    },
})

gsap.registerEffect({
    name: 'shake',
    effect(targets: GSAPTweenTarget) {
        return gsap.fromTo(
            targets,
            {
                x: 0,
            },
            {
                x: 10,
                ease: 'myWiggle',
            }
        )
    },
})
const wrap = gsap.utils.wrap(['pulse', 'spin', 'shake'])
export default function CustomHooks() {
    // useGsapEffect
    const boxRef = useRef<HTMLDivElement>(null)
    const _count = useRef<number>(0)
    const [effect, setEffect] = useState('')
    const animation = useGsapEffect(boxRef, effect)
    const toggle = () => {
        setEffect(wrap(_count.current++))
        console.log(animation)
    }
    // useGsapContext
    const ref = useRef<HTMLDivElement>(null)
    const ctx = useGsapContext(ref)
    useIsomorphicLayoutEffect(() => {
        ctx.add(() => {
            gsap.to('.box', {
                rotation: 360,
                stagger: 0.1,
            })
        })
    }, [])
    // useStateRef
    const app = useRef<HTMLDivElement>(null)
    const [count, setCount, countRef] = useStateRef(5)
    const [gsapCount, setGsapCount] = useState(0)
    useIsomorphicLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to('.box1', {
                x: 200,
                duration: 1,
                repeat: -1,
                yoyo: true,
                ease: 'none',
                onRepeat: () => setGsapCount(countRef.current),
            })
        }, app)
        return () => ctx.revert()
    }, [])
    return (
        <SectionScreen className="flex  justify-around items-center">
            <div className="flex flex-col justify-center items-center">
                <Button color="primary" onClick={toggle}>
                    切换
                </Button>
                <p className="my-4">Effect:{effect}</p>
                <Box ref={boxRef} className="bg-green-400 text-white">
                    useGsapEffect
                </Box>
            </div>
            <div
                className="flex flex-col justify-center items-center"
                ref={ref}
            >
                <Box className=" bg-green-400 box m-4">useGsapContext-1</Box>
                <Box className=" bg-green-400 box m-4">useGsapContext-2</Box>
                <Box className=" bg-green-400 box m-4">useGsapContext-3</Box>
            </div>
            <div
                className="flex flex-col justify-center items-center"
                ref={app}
            >
                <Button
                    color="primary"
                    onClick={() => {
                        console.log(count, countRef.current)
                        setCount(count + 1)
                        // countRef.current是最新值
                        console.log(count, countRef.current)
                    }}
                >
                    点击
                </Button>
                <p className="m-4">
                    <span className="mr-4">Count:{count}</span>
                    <span>GSAP count:{gsapCount}</span>
                </p>
                <Box className=" bg-green-400 box1">useStateRef</Box>
            </div>
        </SectionScreen>
    )
}
