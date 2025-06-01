/// <reference types="react" />

import { JSX as ReactJSX } from 'react';

declare namespace JSX {
  interface IntrinsicElements extends ReactJSX.IntrinsicElements {
    img: ReactJSX.IntrinsicElements['img'];
    h3: ReactJSX.IntrinsicElements['h3'];
    span: ReactJSX.IntrinsicElements['span'];
    div: ReactJSX.IntrinsicElements['div'];
    select: ReactJSX.IntrinsicElements['select'];
    option: ReactJSX.IntrinsicElements['option'];
    form: ReactJSX.IntrinsicElements['form'];
    main: ReactJSX.IntrinsicElements['main'];
  }
}
