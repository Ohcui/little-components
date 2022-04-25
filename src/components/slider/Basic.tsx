import { FC, MouseEventHandler, useRef } from "react";

const WIDTH = 400;
const HEIGHT = 30;
const HIGH_LIGHT_COLOR_1 = '#ccc';
const HIGH_LIGHT_COLOR_2 = '#aaa';
const HANDLE_W = 20;

interface Props {
  value: number;
  maximum: number;
  onChange: (newValue: number) => void;
}

/**
 * Basic Slider
 * Renders a handle float on track
 * Triggers onChange when handle change position with new value
 * @param value
 * @param maximum
 * @param onChange
 * @constructor
 */
export const BasicSlider: FC<Props> = ({ value, maximum, onChange }) => {
  const percentage = value / maximum;

  const onPercentageChange = (newPercentage: number) => {
    onChange(newPercentage * maximum);
  }

  const domTrack = useRef<HTMLDivElement>(null);

  const startListeningMouseMove: MouseEventHandler = (ev) => {
    const startX = ev.pageX;

    const onMove = (mev: MouseEvent) => {
      const mouseX = mev.pageX;
      const offsetH = mouseX - startX;
      if (domTrack.current == null) {
        throw new Error('No track element found');
      } else {
        onPercentageChange(percentage + offsetH / domTrack.current.getBoundingClientRect().width);
      }
    }

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', () => {
      window.removeEventListener('mousemove', onMove);
    });
  };

  return (
    <div className="container" style={{ width: WIDTH, height: HEIGHT, border: '1px solid ' + HIGH_LIGHT_COLOR_1 }}>
      <div className="track" ref={domTrack} style={{ width: WIDTH, height: HEIGHT }}>
        <div className="value" style={{
          width: (percentage * WIDTH),
          height: HEIGHT, backgroundColor: HIGH_LIGHT_COLOR_1,
          position: 'relative'
        }}>
          <div className="handle" style={{
            width: HANDLE_W,
            height: HANDLE_W,
            position: 'absolute',
            right: -(HANDLE_W / 2),
            backgroundColor: HIGH_LIGHT_COLOR_2
          }}
             onMouseDown={startListeningMouseMove}
          />
        </div>
      </div>
    </div>
  )
}
