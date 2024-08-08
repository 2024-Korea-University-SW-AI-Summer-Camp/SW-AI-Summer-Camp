import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Depth2Frame = ({
  className = "",
  vector0,
  vector1,
  depth3Frame1Left,
  depth3Frame1Top,
  propWidth,
}) => {
  const depth7Frame0Style = useMemo(() => {
    return {
      left: depth3Frame1Left,
      top: depth3Frame1Top,
    };
  }, [depth3Frame1Left, depth3Frame1Top]);

  const depth3Frame1Style = useMemo(() => {
    return {
      width: propWidth,
    };
  }, [propWidth]);

  return (
    <header
      className={`self-stretch border-gainsboro-100 border-b-[1px] border-solid box-border flex flex-row items-start justify-start pt-[1.281rem] px-[2.5rem] pb-[1.25rem] gap-[1rem] top-[0] z-[99] sticky max-w-full text-left text-[1.125rem] text-white font-noto-serif ${className}`}
    >
      <Link to="/" className="flex flex-col items-start justify-start pt-[0.218rem] px-[0rem] pb-[0rem]">
        <div className="w-[1.2rem] h-[1.2rem] relative overflow-hidden shrink-0">
          <img
            className="absolute top-[0rem] left-[0rem] w-full h-full"
            alt="토란 로고"
            src="/logo.png"
          />
          <img
            className="absolute top-[0rem] left-[0rem] w-full h-full z-[1]"
            loading="lazy"
            alt="토란 로고"
            src="/logo.png"
          />
          <div
            className="absolute top-[31.813rem] left-[142rem] w-[0.938rem] h-[0.938rem] hidden"
            style={depth7Frame0Style}
          />
        </div>
      </Link>
      <Link 
        to="/" 
        className="[text-decoration:none] relative leading-[1.438rem] font-bold text-[inherit] inline-block min-w-[7.125rem] whitespace-nowrap"
      >
        토란
      </Link>
      <div
        className="h-[2.5rem] w-[65.875rem] hidden max-w-full"
        style={depth3Frame1Style}
      />
    </header>
  );
};

Depth2Frame.propTypes = {
  className: PropTypes.string,
  vector0: PropTypes.string,
  vector1: PropTypes.string,

  /** Style props */
  depth3Frame1Left: PropTypes.any,
  depth3Frame1Top: PropTypes.any,
  propWidth: PropTypes.any,
};

export default Depth2Frame;