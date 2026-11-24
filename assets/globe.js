import * as THREE from 'three';
const cv=document.getElementById('globe');
try{
  const r=new THREE.WebGLRenderer({canvas:cv,alpha:true,antialias:true});r.setPixelRatio(Math.min(devicePixelRatio,2));
  const scene=new THREE.Scene(),cam=new THREE.PerspectiveCamera(40,1,.1,100);cam.position.z=5;
  const g=new THREE.Group();scene.add(g);
  const css=getComputedStyle(document.documentElement),brand=new THREE.Color(css.getPropertyValue('--brand').trim()||'#1d4ed8'),acc=new THREE.Color('#f97316');
  g.add(new THREE.Mesh(new THREE.IcosahedronGeometry(1.6,4),new THREE.MeshBasicMaterial({color:brand,wireframe:true,transparent:true,opacity:.22})));
  g.add(new THREE.Mesh(new THREE.SphereGeometry(1.58,48,48),new THREE.MeshBasicMaterial({color:brand,transparent:true,opacity:.07})));
  const ll=(lat,lon,R=1.6)=>{const p=(90-lat)*Math.PI/180,t=(lon+180)*Math.PI/180;return new THREE.Vector3(-R*Math.sin(p)*Math.cos(t),R*Math.cos(p),R*Math.sin(p)*Math.sin(t))};
  const cn=ll(31.2,121.5),inn=ll(13.1,80.3);
  [cn,inn].forEach(v=>{const m=new THREE.Mesh(new THREE.SphereGeometry(.06,16,16),new THREE.MeshBasicMaterial({color:acc}));m.position.copy(v);g.add(m)});
  const mid=cn.clone().add(inn).multiplyScalar(.5).normalize().multiplyScalar(2.6);
  const arc=new THREE.QuadraticBezierCurve3(cn,mid,inn);
  g.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(arc.getPoints(60)),new THREE.LineBasicMaterial({color:acc})));
  const ship=new THREE.Mesh(new THREE.SphereGeometry(.05,12,12),new THREE.MeshBasicMaterial({color:0xffffff}));g.add(ship);
  g.rotation.y=-1.9;g.rotation.x=.3;
  const size=()=>{const w=cv.clientWidth;r.setSize(w,w,false)};size();addEventListener('resize',size);
  const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;let t=0;
  (function loop(){t+=.004;if(!reduce)g.rotation.y+=.0015;ship.position.copy(arc.getPoint((t%1)));r.render(scene,cam);requestAnimationFrame(loop)})();
}catch(e){cv.remove()}
