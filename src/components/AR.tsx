import React, { FC } from "react";

const AR: FC = () => {
  let renderer: THREE.WebGLRenderer;
  let scene: THREE.Scene;
  let camera: THREE.Camera;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let arToolkitSource: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let arToolkitContext: any;

  const onResize = (wrapper: HTMLDivElement) => {
    const { clientWidth, clientHeight } = wrapper;
    renderer.setSize(clientWidth, clientHeight);
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
    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setClearColor(new THREE.Color(), 0);
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
    });

    arToolkitContext = new THREEx.ArToolkitContext({
      detectionMode: "mono",
    });

    arToolkitSource.init(() => {
      wrapper.appendChild(arToolkitSource.domElement);
      arToolkitSource.domElement.removeAttribute("style");
      setTimeout(() => onResize(wrapper), 2000);
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

  return <div ref={init} />;
};

export default AR;
