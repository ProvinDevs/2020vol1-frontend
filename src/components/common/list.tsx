import React, { FC } from "react";
import styles from "../../scss/components/common/featureList.scss";

export interface Feature {
  id: number;
  title: string;
  image: string;
  explanation: string;
}

interface FreatureListProps {
  Features: Feature[];
}

const FreatureList: FC<FreatureListProps> = ({ Features }) => (
  <>
    {Features.map((c) => (
      <div className={styles.box} key={c.id}>
        <div className={styles.text}>
          <h3 className={styles.title}>{c.title}</h3>
          <p className={styles.explanation}>{c.explanation}</p>
        </div>
        <div className={styles.pict}>
          <img src={`${c.image}`} alt="" />
        </div>
      </div>
    ))}
  </>
);

export default FreatureList;
