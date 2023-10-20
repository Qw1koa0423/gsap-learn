/*
 * @Author: 刘浩奇 liuhaoqi@yaozai.net
 * @Date: 2023-10-19 16:23:01
 * @LastEditors: 刘浩奇 liuhaoqi@yaozai.net
 * @LastEditTime: 2023-10-20 13:15:51
 * @FilePath: \gsap\app\register-effect\page.tsx
 * @Description:
 *
 * Copyright (c) 2023 by 遥在科技, All Rights Reserved.
 */
/*
 * @Author: 刘浩奇 liuhaoqi@yaozai.net
 * @Date: 2023-10-19 16:23:01
 * @LastEditors: 刘浩奇 liuhaoqi@yaozai.net
 * @LastEditTime: 2023-10-19 16:54:46
 * @FilePath: \gsap\app\registereffect\page.tsx
 * @Description: 利用registerEffect创建可重用动画
 *
 * Copyright (c) 2023 by 遥在科技, All Rights Reserved.
 */
'use client'
import { CustomEase, CustomWiggle } from 'gsap/all'
import { gsap } from 'gsap-trial'
import { useRef, useState } from 'react'
import SectionScreen from '@/components/SectionScreen'
import { Button } from '@nextui-org/react'
import GsapEffect from './components/GsapEffect'
import Box from './components/Box'
// @ts-ignore
gsap.config({ trialWarn: false })
gsap.registerPlugin(CustomEase, CustomWiggle)
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
export default function RegisterEffect() {
    const boxRef = useRef<HTMLDivElement>(null)
    const count = useRef(0)
    const [effect, setEffect] = useState('')
    const toggle = () => {
        setEffect(wrap(count.current++))
    }
    return (
        <SectionScreen className="flex flex-col justify-center items-center">
            <Button color="primary" onClick={toggle}>
                切换
            </Button>
            <p className=" m-8">Effect:{effect}</p>
            <GsapEffect
                effect={effect}
                targetRef={boxRef}
                vars={{
                    x: 200,
                }}
            >
                <Box className=" bg-green-400" ref={boxRef}>
                    Box
                </Box>
            </GsapEffect>
        </SectionScreen>
    )
}
