import { onMounted } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import TWEEN from '@tweenjs/tween.js';
import { CSS3DRenderer, CSS3DSprite } from 'three/examples/jsm/renderers/CSS3DRenderer';
import { qiniuUrl } from '@/utils/utils';
/**
 * ------------------------------------------------------
 * threejs 处理
 * ------------------------------------------------------
 */
export function useThreeControl() {
  var camera;
  var renderer;
  var texture;
  var labelRenderer;
  var spotLight;
  var robert;
  var walking = false;
  var mixer = null;
  var animationActions = {};
  var clock = new THREE.Clock();
  var curve;
  var robertTime = 0;
  var errorTime = parseInt(Math.random() * 1000);
  var activeAction;
  function init() {
    // 创建一个场景，它将包含我们所有的元素，如物体，相机和灯光。
    var scene = new THREE.Scene();
    // 设置背景
    const textureBg = new THREE.TextureLoader().load('./imgs/bg.jpg');
    scene.background = textureBg;
    var cubeLoader = new THREE.CubeTextureLoader();
    scene.opacity = 0;

    var cubeLoader = new THREE.CubeTextureLoader();
    var textureLoader = new THREE.TextureLoader();
    var pointsArr = [
      [-42, 0, 10],
      [-31, 0, 10],
      [-21, 0, 10],
      [-21, 0, 8],
      [-21, 0, 1],
      [-10, 0, 1],
      [3, 0, 1],
      [3, 0, -10],
      [3, 0, -18],
      [6, 0, -18],
      [10, 0, -18],
      [10, 0, 0],
      [10, 0, 5],
      [6, 0, 5],
      [-1, 0, 5],
      [-1, 0, 14],
      [-1, 0, 24],
      [0, 0, 24],
      [27, 0, 24],
      [27, 0, 20],
      [27, 0, 18],
      [32, 0, 19],
      [46, 0, 19],
      [46, 0, 8],
      [46, 0, -4],
      [32, 0, -4],
      [25, 0, -4],
      [25, 0, -12],
      [25, 0, -19],
      [30, 0, -19],
      [35, 0, -20],
      [35, 0, -23],
      [35, 0, -26],
      [32, 0, -28],
      [30, 0, -30],
      [20, 0, -30],
      [-3, 0, -30]
    ];
    var RobertPointsArr = [
      [14, 0, 26],
      [28.5, 0, 26],
      [28.5, 0, 20],
      [32, 0, 20],
      [47, 0, 20],
      [47, 0, 8],
      [47, 0, -6],
      [32, 0, -6],
      [27, 0, -6],
      [27, 0, -12],
      [27, 0, -17],
      [30, 0, -17],
      [36.5, 0, -20],
      [36.5, 0, -23],
      [36.5, 0, -26],
      [35, 0, -28],
      [30, 0, -32],
      [20, 0, -32],
      [-3, 0, -32],
      [20, 0, -32],
      [30, 0, -32],
      [36, 0, -30],
      [36, 0, -28],
      [34, 0, -19],
      [27, 0, -19],
      [27, 0, -12],
      [27, 0, -6],
      [32, 0, -6],
      [47, 0, -4],
      [47, 0, 8],
      [47, 0, 20],
      [32, 0, 20],
      [27, 0, 20],
      [27, 0, 20],
      [27, 0, 25],
      [0, 0, 25],
      [-3, 0, 25],
      [-3, 0, 14],
      [-3, 0, 5],
      [6, 0, 5],
      [8, 0, 5],
      [8, 0, 0],
      [8, 0, -16],
      [6, 0, -16],
      [5, 0, -16],
      [5, 0, -10],
      [5, 0, 1],
      [-10, 0, 3],
      [-19.5, 0, 3],
      [-19.5, 0, 8],
      [-19.5, 0, 11.5],
      [-31, 0, 11.5],
      [-42, 0, 11.5],
      [-31, 0, 11.5],
      [-19.5, 0, 11.5],
      [-19.5, 0, 8],
      [-19.5, 0, 3],
      [-10, 0, 3],
      [5, 0, 3],
      [5, 0, -10],
      [5, 0, -16],
      [6, 0, -16],
      [8, 0, -16],
      [8, 0, 0],
      [8, 0, 5],
      [6, 0, 5],
      [-3, 0, 5],
      [-3, 0, 14],
      [-3, 0, 24]
    ];
    // 创建一个摄像机，它定义了我们正在看的地方
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);

    // 将摄像机对准场景的中心
    let cemeraPositions = [
      {
        x: 0,
        y: 100,
        z: 100,
        id: 1
      },
      {
        x: -100,
        y: 100,
        z: 100,
        id: 2
      },
      {
        x: -100,
        y: 100,
        z: 0,
        id: 3
      },
      {
        x: -100,
        y: 100,
        z: -100,
        id: 4
      },
      {
        x: 0,
        y: 100,
        z: -100,
        id: 5
      },
      {
        x: 100,
        y: 100,
        z: -100,
        id: 6
      },
      {
        x: 100,
        y: 100,
        z: 0,
        id: 7
      },
      {
        x: 100,
        y: 100,
        z: 100,
        id: 8
      },
      {
        x: 14,
        y: 20,
        z: 100,
        id: 9
      }
    ];
    camera.position.set(cemeraPositions[0].x, cemeraPositions[0].y, cemeraPositions[0].z);
    camera.lookAt(scene.position);

    // 创建一个聚光灯
    spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(0, 50, 50);
    spotLight.angle = Math.PI / 50;
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 512;
    spotLight.shadow.mapSize.height = 512;

    spotLight.shadow.camera.near = 50;
    spotLight.shadow.camera.far = 200;
    spotLight.shadow.focus = 1;

    scene.add(spotLight);

    // let lightHelper = new THREE.SpotLightHelper(spotLight);
    // scene.add(lightHelper);
    // 创建一个渲染器并设置大小，WebGLRenderer将会使用电脑显卡来渲染场景
    renderer = new THREE.WebGLRenderer({
      antialias: true
    });
    renderer.setClearColor(new THREE.Color('#0c182f'));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // 创建一个3d渲染器
    labelRenderer = new CSS3DRenderer();
    labelRenderer.setSize(window.innerWidth, window.innerHeight);
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '0px';
    labelRenderer.domElement.style.zIndex = '9';
    document.body.appendChild(labelRenderer.domElement);

    var orbit = new OrbitControls(camera, labelRenderer.domElement);
    orbit.autoRotate = false;
    orbit.enableRotate = true;
    orbit.autoRotateSpeed = 0.2;
    var ambientLight = new THREE.AmbientLight('#ffffff', 1);
    scene.add(ambientLight);

    // 创建一个视角动画
    const tweens = [];

    let lastId = 0;

    /**
     * @author: wujian
     * @description:
     * @return {*}
     */
    const initTweenAnimate = () => {
      let points = cemeraPositions;
      points.forEach((item, i) => {
        if (i == points.length - 1) return;
        let nextIdx = i == points.length - 1 ? 0 : i + 1;
        const tw = new TWEEN.Tween(JSON.parse(JSON.stringify(item)))
          .to(JSON.parse(JSON.stringify(points[nextIdx])), 2000)
          .easing(TWEEN.Easing.Linear.None);

        tw.onUpdate((e) => {
          camera.position.z = e.z;
          camera.position.y = e.y;
          camera.position.x = e.x;
        });
        tw.onComplete((e) => {
          console.log(e.id);
          if (e.id == 9 && lastId == 8) {
            // initTweenAnimate();
            // 机器人控制

            robertAnimateControl();

            orbit.enableRotate = true;
          }
          lastId = e.id;
        });

        tweens.push(tw);
        if (i != 0) {
          tweens[i - 1].delay(500).chain(tweens[i]);
        }
        // if( i == cemeraPositions.length - 1) {
        //   tweens[i].chain(tweens[0]);
        // }
      });

      tweens[0].start();
    };

    setTimeout(() => {
      initTweenAnimate();
    }, 2000);
    // robertAnimateControl();

    // 将呈现器的输出添加到HTML元素
    document.getElementById('dom').appendChild(renderer.domElement);

    // 启动动画
    initShuiChang();
    initRobert();
    renderScene();

    function initShuiChang() {
      var loader = new GLTFLoader();
      // 加载水厂
      loader.load(qiniuUrl + '/models%2Fshuichang.glb', function (result) {
        var object = result.scene;
        object.receiveShadow = true;
        console.log(object);
        object.traverse(function (item) {
          console.log(item.name);
          if (item instanceof THREE.Mesh) {
            // item.material.color.set(0x1DA9FC);
            // item.material.transparent = true;
            // item.material.opacity = 0.5;
            shaderObj(item);
          }
        });
        object.scale.set(1, 1, 1);
        object.rotateY(Math.PI);
        scene.add(object);
        // 增加水管
        initTubeModel();
      });
    }
    // 加载机器人
    function initRobert() {
      var loader = new GLTFLoader();
      // assets/models/fang/shapan.glb'
      loader.load(qiniuUrl + '/models/RobotExpressive.glb', function (result) {
        robert = result.scene;
        robert.castShadow = true;
        spotLight.target = robert;
        // robert.traverse(function (item) {
        //   if (item instanceof THREE.Mesh) {
        //     if (item.name.indexOf('Hand') == -1) {
        //       shaderObj(item);
        //     } else {
        //       item.material.color.set(0x1da9fc);
        //       item.material.transparent = false;
        //     }
        //   }
        // });
        curve = createCatmullRomCurve(RobertPointsArr);

        curve.curveType = 'centripetal';
        curve.closed = true;
        // const points = curve.getPoints(2000);
        // const geometry = new THREE.BufferGeometry().setFromPoints(points);
        // const material = new THREE.LineBasicMaterial({
        //   color: 0xff0000
        // });
        // const splineObject = new THREE.Line(geometry, material);
        // scene.add(splineObject);
        let position = curve.getPointAt(robertTime / 8000);
        robert.position.set(position.x, position.y, position.z);

        scene.add(robert);

        mixer = new THREE.AnimationMixer(robert);

        result.animations.map((clip) => {
          animationActions[clip.name] = mixer.clipAction(clip);
        });
        activeAction = animationActions['Dance'];
        activeAction.play();
      });
    }
    // 在屏幕上显示坐标轴
    // var axes = new THREE.AxisHelper(500);
    // scene.add(axes);
    function shaderObj(selectedObjects) {
      const customMaterial = new THREE.ShaderMaterial({
        uniforms: {
          s: {
            type: 'f',
            value: -1.0
          },
          b: {
            type: 'f',
            value: 1.0
          }, //bias 颜色最亮的位置
          p: {
            type: 'f',
            value: 1.0
          }, //power决定了透明度变化速度及方向。
          glowColor: {
            type: 'c',
            value: new THREE.Color(0x1da9fc)
          }
        },
        vertexShader: document.getElementById('vs1').textContent,
        fragmentShader: document.getElementById('fs1').textContent,
        side: THREE.FrontSide,
        blending: THREE.AdditiveBlending
        // transparent: true,
        // opacity: 0.4
      });

      selectedObjects.material = customMaterial;
    }

    function createPath(pointsArr) {
      pointsArr = pointsArr.map((point) => new THREE.Vector3(...point)); // 将参数数组转换成点数组的形式

      // 方法一：自定义三维路径 curvePath
      const path = new THREE.CurvePath();
      for (let i = 0; i < pointsArr.length - 1; i++) {
        const lineCurve = new THREE.LineCurve3(pointsArr[i], pointsArr[i + 1]); // 每两个点之间形成一条三维直线
        path.curves.push(lineCurve); // curvePath有一个curves属性，里面存放组成该三维路径的各个子路径
      }
      return path;
    }
    /**
     * @author: wujian
     * @description: 创建平滑的3d路径
     * @param {*} pointsArr
     * @return {*}
     */
    function createCatmullRomCurve(pointsArr) {
      return new THREE.CatmullRomCurve3(pointsArr.map((point) => new THREE.Vector3(...point)));
    }

    // const count = 200;
    // const gColor = "#28f260";
    // const prop1 = {
    //   width: 416,
    //   height: 112,
    //   pos: [60, 35, 30],
    //   // scale:[24, 6, 0]
    //   scale: [0.24375 * count, 0.065625 * count, 0]
    // };
    // const tab1 = [
    //   ["一级高压泵后压力：", "20.2bar", gColor],
    //   ["一级循环泵后压力：", "0.2bar"]
    // ];

    // const prop2 = {
    //   width: 352,
    //   height: 196,
    //   pos: [-60, 40, 0],
    //   scale: [0.20625 * count, 0.11484375 * count, 0]
    // };

    // const tab2 = [
    //   ["进水情况", ""],
    //   ["进水温度：", "25.6℃", gColor],
    //   ["进水流量：", "2.5m³"],
    //   ["进水电导：", "28.5ms/cm", gColor]
    // ];

    // const prop3 = {
    //   width: 384,
    //   height: 256,
    //   pos: [5, 60, -60],
    //   scale: [0.225 * count, 0.15 * count, 0]
    // };
    // const tab3 = [
    //   ["产水情况", ""],
    //   ["一级回收率：", "58%", gColor],
    //   ["一级产水流量：", "1.75㎡"],
    //   ["一级产水电量：", "980.5/cm", gColor],
    //   ["一级产水电量：", "0.5bar", gColor]
    // ];

    // const prop4 = {
    //   width: 256,
    //   height: 64,
    //   pos: [-85, 30, 40],
    //   scale: [0.15 * count, 0.0375 * count, 0]
    // };
    // const tab4 = [["泵机状态 ", "• 开启", gColor]];

    // const prop5 = {
    //   width: 256,
    //   height: 64,
    //   pos: [-10, 50, 30],
    //   scale: [0.15 * count, 0.0375 * count, 0]
    // };
    // const tab5 = [["阀门状态 ", "• 开启", gColor]];
    // const props = [prop1, prop2, prop3, prop4, prop5];
    // const tabs = [tab1, tab2, tab3, tab4, tab5];

    // handleDatachange();
    // setInterval(handleDatachange, 2000)

    // function handleDatachange() {
    //   let r = (Math.random() * 10 + 20).toFixed(2);
    //   tab2[1][1] = r + "℃";
    //   if (r > 25) tab2[1][2] = "red";
    //   else tab2[1][2] = gColor;

    //   r = Math.random().toFixed(2);
    //   tab3[4][1] = r + "bar";
    //   if (r > 0.5) tab3[4][2] = "red";
    //   else tab3[4][2] = gColor;

    //   if (Math.random() > 0.5) {
    //     tab5[0][1] = "• 开启";
    //     tab5[0][2] = gColor;
    //   } else {
    //     tab5[0][1] = "• 关闭";
    //     tab5[0][2] = "red";
    //   }
    //   console.time("render sprite");
    //   initSprite();
    //   console.timeEnd("render sprite");
    // }

    // function initSprite() {
    //   clearSprite();
    //   (scene.children || []).forEach((v, idx) => {
    //     if (v.type == "Mesh") {
    //       const borderColor = "rgba(39, 179, 236, 1)";
    //       const color = "rgba(255,255,255, 1)";
    //       makeTextSprite1(scene, tabs, props, {
    //         color: color,
    //         borderColor,
    //         backgroundColor: "rgba(255,255,255,0.05)"
    //       });
    //     }
    //   });
    // }

    // 清空雪碧图
    function clearSprite(type = 'Sprite') {
      const children = [];
      (scene.children || []).forEach((v, idx) => {
        if (v.type !== type) {
          children.push(v);
        }
      });
      scene.children = children;
    }

    // 新建标签
    function createLableObj(label) {
      const { id, text, value, vector } = label;
      let laberDiv = document.createElement('div'); //创建div容器
      laberDiv.innerHTML = `<div>
         <div class='label-top'>
           <div class='label-inner'>
             <div class='label-item'></div>
             <div class='label-name label-item' id='label${id}'>${text} ${value} m3</div>
           </div>
           <div class='label-point'></div>
         </div>
         <div class='label-bottom'></div>
       </div>`;
      let pointLabel = new CSS3DSprite(laberDiv);
      pointLabel.position.set(vector.x, vector.y, vector.z);
      return pointLabel;
    }
    // 新建对话框
    function createLDialog(label) {
      const { id, text, vector } = label;
      console.log(vector);
      let laberDiv = document.createElement('div'); //创建div容器
      laberDiv.innerHTML = `<div>
         <div class='label-top'>
           <div class='label-inner'>
             <div class='label-item'></div>
             <div class='label-name label-item' id='robertdialog${id}'>${text.substring(0, 1)}</div>
           </div>
         </div>
         <div class='label-bottom'></div>
       </div>`;
      let pointLabel = new CSS3DSprite(laberDiv);
      pointLabel.position.set(vector.x, vector.y, vector.z);
      let idx = 1;
      let interval = setInterval(() => {
        let dialog = document.getElementById('robertdialog' + id);
        if (dialog) {
          dialog.textContent = text.substring(0, idx++);
        } else {
          clearInterval(interval);
        }
      }, 200);
      return pointLabel;
    }
    const labels = [
      {
        text: '管道流量: ',
        value: '25.00',
        id: 1,
        vector: {
          x: 2.5,
          y: 0.2,
          z: 0
        }
      },
      {
        text: '净水装置流量:',
        value: '25.00',
        id: 2,
        vector: {
          x: 20,
          y: 12,
          z: -24
        }
      },
      {
        id: 3,
        text: '加压设备流量:',
        value: '25.00',
        vector: {
          x: -20,
          y: 9,
          z: 0
        }
      }
    ];
    labels.map((item) => {
      let obj = createLableObj(item);
      obj.scale.set(0.1, 0.1, 0.1);
      scene.add(obj);
    });

    function initTubeModel() {
      var curve = createPath(pointsArr);
      var tubeGeometry = new THREE.TubeGeometry(curve, 1000, 0.5, 100, false);
      var textureLoader = new THREE.TextureLoader();
      texture = textureLoader.load('textures/arrow1.jpg'); //./ZS箭头.svg  ./arrow.jpg
      // 设置阵列模式为 RepeatWrapping
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.x = 50;
      texture.repeat.y = 2;
      texture.offset.y = 0.5;

      var tubeMaterial = new THREE.MeshPhongMaterial({
        map: texture,
        transparent: true,
        color: 0x47d8fa,
        side: THREE.DoubleSide
        //opacity: 0.4,
      });

      // 设置数组材质对象作为网格模型材质参数
      var mesh = new THREE.Mesh(tubeGeometry, tubeMaterial); //网格模型对象Mesh
      mesh.position.y = 2;
      mesh.scale.set(1, 1, 1);
      scene.add(mesh); //网格模型添加到场景中
    }

    setInterval(() => {
      labels.forEach((item) => {
        document.getElementById('label' + item.id).textContent =
          item.text + (20 + parseInt(Math.random() * 100)).toFixed(2) + 'm3';
      });
    }, 2000);

    document.addEventListener('click', onDocumentMouseDown, false);

    function onDocumentMouseDown(event) {
      // 点击屏幕创建一个向量
      var vector = new THREE.Vector3(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1,
        0.5
      );
      vector = vector.unproject(camera); // 将屏幕的坐标转换成三维场景中的坐标
      var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
      var intersects = raycaster.intersectObjects(scene.children, true);
      if (intersects.length > 0) {
        var pos = intersects[0].object.position;
        console.log(intersects[0]);
      }
    }
    /**
     * @author: wujian
     * @description: 切换到下一个动画
     * @param {*} name
     * @param {*} duration
     * @return {*}
     */
    function fadeToAction(name, duration) {
      let previousAction = activeAction;
      activeAction = animationActions[name];

      if (previousAction !== activeAction) {
        previousAction.fadeOut(duration);
      }

      activeAction.reset().setEffectiveTimeScale(1).setEffectiveWeight(1).fadeIn(duration).play();
    }
    /**
     * @author: wujian
     * @description: 机器人动作控制
     * @return {*}
     */
    function robertAnimateControl() {
      // orbit.target = robert.position;
      let position = {
        x: 14,
        y: 20,
        z: 100
      };
      camera.position.set(position.x, position.y, position.z);
      let obj;
      setTimeout(() => {
        let robertLabel = {
          id: 3,
          text: '我要开始检测咯！',
          vector: {
            x: robert.position.x,
            y: robert.position.y + 3,
            z: robert.position.z
          }
        };

        obj = createLDialog(robertLabel);

        obj.scale.set(0.07, 0.07, 0.07);
        scene.add(obj);

        fadeToAction('Wave', 0.2);
      }, 500);
      setTimeout(() => {
        scene.remove(obj);
        //   // 镜头恢复
        const tw = new TWEEN.Tween(
          JSON.parse(
            JSON.stringify({
              x: position.x,
              y: position.y,
              z: position.z,
              tx: robert.position.x,
              ty: robert.position.y,
              tz: robert.position.z
            })
          )
        )
          .to(
            JSON.parse(
              JSON.stringify({
                x: cemeraPositions[0].x,
                y: cemeraPositions[0].y,
                z: cemeraPositions[0].z,
                tx: 0,
                ty: 0,
                tz: 0
              })
            ),
            2000
          )
          .easing(TWEEN.Easing.Linear.None);

        tw.onUpdate((e) => {
          camera.position.set(e.x, e.y, e.z);
          // orbit.target = new THREE.Vector3(e.tx, e.ty, e.tz);
        });
        tw.onComplete((e) => {
          // orbit.target = scene.position;
        });

        tw.start();
        fadeToAction('Walking', 0.2);
        walking = true;
      }, 2500);
    }
    /**
     * @author: wujian
     * @description: 错误检修
     * @return {*}
     */
    function errorControl() {
      // camera.position.set(position.x, position.y, position.z);
      let obj;
      walking = false;
      setTimeout(() => {
        let robertLabel = {
          id: 4,
          text: '发现告警！',
          vector: {
            x: robert.position.x,
            y: robert.position.y + 3,
            z: robert.position.z
          }
        };

        obj = createLDialog(robertLabel);
        obj.scale.set(0.1, 0.1, 0.1);
        scene.add(obj);

        fadeToAction('Wave', 0.2);
      }, 500);

      setTimeout(() => {
        scene.remove(obj);
        fadeToAction('Walking', 0.2);
        walking = true;
        errorTime = errorTime + (parseInt(Math.random() * 8000) % 2000);
        console.log(errorTime);
      }, 2000);
    }

    function renderScene() {
      // lightHelper.update();
      TWEEN.update();
      orbit.update();
      // 使用requestAnimationFrame函数进行渲染
      requestAnimationFrame(renderScene);
      renderer.render(scene, camera);
      labelRenderer.render(scene, camera);
      if (texture) {
        texture.offset.x -= 0.02;
      }

      const t = clock.getDelta();
      if (mixer) {
        mixer.update(t);
      }
      if (walking) {
        robertTime++;
        if (robertTime >= 8000) robertTime = 0;
        if (robertTime == errorTime) {
          errorControl();
        }
        if (curve) {
          const position = curve.getPointAt(robertTime / 8000);
          const position1 = curve.getPointAt((robertTime + 1) / 8000);
          robert.position.set(position.x, position.y, position.z);
          robert.lookAt(position1.x, position1.y, position1.z);
        }
      }
    }

    // 渲染的场景
    renderer.render(scene, camera);
  }

  // 随着窗体的变化修改场景
  function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    labelRenderer.setSize(window.innerWidth, window.innerHeight);
  }
  // 监听窗体调整大小事件
  window.addEventListener('resize', onResize, false);

  onMounted(() => {
    init();
  });
}
