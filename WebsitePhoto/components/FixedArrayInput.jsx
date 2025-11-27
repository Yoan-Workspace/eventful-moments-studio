import React from 'react'

export default function FixedArrayInput(props) {
  const { renderDefault, type } = props;
  // allow schema to pass an option: options: { maxHeight: 300 }
  const maxHeight = type?.options?.maxHeight || 300;

  const style = {
    maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight,
    overflowY: 'auto',
    paddingRight: '8px',
  };

  if (!renderDefault) {
    return <div style={style}>{/* fallback: nothing to render */}</div>;
  }

  // Render the default input inside our constrained box
  return <div style={style}>{renderDefault(props)}</div>;
}
