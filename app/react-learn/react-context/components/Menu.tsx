/*
 * @Author: 刘浩奇 liuhaoqi@yaozai.net
 * @Date: 2023-10-19 14:09:51
 * @LastEditors: 刘浩奇 liuhaoqi@yaozai.net
 * @LastEditTime: 2023-10-19 14:20:17
 * @FilePath: \gsap\app\react-context\components\Menu.tsx
 * @Description:
 *
 * Copyright (c) 2023 by 遥在科技, All Rights Reserved.
 */
import { useContext } from 'react'
import { SelectedContext } from '../page'
import { Radio, RadioGroup } from '@nextui-org/react'

export default function Menu() {
    const { selected, setSelected } = useContext(SelectedContext)
    const onChange = (value: string) => {
        setSelected(value)
    }
    return (
        <div className="p-4 bg-slate-100 rounded-md">
            <RadioGroup
                orientation="horizontal"
                value={selected}
                onValueChange={onChange}
            >
                <Radio value="1">Box 1</Radio>
                <Radio value="2" className="mx-2">
                    Box 2
                </Radio>
                <Radio value="3">Box 3</Radio>
            </RadioGroup>
        </div>
    )
}
