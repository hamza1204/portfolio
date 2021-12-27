var animating = 0
var physicsLoaded = false
var array = ["first-section", "second-section", "third-section", "fourth-section", "fifth-section"]
var page1 = document.getElementById("first-section")
page1.style.top = "0px"
var page2 = document.getElementById("second-section")
page2.style.top = "100vh"
var page3 = document.getElementById("third-section")
page3.style.top = "100vh"
var page4 = document.getElementById("fourth-section")
page4.style.top = "100vh"
var page4 = document.getElementById("fifth-section")
page4.style.top = "100vh"
var started = false


function onDown(curr, next, time) {

    document.getElementById(array[next]).style.display = "flex";
    gsap.to("#" + array[curr], {
        ease: Power1.easeInOut,
        duration: time,
        top: "-100vh",
        onComplete: () => {
            document.getElementById(array[curr]).style.display = "none";
        }
    })

    gsap.to("#" + array[next], {
        ease: Power1.easeInOut,
        duration: time,
        top: "0px",
        onComplete: () => {
            document.getElementById(array[curr]).style.top = "100vh";
        }
    })
}

function goUp(current_page, next_page, time) {
    document.getElementById(array[next_page]).style.display = "flex";
    document.getElementById(array[next_page]).style.top = "-100vh";
    gsap.to("#" + array[current_page], {
        ease: Power1.easeInOut,
        duration: time,
        top: "100vh",
    })

    gsap.to("#" + array[next_page], {
        ease: Power1.easeInOut,
        duration: time,
        top: "0px",
        onComplete: () => {
            document.getElementById(array[current_page]).style.display = "-100vh";
        }
    })
}


var currentpage = 0;
document.addEventListener('wheel', (e) => {
    if (started == true) {
        if (animating == 0) {
            if (e.deltaY < 0) {
                if (currentpage > 0) {
                    animating += 1;
                    scrollFunctionUp(currentpage, currentpage - 1)
                    goUp(currentpage, currentpage - 1, 1)
                    currentpage--
                    compilation(currentpage)

                }
            } else if (e.deltaY > 0) {
                if (currentpage <= 3) {
                    animating += 1;
                    scrollFunction(currentpage, currentpage + 1)
                    onDown(currentpage, currentpage + 1, 1)
                    currentpage++

                    compilation(currentpage)
                }
            }
            setTimeout(() => {
                animating = 0
            }, 1500);
        }
    }
})


// sliderjs

var slide = [{
    heading: "this is heading1",
    link: "https://www.google.com/",
    images: '/bg1.jpg'

}, {
    heading: "this is heading2",
    link: "https://www.facebook.com/",
    images: '/bg2.jpg'
},
{
    heading: "this is heading3",
    link: "https://www.google.com/",
    images: '/bg3.jpg'
},
{
    heading: "this is heading4",
    link: "https://www.youtube.com/",
    images: '/bg4.jpg'
},
{
    heading: "this is heading5",
    link: "https://www.youtube.com/",
    images: '/bg1.jpg'
}
]

slide.map(function (e, i) {

    var sliderinner = document.getElementById('slider-inner');

    var demo = document.createElement('div');
    demo.classList = 'democlass';
    demo.id = `demo${i}`;

    if (i == 0) {
        demo.style.display = 'block'
    } else if (i != 0) {
        demo.style.display = 'none'
    }

    sliderinner.appendChild(demo)

    var anchor = document.createElement('a')
    anchor.href = e.link
    anchor.target = "_blank"

    var activeclasses = document.createElement('div')
    activeclasses.classList = e.images
    activeclasses.id = 'activecommonid'

    activeclasses.style.backgroundImage = `url(${e.images})`

    anchor.appendChild(activeclasses)
    demo.appendChild(anchor)
    sliderinner.appendChild(demo)


    var para = document.createElement('h1')
    para.innerHTML = e.heading
    para.classList = 'democontent'
    anchor.appendChild(para)

    demo.appendChild(anchor)
    sliderinner.appendChild(demo)
})



// var imgid = ['demo', 'demo2', 'demo3', 'demo4', 'demo5']

function previousImg(active, nonactive) {
    if (active < nonactive) {
        document.getElementById(`demo${nonactive}`).style.display = "block";


        gsap.to("#" + `demo${active}`, {
            ease: Power1.easeInOut,
            duration: 1,
            left: "-65vw",
            onComplete: () => {
                if (active == 0) {
                    document.getElementById('goleft').style.display = 'block'
                }
                horizontalanimating = false
            }
        })
        console.log(active + "active")
        document.getElementById(`demo${nonactive}`).style.left = "65vw";

        gsap.to("#" + `demo${nonactive}`, {
            ease: Power1.easeInOut,
            duration: 1,
            left: "0px",
            onComplete: () => {
                horizontalanimating = false
                document.getElementById(`demo${active}`).style.display = "none";
                if (nonactive == slide.length - 1) {
                    document.getElementById('goright').style.display = 'none'
                }
            }
        })
        console.log(nonactive + "nonactive")
    } else {
        document.getElementById(`demo${nonactive}`).style.display = "block";

        gsap.to("#" + `demo${active}`, {
            ease: Power1.easeInOut,
            duration: 1,
            left: "65vw",
            onComplete: () => {
                horizontalanimating = false
                if (nonactive < slide.length) {
                    document.getElementById('goright').style.display = 'block'
                }
            }
        })
        console.log(active + "active")

        document.getElementById(`demo${nonactive}`).style.left = "-65vw";

        gsap.to("#" + `demo${nonactive}`, {
            ease: Power1.easeInOut,
            duration: 1,
            left: "0px",
            onComplete: () => {
                document.getElementById(`demo${active}`).style.display = "none";

                horizontalanimating = false
                if (nonactive == '0') {
                    document.getElementById('goleft').style.display = 'none'
                }
            }
        })
        console.log(nonactive + "nonactive")
    }
}


var active = 0;
var nonactive = 0;
var horizontalanimating = false

function previousImgPlus() {

    if (!horizontalanimating) {
        if (active < slide.length) {
            horizontalanimating = true
            previousImg(active, active + 1)
            active++
            sound.play()
            movingBalls('forward')
        }

    }

}

function previousImgSub() {
    if (!horizontalanimating) {

        if (active > 0) {
            horizontalanimating = true

            previousImg(active, active - 1)
            active--
            movingBalls('backward')
            sound.play()
        }
    }
}









var forwardSlowDown = false
function movingBalls(direction) {
    scene.traverse(function (child) {
        if (child.isMesh) {

            if (child.name == 'balls' || child.name == 'Bluebox' || child.name == 'plane') {

                if (direction == 'forward') {
                    child.body.applyForceY(2)
                    child.body.applyForceX(15)

                    collide = false
                    setTimeout(() => {

                        collide = true

                        console.log('speedslow')
                    }, 500);


                }
                else if (direction == 'backward') {
                    child.body.applyForceY(2)
                    child.body.applyForceX(-15)
                    forwardSlowDown = true
                    collide = false


                    setTimeout(() => {
                        collide = true

                        console.log('speedslow backwards')
                    }, 500);



                }
            }
        }
    });
}



var sticky = ["home", "about", "projects", "skill", "contact"]
var denotion = ["homedenotion", "aboutdenotion", "projectsdenotion", "skilldenotion", "contactdenotion"]

function scrollFunction(activ_page, nonactiv_page) {
    document.getElementById(sticky[nonactiv_page]).style.fontSize = "25px";
    document.getElementById(sticky[nonactiv_page]).style.fontWeight = "600";

    document.getElementById(sticky[activ_page]).style.fontSize = '12px'
    document.getElementById(sticky[activ_page]).style.fontWeight = 'normal'


    var nonactv = document.getElementById(denotion[nonactiv_page]);
    nonactv.classList.add('commonchange')
    nonactv.classList.remove("stickyClass")


    var activ = document.getElementById(denotion[activ_page]);
    activ.classList.add('stickyClass')
    activ.classList.remove('commonchange')

}

function scrollFunctionUp(active_page, nonactive_page) {

    document.getElementById(sticky[nonactive_page]).style.fontSize = '25px'
    document.getElementById(sticky[nonactive_page]).style.fontWeight = '600'

    var upnonactiv = document.getElementById(denotion[nonactive_page]);
    upnonactiv.classList.add('commonchange')
    upnonactiv.classList.remove('stickyClass')



    var upactiv = document.getElementById(denotion[active_page]);
    upactiv.classList.add('stickyClass')
    upactiv.classList.remove('commonchange')

    document.getElementById(sticky[active_page]).style.fontSize = '12px'
    document.getElementById(sticky[active_page]).style.fontWeight = 'normal'

}

var cubeFallen = false;



window.addEventListener('keydown', (event) => {
    if (started == true) {
        if (animating == 0) {
            if (event.code == 'ArrowUp') {
                if (currentpage > 0) {
                    animating += 1;
                    scrollFunctionUp(currentpage, currentpage - 1, 1)
                    goUp(currentpage, currentpage - 1, 1)
                    currentpage--
                    console.log(currentpage + " currentpage")

                    compilation(currentpage)

                }




            } else if (event.code == 'ArrowDown') {



                if (currentpage <= 3) {
                    animating += 1;
                    scrollFunction(currentpage, currentpage + 1, 1)
                    onDown(currentpage, currentpage + 1, 1)
                    currentpage++
                    console.log(currentpage + " currentpage")

                    compilation(currentpage)

                }



            }
            setTimeout(() => {
                animating = 0;
            }, 1000);
        }
    }
})


var array = ["first-section", "second-section", "third-section", "fourth-section", "fifth-section"]
var increment = 0;

function onclicks(value) {
    if (started == true) {
        if (animating == 0) {
            if (currentpage > value) {
                if (currentpage - value > 1) {
                    animating += 1;
                    scrollFunctionUp(currentpage, value)
                    goUp(currentpage, value, 2)
                    currentpage = value
                } else if (currentpage - value == 1) {
                    animating += 1;
                    scrollFunctionUp(currentpage, value)
                    goUp(currentpage, value, 1)
                    currentpage = value

                }
                compilation(currentpage)
            } else if (currentpage < value) {
                if (currentpage - value < -1) {
                    animating += 1;
                    scrollFunction(currentpage, value)
                    onDown(currentpage, value, 2)
                    currentpage = value
                    console.log(value + " checking")
                } else if (currentpage - value == -1) {
                    animating += 1;
                    scrollFunction(currentpage, value)
                    onDown(currentpage, value, 1)
                    currentpage = value
                    console.log(value + ' down 1sec')


                }
                compilation(currentpage)
            }
            setTimeout(() => {
                animating = 0
            }, 1000);
        }
    }
}


// Ontouch

var subdivs = ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8", "t9"]

// function subFunction() {
//     if (subdivs.includes('t1')) {

//     }
// }
// subFunction()
document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

var yDown = null;


function getTouches(evt) {
    return evt.touches || // browser API
        evt.originalEvent.touches; // jQuery
}

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];
    yDown = firstTouch.clientY;


};

function handleTouchMove(evt) {
    if (!subdivs.includes(evt.target.id)) {
        console.log("checked")

        if (!yDown) {
            return;
        }

        var yUp = evt.touches[0].clientY;

        var yDiff = yDown - yUp;

        if (Math.abs(yDiff) > Math.abs(yDiff)) { /*most significant*/
            // if (xDiff > 0) {
            //     /* right swipe */
            // } else {
            //     /* left swipe */
            // }
        } else {
            if (yDiff > 0) {
                scrollFunction(currentpage, currentpage + 1)
                onDown(currentpage, currentpage + 1, 1)
                currentpage++
                compilation(currentpage)
            } else {
                scrollFunctionUp(currentpage, currentpage - 1, 1)
                goUp(currentpage, currentpage - 1, 1)
                currentpage--
                /* up swipe */
                compilation(currentpage)
            }
        }
        /* reset values */
        // xDown = null;
        yDown = null;
    }
};

function generate(min, max) {

    return Math.floor(Math.random() * (max - min + 1)) + min
}



const { AmmoPhysics, PhysicsLoader } = ENABLE3D
var physics
const clock = new THREE.Clock()
let condition = true;


function setupScene() {
    const DPR = window.devicePixelRatio
    renderer.setPixelRatio(Math.min(2, DPR))


    // scene.add(new THREE.HemisphereLight(0xffffbb, 0x080820, 1))
    // scene.add(new THREE.AmbientLight(0x666666))
    // const light = new THREE.DirectionalLight(0xdfebff, 0.2)
    // light.position.set(50, 200, 100)
    // light.position.multiplyScalar(1.3)

    // physics
    physics = new AmmoPhysics(scene)
    physics.debug.enable(false)
    const { factory } = physics


    // extract the object factory from physics
    // the factory will make/add object without physics

    // blue box




    // green sphere
    // const geometry = new THREE.BoxGeometry()
    const material = new THREE.MeshLambertMaterial({ color: 0xff0000, transparent: true, opacity: 0 })
    const textureloader = new THREE.TextureLoader();
    const texture = textureloader.load('/gradient_applied.jpg')



    const groundmaterial = new THREE.MeshLambertMaterial({ map: texture })
    const geometry1 = new THREE.BoxGeometry(60, 1, 20)
    const ground = new THREE.Mesh(geometry1, groundmaterial)
    ground.position.set(0, -6, 0)
    scene.add(ground)
    ground.name = 'plane'

    const ground2 = new THREE.Mesh(geometry1, material)
    ground2.position.set(10, 4, 0)
    ground2.rotation.set(0, 0, Math.PI / 2)

    const ground3 = new THREE.Mesh(geometry1, material)
    ground3.position.set(-10, 4, 0)
    ground3.rotation.set(0, 0, Math.PI / 2)

    const ground4 = new THREE.Mesh(geometry1, material)
    ground4.position.set(0, 4, -10)
    ground4.rotation.set(0, Math.PI / 2, Math.PI / 2)

    const ground5 = new THREE.Mesh(geometry1, material)
    ground5.position.set(0, 4, 10)
    ground5.rotation.set(0, Math.PI / 2, Math.PI / 2)

    const ground6 = new THREE.Mesh(geometry1, material)
    ground6.position.set(0, 14, 0)

    ground.visible = true
    scene.add(ground)
    physics.add.existing(ground, { mass: 100 })
    ground.body.setCollisionFlags(2) // make it kinematic
    ground.body.setRestitution(2.5)


    ground2.visible = false
    scene.add(ground2)
    physics.add.existing(ground2, { mass: 10 })
    ground2.body.setCollisionFlags(2) // make it kinematic

    ground3.visible = false
    scene.add(ground3)
    physics.add.existing(ground3, { mass: 10 })
    ground3.body.setCollisionFlags(2) // make it kinematic



    ground4.visible = false
    scene.add(ground4)
    physics.add.existing(ground4, { mass: 10 })
    ground4.body.setCollisionFlags(2) // make it kinematic

    ground5.visible = false
    scene.add(ground5)
    physics.add.existing(ground5, { mass: 10 })
    ground5.body.setCollisionFlags(2) // make it kinematic

    ground6.visible = false
    scene.add(ground6)
    physics.add.existing(ground6, { mass: 10 })
    ground6.body.setCollisionFlags(2) // make it kinematic















    const icongeometry = new THREE.IcosahedronGeometry(1, 15);
    var allColors = [0xcc00ff, 0x0000ff, 0xff6a00, 0xff0000, 0xfc7a00, 0xC71585, 0xff0051, 0x008000, 0x8B008B, 0x8B4513]

    for (let i = 0; i < 10; i++) {

        function randomIntFromInterval(min, max) { // min and max included 
            return Math.floor(Math.random() * (max - min + 1) + min)
        }

        var randomNo = generate(0, 9)
        // var randomNo = 9

        console.log(randomNo)

        // const colors = new THREE.Color(allColors[randomNo]);
        // console.log(colors)
        // color.setHSL( Math.random(), 0.7, Math.random() * 0.2 + 0.05 );

        const material = new THREE.MeshBasicMaterial({ color: allColors[randomNo] });

        // if (randomvalue < 0.5) {
        const sphere = new THREE.Mesh(icongeometry, material);
        sphere.name = 'balls'
        sphere.position.x = generate(-5, 5);
        sphere.position.y = generate(10, 13);
        sphere.position.z = Math.random() * 10 - 5;

        const pointlight = new THREE.PointLight(allColors[randomNo], 0.4)
        // pointlight.target.position.set(0,-10,0)
        pointlight.name = 'lightssss'

        pointlight.position.set(sphere.position.x, sphere.position.y - 2, sphere.position.z)
        sphere.add(pointlight)

        // sphere.add( pointlight.target );



        scene.add(sphere)
        physics.add.existing(sphere)

        sphere.position.normalize().multiplyScalar(Math.random() * 4.0 + 2.0);
        sphere.scale.setScalar(Math.random() * Math.random() + 0.5);
        sphere.layers.enable(BLOOM_SCENE);
        sphere.body.setRestitution(0.5)

        checkCollisions: true

        sphere.body.setGravity(0, 0, 0);

        // if (condition !== true) {
        //     sphere.body.setGravity(0, 0, 0);
        // }



        // }
        // else if (randomvalue > 0.5) {

        //     const cube = new THREE.Mesh(cubegeometry, material);

        //     cube.position.x = Math.random() * 10 - 8;
        //     cube.position.y = 10;
        //     cube.position.z = Math.random() * 10 - 8;
        //     scene.add(cube);
        //     physics.add.existing(cube)
        //     // cube.body.setGravity(0, -1, 0);
        //     cube.body.setRestitution(1)
        //     cube.position.normalize().multiplyScalar(Math.random() * 4.0 + 2.0);
        //     cube.scale.setScalar(Math.random() * Math.random() + 0.5);
        //     if (Math.random() < 25) cube.layers.enable(BLOOM_SCENE);
        // }




        console.log('sphere loading...')

    }
    // physics.add.collider(balls, event => {
    //     console.log(`redBox and greenBox: ${event}`)
    // })

    console.log('ground is loading...')
    render()
}


function cubeFall() {
    const cubegeometry = new THREE.BoxGeometry(4, 4, 4)
    const cubematerial = new THREE.MeshBasicMaterial({ color: 0x0000ff })
    const cube = new THREE.Mesh(cubegeometry, cubematerial)
    cube.name = 'Bluebox'
    cube.position.set(0, 11, 0)
    cube.rotation.set(3, 6, 4)
    scene.add(cube)
    physics.add.existing(cube)
    checkCollisions: true

}
PhysicsLoader('/lib/ammo/kripken', () => setupScene())

console.log(`three.js version "${THREE.REVISION}"`)







const ENTIRE_SCENE = 0, BLOOM_SCENE = 1;

const bloomLayer = new THREE.Layers();
bloomLayer.set(BLOOM_SCENE);

const params = {
    exposure: 0.5,
    bloomStrength: 3,
    bloomThreshold: 0,
    bloomRadius: 0.5,
    scene: "Scene with Glow"
};

const darkMaterial = new THREE.MeshBasicMaterial({ color: "black" });
const materials = {};

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.toneMapping = THREE.ReinhardToneMapping;
document.body.appendChild(renderer.domElement);
renderer.domElement.className = 'render'
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 200);
camera.position.set(1.5, -2, 15);
// camera.lookAt(0, 0, 0);

// const controls = new THREE.OrbitControls(camera, renderer.domElement);
// controls.maxPolarAngle = Math.PI * 0.5;
// controls.minDistance = 1;
// controls.maxDistance = 100;

scene.add(new THREE.AmbientLight(0x404040));

const renderScene = new THREE.RenderPass(scene, camera);

const bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
bloomPass.threshold = params.bloomThreshold;

bloomPass.strength = params.bloomStrength;

bloomPass.radius = params.bloomRadius;

const bloomComposer = new THREE.EffectComposer(renderer);
bloomComposer.renderToScreen = false;
bloomComposer.addPass(renderScene);
bloomComposer.addPass(bloomPass);

const finalPass = new THREE.ShaderPass(
    new THREE.ShaderMaterial({
        uniforms: {
            baseTexture: { value: null },
            bloomTexture: { value: bloomComposer.renderTarget2.texture }
        },
        vertexShader: document.getElementById('vertexshader').textContent,
        fragmentShader: document.getElementById('fragmentshader').textContent,
        defines: {}
    }), "baseTexture"
);
finalPass.needsSwap = true;

const finalComposer = new THREE.EffectComposer(renderer);
finalComposer.addPass(renderScene);
finalComposer.addPass(finalPass);

const raycaster = new THREE.Raycaster();

const mouse = new THREE.Vector2();

// window.addEventListener('pointerdown', onPointerDown);






window.onresize = function () {

    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);

    bloomComposer.setSize(width, height);
    finalComposer.setSize(width, height);
};



function disposeMaterial(obj) {

    if (obj.material) {

        obj.material.dispose();

    }

}
var collide = false;
var buttons = document.getElementById('buttons');
var loading = document.getElementById("loading")
function render() {
    if (window.innerWidth < 1122) {
        absluteDisplayNone()
    } else if (entersite == true && window.innerWidth > 1122) {
        absluteDisplay()
    }

    switch (params.scene) {

        case 'Scene only':
            renderer.render(scene, camera);
            break;
        case 'Glow only':
            renderBloom(false);
            break;
        case 'Scene with Glow':
        default:
            // render scene with bloom
            renderBloom(true);

            // render the entire scene, then render bloom scene on top
            finalComposer.render();
            break;
    }

    if (physics) {

        gsap.to(loading, {
            duration: 1,
            // ease: Power1.easeInOut,
            opacity: 0,
            
            onComplete: () => {
                loading.style.display = "none"

            }
        })
        gsap.to(buttons, {
            duration: 2,
            opacity: 1,
            
            // ease: Power1.easeInOut,
            onComplete: () => {
                buttons.style.display = "block"

            }
        })


        // physics.updateDebugger()
        if (collide) {

            physics.update(clock.getDelta() * 500)
        }
        else {

            physics.update(clock.getDelta() * 1000)
        }



    }


    var subtract;
    if (analyser) {

        if (audio.paused) {
            bloomPass.strength = 1.5;
        }
        else {
            analyser.getByteFrequencyData(dataArray);

            subtract = dataArray[20];
            // console.log((subtract/10)/2)

            bloomPass.strength = ((subtract / 10) / 9)
        }// renderer.toneMappingExposure =((subtract/10)/2)

        // ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

        // // x += barWidth + 1;
        // console.log(bloomPass.strength)
    }
    // else  {
    //     bloomPass.strength = 3

    // }

    requestAnimationFrame(render)
}

function renderBloom(mask) {

    if (mask === true) {

        scene.traverse(darkenNonBloomed);
        bloomComposer.render();
        scene.traverse(restoreMaterial);

    } else {

        camera.layers.set(BLOOM_SCENE);
        bloomComposer.render();
        camera.layers.set(ENTIRE_SCENE);

    }

}

function darkenNonBloomed(obj) {

    if (obj.isMesh && bloomLayer.test(obj.layers) === false) {

        materials[obj.uuid] = obj.material;
        obj.material = darkMaterial;

    }

}

function restoreMaterial(obj) {

    if (materials[obj.uuid]) {

        obj.material = materials[obj.uuid];
        delete materials[obj.uuid];

    }

}

function collision() {
    collide = true
    cubeFallen = true
    // console.log("dsdasdas")
    // scene.traverse(function (child) {
    //     if (child.isMesh) {
    //         if (child.name == 'Bluebox' || child.name == 'plane') {
    //             child.body.on.collision((otherObject, event) => {
    //                 if (otherObject.name == 'plane') {
    //                     if (!cubeFallen) {
    //                         if(currentpage==1)
    //                         collide = true
    //                         cubeFallen = true
    //                     }

    //                 }
    //             })

    //         }
    //     }
    // })
}


var videoScreen;
var videoStarted = false
function videoDisplay() {
    //Create your video texture:
    if (!videoStarted) {
        const video = document.getElementById('video');
        const videoTexture = new THREE.VideoTexture(video);
        const videoMaterial = new THREE.MeshBasicMaterial({ map: videoTexture, side: THREE.FrontSide, toneMapped: false, transparent: true, opacity: 0.7 });
        video.play();
        //Create screen
        const screen = new THREE.BoxGeometry(60, 4, 20);
        videoScreen = new THREE.Mesh(screen, videoMaterial);
        videoScreen.position.set(0, -7.5, 0)
        scene.add(videoScreen);
        videoScreen.visible = false
        videoScreen.autoplay
        videoStarted = true

    }
}

function compilation(currentpage) {
    sound.play()
    if (currentpage == 1) {
        collide = true
        //     if (!cubeFallen) {
        //     cubeFall()
        //     collision()

        //     // collide = true
        //     console.log('collision')
        // }

    }
    videoDisplay()
    if
        (currentpage == 3) {

        videoScreen.visible = true
        gsap.to(videoScreen.material, { opacity: 0.7, duration: 1 })

    }

    else {
        gsap.to(videoScreen.material, {
            opacity: 0, duration: 1, onComplete: () => {
                videoScreen.visible = false
            }
        })


        console.log('currentpage !== 3')

    }
    // else if (currentpage !== 3) {
    //     videoDisplayed = false
    // }


    if (currentpage !== 1) {
        collide = false
        console.log("page2")
    }

    if (currentpage == 4) {
        lastsection(4)
    }
    if (currentpage !== 4) {
        lastsection(!4)

    }


}

function lastsection(currentpage) {

    scene.traverse(function (child) {
        if (child.isMesh) {
            if (child.name == 'balls' || child.name == 'Bluebox' || child.name == 'plane') {



                if (currentpage == 4) {
                    child.body.setGravity(0, 0.5, 0);



                }
                else if (currentpage !== 4) {

                    child.body.setGravity(0, -9.8, 0);

                }


            }
        }
    })
}



var sound = new Howl({
    src: ['whoosh.mp3']
});


console.log(scene)


function controlGravity() {
    scene.traverse(function (child) {
        if (child.isMesh) {
            (child.name == 'balls')
            child.body.setGravity(0, -9.8, 0);
            console.log('controlBloom()')
        }
    })
}

var audio = document.getElementById('audio')

var analyser;
var dataArray;
var bufferLength;

function playMusic() {
    var context = new AudioContext();
    var src = context.createMediaElementSource(audio);
    analyser = context.createAnalyser();
    src.connect(analyser);
    analyser.connect(context.destination);
    analyser.fftSize = 256;
    bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);
    console.log('playmusic()')
    audio.play()
}

function fractionate(val, minVal, maxVal) {
    return (val - minVal) / (maxVal - minVal);
}

function modulate(val, minVal, maxVal, outMin, outMax) {
    var fr = fractionate(val, minVal, maxVal);
    var delta = outMax - outMin;
    return outMin + (fr * delta);
}

function avg(arr) {
    var total = arr.reduce(function (sum, b) { return sum + b; });
    return (total / arr.length);
}

function max(arr) {
    return arr.reduce(function (a, b) { return Math.max(a, b); })
}



// var play = document.getElementById('play')


var fixed = document.getElementById('fixed')
var entersite = false
function enterSite() {
    console.log('enterSite')
    fixed.style.display = 'none'
    controlGravity()
    playMusic()
    pgoneDisplay()
    started = true
    displayPlayButton()
    if (window.innerWidth > 1122) {
        absluteDisplay()
    }
    entersite = true
}
var firstsection = document.getElementsByClassName('intro-main')

function pgoneDisplay() {

    gsap.from(firstsection, {

        transform: 'translateY(200px) scale(1.2)'

    })

    gsap.to(firstsection, {



        transform: 'translateY(20px) scale(1.0)',


        ease: Power2.easeInOut,
        duration: 3,
        opacity: 1,

    })
}

var abslute = document.getElementById('sticky')
function absluteDisplay() {
    abslute.style.display = 'block'
}
function absluteDisplayNone() {
    abslute.style.display = 'none'
}

var effectShine = document.getElementsByClassName('effect-shine')



var musicIcon = document.getElementById('musicIcon')
function displayPlayButton() {
    musicIcon.style.display = 'block'
}
function pausedMusic() {
    if (audio.paused) {
        audio.play()
        musicIcon.classList.remove('musicplay')
        musicIcon.classList.add('musicpause')
    }
    else {
        audio.pause()
        musicIcon.classList.remove('musicpause')
        musicIcon.classList.add('musicplay')
    }
}


gsap.to(fixed, {

    duration: 2,
    opacity: 1,
    ease: Power2.easeInOut,
    transform: 'translateZ(400px) scale(1)'

})
