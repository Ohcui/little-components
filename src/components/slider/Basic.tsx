import { FC, MouseEventHandler, useRef } from "react";

const WIDTH = 400;
const HEIGHT = 30;
const HIGH_LIGHT_COLOR_1 = '#ccc';
const HIGH_LIGHT_COLOR_2 = '#aaa';
const HANDLE_W = 20;

interface Props {
  percentage: number;
  onPercentageChange: (newPercentage: number) => void;
}

/**
 * Basic Slider
 * Renders a handle floating on track
 * Triggers onPercentageChange when handle change position with new value
 * @param percentage
 * @param onPercentageChange
 * @constructor
 */
export const BasicSlider: FC<Props> = ({ percentage, onPercentageChange }) => {
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
        <div className="value" style={{ height: HEIGHT, backgroundColor: HIGH_LIGHT_COLOR_1, position: 'relative',
          width: (percentage * WIDTH),
        }}>
          <div className="handle" style={{ width: HANDLE_W, height: HANDLE_W, position: 'absolute',
            right: -(HANDLE_W / 2), backgroundColor: HIGH_LIGHT_COLOR_2
          }}
             onMouseDown={startListeningMouseMove}
          />
        </div>
      </div>
    </div>
  )
}
