import React from 'react'
import type { PropsWithChildren } from 'react'

import Icon from 'react-native-vector-icons/FontAwesome' // This was giving you an error. You had to paste the following function into the terminal to install the right packages: npm i @types/react-native-vector-icons

type IconsProps = PropsWithChildren<{
    name: string;
}>

const Icons = ({name} : IconsProps) => {
  switch (name) {
    case 'circle':
        return <Icon name="circle-thin" size={38} color="FFFFFF"/> //These are using the library you imported in line 4, and using an <Icon />.
        break;
    case 'cross':
        return <Icon name="times" size={38} color="89CFF0"/>
        break;
    default:
        return <Icon name="pencil" size={38} color="ADADAD"/>
        break;
  }
}

export default Icons;