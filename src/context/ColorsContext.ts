import {purple} from "@ant-design/colors";
import React from "react";

export const defaultColor = purple[8];

type AppColor = {
    userId: number
    color: string
}

export interface ColorsContextInterface {
    colors: AppColor[]
    setColors: (value: AppColor[] | ((val: AppColor[]) => AppColor[])) => void
}

export const ColorsContext = React.createContext<ColorsContextInterface>({
    colors: [],
    setColors: () => undefined
})