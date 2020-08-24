import React, { FC, useEffect } from "react";
import { File } from "../api";

import styles from "../scss/components/ar.scss";

type Props = {
  files: Array<File>;
};

// TODO: 現在未使用引数。後で使用すること。
const AR: FC<Props> = ({ files }) => {
  let renderer: THREE.WebGLRenderer;
  let scene: THREE.Scene;
  let camera: THREE.Camera;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let arToolkitSource: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let arToolkitContext: any;

  const onResize = () => {
    const { innerWidth, innerHeight } = window;
    renderer.setSize(innerWidth, innerHeight);
    arToolkitSource.onResizeElement();
    arToolkitSource.copyElementSizeTo(renderer.domElement);
    if (arToolkitContext.arController !== null) {
      arToolkitSource.copyElementSizeTo(arToolkitContext.arController.canvas);
    }
  };

  const animate = () => {
    requestAnimationFrame(animate);
    if (arToolkitSource.ready !== false) {
      arToolkitContext.update(arToolkitSource.domElement);
    }
    renderer.render(scene, camera);
  };

  const init = (wrapper: HTMLDivElement) => {
    const { innerWidth, innerHeight } = window;
    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setClearColor(new THREE.Color(), 0);
    renderer.setSize(innerWidth, innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    wrapper.appendChild(renderer.domElement);

    scene = new THREE.Scene();
    camera = new THREE.Camera();
    scene.add(camera);

    arToolkitSource = new THREEx.ArToolkitSource({
      sourceType: "webcam",
      sourceWidth: innerWidth,
      sourceHeight: innerHeight,
      displayWidth: innerWidth,
      displayHeight: innerHeight,
    });

    arToolkitContext = new THREEx.ArToolkitContext({
      detectionMode: "mono",
    });

    arToolkitSource.init(() => {
      wrapper.appendChild(arToolkitSource.domElement);
      setTimeout(onResize, 2000);
    });

    arToolkitContext.init(() => {
      camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
    });

    const markerRoot = new THREE.Group();
    scene.add(markerRoot);
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshNormalMaterial({ opacity: 0.5 }),
    );
    mesh.position.y += 0.5;
    markerRoot.add(mesh);
    new THREEx.ArMarkerControls(arToolkitContext, markerRoot, {
      type: "pattern",
      patternUrl: THREEx.ArToolkitContext.baseURL + "../data/data/patt.hiro",
    });

    animate();
  };

  useEffect(() => {
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return <div className={styles.ar} ref={init} />;
};

export default AR;
