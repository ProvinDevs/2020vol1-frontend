import React, { FC, useEffect } from "react";
import { getMarkerPatternUrl } from "../markers";
import { File } from "../api";

import styles from "../scss/components/ar.scss";

type Props = {
  files: Array<File & { sourceUrl: string }>;
};

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

    const textureLoader = new THREE.TextureLoader();
    // TODO: これは画像を想定しています。動画や他ファイル対応は後でやります。
    files.map(async (file) => {
      const texture = await textureLoader.loadAsync(file.sourceUrl);
      const { width, height } = texture.image;
      const markerRoot = new THREE.Group();
      scene.add(markerRoot);
      const geometry = new THREE.PlaneGeometry(1, 1);
      const material = new THREE.MeshBasicMaterial({ map: texture });
      const mesh = new THREE.Mesh(geometry, material);
      if (width > height) {
        mesh.scale.set(width / height, 1, 1);
      } else {
        mesh.scale.set(1, height / width, 1);
      }
      mesh.rotation.x = -Math.PI / 2;
      markerRoot.add(mesh);

      const markerUrl = getMarkerPatternUrl(file);
      if (markerUrl == null) return;
      return new THREEx.ArMarkerControls(arToolkitContext, markerRoot, {
        type: "pattern",
        patternUrl: markerUrl,
      });
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
