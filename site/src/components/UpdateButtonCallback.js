import { useState } from 'react';


function UpdateButton(props) {
  const [hovered, setHovered] = useState(false);

  return (
    <div style={{position: "relative"}}>
      <img
        src={hovered ? props.hoverImage : props.defaultImage}
        style={{
          cursor: 'pointer',
          right: "0px",
          position: "absolute",
          ...props.style,
        }}
        onClick={props.onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      />
    </div>
  );
}

export default UpdateButton;
