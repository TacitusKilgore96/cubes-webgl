import World from "./World";
import * as THREE from "three";
import data from "../data.json";
import { gsap } from "gsap";

class Po {

    constructor() {

        console.log(data)

        const world = new World({
            showCameraPos:false,
            setCameraPos:[5,2.6,8.8],
            showGrid:false,
            showAxes: false,
            AmbientLight:false,
            OrbitControls:false,
            showFloor:true
        }); //end world

        const spotLight = new THREE.SpotLight(0xffffff, 20);

        spotLight.position.set(0, 5, 0);
        spotLight.angle = .8;//spreading
        spotLight.penumbra = 1; //blur in my world
        spotLight.decay = 2;
        spotLight.distance = 100;
        spotLight.castShadow = true;

        spotLight.shadow.mapSize.width = 2000; 
        spotLight.shadow.mapSize.height = 2000; 
        spotLight.shadow.camera.near = .5;
        spotLight.shadow.camera.far = 500;
        spotLight.shadow.focus=1;

        world.scene.add(spotLight);

        const loader = new THREE.TextureLoader();
            const materialCube = [
            new THREE.MeshPhongMaterial({ map: loader.load('assets/one.png') }), //right
            new THREE.MeshPhongMaterial({ map: loader.load('assets/two.png')}), //left
            new THREE.MeshPhongMaterial({ map: loader.load('assets/three.png')}), //top
            new THREE.MeshPhongMaterial({ map: loader.load('assets/four.png')}), //bottom
            new THREE.MeshPhongMaterial({ map: loader.load('assets/five.png')}), //front
            new THREE.MeshPhongMaterial({ map: loader.load('assets/six.png')}), //back s
        ];

        data.cubeInfo.forEach( (item, index)=> {

            /* const texture = new THREE.TextureLoader().load(item.texture); */
            const geometryCube = new THREE.BoxGeometry(1, 1, 1);
            /* const materialCube = new THREE.MeshPhongMaterial({ map: texture }); */

            this.cube = new THREE.Mesh(geometryCube, materialCube);
            this.cube.castShadow = true;
            this.cube.receiveShadow = true;
            world.scene.add(this.cube);

            this.cube.position.set(
                item.position[0],
                    item.position[1],
                        item.position[2]
            )

        this.cube.rotation.y = item.rotation;

        world.interaction.add(this.cube);
        this.cube.addEventListener("click", (event) => this.moveObj(event, world));

        }) //END forEach

    } //end constructor

    moveObj(event, world) {
        
        gsap.to(event.target.position, {
            duration: 1,
            x: .5,
            z: .5,
            repeat: 1,
            yoyo: true,
        });

        gsap.to(event.target.rotation, {
            duration: 1,
            y: 0.5,
            repeat: 1,
            yoyo: true,
        });

    }

} //end class

export default Po;