import {purple} from "@ant-design/colors";
import React from "react";

export const defaultColor = purple[8];

export interface ColorContextInterface {
    color: string;
    setColor: (col: string) => void
}

export const ColorContext = React.createContext<ColorContextInterface | null>(null);