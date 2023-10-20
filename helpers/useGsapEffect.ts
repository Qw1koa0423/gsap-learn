/*
 * @Author: 刘浩奇 liuhaoqi@yaozai.net
 * @Date: 2023-10-20 11:52:49
 * @LastEditors: 刘浩奇 liuhaoqi@yaozai.net
 * @LastEditTime: 2023-10-20 13:34:10
 * @FilePath: \gsap\helpers\useGsapEffect.ts
 * @Description: 触发注册动画使用
 *
 * Copyright (c) 2023 by 遥在科技, All Rights Reserved.
 */
import useIsomorphicLayoutEffect from './isomorphicEffect'
import { RefObject, useState } from 'react'
import { gsap } from 'gsap-trial'
function useGsapEffect(
    target: RefObject<HTMLDivElement>,
    effect: string,
    vars?: GSAPTweenVars
) {
    const [animation, setAnimation] = useState()

    useIsomorphicLayoutEffect(() => {
        if (gsap.effects[effect]) {
            setAnimation(gsap.effects[effect](target.current, vars))
        }
    }, [effect, target, vars])

    return animation
}
export default useGsapEffect
