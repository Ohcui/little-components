import { BasicSlider } from "../../components/slider/Basic";
import {FC, useState} from "react";

export const BasicDemo: FC = () => {
  const [value, setValue] = useState(12);
  const maximum = 200;

  return (
      <div>
        <input value={value.toString()} type="number" onChange={(ev) => setValue(parseInt(ev.target.value))} />
        <BasicSlider value={value} maximum={maximum} onChange={setValue} />
      </div>
  )
}
