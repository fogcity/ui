import React, { useEffect, useState } from 'react'
import classnames from 'classnames'
import { createUseStyles } from 'react-jss'
import { Theme } from '../../constants/theme'
import Drawer from '../Drawer'
import Col from '../Col'
import Picker from '../Picker'
import Text from '../Text'

type DataItem = {
  key: string
  value: string | number
}
type RuleNames = 'select'

interface SelectProps {
  data: DataItem[][]
  children?: React.ReactNode
  className?: string
  value: string[]
  open: boolean
  onClose: () => any
  onClick?: () => any
  onSelectChange: (
    value: {
      key: string
      value: string | number
    }[],
  ) => any
  cssOptions?: (theme: Theme) => React.CSSProperties
}

const useStyles = createUseStyles<RuleNames, Pick<SelectProps, 'cssOptions'>, Theme>((theme) => ({
  select: ({ cssOptions }) => {
    return { ...cssOptions }
  },
}))

const Select = ({ value, onSelectChange, data, open, onClose, children, className, cssOptions }: SelectProps) => {
  const classes = useStyles({ cssOptions })
  const computedClassNames = classnames(classes.select, className)

  const handleSelectedChange = (item: DataItem[]) => {
    onSelectChange?.(item)
  }
  const handleClickDrawer = (e: any) => {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
    onClose()
  }
  return (
    <Drawer position="bottom" open={open} onClose={handleClickDrawer} className={computedClassNames}>
      <div
        style={{
          borderTopRightRadius: '8px',
          borderTopLeftRadius: '8px',
        }}
      >
        <Picker
          cssOptions={() => ({
            background: 'white',
          })}
          value={value}
          onPickerChange={handleSelectedChange}
          data={data}
        />
      </div>
    </Drawer>
  )
}

export default Select
