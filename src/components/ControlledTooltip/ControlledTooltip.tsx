import { FC, useState } from "react";
import {Tooltip, TooltipProps} from '@rneui/themed';

export const ControlledTooltip: FC<TooltipProps | any> = props => {
    const [open, setOpen] = useState(false);
  
    return (
      <Tooltip
        visible={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        {...props}
      />
    );
  };