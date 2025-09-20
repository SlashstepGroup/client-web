import React from "react";
import { skeleton as skeletonStyle } from "./Skeleton.module.css";

function Skeleton({width, height}: {width?: number, height?: number}) {

  return (
    <section className={skeletonStyle} style={{width, height}} />
  );

}

export default React.memo(Skeleton);