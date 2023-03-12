import './App.css';
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";


export default function Services(label1, label2, label3, htmlElements) {

  if( typeof document.querySelector( '#' + htmlElements.container ) !== undefined
      && !document.querySelector( '#' + htmlElements.container ) === true ){

    let div = document.createElement('div');
    div.id = htmlElements.container;
    document.getElementById('servicesDynamicContent').appendChild(div);
    if( typeof document.querySelector( '#' + htmlElements.canvas ) !== undefined
        && !document.querySelector( '#' + htmlElements.canvas ) === true){
      const CanvasObject = document.createElement('canvas');
      CanvasObject.id     = htmlElements.canvas;
      document.getElementById(htmlElements.container).appendChild(CanvasObject);
      let div = document.createElement('div');
      div.id = htmlElements.labels;
      document.getElementById(htmlElements.container).appendChild(div);
    }

  }

  const canvas = document.querySelector('#' + htmlElements.canvas);
  const renderer = new THREE.WebGLRenderer({canvas, alpha:true});

  const fov = 75;
  const aspect = 2;
  const near = 0.1;
  const far = 50;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 7;

  const controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 0, 0);
  controls.update();

  const scene = new THREE.Scene();

  {
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);
  }

  const boxWidth = 2.5;
  const boxHeight = 2.5;
  const boxDepth = 2.5;
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

  const labelContainerElem = document.querySelector('#' + htmlElements.labels);

  function makeInstance(geometry, color, x, name) {
    const material = new THREE.MeshPhongMaterial({color});

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    cube.position.x = x;

    const elem = document.createElement('div');
    elem.textContent = name;
    labelContainerElem.appendChild(elem);

    return {cube, elem};
  }

  const cubes = [
    makeInstance(geometry, htmlElements.color1,  0, label1),
    makeInstance(geometry, htmlElements.color2, -6, label2),
    makeInstance(geometry, htmlElements.color3,  6, label3),
  ];

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  const tempV = new THREE.Vector3();

  function render(time) {
    time *= 0.001;

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    cubes.forEach((cubeInfo, ndx) => {
      const {cube, elem} = cubeInfo;
      const speed = 1 + ndx * .1;
      const rot = time * speed;
      cube.rotation.x = rot;
      cube.rotation.y = rot;

      cube.updateWorldMatrix(true, false);
      cube.getWorldPosition(tempV);

      tempV.project(camera);

      const x = (tempV.x *  .5 + .5) * canvas.clientWidth;
      const y = (tempV.y * -.5 + .5) * canvas.clientHeight;

      elem.style.transform = `translate(-50%, -50%) translate(${x}px,${y}px)`;
    });

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}
