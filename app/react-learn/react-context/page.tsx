/*
 * @Author: 刘浩奇 liuhaoqi@yaozai.net
 * @Date: 2023-10-19 13:58:37
 * @LastEditors: 刘浩奇 liuhaoqi@yaozai.net
 * @LastEditTime: 2023-10-20 17:11:16
 * @FilePath: \gsap\app\react-learn\react-context\page.tsx
 * @Description: 利用createContext创建React上下文,传递给子组件方法和值实现对应动画
 *
 * Copyright (c) 2023 by 遥在科技, All Rights Reserved.
 */
'use client'
import SectionScreen from '@/components/SectionScreen'
import { useState, createContext, Dispatch, SetStateAction } from 'react'
import Box from './components/Box'
import Menu from './components/Menu'
type SelectedContextType = {
    selected: string
    setSelected: Dispatch<SetStateAction<string>>
}
export const SelectedContext = createContext<SelectedContextType>(
    {} as SelectedContextType
)
const Boxes = () => {
    return (
        <>
            <Box id="1" className=" bg-green-400">
                Box 1
            </Box>
            <Box id="2" className=" bg-green-400">
                Box 2
            </Box>
            <Box id="3" className=" bg-green-400">
                Box 3
            </Box>
        </>
    )
}
export default function ReactContext() {
    const [selected, setSelected] = useState('2')
    return (
        <SectionScreen className="flex flex-col justify-around items-center">
            <SelectedContext.Provider value={{ selected, setSelected }}>
                <Menu />
                <Boxes />
            </SelectedContext.Provider>
        </SectionScreen>
    )
}
